{
  description = "nobbz.dev - Website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixpkgs-unstable";
    d2n.url = "github:nix-community/dream2nix";
    d2n.inputs.all-cabal-json.follows = "nixpkgs";
    nobbz.url = "github:nobbz/nixos-config";
    nix-filter.url = "github:numtide/nix-filter";
  };

  outputs = {
    self,
    d2n,
    nixpkgs,
    nix-filter,
    ...
  } @ inputs: let
    inherit (nix-filter.lib) filter inDirectory matchExt;
    inherit (nixpkgs.lib) genAttrs;

    systems = ["x86_64-linux" "aarch64-darwin"];

    self1 = d2n.lib.makeFlakeOutputs {
      inherit systems;

      config.projectRoot = ./.;
      source = filter {
        root = ./.;
        include = [
          (inDirectory "src")
          (inDirectory "public")
          (matchExt "js")
          (matchExt "cjs")
          (matchExt "mjs")
          ./package.json
          ./yarn.lock
        ];
      };
      packageOverrides.blog-nobbz-dev.copyBlog = {
        installPhase = ''
          mkdir -p $out
          cp -rv ./dist/* $out
        '';
      };
    };
  in {
    formatter = inputs.nobbz.formatter;

    packages = genAttrs systems (system: {
      blog = self1.packages.x86_64-linux.blog-nobbz-dev;
      default = self1.packages.x86_64-linux.blog-nobbz-dev;
    });

    devShells = genAttrs systems (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      default = pkgs.mkShell {
        packages = builtins.attrValues {
          inherit (pkgs) yarn;
          inherit (inputs.nobbz.packages.${system}) alejandra nil;
        };
      };
    });
  };
}

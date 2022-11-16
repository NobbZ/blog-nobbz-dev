{
  description = "nobbz.dev - Website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixpkgs-unstable";
    d2n.url = "github:nix-community/dream2nix";
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

    self1 = d2n.lib.makeFlakeOutputs {
      systems = ["x86_64-linux"];
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

    packages.x86_64-linux = let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
      inherit (pkgs) callPackage;
    in {
      blog = self1.packages.x86_64-linux.blog-nobbz-dev;
    };

    devShells.x86_64-linux.default = let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
    in
      pkgs.mkShell {
        packages = builtins.attrValues {
          inherit (pkgs) yarn yarn2nix;
          inherit (inputs.nobbz.packages.x86_64-linux) alejandra nil;
        };
      };
  };
}

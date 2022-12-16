{
  description = "nobbz.dev - Website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixpkgs-unstable";
    d2n.url = "github:nix-community/dream2nix";
    d2n.inputs.all-cabal-json.follows = "nixpkgs";
    nobbz.url = "github:nobbz/nixos-config";
    nix-filter.url = "github:numtide/nix-filter";
    flake-parts.url = "github:hercules-ci/flake-parts";
    pre-commit.url = "github:cachix/pre-commit-hooks.nix";
  };

  outputs = {
    self,
    d2n,
    nixpkgs,
    nix-filter,
    flake-parts,
    pre-commit,
    ...
  } @ inputs: let
    inherit (nix-filter.lib) filter inDirectory matchExt;

    systems = ["x86_64-linux" "aarch64-darwin"];
  in
    flake-parts.lib.mkFlake {inherit inputs;} {
      inherit systems;

      imports = [d2n.flakeModuleBeta pre-commit.flakeModule];

      dream2nix.config.projectRoot = ./.;

      perSystem = {
        config,
        pkgs,
        self',
        inputs',
        system,
        ...
      }: {
        dream2nix.inputs.self = {
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
          projects.blog = {
            name = "blog";
            subsystem = "nodejs";
            translator = "yarn-lock";
          };
          packageOverrides.blog-nobbz-dev.copyBlog = {
            installPhase = ''
              mkdir -p $out
              cp -rv ./dist/* $out
            '';
          };
        };

        formatter = inputs'.nobbz.formatter;

        pre-commit.check.enable = true;
        pre-commit.settings.hooks.nixpkgs-fmt.enable = false;
        pre-commit.settings.hooks.alejandra.enable = true;
        pre-commit.settings.hooks.eslint.enable = true;

        devShells.default = pkgs.mkShell {
          packages = builtins.attrValues {
            inherit (pkgs) yarn;
            inherit (inputs.nobbz.packages.${system}) alejandra nil;
          };
          shellHook = config.pre-commit.installationScript;
        };
      };
    };
}

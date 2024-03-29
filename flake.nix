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
    systems = ["x86_64-linux" "aarch64-linux" "aarch64-darwin"];
  in
    flake-parts.lib.mkFlake {inherit inputs;} {
      inherit systems;

      imports = [d2n.flakeModuleBeta pre-commit.flakeModule ./nix/blog.nix ./nix/hooks.nix];

      perSystem = {
        config,
        pkgs,
        self',
        inputs',
        system,
        ...
      }: {
        formatter = inputs'.nobbz.formatter;

        apps.serve.program = "${pkgs.writeShellScript "serve" ''
          set -e
          result=$(nom build .#blog --print-out-paths)
          ${pkgs.miniserve}/bin/miniserve -p 3001 --index index.html ''${result}
        ''}";

        packages.default = self'.packages.blog;

        devShells.default = pkgs.mkShell {
          packages = builtins.attrValues {
            inherit (pkgs) yarn nodejs_20 yarn2nix nil;
            inherit (pkgs.nodePackages) gatsby-cli;
            inherit (inputs.nobbz.packages.${system}) alejandra;
          };
          shellHook = config.pre-commit.installationScript;
        };
      };
    };
}

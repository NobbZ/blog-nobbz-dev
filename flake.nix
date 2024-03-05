{
  description = "nobbz.dev - Website";

  outputs = {
    self,
    nixpkgs,
    nix-filter,
    flake-parts,
    ...
  } @ inputs:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = import inputs.systems;

      imports = [];

      perSystem = {
        pkgs,
        inputs',
        ...
      }: let
        mkMiniShell = import inputs.mkshell-minimal pkgs;
      in {
        formatter = pkgs.alejandra;

        devShells.default = mkMiniShell {
          packages = builtins.attrValues {
            inherit (pkgs) zola alejandra nil yarn;
          };
        };
      };
    };

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixpkgs-unstable";
    nix-filter.url = "github:numtide/nix-filter";
    flake-parts.url = "github:hercules-ci/flake-parts";

    mkshell-minimal.url = "github:viperML/mkshell-minimal";
    mkshell-minimal.flake = false;

    systems.url = "github:nix-systems/default-linux";
    systems.flake = false;
  };
}

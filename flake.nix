{
  description = "nobbz.dev - Website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixpkgs-unstable";
    nobbz.url = "github:nobbz/nixos-config";
    nix-filter.url = "github:numtide/nix-filter";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs = {
    self,
    nixpkgs,
    nix-filter,
    flake-parts,
    ...
  } @ inputs: let
    systems = ["x86_64-linux" "aarch64-linux" "aarch64-darwin"];
  in
    flake-parts.lib.mkFlake {inherit inputs;} {
      inherit systems;

      imports = [./nix/blog.nix ./nix/hooks.nix];

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
            inherit (pkgs) nil deno alejandra pre-commit;
          };
        };
      };
    };
}

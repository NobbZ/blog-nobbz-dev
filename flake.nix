# SPDX-FileCopyrightText: 2025 Norbert Melzer
# SPDX-FileContributor: Norbert Melzer
#
# SPDX-License-Identifier: MIT
{
  description = "nobbz.dev - Website";

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

      imports = [];

      perSystem = {
        config,
        pkgs,
        self',
        inputs',
        system,
        ...
      }: {
        formatter = pkgs.writeShellScriptBin "formatter" ''
          ${pkgs.lib.getExe pkgs.alejandra} .
          yarn prettier -w .
        '';

        devShells.default = pkgs.mkShell {
          packages = let
            nodejs = pkgs.nodejs_22;
            astro-ls = pkgs.writeShellScriptBin "astro-ls" ''exec yarn run astro-ls "$@"'';
            mdx-language-server = pkgs.writeShellScriptBin "mdx-language-server" ''exec yarn run mdx-language-server "$@"'';
            yarn = pkgs.yarn.override {inherit nodejs;};
            ts_ls = pkgs.typescript-language-server.override {inherit nodejs;};
          in
            builtins.attrValues {
              inherit (pkgs) nil tailwindcss-language-server;
              inherit (pkgs) pre-commit alejandra reuse;
              inherit astro-ls mdx-language-server nodejs yarn ts_ls;
            };
        };
      };
    };

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixpkgs-unstable";
    nix-filter.url = "github:numtide/nix-filter";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };
}

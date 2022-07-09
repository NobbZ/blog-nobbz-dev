{
  description = "nobbz.dev - Website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixpkgs-unstable";
    alejandra.url = "github:kamadorueda/alejandra?ref=1.5.0";
  };

  outputs = {
    self,
    nixpkgs,
    ...
  } @ inputs: {
    devShells.x86_64-linux.default = let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
    in
      pkgs.mkShell {
        packages = builtins.attrValues {
          inherit (pkgs) yarn rnix-lsp;
          inherit (inputs.alejandra.packages.x86_64-linux) default;
        };
      };
  };
}

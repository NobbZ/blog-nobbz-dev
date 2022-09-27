{
  description = "nobbz.dev - Website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixpkgs-unstable";
    nobbz.url = "github:nobbz/nixos-config";
  };

  outputs = {
    self,
    nixpkgs,
    ...
  } @ inputs: {
    formatter = inputs.nobbz.formatter;

    packages.x86_64-linux.blog = let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
      inherit (pkgs) callPackage;
    in
      callPackage ./.nix/blog.nix {inherit self;};

    devShells.x86_64-linux.default = let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
    in
      pkgs.mkShell {
        packages = builtins.attrValues {
          inherit (pkgs) yarn yarn2nix rnix-lsp;
          inherit (inputs.nobbz.packages.x86_64-linux) alejandra;
        };
      };
  };
}

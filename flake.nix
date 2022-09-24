{
  description = "nobbz.dev - Website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixpkgs-unstable";
    alejandra.url = "github:kamadorueda/alejandra?ref=1.5.0";
  };

  outputs =
    { self
    , nixpkgs
    , ...
    } @ inputs: {
      packages.x86_64-linux.blog =
        let
          pkgs = nixpkgs.legacyPackages.x86_64-linux;
          inherit (pkgs) mkYarnPackage;
        in
        mkYarnPackage {
          name = "blog-nobbz-dev";
          version = self.lastModifiedDate;
          src = self;
          packageJSON = "${self}/package.json";
          yarnLock = "${self}/yarn.lock";

          postConfigure = ''
            mkdir -p yarnHome
            export HOME=$(pwd)/yarnHome
            export BLOG_COMMIT=${self.shortRev or "dirty"}
          '';

          buildPhase = ''
            yarn --offline build
          '';

          installPhase = ''
            mkdir -p $out
            find . -name index.html
            cp -rv ./deps/@example/blog/dist/* $out
          '';

          distPhase = "true";
        };

      devShells.x86_64-linux.default =
        let
          pkgs = nixpkgs.legacyPackages.x86_64-linux;
        in
        pkgs.mkShell {
          packages = builtins.attrValues {
            inherit (pkgs) yarn yarn2nix rnix-lsp;
            inherit (inputs.alejandra.packages.x86_64-linux) default;
          };
        };
    };
}

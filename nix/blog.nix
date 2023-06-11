{inputs, ...}: let
  inherit (inputs.nix-filter.lib) filter inDirectory matchExt;
in {
  perSystem = {
    config,
    pkgs,
    inputs',
    ...
  }: {
    packages.blog = let
      nodeHeaders = builtins.fetchTarball {
        name = "node-headers-${pkgs.nodejs.version}";
        url = "https://nodejs.org/download/release/v${pkgs.nodejs.version}/node-v${pkgs.nodejs.version}-headers.tar.gz";
        sha256 = "sha256:02n3z0116lmprc2960r640v5w9lnngpx3rpz65lmnzymrhxc0qv9";
      };
    in
      pkgs.mkYarnPackage {
        name = "blog";
        src = filter {
          root = ./..;
          include = [
            (inDirectory "src")
            # (inDirectory "blog")
            (matchExt "js")
            (matchExt "cjs")
            (matchExt "mjs")
            (matchExt "json")
            (matchExt "ts")
            ../package.json
            ../yarn.lock
            ../yarn.nix
          ];
        };
        yarnLock = ../yarn.lock;
        packageJSON = ../package.json;
        yarnNix = ../yarn.nix;

        CI = "true";

        pkgConfig = {
          sharp = {
            nativeBuildInputs = builtins.attrValues {
              inherit (pkgs.nodePackages) node-gyp;
              inherit (pkgs) python3 pkg-config;
            };
            buildInputs = [pkgs.vips.dev];
            postInstall = "node-gyp --node-dir=${nodeHeaders} rebuild";
          };
        };

        postConfigure = "export HOME=$(mktemp -d)";
        buildPhase = "yarn --offline build";
        installPhase = "mv -v deps/blog/public \${out}";
        distPhase = "true";
      };
  };
}

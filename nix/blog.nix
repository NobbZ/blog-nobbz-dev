{inputs, ...}: let
  inherit (inputs.nix-filter.lib) filter inDirectory matchExt;
in {
  perSystem = {
    config,
    pkgs,
    ...
  }: {
    packages.blog = pkgs.mkYarnPackage {
      name = "blog";
      src = filter {
        root = ./..;
        include = [
          (inDirectory "src")
          (matchExt "js")
          (matchExt "cjs")
          (matchExt "mjs")
          (matchExt "json")
          ../package.json
          ../yarn.lock
          ../yarn.nix
        ];
      };
      yarnLock = ../yarn.lock;
      packageJSON = ../package.json;
      yarnNix = ../yarn.nix;

      CI = "true";

      postConfigure = "export HOME=$(mktemp -d)";
      buildPhase = "yarn build; pwd";
      installPhase = "mv -v deps/blog/public \${out}";
      distPhase = "true";
    };
  };
}

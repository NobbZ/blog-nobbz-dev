{
  mkYarnPackage,
  self,
  jq,
}:
mkYarnPackage {
  name = "blog-nobbz-dev";
  version = self.lastModifiedDate;
  src = self;
  packageJSON = "${self}/package.json";
  yarnLock = "${self}/yarn.lock";
  yarnNix = "${self}/.nix/yarn-lock.nix";

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
    source=$(${jq}/bin/jq --raw-output .name < ${self}/package.json)
    cp -rv ./deps/$source/dist/* $out
  '';

  distPhase = "true";

  allowedReferences = [];
}

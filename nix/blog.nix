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
      vendored = pkgs.runCommand "deno-deps" { hash = pkgs.lib.fakeHash; } '' 
        export DENO_DIR=$out/_vendor
        mkdir -p $DENO_DIR
        ${pkgs.deno}/bin/deno cache ${../deno.lock}
        cp ${../deno.json} ${../deno.lock} $out
      '';
    in
      pkgs.stdenv.mkDerivation {
        name = "blog-nobbz-dev";
        version = "0-unstable-${inputs.self.lastModifiedDate}-${inputs.self.rev or inputs.self.dirtyRev or "unknown"}";

        src = filter {
          root = ./..;
          include = [
            (inDirectory "src")
            ../deno.json
            ../deno.lock
          ];
        };

        configurePhase = ''
          runHook preConfigure

          if diff <(sha256 ${vendored}/deno.lock) <(sha256 ${../deno.lock}) then
            echo "mismatch in lockfiles, please update the deno hash"
            exit 1;
          fi

          export DENO_DIR=${vendored}/_vendor

          runHook postConfigure
        '';

        buildPhase = ''
          runHook preBuild

          deno task build

          runHook postBuild
        '';
      };
  };
}

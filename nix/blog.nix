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
      vendorArgs = {
        outputHash = "sha256-T1I8LjeIWAkx+2Z/KbXfxrc/KkqSDRX2CPPy0TwCB1Q="; 
        outputHashMode = "recursive";
      };
      vendored = pkgs.runCommand "deno-deps" vendorArgs ''
        export DENO_DIR=$out/_vendor
        mkdir -p $DENO_DIR
        cp ${../deno.lock} deno.lock
        cp ${../deno.json} deno.json
        cp ${../_config.ts} _config.ts
        ${pkgs.deno}/bin/deno cache --lock deno.lock deno.json
        ${pkgs.deno}/bin/deno cache --lock deno.lock https://deno.land/x/lume/cli.ts
        ${pkgs.deno}/bin/deno cache --lock deno.lock _config.ts
        cp deno.json deno.lock $out
      '';
    in
      pkgs.stdenv.mkDerivation {
        pname = "blog-nobbz-dev";
        version = "0-unstable-${inputs.self.lastModifiedDate}-${inputs.self.rev or inputs.self.dirtyRev or "unknown"}";

        src = filter {
          root = ./..;
          include = [
            (inDirectory "src")
            (inDirectory "vendor")
            (inDirectory "node_modules")
            (matchExt "ts")
            ../deno.json
            ../deno.lock
          ];
        };

        nativeBuildInputs = [
          pkgs.deno
          pkgs.gawk
        ];

        # configurePhase = ''
        #   runHook preConfigure

        #   if ! diff <(sha256sum ${vendored}/deno.lock | awk '{print $1}') <(sha256sum ${../deno.lock} | awk '{print $1}'); then
        #     echo "mismatch in lockfiles, please update the deno hash"
        #     exit 1
        #   fi

        #   export DENO_DIR=$(pwd)/_vendor
        #   mkdir -p $DENO_DIR
        #   cp -r ${vendored}/_vendor/* _vendor

        #   runHook postConfigure
        # '';

        buildPhase = ''
          runHook preBuild

          ls -l node_modules
          # deno task build
          echo "import 'lume/cli.ts'" | deno run --no-remote -A -

          runHook postBuild
        '';

        installPhase = ''
          runHook preInstall

          mkdir -p $out
          cp -r _site/* $out

          runHook postInstall
        '';
      };
  };
}

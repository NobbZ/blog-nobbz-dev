{...}: {
  perSystem = {pkgs, ...}: {
    pre-commit.check.enable = true;
    pre-commit.settings.hooks.nixpkgs-fmt.enable = false;
    pre-commit.settings.hooks.alejandra.enable = true;
    pre-commit.settings.hooks.prettier.enable = true;

    pre-commit.settings.hooks.eslint.enable = true;
    pre-commit.settings.hooks.eslint.pass_filenames = false;
    pre-commit.settings.settings.eslint.binPath = "${pkgs.nodePackages.eslint}/bin/eslint src";
    pre-commit.settings.settings.eslint.extensions = "\\.(js|ts|jsx|tsx|astro|md|mdx|cjs|ts)$";

    pre-commit.settings.hooks.typedCssModules = {
      enable = true;
      name = "typed-css-modules";
      description = "Generate TypeScript definition files for CSS Modules";
      files = ".*\\.modules\\.css$";
      entry = "yarn tcm -l";
    };
  };
}

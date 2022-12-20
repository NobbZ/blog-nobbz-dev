{...}: {
  perSystem.pre-commit.check.enable = true;
  perSystem.pre-commit.settings.hooks.nixpkgs-fmt.enable = false;
  perSystem.pre-commit.settings.hooks.alejandra.enable = true;
  perSystem.pre-commit.settings.hooks.eslint.enable = true;
  perSystem.pre-commit.settings.settings.eslint.extensions = "\\.(js|ts|jsx|tsx|astro|md|mdx|cjs|ts)$";
  perSystem.pre-commit.settings.hooks.prettier.enable = true;
}

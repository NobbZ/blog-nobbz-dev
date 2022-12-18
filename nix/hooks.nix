{...}: {
  perSystem.pre-commit.check.enable = true;
  perSystem.pre-commit.settings.hooks.nixpkgs-fmt.enable = false;
  perSystem.pre-commit.settings.hooks.alejandra.enable = true;
  perSystem.pre-commit.settings.hooks.eslint.enable = true;
}

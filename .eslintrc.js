module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:astro/all'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {},
    overrides: [
        {
            // Define the configuration for `.astro` file.
            files: ['*.astro'],
            // Allows Astro components to be parsed.
            parser: 'astro-eslint-parser',
            // Parse the script in `.astro` as TypeScript by adding the following configuration.
            // It's the setting you need when using TypeScript.
            parserOptions: {
                parser: '@typescript-eslint/parser',
                extraFileExtensions: ['.astro'],
            },
            rules: {
                // override/add rules settings here, such as:
                'astro/no-set-html-directive': 'off',
            },
        },
    ],
};

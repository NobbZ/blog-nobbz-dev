/** @type {import("@types/prettier").Options} */
module.exports = {
    printWidth: 100,
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'es5',
    useTabs: true,
    plugins: ['./node_modules/prettier-plugin-astro'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
        {
            files: ['.*', '*.md', '*.toml'],
            options: {
                useTabs: false,
            },
        },
        {
            files: ['*.yaml', '*.yml', '*.json'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};

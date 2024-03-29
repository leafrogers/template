module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:node/recommended',
		'plugin:prettier/recommended'
	],
	overrides: [
		{
			files: ['client/**/*.js', 'shared/**/*.js'],
			env: {
				browser: true
			}
		},
		{
			files: ['**/*.test.js'],
			env: {
				jest: true
			},
			extends: ['plugin:jest/recommended'],
			rules: {
				'jest/no-disabled-tests': 'warn',
				'jest/no-focused-tests': 'error',
				'jest/no-identical-title': 'error',
				'jest/prefer-to-have-length': 'warn',
				'jest/valid-expect': 'error',
				'max-nested-callbacks': ['error', 3]
			}
		}
	],
	parserOptions: {
		ecmaVersion: 2022
	},
	rules: {
		complexity: ['error', 4],
		'max-depth': ['error', 2],
		'max-nested-callbacks': ['error', 2],
		'node/exports-style': ['error', 'module.exports'],
		'node/file-extension-in-import': ['error', 'always'],
		'node/no-unpublished-import': 'off',
		'node/no-unpublished-require': 'off',
		'node/prefer-global/buffer': ['error', 'always'],
		'node/prefer-global/console': ['error', 'always'],
		'node/prefer-global/process': ['error', 'always'],
		'node/prefer-global/url-search-params': ['error', 'always'],
		'node/prefer-global/url': ['error', 'always'],
		'node/prefer-promises/dns': 'error',
		'node/prefer-promises/fs': 'error'
	},
	settings: {
		node: {
			tryExtensions: ['.cjs', '.js', '.json', '.mjs']
		}
	}
};

import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import jest from 'eslint-plugin-jest';

export default [
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{
		languageOptions: {
			ecmaVersion: 2022,
			globals: globals.node,
			sourceType: 'module'
		},
		rules: {
			'max-depth': ['error', 2],
			'max-nested-callbacks': ['error', 2],
			complexity: ['error', 4]
		}
	},
	{
		files: ['client/**/*.ts', 'shared/**/*.ts'],
		languageOptions: {
			globals: {
				...globals.browser
			}
		}
	},
	{
		...jest.configs['flat/recommended'],
		files: ['**/*.test.ts'],
		languageOptions: {
			globals: {
				...globals.jest
			}
		},
		rules: {
			...jest.configs['flat/recommended'].rules,
			'jest/no-disabled-tests': 'warn',
			'jest/no-focused-tests': 'error',
			'jest/no-identical-title': 'error',
			'jest/prefer-to-have-length': 'warn',
			'jest/valid-expect': 'error',
			'max-nested-callbacks': ['error', 3]
		}
	}
];

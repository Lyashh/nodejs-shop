module.exports = {
	env: {
		browser: false,
		node: true,
		es6: true
	},
	extends: [
		'airbnb-base',
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
		'plugin:import/errors',
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		project: 'tsconfig.json'
	},
	plugins: [
		'@typescript-eslint',
		"@typescript-eslint/tslint", 
		"import"
	],
	rules: {
		'linebreak-style': ['error', 'windows'],
		"indent": [2, "tab"],
		"no-tabs": 0,
		"class-methods-use-this": 0,
		"no-unused-vars": 0,
		"no-else-return": 0,
		"import/no-unresolved": 0,
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				"js": "never",
				"jsx": "never",
				"ts": "never",
				"tsx": "never"
			}
		]
	},
	/*"eslint.workingDirectories": [
	  { "directory": "./src", "changeProcessCWD": true },
	]*/
	settings: {
		"import/extensions": [".js", ".jsx", ".ts", ".tsx"],
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"]
		},
		"import/resolver": {
			"node": {
				"extensions": [".js", ".jsx", ".ts", ".tsx"]
			}
		}
	},
};

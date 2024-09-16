import ts_parser from "@typescript-eslint/parser";
import ts_plugin from "@typescript-eslint/eslint-plugin";
import stylistic_plugin from "@stylistic/eslint-plugin-ts";
import import_plugin from "eslint-plugin-import";
import unicorn_plugin from "eslint-plugin-unicorn";

export default [
	{
		ignores: [
			"**/.history/",
			"**/node_modules/",
			"**/research/",
			"**docs/",
			"*.js",
			"dist/*",
			"jest.config.ts",
			"*eslint*",
			"*.json"
		]
	},
	{
		files: ["src/**/*.ts"],
		languageOptions: {
			parser: ts_parser,
			parserOptions: {
				sourceType: "module",
				ecmaVersion: 2020,
				tsconfigRootDir: process.cwd(),
				project: "./tsconfig.json"
			}
		},
		plugins: {
			"@typescript-eslint": ts_plugin,
			"@stylistic": stylistic_plugin,
			"@import": import_plugin,
			"@unicorn": unicorn_plugin
		},
		settings: {
			"import/parsers": {
				"@typescript-eslint/parser": [".ts"]
			},
			"import/resolver": {
				typescript: {
					project: "./tsconfig.json",
					alwaysTryTypes: true
				}
			}
		},
		rules: {
			"@typescript-eslint/prefer-readonly": "error",
			"@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
			"@typescript-eslint/explicit-function-return-type": [
				"error",
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
					allowHigherOrderFunctions: true,
					allowDirectConstAssertionInArrowFunctions: true
				}
			],
			"@typescript-eslint/explicit-member-accessibility": [
				"error",
				{
					accessibility: "explicit",
					overrides: {
						constructors: "no-public"
					}
				}
			],
			"@typescript-eslint/explicit-module-boundary-types": "error",
			"@stylistic/member-delimiter-style": "error",
			"@typescript-eslint/member-ordering": [
				"error",
				{
					default: {
						order: "as-written",
						memberTypes: [
							"signature",
							// static
							"public-static-get",
							"public-static-field",
							"protected-static-field",
							"private-static-field",
							// instance public
							"public-decorated-get",
							"public-decorated-set",
							"public-instance-get",
							"public-instance-set",
							"public-abstract-get",
							"public-abstract-set",
							"public-decorated-field",
							"public-instance-field",
							"public-abstract-field",
							"public-decorated-method",
							"public-instance-method",
							"public-abstract-method",
							// constructor
							"constructor",
							// instance protected
							"protected-decorated-get",
							"protected-decorated-set",
							"protected-instance-get",
							"protected-instance-set",
							"protected-abstract-get",
							"protected-abstract-set",
							"protected-decorated-field",
							"protected-instance-field",
							"protected-abstract-field",
							"protected-decorated-method",
							"protected-instance-method",
							"protected-abstract-method",
							// instance
							"private-decorated-get",
							"private-decorated-set",
							"private-instance-get",
							"private-instance-set",
							"private-decorated-field",
							"private-instance-field",
							"private-decorated-method",
							"private-instance-method"
						]
					}
				}
			],
			"@typescript-eslint/no-confusing-non-null-assertion": "error",
			"@typescript-eslint/no-confusing-void-expression": [
				"error",
				{
					ignoreVoidOperator: true
				}
			],
			"@typescript-eslint/no-dynamic-delete": "error",
			"@typescript-eslint/no-extraneous-class": "warn",
			"@typescript-eslint/no-invalid-void-type": "error",
			"@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
			"@typescript-eslint/no-unnecessary-condition": "error",
			"@typescript-eslint/no-unnecessary-qualifier": "error",
			"@typescript-eslint/no-unnecessary-type-arguments": "error",
			"@typescript-eslint/non-nullable-type-assertion-style": "error",
			"@typescript-eslint/prefer-for-of": "error",
			"@typescript-eslint/prefer-function-type": "error",
			"@typescript-eslint/prefer-includes": "error",
			"@typescript-eslint/prefer-literal-enum-member": [
				"error",
				{
					allowBitwiseExpressions: true
				}
			],
			"@typescript-eslint/prefer-nullish-coalescing": "error",
			"@typescript-eslint/prefer-optional-chain": "error",
			"@typescript-eslint/prefer-readonly": "error",
			"@typescript-eslint/prefer-reduce-type-parameter": "error",
			"@typescript-eslint/prefer-regexp-exec": "error",
			"@typescript-eslint/prefer-return-this-type": "error",
			"@typescript-eslint/prefer-string-starts-ends-with": "error",
			"@typescript-eslint/prefer-ts-expect-error": "error",
			"@typescript-eslint/require-array-sort-compare": "error",
			"@typescript-eslint/strict-boolean-expressions": "error",
			"@typescript-eslint/switch-exhaustiveness-check": "error",
			"@stylistic/type-annotation-spacing": "error",
			"@typescript-eslint/unified-signatures": "error",
			"@typescript-eslint/no-misused-promises": [
				"error",
				{
					checksVoidReturn: false
				}
			],
			"@import/no-unresolved": "error",
			"brace-style": "off",
			"@stylistic/brace-style": ["error"],
			"comma-dangle": "off",
			"@stylistic/comma-dangle": ["error", "never"],
			curly: ["error", "all"],
			"comma-spacing": "off",
			"@stylistic/comma-spacing": "error",
			"default-param-last": "error",
			"@typescript-eslint/default-param-last": "error",
			"func-call-spacing": "off",
			"@stylistic/func-call-spacing": "error",
			"keyword-spacing": "off",
			"@stylistic/keyword-spacing": "error",
			"lines-between-class-members": "off",
			"@stylistic/lines-between-class-members": [
				"error",
				"always",
				{
					exceptAfterOverload: true,
					exceptAfterSingleLine: true
				}
			],
			"no-dupe-class-members": "off",
			"@typescript-eslint/no-dupe-class-members": "error",
			"@import/no-duplicates": "error",
			"no-invalid-this": "off",
			"@typescript-eslint/no-invalid-this": "error",
			"no-loop-func": "off",
			"@typescript-eslint/no-loop-func": "error",
			"no-magic-numbers": "off",
			"no-redeclare": "off",
			"@typescript-eslint/no-redeclare": "error",
			"no-shadow": "off",
			"@typescript-eslint/no-shadow": "error",
			"no-throw-literal": "off",
			"@typescript-eslint/only-throw-error": "error",
			"no-unused-expressions": "off",
			"@typescript-eslint/no-floating-promises": "warn",
			"@typescript-eslint/no-unused-expressions": "error",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"no-use-before-define": "off",
			"@typescript-eslint/no-unnecessary-condition": "warn",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-unsafe-return": "warn",
			"@typescript-eslint/no-namespace": "off",
			"no-useless-constructor": "off",
			"@typescript-eslint/no-useless-constructor": "error",
			"object-curly-spacing": "off",
			"@stylistic/object-curly-spacing": [
				"error",
				"always",
				{
					arraysInObjects: true,
					objectsInObjects: true
				}
			],
			"padding-line-between-statements": "off",
			"@stylistic/padding-line-between-statements": [
				"error",
				{
					blankLine: "always",
					prev: "*",
					next: "return"
				},
				{
					blankLine: "always",
					prev: "const",
					next: "*"
				},
				{
					blankLine: "never",
					prev: ["const", "let", "multiline-const", "multiline-let"],
					next: ["const", "let", "multiline-const", "multiline-let"]
				},
				{
					blankLine: "always",
					prev: ["const"],
					next: ["let"]
				},
				{
					blankLine: "always",
					prev: ["let"],
					next: ["const"]
				},
				{
					blankLine: "always",
					prev: "*",
					next: ["block-like"]
				},
				{
					blankLine: "always",
					prev: ["block-like"],
					next: "*"
				},
				{
					blankLine: "always",
					prev: ["if"],
					next: ["if"]
				}
			],
			quotes: "off",
			"no-return-await": "off",
			"@typescript-eslint/return-await": "error",
			semi: "off",
			"@stylistic/semi": ["error", "always"],
			"space-infix-ops": "off",
			"@stylistic/space-infix-ops": [
				"error",
				{
					int32Hint: true
				}
			],
			"lodash/chaining": "off",
			"lodash/prefer-lodash-method": "off",
			"@unicorn/prefer-at": "error",
			"@unicorn/consistent-function-scoping": "error",
			"@unicorn/consistent-destructuring": "warn",
			"@unicorn/custom-error-definition": "error",
			"@unicorn/error-message": "warn",
			"@unicorn/explicit-length-check": "error",
			"@unicorn/filename-case": [
				"error",
				{
					cases: {
						camelCase: true,
						pascalCase: true
					}
				}
			],
			"@unicorn/new-for-builtins": "error",
			"@unicorn/no-array-callback-reference": "error",
			"@unicorn/no-array-for-each": "error",
			"@unicorn/no-array-method-this-argument": "error",
			"@unicorn/no-array-push-push": "error",
			"@unicorn/no-await-expression-member": "error",
			"@unicorn/no-empty-file": "error",
			"@unicorn/no-for-loop": "error",
			"@unicorn/no-for-loop": "error",
			"@unicorn/no-invalid-remove-event-listener": "error",
			"@unicorn/no-lonely-if": "error",
			"@unicorn/no-negated-condition": "error",
			"@unicorn/no-null": "error",
			"@unicorn/no-object-as-default-parameter": "error",
			"@unicorn/no-process-exit": "warn",
			"@unicorn/no-static-only-class": "error",
			"@unicorn/no-thenable": "error",
			"@unicorn/no-unnecessary-await": "error",
			"@unicorn/no-unnecessary-polyfills": "error",
			"@unicorn/no-unreadable-iife": "error",
			"@unicorn/no-unused-properties": "warn",
			"@unicorn/no-useless-fallback-in-spread": "error",
			"@unicorn/no-useless-length-check": "error",
			"@unicorn/no-useless-promise-resolve-reject": "error",
			"@unicorn/no-useless-spread": "error",
			"@unicorn/no-useless-switch-case": "error",
			"@unicorn/no-useless-undefined": "error",
			"@unicorn/prefer-array-flat": "error",
			"@unicorn/prefer-array-index-of": "error",
			"@unicorn/prefer-array-some": "error",
			"@unicorn/prefer-date-now": "error",
			"@unicorn/prefer-default-parameters": "error",
			"@unicorn/prefer-export-from": "error",
			"@unicorn/prefer-includes": "error",
			"@unicorn/prefer-logical-operator-over-ternary": "error",
			"@unicorn/prefer-math-trunc": "error",
			"@unicorn/prefer-negative-index": "error",
			"@unicorn/prefer-node-protocol": "error",
			"@unicorn/prefer-number-properties": "error",
			"@unicorn/prefer-object-from-entries": "error",
			"@unicorn/prefer-optional-catch-binding": "error",
			"@unicorn/prefer-prototype-methods": "error",
			"@unicorn/prefer-reflect-apply": "error",
			"@unicorn/prefer-regexp-test": "error",
			"@unicorn/prefer-set-has": "error",
			"@unicorn/prefer-set-size": "error",
			"@unicorn/prefer-spread": "error",
			"@unicorn/prefer-string-replace-all": "error",
			"@unicorn/prefer-string-slice": "error",
			"@unicorn/prefer-string-starts-ends-with": "error",
			"@unicorn/prefer-string-trim-start-end": "error",
			"@unicorn/prefer-switch": "error",
			"@unicorn/prefer-ternary": "error",
			"@unicorn/prefer-type-error": "error",
			"@unicorn/relative-url-style": "error",
			"@unicorn/require-array-join-separator": "error",
			"@unicorn/require-number-to-fixed-digits-argument": "error",
			"@unicorn/text-encoding-identifier-case": "error",
			"@unicorn/throw-new-error": "error"
		}
	}
];

import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier";
import pluginReduxSaga from "eslint-plugin-redux-saga";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
    },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,

    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        plugins: {
            prettier: eslintPluginPrettier,
            "redux-saga": pluginReduxSaga,
        },
        settings: {
            react: {
                version: "detect", // Automatically detect React version
            },
        },
        rules: {
            "react/react-in-jsx-scope": "off", // React 17+ does not require React to be in scope

            // Redux-Saga Rules
            "redux-saga/no-unhandled-errors": "error",
            "redux-saga/yield-effects": "error", // Ensure all yielded values are effects
            "redux-saga/no-yield-in-race": "warn", // Warn against improper `race` usage

            // Best Practices and Error Prevention
            "no-unused-vars": ["warn"], // Warn about unused variables
            eqeqeq: ["error", "always"], // Enforce strict equality
            "no-console": ["warn"], // Warn about console.log usage
            "react/no-direct-mutation-state": "error", // Prevent direct state mutations
            "consistent-return": "error", // Require consistent returns in functions
            "react/no-unused-prop-types": "error", // Ensure all PropTypes are used
            "no-duplicate-imports": "error", // Prevent duplicate imports
            complexity: ["warn", 20], // Warn if a function is too complex
            "no-empty": "error", // Prevent empty block statements
            curly: ["error", "all"], // Always require curly braces
            "object-shorthand": ["error", "always"], // Enforce shorthand for objects
        },
    },

    // Prettier Integration
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            "prettier/prettier": [
                "error", // Mark Prettier issues as errors
                {
                    singleQuote: false,
                    trailingComma: "all",
                    printWidth: 80,
                    tabWidth: 4,
                    useTabs: false,
                },
            ],
        },
    },
];

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config({
    extends: [
        js.configs.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.strictTypeChecked,
    ],
    languageOptions: {
        parserOptions: {
            sourceType: "module",
        },
        globals: {
            ...globals.node,
            ...globals.es2021,
        },
    },
    rules: {
        // Your custom rules here
    },
});

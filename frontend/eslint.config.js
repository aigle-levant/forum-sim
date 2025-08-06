import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import globals from "globals";

export default tseslint.config({
    extends: [
        js.configs.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.strictTypeChecked,
    ],
    plugins: {
        react,
    },
    languageOptions: {
        parserOptions: {
            sourceType: "module",
            ecmaFeatures: { jsx: true },
        },
        globals: {
            ...globals.browser,
            ...globals.es2021,
        },
    },
    rules: {
        "react/react-in-jsx-scope": "off", // not needed with new JSX transform
    },
});

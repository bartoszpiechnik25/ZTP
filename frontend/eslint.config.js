import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintPluginUnicorn.configs.all],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Disable the unicorn rules
      "unicorn/prevent-abbreviations": "off",
      // Disable unicorn/filename-case for specific file, force pascalCase for React components
      "unicorn/filename-case": ["error", { case: "pascalCase", ignore: ["index.tsx", "main.tsx", "^.+\.ts$"] }],
    },
  },
  eslintPluginPrettier,
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          printWidth: 120,
          trailingComma: "es5",
          tabWidth: 2,
          semi: true,
          singleQuote: false,
        },
      ],
    },
  }
);

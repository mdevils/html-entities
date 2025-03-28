import eslint from '@eslint/js';
import eslintConfigPrettier from "eslint-config-prettier/flat";
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintConfigPrettier,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-empty-interface": "error",
            "@typescript-eslint/no-non-null-assertion": "off",
            "no-irregular-whitespace": "off",
            "no-control-regex": "off",
            "no-duplicate-imports": ["error", {"includeExports": true}],
            "arrow-body-style": ["error", "as-needed"],
            "no-restricted-globals": ["error", "name", "toString", "pending"],
            "import/order": ["error", {
                "groups": ["builtin", "external", "internal", "sibling"],
                "pathGroupsExcludedImportTypes": ["parent", "sibling", "index"],
                "alphabetize": {
                    "order": "asc",
                    "caseInsensitive": true
                }
            }]
        }
    }
);

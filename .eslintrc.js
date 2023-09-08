/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["@typescript-eslint", "import", "jsx-a11y"],
  extends: ["next/core-web-vitals", "prettier"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": ["error"],

    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-constant-condition": ["error", { checkLoops: false }],
    "no-empty": ["error", { allowEmptyCatch: true }],
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": [
      "error",
      { fixToUnknown: false, ignoreRestArgs: true },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_.*$|^error$|^event$|^props$|^ref$",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",

    "import/no-anonymous-default-export": "warn",
    "import/no-named-as-default-member": "off",
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        groups: [
          "type",
          ["builtin", "external", "internal"],
          ["parent", "sibling", "index"],
          "object",
        ],
        "newlines-between": "ignore",
      },
    ],

    "react/jsx-tag-spacing": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/self-closing-comp": "error",

    "react-hooks/rules-of-hooks": "error",
  },
};

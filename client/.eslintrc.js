module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
  },
  rules: {
        indent: ["error", 4],
        semi: [2, "always"],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        "multiline-ternary": ["off"],
        quotes: ["error", "double",
        {
          allowTemplateLiterals: true,
          avoidEscape: true
        }]
  },
  plugins: ["react", "prettier"],
  extends: [
        "plugin:react/recommended",
        "standard",
      //   "plugin:prettier/recommended"
  ]
};

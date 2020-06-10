module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ["@nuxtjs", "plugin:nuxt/recommended"],
  // add your custom rules here
  rules: {
    indent: ["error", 4],
    "vue/html-indent": ["error", 4],
    "vue/script-indent": ["error", 4, {"baseIndent": 1}],
    "vue/no-v-html": "off",
    "no-console": "off",
    "semi": [2, "always"],
    "no-trailing-spaces": "off",
    "comma-dangle": ["error", "always-multiline"],
    "arrow-parens": ["error", "as-needed"],
  },
  "overrides": [
    {
      "files": ["*.vue"],
      "rules": {
        "indent": "off"
      }
    }
  ]
};

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "printWidth": "off",
    "vue/singleline-html-element-content-newline": ["off"],
    "vue/html-self-closing": ["off"],
    'vue/max-attributes-per-line': 'off',
    "max-len": ["error", 200]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};

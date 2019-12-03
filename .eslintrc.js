module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "@nuxtjs/eslint-config-typescript",
    "plugin:vue/essential"
  ],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    "vue/html-self-closing": [
      "error",
      {
        html: { normal: "never", void: "always" }
      }
    ],
    "vue/singleline-html-element-content-newline": 'off',
    'semi': 'off',
    'no-console': 'off',
    'no-trailing-spaces': 'off',
    'vue/html-indent': 'off',
    'space-before-function-paren': 'off',
    'comma-dangle': 'off',
    'standard/computed-property-even-spacing': 'off',
    'arrow-parens': 'off'
  }
}

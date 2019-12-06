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
    // "indent": 'off',
    // 'padded-blocks': 'off',
    // 'no-unused-expressions': 'off',
    // 'no-sequences': 'off',
    // 'curly': 'off',
    'no-var': 'off',
    // 'one-var': 'off',
    // 'quotes': 'off',
    // 'no-return-assign': 'off',
    // 'object-shorthand': 'off',
    'unicorn/prefer-exponentiation-operator': 'off',
    // 'brace-style': 'off',
    // 'operator-linebreak': 'off',
    // 'new-parens': 'off',
    // 'no-lonely-if':'off',
    // 'no-cond-assign':'off',
    // 'yoda':'off',
    // 'no-use-before-define':'off',
    // 'no-fallthrough':'off',
    // 'no-mixed-operators':'off',
    // 'camelcase':'off',
    // 'brace-style':'off',
    '@typescript-eslint/no-unused-vars':'off',
    // 'no-multi-spaces':'off',
    // 'standard/array-bracket-even-spacing':'off',
    // 'object-curly-spacing':'off',
    // 'eqeqeq':'off',
    // 'no-self-compare':'off',
    // 'no-unmodified-loop-condition':'off',
    // 'unicorn/error-message':'off',
    // 'no-labels':'off',
    // 'comma-spacing':'off',
    // 'no-unexpected-multiline':'off',
    // 'func-call-spacing':'off',
    // 'standard/no-callback-literal':'off',
    // 'unicorn/number-literal-case':'off',
    // 'no-undef':'off',
    // 'unicorn/prefer-includes':'off',
    // 'new-cap': 'off',
    // 'space-in-parens':'off',
    // 'no-array-constructor':'off',
    // 'no-new-func': 'off',
    // 'no-unused-vars': 'off'

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
    'arrow-parens': 'off',
  }
}

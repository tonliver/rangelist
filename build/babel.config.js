module.exports = {
  presets: [
    ["env", {
      targets: {
        node: "current"
      },
    }],
  ],
  plugins: [
    "@babel/plugin-proposal-object-rest-spread",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "transform-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    ["@babel/plugin-transform-runtime"],
    ["@babel/plugin-transform-modules-commonjs"],
    ["module-resolver", {
      root: ["./dist"],
      alias: {
        "@": "./dist/src",
        "@base": "./dist/src"
      },
      extensions: [".js", ".json"]
    }]
  ]
};

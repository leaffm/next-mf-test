const {
  withModuleFederation,
  MergeRuntime,
} = require("@module-federation/nextjs-mf");
const path = require("path");
// const deps = Object.assign({},require("./package.json").dependencies);
// console.log(deps);

module.exports = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en", "es"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en",
  },
  webpack: (config, options) => {
    const { isServer } = options;
    const mfConf = {
      name: "test",
      library: { type: config.output.libraryTarget, name: "test" },
      filename: "static/runtime/remoteEntry.js",
      remotes: {},
      exposes: {},
      shared: [],
    };

    // Configures ModuleFederation and other Webpack properties
    withModuleFederation(config, options, mfConf);

    config.plugins.push(new MergeRuntime());

    if (!isServer) {
      config.output.publicPath = "http://localhost:3001/_next/";
    }

    return config;
  },
};
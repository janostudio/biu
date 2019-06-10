import commonjs from "rollup-plugin-commonjs";
import uglify from "rollup-plugin-uglify";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import license from "rollup-plugin-license";
import replace from "rollup-plugin-replace";

const commitHash = require("child_process")
  .execSync("git rev-parse --short HEAD", { encoding: "utf-8" })
  .trim();

const bundleConfig = {
  input: "src/index.ts",
  output: {
    format: "umd",
    name: "Biu",
    sourcemap: false
  },
  context: "window",
  plugins: [
    replace({
      "process.env.NODE_ENV": '"production"'
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    typescript({
      tsconfig: "tsconfig.json",
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
          paths: {
            // '@sentry/utils/*': ['../utils/src/*']
          }
        }
      },
      include: ["*.ts+(|x)", "**/*.ts+(|x)", "../**/*.ts+(|x)"]
    }),
    commonjs(),
    license({
      sourcemap: true,
      banner: `/*! @biu <%= pkg.version %> (${commitHash}) | https://github.com/janostudio/biu.git */`
    })
  ]
};

export default [
  Object.assign({}, bundleConfig, {
    output: Object.assign({}, bundleConfig.output, {
      file: `dist/index.min.js`
    }),
    // Uglify has to be at the end of compilation, BUT before the license banner
    plugins: bundleConfig.plugins
      .slice(0, -1)
      .concat(uglify())
      .concat(bundleConfig.plugins.slice(-1))
  })
  // Object.assign({}, bundleConfig, {
  //   output: Object.assign({}, bundleConfig.output, {
  //     file: `dist/biu-v${config.version}.min.js`
  //   }),
  //   // Uglify has to be at the end of compilation, BUT before the license banner
  //   plugins: bundleConfig.plugins
  //     .slice(0, -1)
  //     .concat(uglify())
  //     .concat(bundleConfig.plugins.slice(-1))
  // })
];

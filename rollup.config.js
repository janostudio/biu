import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import serve from "rollup-plugin-serve"; //serve服务;
import livereload from "rollup-plugin-livereload";
import replace from "rollup-plugin-replace";

export default [
  {
    input: "example/example.ts",
    output: {
      file: "example/index.js",
      format: "umd",
      name: "Biu",
      sourcemap: true
    },
    context: "window",
    // external: ['tslib'],
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
            rootDir: "src"
          }
        }
      }),
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs(),
      // globals(),
      serve({
        contentBase: "example/", //启动文件夹;
        host: "localhost", //设置服务器;
        port: 9001 //端口号;
      }),
      livereload({
        watch: "example/" //监听文件夹;
      })
    ]
  }
];

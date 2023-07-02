const packages = require("./package.json");
const rollupPurge = require("./scripts/rollup-purge");
const babel = require("@rollup/plugin-babel");
const typescript = require("@rollup/plugin-typescript");
const postcss = require("rollup-plugin-postcss");
const { default: terser } = require("@rollup/plugin-terser");
const { default: resolve } = require("@rollup/plugin-node-resolve");

const envSetting = { modules: false };
const runtimeSetting = { runtime: "automatic" };

module.exports = {
    input: 'src/index.ts',
    output: {
        file: packages.main,
        format: 'esm',
        sourcemap: true
    },
    plugins: [
        rollupPurge({ targets: ["./dist/"] }),
        resolve(),
        babel({
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            babelHelpers: "runtime",
            plugins: [
                ['@babel/plugin-transform-react-jsx', runtimeSetting],
                "@babel/plugin-transform-runtime"
            ],
            presets: [
                ["@babel/preset-env", envSetting],
                ["@babel/preset-react", runtimeSetting],
                "@babel/preset-typescript",
            ],
        }),
        terser({
            format: { comments: false },
            compress: { passes: 2 }
        }),
        typescript({ outputToFilesystem: true }),
        postcss({
            extract: true,
            modules: true,
            inject: true,
            minimize: true,
            use: ["sass"]
        })
    ],
    external: [...Object.keys(packages.dependencies), '@babel/runtime', 'react/jsx-runtime', 'react', 'react-dom']
};

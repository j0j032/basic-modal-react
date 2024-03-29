import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import external from 'rollup-plugin-peer-deps-external';
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from 'rollup-plugin-postcss'


export default [
	{
		input: "src/index.ts",
		output: [
			{
				file: 'dist/cjs/index.js',
				format: "cjs",
				sourcemap: true,
			},
			{
				file: 'dist/esm/index.js',
				format: "esm",
				sourcemap: true,
			},
		],
		plugins: [
			resolve(),
			commonjs(),
			typescript({
				tsconfig: "./tsconfig.json",
				exclude: ["**/*.test.tsx","**/*jest.config.js", "**/*jest.setup.ts"]}),
			external({
				includeDependencies: true,
			}),
			postcss()
		],
	},
	{
		input: "dist/esm/types/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "esm" }],
		plugins: [dts()],
		external: [/\.css$/]
	},
];

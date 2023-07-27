import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default {
  input: "popup-src.js",
  output: {
    file: "popup.js",
    format: "iife", // IIFE format is used for scripts that are included in an HTML page.
    name: "bundle",
  },
  plugins: [resolve(), commonjs(), terser()],
};

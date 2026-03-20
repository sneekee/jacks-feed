import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import sass from "sass-embedded";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === 'production';  
  const publicPath = isProduction ? `/jacks-feed/` : '/';

  return {
    entry: "./src/scripts/index.js",

    output: {
      path: path.resolve("dist"),
      filename: isProduction ? "bundle.[contenthash].js" : "bundle.js",
      clean: true,
      publicPath: publicPath 
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          resourceQuery: /inline/,
          type: 'asset/source',
          use: [
            {
              loader: 'sass-loader',
              options: {
                implementation: sass,
                additionalData: `@use 'src/styles/variables' as *;`
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          resourceQuery: { not: [/inline/] },
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: { implementation: sass }
            }
          ]
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: {
          removeComments: false
        }
      }),
      ...(isProduction ? [new MiniCssExtractPlugin({ filename: "styles.[contenthash].css" })] : [])
    ],

    resolve: {
      extensions: [".js"],
      alias: {
        '~styles': path.resolve(__dirname, 'src/styles')
      }
    },

    devServer: {
      static: {
        directory: path.resolve(process.cwd(), 'src'),
        watch: true
      },
      hot: true,
      open: true,
      client: { overlay: false }
    },
  }
};
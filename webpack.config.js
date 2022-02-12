import Dotenv from "dotenv-webpack";
import { webpack } from "webpack";

export const plugins = {
   plugins: [
      new Dotenv({
         path: ".env",
      }),
      new webpack.DefinePlugin({
         "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
         "process.env.REACT_APP_API_ENDPOINT": JSON.stringify(process.env.REACT_APP_API_ENDPOINT),
      }),
   ],
};

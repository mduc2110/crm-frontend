import Dotenv from "dotenv-webpack";

export const plugins = {
   plugins: [
      new Dotenv({
         path: ".env",
      }),
   ],
};

// require("dotenv").config({ path: "./env" });

import { app } from "./app.js";
import connectDb from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("db connection failed", err);
  });

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`);
//     app.on((error) => {
//       console.error("errror", error);
//       throw error;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log("app is running on part" + process.env.PORT);
//     });
//   } catch (error) {
//     console.log("db connect error", error);
//   }
// })();

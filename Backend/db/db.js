import mongoose from "mongoose";

function connectToDb() {
  mongoose
    .connect(
      process.env.DB_CONNECT
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    )
    .then(() => console.log("Connected to dataBase"))
    .catch((err) => console.log("Error connecting to DB: " + err));
}

export default connectToDb;

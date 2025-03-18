import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://Electromart:electromart123@cluster0.tni7x.mongodb.net/Electro-mart"
    )
    .then(() => console.log("DB Connected"));
};

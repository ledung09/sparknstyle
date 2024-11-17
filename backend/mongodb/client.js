import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const uri = process.env.MONGODB_URI;
const mongodb = new MongoClient(uri);

const database = mongodb.db("core");
export const mongodbProduct = database.collection("product");


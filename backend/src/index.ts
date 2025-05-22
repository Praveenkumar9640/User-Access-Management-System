import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";  
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);  


const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres", 
  password: "1234",      
  database: "user_access_db",  
  entities: ["src/entities/*.ts"],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Data Source initialized");
    app.listen(5000, () => {
      console.log("🚀 Server running on http://localhost:5000");
    });
  })
  .catch((error) => console.error("❌ DB Init Error:", error));

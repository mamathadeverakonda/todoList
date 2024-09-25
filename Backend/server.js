const express = require("express");
const {open} = require("sqlite");

const path = require("path");
const sqlite3 = require("sqlite3");
const cors  = require("cors");

let db;

const app = express();
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT || 5001;

const initializeDBAndServer = async () => {
    try {
      db = await open({
        filename: path.join(__dirname,"todo.db"),
        driver: sqlite3.Database,
      });
      app.listen(PORT, () => {
        console.log(`Server Running at http://localhost:${PORT}/`);
      });
    } catch (e) {
      console.log(`DB Error: ${e.message}`);
      process.exit(1);
    }
  };
  initializeDBAndServer();


  app.post("/api/todos",async(req,res) => {

  })

  app.get("/api/todos",async(req,res) =>{

  })

  app.get("/api/todos",async(req,res) => {
    
  })
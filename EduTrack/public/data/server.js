import express from "express";
import cors from "cors";
import db from "./db.json" with { type: "json" };
import { writeFile } from "node:fs/promises";
import os from "node:os";
import fs from "fs";

const app = express();
const PORT = 3001;
const ipAdd = `10.24.116.139`;
const dbPath = "./db.json";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/attendance", async (req, res) => {
  const { uid, name, role, subject } = req.body;

  const user = db.find((user) => user.uid === uid);
  if (user) {
    return res.status(400).json({
      message: "Attendace taken Already",
    });
  }

  const timestamp = new Date().toISOString();
  const entry = { uid, name, role, subject, timestamp };

  db.push(entry);
  await writeFile("./db.json", JSON.stringify(db, null, 2));

  console.log("📥 Attendance received:");
  console.log(entry);

  res.send({ status: "Attendance saved successfully" });
});

app.get('/students', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath));
  res.json(data);
});

app.listen(PORT, () => {
  const { "Wi-Fi": wifi } = os.networkInterfaces();
  console.log(`📡 Server running on http://${ipAdd}:${PORT}`);
});
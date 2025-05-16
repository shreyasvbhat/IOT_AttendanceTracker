import express from "express";
import cors from "cors";
import db from "../data/db";
import { writeFile } from "node:fs/promises";
import os from "node:os";

const app = express();
const PORT = 3001;

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
  await writeFile("./db.js", JSON.stringify(db, null, 2));

  console.log("📥 Attendance received:");
  console.log(entry);

  res.send({ status: "Attendance saved successfully" });
});

app.listen(PORT, () => {
  const { "Wi-Fi": wifi } = os.networkInterfaces();
  console.log(`📡 Server running on http://${wifi[1].address}:${PORT}`);
});
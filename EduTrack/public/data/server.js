// import express from "express";
// import cors from "cors";
// import db from "./db.json" with { type: "json" };
// import { writeFile } from "node:fs/promises";
// import os from "node:os";
// import fs from "fs";

// const app = express();
// const PORT = 5959;
// const ipAdd = `192.168.96.104`;
// const dbPath = "./db.json";

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// app.post("/api/attendance", async (req, res) => {
//   const { uid, name, role, subject } = req.body;

//   const user = db.find((user) => user.uid === uid);
//   if (user) {
//     return res.status(400).json({
//       message: "Attendace taken Already",
//     });
//   }

//   const timestamp = new Date().toISOString();
//   const entry = { uid, name, role, subject, timestamp };

//   db.push(entry);
//   await writeFile("./db.json", JSON.stringify(db, null, 2));

//   console.log("📥 Attendance received:");
//   console.log(entry);

//   res.send({ status: "Attendance saved successfully" });
// });

// app.get('/students', (req, res) => {
//   const data = JSON.parse(fs.readFileSync(dbPath));
//   res.json(data);
// });

// app.listen(PORT, () => {
//   const { "Wi-Fi": wifi } = os.networkInterfaces();
//   console.log(`📡 Server running on http://${ipAdd}:${PORT}`);
// });

// // app.listen(PORT, "0.0.0.0", () => {
// //   console.log(` is running on http://${os.networkInterfaces()["Wi-Fi"][1].address}:${PORT}`
// //   );
// // });

import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
// import * as Jimp from "jimp";
import {Jimp} from "jimp";
import path from "path";
import { writeFile, readFile, readdir, unlink, mkdir } from "node:fs/promises";
import { fileURLToPath } from "url";

// Setup __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5959;
const ipAdd = "192.168.96.104";
const dbPath = path.join(__dirname, "db.json");

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

// === Attendance Routes ===

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/attendance", async (req, res) => {
  const { uid, name, role, subject } = req.body;

  let db = [];
  try {
    const data = await readFile(dbPath, "utf-8");
    db = JSON.parse(data);
  } catch {
    // db.json doesn't exist yet
    db = [];
  }

  const user = db.find((user) => user.uid === uid);
  if (user) {
    return res.status(400).json({ message: "Attendance taken already" });
  }

  const timestamp = new Date().toISOString();
  const entry = { uid, name, role, subject, timestamp };
  db.push(entry);

  await writeFile(dbPath, JSON.stringify(db, null, 2));
  console.log("📥 Attendance received:");
  console.log(entry);

  res.send({ status: "Attendance saved successfully" });
});

app.get("/students", async (req, res) => {
  try {
    const data = await readFile(dbPath, "utf-8");
    const parsed = JSON.parse(data);
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: "Could not read student data." });
  }
});

// === Image Recognition Logic ===
const imageHashes = {};

// Helper: generate hash from image
async function getImageHash(imagePath) {
  try {
    const image = await Jimp.read(imagePath);
    image.resize(8, 8).grayscale();

    let hash = "";
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      const pixel = image.bitmap.data[idx];
      hash += pixel > 128 ? "1" : "0";
    });

    return hash;
  } catch (err) {
    console.error("Error processing image:", err);
    return null;
  }
}

// Helper: compare two hashes
function compareHashes(hash1, hash2) {
  let match = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] === hash2[i]) match++;
  }
  return match / hash1.length;
}

// Load sample hashes
async function loadSamples() {
  const samplesDir = path.join(__dirname, "samples");

  try {
    const people = await readdir(samplesDir);
    for (const person of people) {
      const personDir = path.join(samplesDir, person);
      const images = await readdir(personDir);

      for (const img of images) {
        const imgPath = path.join(personDir, img);
        const hash = await getImageHash(imgPath);

        if (hash) {
          if (!imageHashes[person]) imageHashes[person] = [];
          imageHashes[person].push(hash);
          console.log(`Loaded ${person}'s image: ${img}`);
        }
      }
    }
    console.log("✅ Sample images loaded!");
  } catch (err) {
    console.error("⚠️ Failed to load sample images:", err);
  }
}

// Image recognition route
app.post("/recognize", async (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  const tempPath = path.join(__dirname, "temp.jpg");

  try {
    await req.files.image.mv(tempPath);
    const uploadedHash = await getImageHash(tempPath);

    if (!uploadedHash) {
      await unlink(tempPath);
      return res.status(400).json({ error: "Error processing image" });
    }

    let bestMatch = { name: "unknown", score: 0 };

    for (const [person, hashes] of Object.entries(imageHashes)) {
      for (const hash of hashes) {
        const score = compareHashes(uploadedHash, hash);
        if (score > bestMatch.score) {
          bestMatch = { name: person, score };
        }
      }
    }

    await unlink(tempPath);

    if (bestMatch.name !== "unknown") {
      const personDir = path.join(__dirname, "samples", bestMatch.name);
      try {
        await mkdir(personDir, { recursive: true });
      } catch {}
      const timestamp = Date.now();
      const ext = path.extname(req.files.image.name) || ".jpg";
      const destPath = path.join(personDir, `predicted_${timestamp}${ext}`);
      await req.files.image.mv(destPath);
    }

    res.json({
      match: bestMatch.name,
      confidence: bestMatch.score.toFixed(4),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server after loading samples
loadSamples().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://${ipAdd}:${PORT}`);
  });
});

import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
  if (req.query.search === "All") {
    const read = fs.createReadStream("./file/tweetdb");

    read.on("error", (err) => {
      console.error(err);
      res.status(500).send("Interval Server Error");
    })
    read.pipe(res);
  } else {
    res.status(400).send("Bad Request");
  }
});

export default router;

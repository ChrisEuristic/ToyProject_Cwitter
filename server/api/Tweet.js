import express from "express";
import fs from "fs/promises";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  let nickname = null;

  try {
    const data = await fs.readFile("./file/usersdb", "utf8");

    const userTable = data
      .split("\n")
      .filter((user) => user !== "")
      .map((user) => user.split(":"));

    console.log("userTable >> ", userTable);
    userTable.forEach((user) => {
      console.log("user >> ", user);
      console.log("req.body.userID >> ", req.body.userID);
      if (user && user[0] == req.body.userID) {
        nickname = user[1].split("\r")[0];
      }
    });

    await fs.appendFile(
      "./file/tweetdb",
      `${req.body.userID}|$|%${nickname}|$|%${new Date()}|$|%${
        req.body.content
      }\n`
    );

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;

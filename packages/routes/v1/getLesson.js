const superGlobals = require("@recode/shared/globals");

const express = require("express");
const firebaseDb = require("../../src/firebase/firebaseDb");
const assert = require("assert");

const getLessonRouter = express.Router();

getLessonRouter.get("/lesson/:lessonLink", async (req, res, err) => {

  const lessonLink = req.params.lessonLink;
  assert(lessonLink, "Lesson Link not provided");

  const ref = firebaseDb.collection("lessons").doc(lessonLink);

  const doc = await ref.get();

  if(!doc.exists){
    res.status(404);
    res.send("Lesson not found");
    res.end();
  }

  res.json(doc.data());
})

module.exports = getLessonRouter;

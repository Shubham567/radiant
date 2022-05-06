const superGlobals = require("@recode/shared/globals");

const express = require("express");
const generateLink = require("../../src/lib/generateLink");
const assert = require("assert");
const firebaseDb = require("../../src/firebase/firebaseDb");
const storageBucket = require("../../src/firebase/firebaseStorge");
const { v4: uuidv4 } = require('uuid');

const multer  = require('multer');
const path = require("path");
const {log} = require("debug");

const uploadPath = "uploads/";

const storage = multer.diskStorage({
  destination: uploadPath,
  filename: function (req, file, cb) {
    const uniqueSuffix = (req.headers["request-id"] || uuidv4())+path.extname(file.originalname);
    const generatedFilename = file.fieldname + '-' + uniqueSuffix;
    console.log(generatedFilename,file);
    cb(null, generatedFilename);
  }
});

const upload = multer({storage,});

const createLesson = express.Router();

createLesson.post("/createLesson",upload.single("media"), async (req, res, err) => {

  const {
    lessonName,
    description,
    codeRecording,
    sandpackClientOptions,
    duration
  } = req.body;


  assert(codeRecording, "codeRecording not provided");
  assert(typeof codeRecording === "string", "not a valid codeRecording");

  assert(duration, "Code recording duration not provided");

  const parsedCodeRecording = JSON.parse(codeRecording);

  assert(lessonName,"lessonName not provided");
  assert(sandpackClientOptions, "SandpackClientOptions not provided");


  assert(req.file,"File Not Added");


  try {

    storageBucket.upload(`${uploadPath}${req.file.filename}`,  async (err,file,apiResponse) => {
      if (err) {
        throw err;
      }

      // console.log(err,file,apiResponse);
      const fileUrls = await file.getSignedUrl({
        action: 'read',
        expires: '09-09-2210'
      })

      console.log(typeof duration);

      const [lessonLink, lessonId] = generateLink();
      console.log(lessonId,lessonLink);

      const lessonRef = firebaseDb.collection("lessons").doc(lessonLink);
      lessonRef.set({
        lessonId,
        lessonName,
        description,
        codeRecording: parsedCodeRecording,
        duration: parseInt(duration),
        sandpackClientOptions: JSON.parse(sandpackClientOptions),
        filename : fileUrls[0]
      }).then(() => {
        console.log("Successfully created Lesson");
        res.json({
            link: lessonLink
          }
        )});

    });
  }
  catch (e) {
    console.error(e);
    res.status(500);
    res.send(e.message);
  }


})

module.exports = createLesson;

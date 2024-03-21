const axios = require("axios");
const {langCodes}=require("../utils/constants")
const b64DecodeUnicode=require("../utils/base64Decode.js")

const createSubmission = async (req, res, next) => {
  try {
    
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: {
        base64_encoded: "true",
        wait: "true",
        fields: "*",
      },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.JUDGE_APIKEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },

      data: {
        language_id: langCodes[req.body.langueage],
        source_code: Buffer.from(req.body.code).toString("base64"),
        stdin: Buffer.from(req.body.stdIn).toString("base64"),
      },
    };
    const judge = await axios.request(options);
    // console.log(judge);
    res.status(201).send({
      data: b64DecodeUnicode(judge.data.stdout) 
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createSubmission,
};

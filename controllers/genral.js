const User = require("../models/user.js");
const Code = require("../models/code.js");
const axios = require("axios");
const client = require("../redis/index.js");
const { langCodes } = require("../utils/constants");
const b64DecodeUnicode = require("../utils/base64Decode.js");
require("dotenv").config();

const getCodes = async (req, res) => {
  try {
    const codesData = await Code.findAll();
    let fullUrl = req.protocol + '://' + req.get('host') ;
    if (codesData.length > 0) {
      const r = await Promise.all(
        codesData.map(async (c) => {
          const user = await axios.get(

            `${fullUrl}/genral//user/${c.dataValues.userId}`
          );
          const uName = user.data.data;

          return {
            ...c.dataValues,
            userId: uName,
          };
        })
      );
      res.status(200).json({ message: "Connection successful", data: r });
    } else {
      res.status(200).json({ message: "Connection failed", data: [] });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserName = async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        id: 
        params.id,
      },
    });
    if (userData.length > 0) {
      // console.log(userData[0].dataValues);
      await client.set(
        userData[0].dataValues.id.toString(),
        userData[0].dataValues.name
      );
      res
        .status(200)
        .json({ message: "Connection successful", data: userData[0] });
    } else {
      res.status(200).json({ message: "Connection failed", data: [] });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCodeById = async (req, res) => {
  try {
    const codesData = await Code.findAll({ where: { id: req.params.id } });

    if (codesData) {
      let fullUrl = req.protocol + '://' + req.get('host') ;
      const r = await Promise.all(
        codesData.map(async (c) => {
          const user = await axios.get(
            `${fullUrl}/genral//user/${c.dataValues.userId}`
          );
          const uName = user.data.data;

          return {
            ...c.dataValues,
            userId: uName,
          };
        })
      );
      res.status(200).json({ message: "Connection successful", data: r[0] });
    } else {
      res.status(200).json({ message: "Connection failed", data: [] });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const postCode = async (req, res) => {
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
    const checkData = await User.findAll({
      where: {
        name: req.body.username,
      },
    });
    // console.log(checkData.length);
    if (checkData.length > 0) {
      Code.create({
        lang: req.body.langueage,
        snippet: req.body.code,
        stdIn: req.body.stdIn,
        stdOut: b64DecodeUnicode(judge.data.stdout),
        userId: checkData[0].id,
        token: judge.data.token,
      }).then((r) => {
        res.status(201).json({ data: r });
      });
    } else {
      await User.create({
        name: req.body.username,
      }).then((u) => {
        Code.create({
          lang: req.body.langueage,
          snippet: req.body.code,
          stdIn: req.body.stdIn,
          userId: u.id,
          stdOut: b64DecodeUnicode(judge.data.stdout),
          token: judge.data.token,
        }).then((r) => {
          res.status(201).json({ data: r });
        });
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const checkCache = async (req, res, next) => {
  const id = req.params.id;
  try {
    const cacheResults = await client.get(id.toString());
    if (cacheResults) {
      res.send({
        fromCache: true,
        data: cacheResults,
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateCode = async (req, res) => {
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
    const u = await User.findAll({
      where: {
        name: req.body.username.toString(),
      },
    });
    const obj = await Code.findAll({ id: req.params.id });
    obj[0].lang = req.body.langueage;
    obj[0].snippet = req.body.code;
    obj[0].stdIn = req.body.stdIn;
    obj[0].stdOut = b64DecodeUnicode(judge.data.stdout);
    obj[0].userId = u[0].dataValues.id;
    obj[0].token = judge.data.token;
    obj[0].save().then((r) => {
      res.status(201).json({ data: r });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getCodes,
  postCode,
  getCodeById,
  getUserName,
  checkCache,
  updateCode,
};

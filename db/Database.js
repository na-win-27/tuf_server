const { Sequelize } = require('sequelize');
const fs=require('fs')
require('dotenv').config()



const sequelize=new Sequelize('defaultdb','avnadmin',process.env.AIVEN_KEY,{
    dialect:'mysql',
    host: "mysql-1cb6de1c-rsnavin1-c774.a.aivencloud.com",
    port: "19669",
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./db/ca.pem").toString(),
      },
})


const connectDB=async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
connectDB();
module.exports = sequelize;
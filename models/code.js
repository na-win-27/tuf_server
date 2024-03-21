const Sequelize =require('sequelize');
const sequelize=require("../db/Database.js");


const Code=sequelize.define('code',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    lang:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    snippet:{
        type:Sequelize.STRING(4000),
        allowNull:false,
    },
    stdIn:{
        type:Sequelize.STRING,
    },
    stdOut:{
        type:Sequelize.STRING,
        defaultValue:'Null'
    },
    token:{
        type:Sequelize.STRING,
    }
})


module.exports=Code;
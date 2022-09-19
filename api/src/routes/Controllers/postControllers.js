const axios = require("axios");
const { Dog, Temper } = require("../../db.js");

const postDog = async function(req,res){
    let dogData = req.body

    await Dog.create({...dogData})
    res.json(dogData);
}

module.exports = {postDog}
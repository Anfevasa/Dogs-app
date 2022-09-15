const axios = require("axios");
const db = require("../../db");
const { API_KEY } = process.env;

const prueba = (req, res) => {
  res.send("probando");
};

const getAllDogs = async (req, res) => {
  try {
    let apiData = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    apiData = apiData.data.map((dog)=>{
      return{
        ID : dog.id,
        nombre : dog.name,
        altura: dog.height.metric,
        peso: dog.weight.metric,
        vida: dog.life_span,
        img: dog.image.url
      }
    })
    res.send(apiData);
  } catch (e) {
    res.status(400).json({ API_err: e });
  }
};

const getDogByID = (req, res) => {
  const { id } = req.params;
  let dog = {};

  axios
    .get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then((r) => res.status(201).json(r.data))
    .catch((e) => res.status(400).json({ err: e }));

  //res.send(`apikey ${API_KEY}`)
};

module.exports = {
  prueba,
  getDogByID,
  getAllDogs
};

const axios = require("axios");
const { where } = require("sequelize");
const { Op } = require("sequelize");
const db = require("../../db");
const { API_KEY } = process.env;
const { Dog, Temper } = require("../../db.js");

const prueba = (req, res) => {
  res.send("probando");
};

const getAllDogs = async (req, res) => {
  let { name } = req.query;
  let apiData, dbData, formatDB;
  // Traigo datos de la api
  try {
    apiData = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    apiData = apiData.data.map((dog) => {
      return {
        ID: dog.id,
        nombre: dog.name,
        altura: dog.height.metric,
        peso: dog.weight.metric,
        vida: dog.life_span,
        img: dog.image.url,
        tempers: dog.temperament,
      };
    });
    // filtro si hay query
    if (name) {
      apiData = apiData.filter((dog) =>
        dog.nombre.toLowerCase().includes(name.toLowerCase())
      );
    }
    //res.send(apiData);
  } catch (e) {
    res.status(400).json({ API_err: e.message });
  }
  // Traigo datos de DB
  try {
    // Traigo datos de la DB si hay name
    if (name) {
      dbData = await Dog.findAll({
        where: { nombre: { [Op.substring]: name } },
        include: [
          {
            model: Temper,
            attributes: ["nombre"],
            through: { attributes: [] },
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
    } else {
      dbData = await Dog.findAll({
        include: [
          {
            model: Temper,
            attributes: ["nombre"],
            through: { attributes: [] },
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
    }
    // formateo
    formatDB = dbData.map((data) => {
      //hago el string que necesito para cada perro
      let formatTempers = data.tempers
        .map((temper) => temper.nombre)
        .join(", ");
      //retorno una copia del objeto, cambiándole la propiedad tempers
      return {
        ...data.dataValues,
        tempers: formatTempers,
      };
    });
  } catch (e) {
    res.status(400).json({ DB_err: e.message });
  }

  const allDogs = [...apiData, ...formatDB];
  allDogs.length
    ? res.json(allDogs)
    : res.status(404).json({ error: "Dog not found" });
};

const getDogByID = async (req, res) => {
  let { id } = req.params;
  let apiData, dbData, dog;

  if (isNaN(id)) {
    // Traigo datos de DB
    try {
      dog = await Dog.findAll({
        where: { ID: id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.send(dog);
    } catch (error) {
      res.status(400).json({ DB_err: error.message });
    }
  } else {
    // Traigo datos de la api
    try {
      apiData = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      if (id <= apiData.data.length) {
        id = Number(id);
        let dogData = apiData.data.find((dog) => dog.id == id);

        if (Object.keys(dogData).length) {
          dog = {
            ID: dogData.id,
            nombre: dogData.name,
            altura: dogData.height.metric,
            peso: dogData.weight.metric,
            vida: dogData.life_span,
            img: dogData.image.url,
          };
        }
        res.json(dog);
      } else res.status(400).json({ error: "invalid ID" });
    } catch (e) {
      res.status(400).json({ API_err: e.message });
    }
  }

  /*allDogs.length
    ? res.json(allDogs)
    : res.status(404).json({ error: "Dog not found" });

  //res.send(`apikey ${API_KEY}`)*/
};

const getTemperaments = async (req, res) => {
  let dbData;
  try {
    dbData = await Temper.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"]}}
    );
    res.json(dbData);
  } catch (e) {
    res.status(400).json({ DB_err: e.message });
  }
};

module.exports = {
  prueba,
  getDogByID,
  getAllDogs,
  getTemperaments,
};

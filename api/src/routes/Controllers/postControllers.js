const axios = require("axios");
const { Dog, Temper } = require("../../db.js");

const postDog = async function (req, res) {
  let { nombre, altura, peso, vida, img, tempers } = req.body;

  let newDog = await Dog.create({ nombre, altura, peso, vida, img });

  //   console.log("modelo", Dog.__proto__)
  //   console.log("entidad", newDog.__proto__)
  //   console.log(newDog.addTempers instanceof Function)
  await newDog.setTempers(tempers);

  const aux = await Dog.findOne({
    where: { nombre },
    include: [{ model: Temper }],
  });

  res.json(aux);
};

module.exports = { postDog };

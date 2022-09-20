const { Router } = require("express");
// Importar todos los routers;
const router = Router();
const {postDog} = require("./Controllers/postControllers")
const {
  prueba,
  getDogByID,
  getAllDogs,
  getTemperaments,
} = require("./Controllers/getControllers");

// Configurar los routers

//prueba
router.use("/prueba", prueba);

// GET
router.get("/dogs/:id", getDogByID);
router.get("/dogs", getAllDogs);

router.get("/temperaments", getTemperaments);

// POST
router.post("/dogs", postDog);

module.exports = router;

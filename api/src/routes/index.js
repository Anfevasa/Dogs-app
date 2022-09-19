const { Router } = require("express");
// Importar todos los routers;
const router = Router();
const {
  prueba,
  getDogByID,
  getAllDogs,
} = require("./Controllers/getControllers");

// Configurar los routers

//prueba
router.use("/prueba", prueba);

// GET
router.get("/dogs/:id", getDogByID);
router.get("/dogs", getAllDogs);

router.get("/temperaments", prueba);

// POST
router.post("/dogs", prueba);

module.exports = router;

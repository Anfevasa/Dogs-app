export var errorObj = {};

const nombreValidator = (str) => {
  if (!/^[A-Za-z\s]*$/.test(str)) return "Nombre solo puede contener letras";
  if (str.length > 20) return "Nombre demasiado largo";
  if (str.length === 0) return "Nombre no puede estar vacío";
  return false;
};
const minAlturaValidator = (str) => {
  if (str.length === 0) return "Altura mínima no puede estar vacío";
  if (!/\d/.test(str)) return "Altura solo puede contener números";
  let int = Number(str);
  if (int < 1 || int > 200) return "Altura mínima inválida";
  return false;
};
const maxAlturaValidator = (str) => {
  if (str.length === 0) return "Altura máxima no puede estar vacío";
  if (!/\d/.test(str)) return "Altura solo puede contener números";
  let int = Number(str);
  if (int < 1 || int > 200) return "Altura máxima inválida";
  if (document.getElementById("minAltura").value > int)
    return "Altura máxima no puede ser menor a altura mínima ";
  return false;
};
const minPesoValidator = (str) => {
  if (str.length === 0) return "Peso mínimo no puede estar vacío";
  if (!/\d/.test(str)) return "Peso solo puede contener números";
  let int = Number(str);
  if (int < 1 || int > 200) return "Peso mínimo inválida";
  return false;
};
const maxPesoValidator = (str) => {
  if (str.length === 0) return "Peso máximo no puede estar vacío";
  if (!/\d/.test(str)) return "Peso solo puede contener números";
  let int = Number(str);
  if (int < 1 || int > 200) return "Peso máximo inválida";
  if (document.getElementById("minPeso").value > int)
    return "Peso máximo no puede ser menor a peso mínimo ";
  return false;
};
const minVidaValidator = (str) => {
  if (str.length === 0) return "Vida mínima no puede estar vacío";
  if (!/\d/.test(str)) return "Vida solo puede contener números";
  let int = Number(str);
  if (int < 1 || int > 30) return "Vida mínima inválida";
  return false;
};
const maxVidaValidator = (str) => {
  if (str.length === 0) return "Vida máxima no puede estar vacío";
  if (!/\d/.test(str)) return "Vida solo puede contener números";
  let int = Number(str);
  if (int < 1 || int > 50) return "Vida máxima inválida";
  if (document.getElementById("minVida").value > int)
    return "Vida máxima no puede ser menor a vida mínima ";
  return false;
};
const imgValidator = (str) => {
  if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg|bmp)$/.test(str))
    return "URL inválida";
  return false;
};

export function validator(e) {
  // ---- nombre -----
  if (e.target.name == "nombre") {
    let error = nombreValidator(e.target.value);
    let errorLabel = document.getElementById("errorNombre");
    if (error) {
      errorLabel.innerHTML = error;
      errorObj[e.target.name] = error;
    } else {
        errorLabel.innerHTML = "";
        delete errorObj[e.target.name];
      }
  }
  // ---- altura -----
  if (e.target.name == "minAltura") {
    let error = minAlturaValidator(e.target.value);
    let errorLabel = document.getElementById("errorAltura");
    if (error) {
      errorLabel.innerHTML = error;
      errorObj[e.target.name] = error;
    } else {
      errorLabel.innerHTML = "";
      delete errorObj[e.target.name];
    }
  }
  if (e.target.name == "maxAltura") {
    let error = maxAlturaValidator(e.target.value);
    let errorLabel = document.getElementById("errorAltura");
    if (error) {
      errorLabel.innerHTML = error;
      errorObj[e.target.name] = error;
    } else {
      errorLabel.innerHTML = "";
      delete errorObj[e.target.name];
    }
  }
  // ---- peso -----
  if (e.target.name == "minPeso") {
    let error = minPesoValidator(e.target.value);
    let errorLabel = document.getElementById("errorPeso");
    if (error) {
      errorLabel.innerHTML = error;
      errorObj[e.target.name] = error;
    } else {
      errorLabel.innerHTML = "";
      delete errorObj[e.target.name];
    }
  }
  if (e.target.name == "maxPeso") {
    let error = maxPesoValidator(e.target.value);
    let errorLabel = document.getElementById("errorPeso");
    if (error) {
      errorLabel.innerHTML = error;
      errorObj[e.target.name] = error;
    } else {
      errorLabel.innerHTML = "";
      delete errorObj[e.target.name];
    }
  }
  // ---- vida -----
  if (e.target.name == "minVida") {
    let error = minVidaValidator(e.target.value);
    let errorLabel = document.getElementById("errorVida");
    if (error) {
      errorLabel.innerHTML = error;
      errorObj[e.target.name] = error;
    } else {
      errorLabel.innerHTML = "";
      delete errorObj[e.target.name];
    }
  }
  if (e.target.name == "maxVida") {
    let error = maxVidaValidator(e.target.value);
    let errorLabel = document.getElementById("errorVida");
    if (error) {
      errorLabel.innerHTML = error;
      errorObj[e.target.name] = error;
    } else {
      errorLabel.innerHTML = "";
      delete errorObj[e.target.name];
    }
  }
  // ---- IMG -----
  if (e.target.name == "img") {
    let error = imgValidator(e.target.value);
    let errorLabel = document.getElementById("errorImg");
    if (error) {
      errorLabel.innerHTML = error;
      errorObj[e.target.name] = error;
    } else {
      errorLabel.innerHTML = "";
      delete errorObj[e.target.name];
    }
  }

  return errorObj;
}

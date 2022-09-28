export function dataFiltered(array, filters) {
  
  let data = array;
  let pages = {};

  // ------------------------------- nombre --------------------------------------
  if(filters.nombre) data = data.filter(e=> (e.nombre.toLowerCase().includes(filters.nombre.toLowerCase())))

  // ------------------------------- filtros ------------------------------------- 
  // origen
  if(filters.filters[0]==="Existentes") data = data.filter(e=>!(isNaN(e.ID)))
  else if(filters.filters[0]==="Creados") data = data.filter(e=>(isNaN(e.ID)))
  

  // tempers
  if(filters.tempers.length){
    filters.tempers.forEach(temper => {
      data = data.filter(dog => (dog.tempers?dog.tempers.includes(temper.nombre):false))
    });
  }

  // ------------------------------ orden ----------------------------------------

  // ordeno por orden alfabético
  if (filters.order === "A-Z") {
    data.sort(function (a, b) {
      if (a.nombre > b.nombre) return 1;
      if (a.nombre < b.nombre) return -1;
      return 0;
    });
  } else {
    data.sort(function (a, b) {
      if (a.nombre > b.nombre) return -1;
      if (a.nombre < b.nombre) return 1;
      return 0;
    });
  }

  //ordeno por peso si hay 

  if (filters.peso){
    if(filters.peso === "asc") data.sort((a,b)=>a.peso.split("-")[0]-b.peso.split("-")[0]);
    if(filters.peso === "des") data.sort((a,b)=>b.peso.split("-")[0]-a.peso.split("-")[0]);
  }

  
 //paginado
  let j = 0;
  let i = 1;
  while (j < data.length) {
    pages[i] = [];
    while (pages[i].length < 8) {
      pages[i].push(data[j]);
      j++;
    }
    i++;
  }
  return pages;
}

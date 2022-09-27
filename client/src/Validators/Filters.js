export function dataFiltered(array, filters) {
  //console.log("empezando paginado y filtros")
  let data = array;
  let pages = {};

  // filtros 
  //data = data.filter((e)=> {}) 
  if(filters.filters[0]==="Existentes") data = data.filter(e=>!(isNaN(e.ID)))
  else if(filters.filters[0]==="Creados") data = data.filter(e=>(isNaN(e.ID)))
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

  //data ordenada alfabetica
  //{1:[dog,dog]
  // 2:[dog]}

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

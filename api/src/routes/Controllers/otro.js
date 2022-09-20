let inventario= [
    {
     categoria: "Celulares",
     nombre: "Iphone 13",
     precio: 1500   
    },
    {
      categoria: "Ropa",
     nombre: "Polo Puma",
     precio: 70  
    },
    {
      categoria: "Celulares",
     nombre: "Moto G9",
     precio: 700  
    },
    {
      categoria: "Ropa",
     nombre: "Pantalon Levis",
     precio: 100  
    },
    {
      categoria: "Celulares",
     nombre: "Xiaomi Redmi 5",
     precio: 1200  
    }
]
const miFunction1 = (arg1,arg2)=>{return arg1.filter((e)=>e.categoria == arg2)}
const miFunction2 = (arg1)=>{return [...arg1.map((e)=>`El articulo ${e.nombre} tiene un precio de ${e.precio}`)]}
const miFunction3 = (arg1)=>{return arg1.sort((a,b)=>a.precio-b.precio)}

console.log (miFunction1(inventario,"Ropa"))
console.log (miFunction2(inventario))
console.log (miFunction3(inventario))

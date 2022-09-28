export function dogClones(temper, allDogs) {
  if (temper.length > 0) {
    // console.log(temper)

    const rateDog = (dog) => {
      return dog.tempers
        ? dog.tempers
            .split(", ")
            .map((e) => (temper.find((el) => el.nombre == e) ? 1 : 0))
            .reduce((p, a) => p + a, 0)
        : 0;
    };

    let dogsScore = [];
    allDogs.forEach((dog) => {
      
      let coincidencia = rateDog(dog);
      //console.log(dog.tempers.split(", "))
      let dogToPerson = dog.tempers ? coincidencia/(dog.tempers.split(", ").length)* 100 :0 ;
      let PersonToDog = (coincidencia / temper.length) * 100 * 0.4 + 60;

      dogsScore.push([dog, Math.floor(dogToPerson), Math.floor(PersonToDog)]);
    });

    dogsScore.sort((a, b) => b[1] - a[1]);

    let bestDogs = dogsScore.slice(0, 3);

    return bestDogs;
  }
}

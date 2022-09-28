export function Puntuacion(likes, allDogs) {
  if (likes.length > 0) {
    //console.log(likes)
    let tempersScore = {};
    likes.forEach((like) => {
      like[0].tempers.split(", ").forEach((temper) => {
        tempersScore[temper] =
          tempersScore[temper] === undefined
            ? like[1]
            : tempersScore[temper] + like[1];
      });
    });
    //console.log(tempersScore)

    const rateDog = (dog) => {
      return dog.tempers? dog.tempers
        .split(", ")
        .map((e) => (tempersScore[e] ? tempersScore[e] : 0))
        .reduce((p, a) => p + a, 0)
        : 0;
    };
    //if(likes.length>0) console.log("rate",likes[0],rateDog(likes[0][0]))

    let dogsScore = [];
    allDogs.forEach((dog) => dogsScore.push([dog, rateDog(dog)]));

    // ordeno
    dogsScore.sort((a, b) => b[1] - a[1]);    
    //console.log(dogsScore);

    //retorno mejores 5
    let bestDogs = dogsScore.slice(0,3)
    //console.log(bestDogs);

    return bestDogs.map((e)=>e[0])
  }
}

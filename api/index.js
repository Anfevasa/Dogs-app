//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temper } = require("./src/db.js");

function tempersToDB() {
  let i = 1;
  let apiData;
  axios
    .get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then((r) => {
      apiData = r.data;
      let apiTempers = [];
      apiData.forEach((dog) => {
        if (dog.temperament) {
          dog.temperament.split(", ").forEach((temper) => {
            if (apiTempers.indexOf(temper) == -1) apiTempers.push(temper);
          });
        }
      });
      let tempersbulk = apiTempers.map((e) => {
        return { ID: i++, nombre: e };
      });
      Temper.bulkCreate(tempersbulk);
    });
}

// Syncing all the models at once.
conn.sync({ force: true, alter: false }).then(async () => {
  tempersToDB();
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});

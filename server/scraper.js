const mysql = require('mysql');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
var fs = require('fs');
require('events').EventEmitter.defaultMaxListeners = 300

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'dataviz'
});



/*
  GET INFO FROM API IN FILE
*/
// let apiKey = "1TkBqKBXQDWxL5042uRAh0y1iCTKV40_nWoJD-VE_A2GP-Jlp_k";
// for (let i = 1; i < 4; i++) {
//   fetch(`https://api.pandascore.co//lol/champions?page=${i}&token=${apiKey}`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data) // Prints result from `response.json()` in getRequest
//       fs.appendFileSync(`./data/championApi.json`, JSON.stringify(data));
//     })
//     .catch(error => console.error(error))
// }

/*
  WRITE IMG INFO FROM API IN FILE
*/
// let apiInfo = require("./data/championApi.json");
// apiInfo.forEach(champion => {
//   let name = champion.name;
//   let img = champion.big_image_url;
//   let icon = champion.image_url;
//   let championImg = [
//     {
//       name: name,
//       img: img,
//       icon: icon
//     }
//   ];
//   fs.appendFileSync(`./data/championImg.json`, JSON.stringify(championImg));
// });

/*
  UPDATE DATABASE WITH IMG INFO
*/
// let champions = require("./data/championImg.json");
// champions.forEach(champion => {
//   const query = `UPDATE champion SET image="${champion.img}", icon="${champion.icon}" WHERE name="${champion.name}"`
//   connection.query(query, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   })
// });

/*
  SCRAPPING DAMAGE, QUOTATION, TOUGHNESS, CONTROL, MOBILITY AND UTILITY AND PUT IT IN CHAMPION DETAILS FILE
*/
// champions.forEach((champion) => {
//   (async function main() {
//     try {
//       const browser = await puppeteer.launch({ headless: false });
//       const [page] = await browser.pages();
//       let championUrl = champion == "Nunu & Willump" ? "Nunu" : champion.replace(" ", "_")

//       await page.goto(`https://leagueoflegends.fandom.com/wiki/Template:Data_${championUrl}`);

//       let title = await page.evaluate(() => Array.from(document.querySelectorAll('table.article-table.grid > tbody > tr > td[data-name="title"]'), element => element.textContent));
//       let damage = await page.evaluate(() => Array.from(document.querySelectorAll('table.article-table.grid > tbody > tr > td[data-name="damage"]'), element => element.textContent));
//       let toughness = await page.evaluate(() => Array.from(document.querySelectorAll('table.article-table.grid > tbody > tr > td[data-name="toughness"]'), element => element.textContent));
//       let control = await page.evaluate(() => Array.from(document.querySelectorAll('table.article-table.grid > tbody > tr > td[data-name="control"]'), element => element.textContent));
//       let mobility = await page.evaluate(() => Array.from(document.querySelectorAll('table.article-table.grid > tbody > tr > td[data-name="mobility"]'), element => element.textContent));
//       let utility = await page.evaluate(() => Array.from(document.querySelectorAll('table.article-table.grid > tbody > tr > td[data-name="utility"]'), element => element.textContent));
//       let championDetails = [
//         {
//           name: champion,
//           title: title,
//           skills: [
//             {
//               name: "damage",
//               value: damage
//             },
//             {
//               name: "toughness",
//               value: toughness
//             },
//             {
//               name: "control",
//               value: control
//             },
//             {
//               name: "mobility",
//               value: mobility
//             },
//             {
//               name: "utility",
//               value: utility
//             }
//           ]
//         }
//       ]

//       await browser.close();
//       //console.log(championDetails);
//       fs.appendFileSync(`./data/championDetails.json`, JSON.stringify(championDetails))
//     } catch (err) {
//       console.error(err);
//     }
//   })();
// });

/*
  UPDATE DB WITH INFO FROM CHAMPIONDETAIL.JSON
*/
// connect to database
// connection.connect();
// let champions = require("./data/championDetails.json");

// champions.forEach(champion => {
//   const query = `UPDATE champion SET quotation="${champion.title}", damage=${champion.skills.damage}, toughness=${champion.skills.toughness}, control=${champion.skills.control}, speed=${champion.skills.mobility}, utility=${champion.skills.utility} WHERE name="${champion.name}"`
//   connection.query(query, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   })
// });

/*
  INSERT ROLES IN DB
*/
// let roles = [
//   "Fighter",
//   "Slayer",
//   "Mage",
//   "Tank",
//   "Marksman",
//   "Controller"
// ];
// roles.forEach(role => {
//   const query = `INSERT INTO role (name) VALUES("${role}");`
//   connection.query(query, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   })
// });

/*
  INSERT POSTE IN DB
*/
// let postes = [
//   "Middle",
//   "Top",
//   "Jungle",
//   "Support",
//   "Bottom"
// ];
// postes.forEach(poste => {
//   const query = `INSERT INTO poste (name) VALUES("${poste}");`
//   connection.query(query, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   })
// });

/*
  GET OCCUPATION RATE PER POSTE PER CHAMPION
*/
/**
let champions = require("./data/champions.json");
champions.forEach(champion => {
  let championUrl = champion == "nunu & willump" ? "nunu" : champion.replace(/[.' ]/g, '');
  (async function main() {
    try {
      const browser = await puppeteer.launch({ headless: false });
      const [page] = await browser.pages();
      await page.goto(`https://www.op.gg/champion/${championUrl}/statistics/bot`);

      let poste = await page.evaluate(() => Array.from(document.querySelectorAll('span.champion-stats-header__position__role'), element => element.textContent));
      let value = await page.evaluate(() => Array.from(document.querySelectorAll('span.champion-stats-header__position__rate'), element => element.textContent));

      console.log(poste);
      console.log(value);

      await browser.close();



      // let occupationRate = [
        //   {
          //     name: champion,
          //     occupation:
          //       [
            //         {
              //           name: "Top",
              //           value: 0
              //         },
              //         {
                //           name: "Middle",
                //           value: 0
                //         },
                //         {
                  //           name: "Support",
      //           value: 0
      //         },
      //         {
        //           name: "Jungle",
      //           value: 0
      //         },
      //         {
        //           name: "Bottom",
        //           value: 0
        //         }
        //       ]
        //   }
        // ]
      } catch (err) {
        console.error(err);
      }
    })
  });
  */

// let champions = [];

// champions.forEach((champion) => {
//   (async function main() {
//     try {
//       const browser = await puppeteer.launch({ headless: false });
//       const [page] = await browser.pages();
//       let championUrl = champion == "nunu & willump" ? "nunu" : champion.replace(/[.' ]/g, '');

//       await page.goto(`https://www.op.gg/champion/${championUrl.toLowerCase()}/statistics/bot`);

//       let postes = await page.evaluate(() => Array.from(document.querySelectorAll('span.champion-stats-header__position__role'), element => element.textContent));
//       let values = await page.evaluate(() => Array.from(document.querySelectorAll('span.champion-stats-header__position__rate'), element => element.textContent));

//       let occupationRate =
//       {
//         name: champion,
//         occupation: []
//       }

//       postes.forEach((poste, i) => {
//         let attribute = {
//           name: poste,
//           value: values[i]
//         }
//         occupationRate.occupation.push(attribute)
//       })

//       await browser.close();
//       console.log(occupationRate);
//       fs.appendFileSync(`./data/occupationByChampion.json`, JSON.stringify(occupationRate))
//     } catch (err) {
//       console.error(err);
//     }
//   })();
// });

// let occupationByChampion = require("./data/occupationByChampion.json");
// occupationByChampion.forEach(place => {
//   place.occupation.forEach(occ => {
//     const query = `INSERT INTO place 
//     (id_champion, id_poste, rate) 
//     SELECT (
//       SELECT id FROM champion WHERE name = "${place.name}"
//     ), (
//       SELECT id FROM poste WHERE name = "${occ.name}"
//     ), 
//     "${occ.value.substring(0, occ.value.length - 1)}"
//     ;`
//     connection.query(query, (err, result) => {
//       if (err) throw err;
//       console.log(result);
//     })
//   });
// });

/* 
  SCRAP ROLE PER CHAMPION
*/
// async function main() {
//   try {
//     const browser = await puppeteer.launch({ headless: false });
//     const [page] = await browser.pages();

//     await page.goto(`https://leagueoflegends.fandom.com/wiki/List_of_champions`);

//     let names = await page.evaluate(() => Array.from(document.querySelectorAll('tbody > tr > td > span.inline-image.label-after.champion-icon.tooltips-init-complete'), element => element.getAttribute("data-champion")));
//     let roles = await page.evaluate(() => Array.from(document.querySelectorAll('tr > td:nth-child(2n) > span.glossary.tooltips-init-complete > a.image.image-thumbnail.link-internal > img'), element => element.getAttribute("data-image-name")));

//     await browser.close();
//     names.forEach((name, i) => {
//       let rolePerChampion = [
//         {
//           name: name,
//           role: roles[i].substring(0, roles[i].length - 9)
//         }
//       ];
//       fs.appendFileSync(`./data/rolePerChampion.json`, JSON.stringify(rolePerChampion))
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };
// main();

/* 
  UPDATEE CHAMPION WITH ID_ROLE
*/
// let rolePerChampion = require("./data/rolePerChampion.json");
// rolePerChampion.forEach(role => {
//   const query = `UPDATE champion 
//     SET id_role = (SELECT id FROM role WHERE role.name = "${role.role}")
//     WHERE champion.name = "${role.name}"
//     ;`
//   console.log(query);
//   connection.query(query, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   })
// });

let json = [
  {
    name: name,
    quotation: quotation,
    tier: tier,
    pick: pick,
    win: win,
    ban: ban,
    damage: damage,
    tankiness: tankiness,
    control: control,
    mobility: mobility,
    utility: utility,
    image: image,
    icon: icon,
    role: role,
    poste: {
      Top: 0,
      Middle: 0
    }
  }
]
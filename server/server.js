const express = require('express');
const mysql = require('mysql');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const port = 9000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'dataviz'
});

app.use(morgan('short'));
app.use(cors());

app.get('/', (req, res) => {
  console.log('Responding');
  res.send('server working')
});

app.get('/champions', (req, res) => {
  const query = `
      SELECT 
      champion.id, champion.name, champion.quotation, champion.rank, champion.win, champion.pick, champion.ban, champion.damage, champion.toughness, champion.utility, champion.speed, champion.control, champion.image, champion.icon, champion.id_role
      FROM
        champion
      `;
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(`Failed query for game : ${err}`);
      res.sendStatus(500);
      return;
    }
    let champions = rows;

    let data = champions.map(async (champion, i) => {
      let query = `
        SELECT
          * 
        FROM 
          role
        WHERE role.id=${champion.id_role}
      `;
      champions[i].role = await new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
          if (err) {
            console.log(`Failed query for game : ${err}`);
            res.sendStatus(500);
            reject(err);
            return;
          }

          let role = rows.map(row => row.name);
          resolve(role[0]);
        })
      })
      return champions[i];
    })

    Promise.all(data).then(data => {
      let champions = data.map(async (champion, i) => {
        let query = `
            SELECT
              *
            FROM
              place
            INNER JOIN poste ON poste.id = place.id_poste
            WHERE place.id_champion = ${champion.id}
        `;
        data[i].poste = await new Promise((resolve, reject) => {
          const renameKeys = (keysMap, obj) => {
            debugger;
            return Object
              .keys(obj)
              .reduce((acc, key) => {
                debugger;
                const renamedObject = {
                  [keysMap[key] || key]: obj[key]
                };
                debugger;
                return {
                  ...acc,
                  ...renamedObject
                }
              }, {});
          };
          connection.query(query, (err, rows, fields) => {
            if (err) {
              console.log(`Failed query for game : ${err}`);
              res.sendStatus(500);
              reject(err);
              return;
            }
            let poste = [];
            let skills = rows.map(row => {
              let obj = {
                name: row.name,
                value: row.rate
              };
              // key/value pairs of your old/new object keys
              let keysMap = {
                value: row.name
              };
              renameKeys(keysMap, obj);
              poste.push(obj);
            })
            resolve(poste);
          })
        })
        return data[i];
      })
      Promise.all(champions).then(champions => res.json(champions))
    })
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

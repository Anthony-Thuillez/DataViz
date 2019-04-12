import json from '../data.json';

const champion = json.map(json => (
        [json.id, json.name, json.poste, json.role]
    ))

const roleFilter = () => {

     champion.forEach(function (e) {
         switch (e[3]) {
             case "mage":
                 for (let index = 0; index < 1; index++) {
                     let mage = e[1];
                    //  console.log(mage, ":mage");
                 }
                 break;
             case "combattant":
                 for (let index = 0; index < 1; index++) {
                     let combattant = e[1];
                    //  console.log(combattant, ":combattant");
                 }
                 break;
             case "tank":
                 for (let index = 0; index < 1; index++) {
                     let tank = e[1];
                    //  console.log(tank, ":tank");
                 }
                 break;
             case "assassin":
                 for (let index = 0; index < 1; index++) {
                     let assassin = e[1];
                    //  console.log(assassin, ":assassin");
                 }
                 break;

             default:
                 break;
         }
     });
}

export default roleFilter
/** TESTED ✅
 * Functions purpose: Count the number of champion for a selected post
 * @param {Object[]} data(json) @param {String} post(props)
 * @return {Number} the total of champions found
*/
const findNbChampByPost = (data, post) => {
    let propertyCounter = 0
    for (let i = 0, l = data.length; i <l ; i++) {
        let propertyExist = data[i].poste.hasOwnProperty(post)
        if (propertyExist) {
            propertyCounter++
        }
    }

    return propertyCounter
}

/** TEST FAILED 🚫
 * Functions purpose : Get all champions for a specific post
 * @param {Object[]} data(json) @param {String} post(props)
 * @return {Object[]} champions found on [post] define
 */
const getChampByPost = (data, post) => {
    let champArr = []
    for (let i = 0, l = data.length; i <l ; i++) {
        let propertyExist = data[i].poste.hasOwnProperty(post)
        if (propertyExist) {
            champArr.push(data[i])
        }
    }
    
    return champArr
}

/** TESTED ✅
 * Functions purpose : Get the selected rate for all champions for a specific post
 * @param {Object[]} data(json) @param {String} rate(props) @param {String} post(props)
 * @return {String[]} all [rate] for a specific [post]
 */
const getSelectedRate = (data, rate, post) => {
    let rateArr = []
    let champions = getChampByPost(data, post)

    for (let i = 0, l = champions.length; i < l; i++) {
        let propertyExist = champions[i].hasOwnProperty(rate)

        if (propertyExist) {
            rateArr.push(champions[i][rate])
        }
    }
    
    return rateArr
}

/** TESTED ✅
 * Functions purpose: Order previous [rateArr] by rate & unstringify values
 * @param {Object[]} data(json) @param {String} rate(props) @param {String} post(props)
 * @return {Number[]} all [rate] for a specific [post] ordered
 */
const orderByRate = (data, rate, post) => {
    let listOfRates = getSelectedRate(data, rate, post)
    listOfRates = listOfRates.map(Number)
    for (let i = 0, l = listOfRates.length; i < l; i++) {
        // check if array values are false or NaN
        if (! listOfRates[i] || Number.isNaN(listOfRates[i])) {
            listOfRates.splice(i, 1)
        }
    }
    listOfRates.sort(function orderRates(a, b) {
        return b - a;
    })

    return listOfRates
}

/** TESTED ✅
 * Functions purpose: Calculate the median for a specific rate & post
 * @param {Object[]} data(json) @param {String} rate(props) @param {String} post(props)
 * @return {Number} the median for a specific [rate] & a specific [post]
 */
const medianRate = (data, rate, post) => {
    let array = orderByRate(data, rate, post)
    if (! array.length) return 0;

    array.sort(function (a, b) {
        return a - b;
    });

    var half = Math.floor(array.length / 2);

    if (array.length % 2)
        return array[half];
    
    return (array[half - 1] + array[half]) / 2.0;
}

/** TEST FAILED 🚫
 * Functions purpose : Get all champions for a specific role
 * @param {Object[]} data(json) @param {String} role(props)
 * @return {Object[]} champions found on [role] define
 */
const getChampByRole = (data, role) => {
    let champArr = []
    for (let i = 0, l = data.length; i < l; i++) {
        let propertyExist = data[i].hasOwnProperty("role")        
        if (propertyExist) {
            if (data[i].role === role) {
                champArr.push(data[i])
            }
        }
    }
    
    return champArr
}

/** TESTED ✅
 * Functions purpose : Get champion data for a specific name
 * @param {Object[]} data(json) @param {String} name(state)
 * @return {Object[]} champion data found on [name] define
 */

const getChampByName = (data, name) => {
    let champObj
    for (let i = 0; i < data.length; i++) {
        let propertyExist = data[i].hasOwnProperty("name")        
        if (propertyExist) {
            if (data[i].name === name) {
                champObj = {
                    name: data[i].name,
                    img: data[i].img,
                    pick: data[i].pick,
                    ban: data[i].ban,
                    win: data[i].win
                }
                
                return champObj
            }
        }
    }
}

module.exports = {
    findNbChampByPost,
    getChampByPost,
    getChampByRole,
    getSelectedRate,
    getChampByName,
    orderByRate,
    medianRate,
}

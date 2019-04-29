/** TESTED ✅
 * Functions purpose: Count the number of champion for a selected post
 * @param data(data.json) & @param post(props)
 * @return @type @Number
*/

const findNbChampByPost = (data, post) => {
    let propertyCounter = 0
    for (let i = 0; i < data.length; i++) {
        let propertyExist = data[i].poste.hasOwnProperty(post)
        if (propertyExist === true) {
            propertyCounter++
        }
    }

    return propertyCounter
}

/** TESTED ✅
 * Functions purpose : Get all champions for a specific post
 * @param data(data.json) & @param post(props)
 * @var champArr @return an array @type @Object of champions corresponding to the @param post
 */

const getChampByPost = (data, post) => {
    let champArr = []
    for (let i = 0; i < data.length; i++) {
        let propertyExist = data[i].poste.hasOwnProperty(post)
        if (propertyExist === true) {
            champArr.push(data[i])
        }
    }
    
    return champArr
}

/** TESTED ✅
 * Functions purpose : Get the selected rate for all champions for a specific post
 * @param data(data.json) & @param post(props)
 * @return @var rateArr  Array of @type @String selected rate 
 */

const getSelectedRate = (data, rate) => {
    let rateArr = []
    let champions = getChampByPost(data, "mid")

    for (let i = 0; i < champions.length; i++) {
        let propertyExist = champions[i].hasOwnProperty(rate)

        if (propertyExist === true) {
            rateArr.push(champions[i][rate])
        }
    }

    return rateArr
}

/** TESTED ✅
 * Functions purpose: Order previous @rateArr by rate & unstringify values
 * @param data(data.json) & @param post(props)
 * @return @var listOfRates Array of @type @Number ordered selected rate
 */

const orderByRate = (data, rate) => {
    let listOfRates = getSelectedRate(data, rate)
    listOfRates = listOfRates.map(Number)
    for (let i = 0; i < listOfRates.length; i++) {
        // check if array values are false or NaN
        if (listOfRates[i] === false || Number.isNaN(listOfRates[i])) {
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
 * @param data(data.json) & @param post(props)
 * @return the result of median calculation for a selected rate
 */

const medianRate = (data, rate) => {
    let array = orderByRate(data, rate)
    if (array.length === 0) return 0;

    array.sort(function (a, b) {
        return a - b;
    });

    var half = Math.floor(array.length / 2);

    if (array.length % 2)
        return array[half];
    console.log((array[half - 1] + array[half]) / 2.0);
    
    return (array[half - 1] + array[half]) / 2.0;
}

module.exports = {
    findNbChampByPost,
    getChampByPost,
    getSelectedRate,
    orderByRate,
    medianRate
}

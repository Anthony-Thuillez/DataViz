const getAllChampions = (data) => {
    return data.length
}

/**
 * Functions purpose : Sort By Pick Rate
 * @param data come from data.json
 * @param new_array @return an array of ordered pick rate
 * @param medianPickRate() @return the median of @param new_array
 */

const getPickRateAllChampions = (data) => {
    let pickArr = []
    let pickRate = data.map(e => ({
        pick: e.pick
    }))
    
    pickRate.forEach(function (element) {
        let pickVal = Object.values(element).pop()
        pickArr.push(pickVal)
    });
    return pickArr
}

const orderByPickRate = (data) => {
    let new_array = getPickRateAllChampions(data)
    new_array = new_array.map(Number)
    for (let i = 0; i < new_array.length; i++) {
        // check if array value is false or NaN
        if (new_array[i] === false || Number.isNaN(new_array[i])) {
             new_array.splice(i, 1)
        }
    }
    new_array.sort(function orderRates(a, b) {
        return b - a;
    })
    return new_array
}

const medianPickRate = (data) => {
    let array = orderByPickRate(data)
    if (array.length === 0) return 0;

    array.sort(function (a, b) {
        return a - b;
    });

    var half = Math.floor(array.length / 2);

    if (array.length % 2)
        return array[half];

    return (array[half - 1] + array[half]) / 2.0;
}

/**
 * Functions purpose : Sort By Win Rate
 * @param data come from data.json
 * @param new_array @return an array of ordered Win rate
 * @param medianWinRate() @return the median of @param new_array
 */

const getWinRateAllChampions = (data) => {
    let winArr = []
    let winRate = data.map(e => ({
        pick: e.win
    }))

    winRate.forEach(function (element) {
        let winVal = Object.values(element).pop()
        winArr.push(winVal)
    });
    return winArr
}

const orderByWinRate = (data) => {
    let new_array = getWinRateAllChampions(data)
    new_array = new_array.map(Number)
    for (let i = 0; i < new_array.length; i++) {
        // check if array value is false or NaN
        if (new_array[i] === false || Number.isNaN(new_array[i])) {
            new_array.splice(i, 1)
        }
    }
    new_array.sort(function orderRates(a, b) {
        return b - a;
    })
    return new_array
}

const medianWinRate = (data) => {
    let array = orderByWinRate(data)
    if (array.length === 0) return 0;

    array.sort(function (a, b) {
        return a - b;
    });

    var half = Math.floor(array.length / 2);

    if (array.length % 2)
        return array[half];

    return (array[half - 1] + array[half]) / 2.0;
}

/**
 * Functions purpose : Sort By Ban Rate
 * @param data come from data.json
 * @param new_array @return an array of ordered Ban rate
 * @param medianBanRate() @return the median of @param new_array
 */

const getBanRateAllChampions = (data) => {
     let banArr = []
     let banRate = data.map(e => ({
         pick: e.ban
     }))

     banRate.forEach(function (element) {
         let banVal = Object.values(element).pop()
         banArr.push(banVal)
     });
     return banArr
}

const orderByBanRate = (data) => {
     let new_array = getBanRateAllChampions(data)
     new_array = new_array.map(Number)
     for (let i = 0; i < new_array.length; i++) {
         // check if array value is false or NaN
         if (new_array[i] === false || Number.isNaN(new_array[i])) {
             new_array.splice(i, 1)
         }
     }
     new_array.sort(function orderRates(a, b) {
         return b - a;
     })
     return new_array
}

const medianBanRate = (data) => {
     let array = orderByBanRate(data)
     if (array.length === 0) return 0;

     array.sort(function (a, b) {
         return a - b;
     });

     var half = Math.floor(array.length / 2);

     if (array.length % 2)
         return array[half];

     return (array[half - 1] + array[half]) / 2.0;
}
module.exports = {
    getAllChampions,
    getPickRateAllChampions,
    orderByPickRate,
    medianPickRate,

    getWinRateAllChampions,
    orderByWinRate,
    medianWinRate,

    getBanRateAllChampions,
    orderByBanRate,
    medianBanRate
}

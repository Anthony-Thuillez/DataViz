const getAllChampions = (data_mooc) => {
    return data_mooc.length
}

const getpickRateAllChampions = (data_mooc) => {
    let pickArr = []
    let pickRate = data_mooc.map(e => ({
        pick: e.pick
    }))
    
    pickRate.forEach(function (element) {
        let pickVal = Object.values(element).pop()
        pickArr.push(pickVal)
    });
    return pickArr
}

const orderByPickRate = (data_mooc) => {
    let new_array = getpickRateAllChampions(data_mooc)
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

const median = (data_mooc) => {
    let array = orderByPickRate(data_mooc)
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
    getpickRateAllChampions,
    orderByPickRate,
    median
}

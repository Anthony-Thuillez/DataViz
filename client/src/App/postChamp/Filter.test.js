const filter = require('./Filter')
const json = require('../../data.json')

describe("Display the most played lane", function () {
    const array = [
        {
            "id": "0",
            "name": "Vel'koz",
            "rank": "S",
            "pick": "50",
            "ban": "20",
            "win": "60",
            "damage": "90",
            "tankiness": "20",
            "difficulty": "60",
            "img": "img",
            "icon": "icon",
            "poste": {
                "mid": 38,
                "top": 23
            },
            "role": "mage"
        },
        {
            "id": "1",
            "name": "Yasuo",
            "rank": "B",
            "pick": "80",
            "ban": "80",
            "win": "30",
            "damage": "90",
            "tankiness": "27",
            "difficulty": "56",
            "img": "",
            "icon": "",
            "poste": {
                "mid": 28,
                "jungle": 53
            },
            "role": "combattant"
        },
    ]

    it("1/ Get every champions", function () {
        let expected = 2
        expect(filter.JsonLength(array)).toEqual(expected);
    })

    it("2/ Get all post of each champion", function () {
        let expected = [{
            poste: {
                "mid": 38,
                "top": 23
            },
            name: "Vel'koz"
        }, {
            poste: {
                "mid": 28,
                "jungle": 53
            },
            name: "Yasuo"
        }]
        expect(filter.PostChamp(array)).toEqual(expected);
    })
}) 
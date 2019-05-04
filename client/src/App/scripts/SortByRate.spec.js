const SBR = require('./SortByRate')

describe("Sort By Rate", function() {
    let data_mooc = [{
            "name": "Vel'koz",
            "pick": "50",
            "poste": {
                "mid": 38,
                "top": 23
            },
            "role": "mage"
        },
        {
            "name": "Yasuo",
            "pick": "80",
            "poste": {
                "mid": 28,
                "jungle": 53
            },
            "role": "combattant"
        }
    ]

    it("1/ Find the number of champions by post (mid)", function () {
        let expected = 2
        expect(SBR.findNbChampByPost(data_mooc, "mid")).toEqual(expected)
    })

    it("2/ Get all champions on post (mid)", function () {
        let expected = [{
            "name": "Vel'koz",
            "pick": "50",
            "poste": {
                "mid": 38,
                "top": 23
            },
            "role": "mage"
        }, {
            "name": "Yasuo",
            "pick": "80",
            "poste": {
                "mid": 28,
                "jungle": 53
            },
            "role": "combattant"
        }]
        expect(SBR.getChampByPost(data_mooc, "mid")).toEqual(
            expect.arrayContaining(expected),
        )
    })

    it("3/ Get selected rate for all champions on post (mid)", function () {
        let expected = ["50", "80"]
        expect(SBR.getSelectedRate(data_mooc, "pick", "mid")).toEqual(
            expect.arrayContaining(expected),
        )
    })

    it("4/ Order champions by rate", function() {
        let expected = [80, 50]
        expect(SBR.orderByRate(data_mooc, "pick", "mid")).toEqual(
            expect.arrayContaining(expected),
        )
    })

    it("5/ Calculate the median of the selected rates", function () {
        let expected = 65
        expect(SBR.medianRate(data_mooc, "pick", "mid")).toEqual(expected)
    })

    it("6/ Get all champions on specific role (mage)", function() {
        let expected =  [{
            "name": "Vel'koz",
            "pick": "50",
            "poste": {
                "mid": 38,
                "top": 23
            },
            "role": "mage"
        }]
        expect(SBR.getChampByRole(data_mooc, "mage")).toEqual(
            expect.arrayContaining(expected),
        )
    })
})

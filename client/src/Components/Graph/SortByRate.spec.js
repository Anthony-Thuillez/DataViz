const SBR = require('./SortByRate')

describe("Sort By Rate", function() {
    let data_mooc = [{
            "name": "Vel'koz",
            "pick": "50",
            "poste": {
                "mid": 38,
                "top": 23
            }
        },
        {
            "name": "Yasuo",
            "pick": "80",
            "poste": {
                "mid": 28,
                "jungle": 53
            }
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
            }
        }, {
            "name": "Yasuo",
            "pick": "80",
            "poste": {
                "mid": 28,
                "jungle": 53
            }
        }]
        expect(SBR.getChampByPost(data_mooc, "mid")).toEqual(
            expect.arrayContaining(expected),
        )
    })

    it("3/ Get selected rate for all champions on post (mid)", function () {
        let expected = ["50", "80"]
        expect(SBR.getSelectedRate(data_mooc, "pick")).toEqual(
            expect.arrayContaining(expected),
        )
    })

    it("4/ Order champions by rate", function() {
        let expected = [80, 50]
        expect(SBR.orderByRate(data_mooc, "pick")).toEqual(
            expect.arrayContaining(expected),
        )
    })

    it("5/ Calculate the median of the selected rates", function () {
        let expected = 65
        expect(SBR.medianRate(data_mooc, "pick")).toEqual(expected)
    })
})

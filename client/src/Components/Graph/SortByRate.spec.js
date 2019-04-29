const SBR = require('./SortByRate')

describe("Sort By Pick Rate", function() {
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
    it("1/ Get every champions", function () {
        let expected = 2
        expect(SBR.getAllChampions(data_mooc)).toEqual(expected)
    })

    it("2/ Get pick rate of each champion", function() {
        let expected = ["50", "80"]
        expect(SBR.getPickRateAllChampions(data_mooc)).toEqual(
            expect.arrayContaining(expected),
        )
    })

    it("3/ Order champions by pick rate", function() {
        let expected = [80, 50]
        expect(SBR.orderByPickRate(data_mooc)).toEqual(
                expect.arrayContaining(expected),
         )
    })

    it("4/ Calculate the median of the pick rates", function() {
        let expected = 65
        expect(SBR.medianPickRate(data_mooc)).toEqual(expected)
    })

    it("X/ Find the number of champions by post (mid)", function () {
        let expected = 2
        expect(SBR.findNbChampByPost(data_mooc, "mid")).toEqual(expected)
    })

    it("Y/ Get all champions on post (mid)", function () {
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

    it("Z/ Get selected rate for all champions on post (mid)", function () {
        let expected = [50, 80]
        expect(SBR.getSelectedRate(data_mooc, "pick")).toEqual(
            expect.arrayContaining(expected),
        )
    })
})

describe("Sort By Win Rate", function () {
    let data_mooc = [{
            "name": "Vel'koz",
            "win": "60"
        },
        {
            "name": "Yasuo",
            "win": "30"
        }
    ]
    it("1/ Get win rate of each champion", function () {
        let expected = ["60", "30"]
        expect(SBR.getWinRateAllChampions(data_mooc)).toEqual(
            expect.arrayContaining(expected),
        )
    })

    it("2/ Order champions by win rate", function () {
        let expected = [60, 30]
        expect(SBR.orderByWinRate(data_mooc)).toEqual(
            expect.arrayContaining(expected),
        )
    })

    it("3/ Calculate the median of the win rates", function () {
        let expected = 45
        expect(SBR.medianWinRate(data_mooc)).toEqual(expected)
    })
})

describe("Sort By Ban Rate", function () {
    let data_mooc = [{
            "name": "Vel'koz",
            "ban": "20"
        },
        {
            "name": "Yasuo",
            "ban": "80"
        }
    ]
    it("1/ Get ban rate of each champion", function () {
        let expected = ["20", "80"]
        expect(SBR.getBanRateAllChampions(data_mooc)).toEqual(
            expect.arrayContaining(expected),
        )
    })

    it("2/ Order champions by ban rate", function () {
        let expected = [80, 20]
        expect(SBR.orderByBanRate(data_mooc)).toEqual(
            expect.arrayContaining(expected),
        )
    })

    it("3/ Calculate the median of the ban rates", function () {
        let expected = 50
        expect(SBR.medianBanRate(data_mooc)).toEqual(expected)
    })
})
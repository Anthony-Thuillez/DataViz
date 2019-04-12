const SBR = require('./SortByRate')

describe("Sort By Win/Lose/Pick Rate", function() {
    const data_mooc = [{
            "name": "Vel'koz",
            "pick": "50",
            "ban": "20",
            "win": "60",
        },
        {
            "name": "Yasuo",
            "pick": "80",
            "ban": "80",
            "win": "30",
        }
    ]
    it("1/ Get every champions", function () {
        let expected = 2
        expect(SBR.getAllChampions(data_mooc)).toEqual(expected)
    })

    it("2/ Get pick rate of each champion", function() {
        let expected = ["50", "80"]
        expect(SBR.getpickRateAllChampions(data_mooc)).toEqual(
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
        expect(SBR.median(data_mooc)).toEqual(expected)
    })
})
const SBR = require('./GlobalFilteting')

describe("Sort By Rate", function() {
    let data_mooc = [{
        "id": 34,
        "name": "Vel'Koz",
        "quotation": "the Eye of the Void",
        "rank": 4,
        "win": 51,
        "pick": 5,
        "ban": 0,
        "damage": 3,
        "toughness": 0,
        "utility": 1,
        "speed": 0,
        "control": 2,
        "image": "https://cdn.pandascore.co/images/lol/champion/big_image/b1cfe05c3e95673ea40adaa3736739d1.jpg",
        "icon": "https://cdn.pandascore.co/images/lol/champion/image/86b6884755f54a85e6cad66494841e1f.png",
        "id_role": 3,
        "role": "Mage",
        "poste": [
        {
            "name": "Support",
            "value": 69.6
        },
        {
            "name": "Middle",
            "value": 30.4
        }
        ]
    }, {
        "id": 132,
        "name": "Yasuo",
        "quotation": "the Unforgiven",
        "rank": 3,
        "win": 48,
        "pick": 15,
        "ban": 56,
        "damage": 3,
        "toughness": 1,
        "utility": 2,
        "speed": 3,
        "control": 2,
        "image": "https://cdn.pandascore.co/images/lol/champion/big_image/6bc1f04019b3dd5206823beafd4d9829.jpg",
        "icon": "https://cdn.pandascore.co/images/lol/champion/image/8c420ee28e07c4324e4ca4ad09927021.png",
        "id_role": 2,
        "role": "Slayer",
        "poste": [{
                "name": "Middle",
                "value": 67.8
            },
            {
                "name": "Top",
                "value": 28.18
            }
        ]
    },
    ]

    it("1/ Get all champions on post (Middle)", function () {
        let expected = [{
            "id": 34,
            "name": "Vel'Koz",
            "quotation": "the Eye of the Void",
            "rank": 4,
            "win": 51,
            "pick": 5,
            "ban": 0,
            "damage": 3,
            "toughness": 0,
            "utility": 1,
            "speed": 0,
            "control": 2,
            "image": "https://cdn.pandascore.co/images/lol/champion/big_image/b1cfe05c3e95673ea40adaa3736739d1.jpg",
            "icon": "https://cdn.pandascore.co/images/lol/champion/image/86b6884755f54a85e6cad66494841e1f.png",
            "id_role": 3,
            "role": "Mage",
            "poste": [{
                    "name": "Support",
                    "value": 69.6
                },
                {
                    "name": "Middle",
                    "value": 30.4
                }
            ]
        }, {
            "id": 132,
            "name": "Yasuo",
            "quotation": "the Unforgiven",
            "rank": 3,
            "win": 48,
            "pick": 15,
            "ban": 56,
            "damage": 3,
            "toughness": 1,
            "utility": 2,
            "speed": 3,
            "control": 2,
            "image": "https://cdn.pandascore.co/images/lol/champion/big_image/6bc1f04019b3dd5206823beafd4d9829.jpg",
            "icon": "https://cdn.pandascore.co/images/lol/champion/image/8c420ee28e07c4324e4ca4ad09927021.png",
            "id_role": 2,
            "role": "Slayer",
            "poste": [{
                    "name": "Middle",
                    "value": 67.8
                },
                {
                    "name": "Top",
                    "value": 28.18
                }
            ]
        }]
        expect(SBR.getChampByPost(data_mooc, "Middle")).toEqual(
            expect.arrayContaining(expected),
        )
    })

    it("2/ Get selected rate for all champions on post (Middle)", function () {
        let expected = [5, 15]
        expect(SBR.getSelectedRate(data_mooc, "pick", "Middle")).toEqual(
            expect.arrayContaining(expected),
        )
    })

    it("3/ Order champions by rate", function() {
        let expected = [15, 5]
        expect(SBR.orderByRate(data_mooc, "pick", "Middle")).toEqual(
            expect.arrayContaining(expected),
        )
    })

    it("4/ Calculate the median of the selected rates", function () {
        let expected = 10
        expect(SBR.medianRate(data_mooc, "pick", "Middle")).toEqual(expected)
    })

    it("5/ Get all champions on specific role (mage)", function() {
        let expected = [{
            "id": 34,
            "name": "Vel'Koz",
            "quotation": "the Eye of the Void",
            "rank": 4,
            "win": 51,
            "pick": 5,
            "ban": 0,
            "damage": 3,
            "toughness": 0,
            "utility": 1,
            "speed": 0,
            "control": 2,
            "image": "https://cdn.pandascore.co/images/lol/champion/big_image/b1cfe05c3e95673ea40adaa3736739d1.jpg",
            "icon": "https://cdn.pandascore.co/images/lol/champion/image/86b6884755f54a85e6cad66494841e1f.png",
            "id_role": 3,
            "role": "Mage",
            "poste": [{
                    "name": "Support",
                    "value": 69.6
                },
                {
                    "name": "Middle",
                    "value": 30.4
                }
            ]
        }]
        expect(SBR.getChampByRole(data_mooc, "Mage")).toEqual(
            expect.arrayContaining(expected),
        )
    })

    it("6/ Get a champion on a specific name", function () {
        let expected = {
            "id": 34,
            "name": "Vel'Koz",
            "quotation": "the Eye of the Void",
            "rank": 4,
            "win": 51,
            "pick": 5,
            "ban": 0,
            "damage": 3,
            "toughness": 0,
            "utility": 1,
            "speed": 0,
            "control": 2,
            "image": "https://cdn.pandascore.co/images/lol/champion/big_image/b1cfe05c3e95673ea40adaa3736739d1.jpg",
            "icon": "https://cdn.pandascore.co/images/lol/champion/image/86b6884755f54a85e6cad66494841e1f.png",
            "id_role": 3,
            "role": "Mage"
        }
        expect(SBR.getChampByName(data_mooc, "Vel'Koz")).toEqual(
            expect.objectContaining(expected),
        )
    })
})

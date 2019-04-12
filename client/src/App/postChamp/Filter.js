
const JsonLength = (array) => {
    return array.length
}

const PostChamp = (array) => {
    let champions = array.map((champion, index) => {
        return {
            poste: champion.poste,
            name: champion.name
        }
    })
    return champions
}

module.exports = {
    JsonLength,
    PostChamp
}

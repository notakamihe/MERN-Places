module.exports.averageRating = (arr) => {
    if (!arr)
        return null

    const ratingsList = arr.map(r => r.rating)
    return ratingsList.reduce((a, b) => a + b) / ratingsList.length;
}
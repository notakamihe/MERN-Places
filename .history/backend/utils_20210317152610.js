module.exports.averageRating = (arr) => {
    if (!arr)
        return null

    const ratingsList = arr.map(r => r.rating)
    this.averageRating = ratingsList.reduce((a, b) => a + b) / ratingsList.length;
}
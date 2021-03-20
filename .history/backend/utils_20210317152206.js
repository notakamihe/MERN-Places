const averageRating = (arr) => {
    const ratingsList = arr.map(r => r.rating)
    this.averageRating = ratingsList.reduce((a, b) => a + b) / ratingsList.length;
}
interface RatingStar {
    one: number
    two: number
    three: number
    four: number
    five: number
}

type RatingArray = [
    RatingStar['five'],
    RatingStar['four'],
    RatingStar['three'],
    RatingStar['two'],
    RatingStar['one']
]

const calculateAverageRatingStar = (ratings: RatingArray) => {
    let totalRate = 0
    let totalStar = 0
    const length = ratings.length
    for (let i = 0; i < length; i++) {
        switch (i) {
            case 0:
                totalStar += ratings[0] * 5
                totalRate += ratings[0]
                break
            case 1:
                totalStar += ratings[1] * 4
                totalRate += ratings[1]
                break
            case 2:
                totalStar += ratings[2] * 3
                totalRate += ratings[2]

                break
            case 3:
                totalStar += ratings[3] * 2
                totalRate += ratings[3]

                break
            case 4:
                totalStar += ratings[4] * 1
                totalRate += ratings[4]
                break
        }
    }
    return totalStar / totalRate
}

export default interface ILocation {
    id: string,
    name: string,
    city: string,
    country: string,
    imgHref: string,
    cityCenterDistance: number,
    ratingStars: number,
    priceDaily: number,
    isFavorite: boolean,
}
import ILocation from "./ILocation";
import IReview from "./IReview";

export default interface IHomePage {
    locale: string,
    locations: Array<ILocation>,
    reviews: Array<IReview>,
}
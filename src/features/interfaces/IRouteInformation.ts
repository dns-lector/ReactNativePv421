// /product?id=100500
interface IRouteInformation {
    slug: string,           // product
    parameters?: object     // { "id": 100500 }
};

export default IRouteInformation;
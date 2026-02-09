import INbuRate from "../orm/INbuRate";

export default class NbuApi {

    static getCurrentRates(): Promise<Array<INbuRate>> {
        return new Promise((resolve, reject) => {
            fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
            .then(r => r.json())
            .then(j => {
                resolve(j);
            })
            .catch(err => reject(err));
        });
    }
}
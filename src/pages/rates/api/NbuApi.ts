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

    static getRatesForDate(date: Date): Promise<Array<INbuRate>> {
        return new Promise((resolve, reject) => {
            const dd = date.getDate().pad2();
            const mm = (date.getMonth() + 1).pad2();
            const yyyy = date.getFullYear();
            const param = `${yyyy}${mm}${dd}`;
            fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${param}&json`)
            .then(r => r.json())
            .then(j => {
                resolve(j);
            })
            .catch(err => reject(err));
        });
    }
}
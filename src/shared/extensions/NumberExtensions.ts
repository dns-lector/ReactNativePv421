export {};

declare global {  
    interface Number {
        pad2: () => string,
    }
}

Number.prototype.pad2 = function():string {
    return this.valueOf() < 10 ? `0${this}` : `${this}`;
}
export {};

declare global {          // У TS інтерфейси додаються - два означення
    interface Date {      // одного інтерфейсу розширюють один іншого    
        toDotted: () => string,
    }
}

Date.prototype.toDotted = function(): string {
    return `${this.getDate().pad2()}.${(this.getMonth() + 1).pad2()}.${this.getFullYear()}`;
}
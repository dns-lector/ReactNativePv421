export {};

declare global {          // У TS інтерфейси додаються - два означення
    interface Date {      // одного інтерфейсу розширюють один іншого    
        toDotted: () => string,
        toSqlDate: () => string,
        toSqlDateTime: () => string,
    }
}

Date.prototype.toDotted = function(): string {
    return `${this.getDate().pad2()}.${(this.getMonth() + 1).pad2()}.${this.getFullYear()}`;
}
Date.prototype.toSqlDate = function(): string {
    return `${this.getFullYear()}-${(this.getMonth() + 1).pad2()}-${this.getDate().pad2()}`;
}

Date.prototype.toSqlDateTime = function(): string {   // TODO: завершити - додати час
    return `${this.getFullYear()}-${(this.getMonth() + 1).pad2()}-${this.getDate().pad2()} `;
}
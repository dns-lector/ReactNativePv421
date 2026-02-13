import IModalButton from "./IModalButton";

export default interface IModalData {
    title?: string,
    message: string,
    buttons?: Array<IModalButton>
};

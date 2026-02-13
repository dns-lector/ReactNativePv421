import { ButtonTypes } from "../../ui/button/FirmButton";

export default interface IModalButton {
    title: string,
    action?: () => void,
    buttonType?: ButtonTypes,
};
export default interface IChatUser {
    id: string|null,
    name: string,
    birthdate: Date|null,
    email: string|null,
    phone?: string|null,
};
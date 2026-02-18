export default interface IUser {
    id: string,
    token: string,
    name: string,
    birthdate: Date,
    email: string,
    phone?: string,
};

/*
birthdate: "2000-01-01 00:00:00"
email: "exp_user@ukr.net"
id: "f373ab7c-0b65-11f1-9382-d05099fb334d"
name: "Досвічений Користувач"
phone: "+380123456789"
token: "2c065474-049a-8792-df71-a5b06c8db5b0"
*/
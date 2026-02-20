import IChatUser from "./IChatUser";

export default interface IChatPost {
    postId: string,
    postAt: Date,
    content: string,
    user: IChatUser,
    cite: IChatPost | null,
}
/*
{
    "postId": "417437fb-0e33-11f1-9382-d05099fb334d",
    "postAt": "2026-02-20 10:07:52",
    "content": "So am I!",
    "user": {
        "name": "Тестовий Користувач",
        "id": null,
        "birthdate": null,
        "email": null,
        "phone": null
    },
    "cite": {
        "postId": "dd46145d-0e32-11f1-9382-d05099fb334d",
        "postAt": "2026-02-20 10:05:04",
        "content": "I am cool!",
        "user": {
            "name": "Тестовий2 Користувач",
            "id": null,
            "birthdate": null,
            "email": null,
            "phone": null
        }
    }
},
*/
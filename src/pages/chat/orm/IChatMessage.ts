export default interface IChatMessage {
    post_id: string,
    user_id: string,
    content: string,
    name:    string,
    post_at: Date,
    
    cite_id:      string|null,
    cite_content: string|null,
    cite_user:    string|null,
    cite_at:      Date|null,
}
/*
"post_id": "4e3c7721-0cda-11f1-9382-d05099fb334d",
"user_id": "3651b317-0b45-11f1-9382-d05099fb334d",
"cite_id": "77643d9e-0cd9-11f1-9382-d05099fb334d",
"content": "Hello, all!",
"post_at": "2026-02-18 16:58:38",
"name": "Тестовий2 Користувач",
"cite_content": "Hello, all!",
"cite_at": "2026-02-18 16:52:37",
"cite_user": "Тестовий2 Користувач"
*/
import IChatPost from "../orm/IChatPost";

export default class ChatApi {

    static getMessages(token?:string): Promise<Array<IChatPost>> {
        return new Promise((resolve, reject) => {
            const init = token ? {
                headers: {
                    "Authorization": "Bearer " + token
                }
            } : undefined;

            fetch("https://chat.sodes.studio/post", init)
            .then(r => r.json())
            .then(j => {
                for(let post of j.data as Array<IChatPost>) {
                    post.postAt = new Date(post.postAt);
                    if(post.user.birthdate != null) {
                        post.user.birthdate = new Date(post.user.birthdate);
                    }
                    if(post.cite != null) {
                        post.cite.postAt = new Date(post.cite.postAt);
                        if(post.cite.user.birthdate != null) {
                            post.cite.user.birthdate = new Date(post.cite.user.birthdate);
                        }
                    }                    
                }
                resolve(j.data);
            })
            .catch(reject);
        });
    }
}
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import ChatStyle from "./css/ChatStyle";
import { useContext, useEffect, useRef, useState } from "react";
import IChatMessage from "./orm/IChatPost";
import ChatApi from "./api/ChatApi";
import AppContext from "../../features/context/AppContext";

export default function Chat() {
    const [posts, setPosts] = useState<Array<IChatMessage>>([]);
    const [postText, setPostText] = useState<string>("");
    const {showModal, user} = useContext(AppContext);
    const scrollRef = useRef<ScrollView>(null);

    const loadPosts = () => ChatApi.getMessages(user?.token).then(list => {
        list.sort((a,b) => a.postAt.getTime() - b.postAt.getTime());
        setPosts(list);
        console.log("loadPosts");
    }); 

    useEffect(() => {
        const timer = setInterval(loadPosts, 1000);
        loadPosts();

        return () => clearInterval(timer);
    }, []);

    const onSendPress = () => {
        console.log(postText);
        const txt = postText.trim();
        if(txt.length == 0) {
            showModal({message: "Введіть повідомлення"});
            return;
        }
        fetch("https://chat.sodes.studio/post", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + user?.token
            },
            body: postText
        }).then(r => r.json()).then(j => {
            if(j.status.code == 200) {
                loadPosts();
                setPostText("");
            }
            else {
                showModal({message: JSON.stringify(j)});
            }
        });
    };

    return <KeyboardAvoidingView 
        style={ChatStyle.chatContainer} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}        
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 80}>

        <ScrollView
            ref={scrollRef} 
            style={ChatStyle.messagesScroller}
            onContentSizeChange={() => {
                scrollRef.current?.scrollToEnd({ animated: true });
            }}>
            <View style={ChatStyle.messages}>
                {posts.map(p => 
                <View 
                    key={p.postId} 
                    style={p.user.id == user?.id ? ChatStyle.myPost : ChatStyle.post}>

                    <Text>{p.postAt.toDotted()}</Text>
                    <Text>{p.user.name}</Text>
                    <Text>{p.content}</Text>

                </View>)}
            </View>
        </ScrollView>

        <View style={ChatStyle.sendBlock}>
            <TextInput  
                onChangeText={setPostText}
                value={postText}
                style={ChatStyle.sendInput} 
                placeholder="Введіть повідомлення"
                placeholderTextColor="#aaa" />

            <TouchableOpacity 
                style={ChatStyle.sendButton}
                onPress={onSendPress}>
                <Image  
                    style={ChatStyle.sendButtonImg}
                    source={require('../../features/assets/img/send.png')} />
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>;
}
/*
Прикласти посилання на репозиторій підсумкового проєкту
*/
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import ChatStyle from "./css/ChatStyle";
import { useEffect, useState } from "react";
import IChatMessage from "./orm/IChatPost";
import ChatApi from "./api/ChatApi";

export default function Chat() {
    const [posts, setPosts] = useState<Array<IChatMessage>>([]);

    useEffect(() => {
        ChatApi.getMessages().then(setPosts); 
    }, []);

    return <KeyboardAvoidingView 
        style={ChatStyle.chatContainer} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 80}>

        <ScrollView style={ChatStyle.messagesScroller}>
            <View style={ChatStyle.messages}>
                {posts.map(p => <View key={p.postId} style={ChatStyle.post}>
                    <Text>{p.postAt.toDotted()}</Text>
                    <Text>{p.user.name}</Text>
                    <Text>{p.content}</Text>
                </View>)}
            </View>
        </ScrollView>

        <View style={ChatStyle.sendBlock}>
            <TextInput 
                style={ChatStyle.sendInput} 
                placeholder="Введіть повідомлення"
                placeholderTextColor="#aaa" />
            <TouchableOpacity style={ChatStyle.sendButton}>
                <Image  
                    style={ChatStyle.sendButtonImg}
                    source={require('../../features/assets/img/send.png')} />
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>;
}
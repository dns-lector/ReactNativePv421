import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import ChatStyle from "./css/ChatStyle";
import { useEffect, useState } from "react";
import IChatMessage from "./orm/IChatMessage";
import ChatApi from "./api/ChatApi";

export default function Chat() {
    const [messages, setMessages] = useState<Array<IChatMessage>>([]);

    useEffect(() => {
        // ChatApi.getMessages().then(setMessages); // -- замінити на цикл в АРІ
    }, []);

    return <KeyboardAvoidingView style={ChatStyle.chatContainer} 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 80}>

        <ScrollView style={ChatStyle.messagesScroller}>
            <View style={ChatStyle.messages}>
                {messages.map(m => <View key={m.post_id}>
                    <Text>{m.post_at.toDotted()}</Text>
                    <Text>{m.name}</Text>
                    <Text>{m.content}</Text>
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
import { useContext, useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import AuthStyle from "../css/AuthStyle";
import DatePicker from "react-native-date-picker";
import { ButtonTypes, FirmButton } from "../../../features/ui/button/FirmButton";
import AppContext from "../../../features/context/AppContext";

interface IUserFormData {
    name: string,
    email: string,
    birthdate: Date|null,
    password: string,
    // repeat: string,
    phone: string
};

const emptyUserFormData = {
    name: "",
    email: "",
    birthdate: null,
    password: "",
    phone: ""
};
const testUserFormData = {
    name: "Досвічений Користувач",
    email: "exp_user@ukr.net",
    birthdate: new Date('2000-01-01'),
    password: "123",
    phone: "+380123456789"
};

export default function SignUpView({setPageMode}:{setPageMode:React.Dispatch<React.SetStateAction<string>>}) {   // Register
    const [userFormData, setUserFormData] = useState<IUserFormData>(testUserFormData);
    const [isFormValid, setFormValid] = useState(false);
    const [isOpen, setOpen] = useState<boolean>(false);
    const {showModal} = useContext(AppContext);

    useEffect(() => {
        setFormValid(
            userFormData.name.length > 2 &&
            userFormData.email.length > 5 &&
            userFormData.birthdate != null &&
            userFormData.password.length > 2
        );
    }, [userFormData]);

    const onSignupButtonPress = () => {
        if(!isFormValid) {
            showModal({
                title: "Помилка реєстрації",
                message: "Заповніть усі поля форми",
            });   // TODO: Деталізувати причини помилки - які поля із зауваженнями
            return;
        }
        const sentData = {
            ...userFormData,
            birthdate: userFormData.birthdate?.toSqlDate(),
        };
        fetch("https://chat.sodes.studio/user", {
            method: "POST",
            body: JSON.stringify(sentData)
        }).then(r => r.json()).then(j => {
            console.log(j);
            if(j.status.code != 200) {
                showModal({
                    title: "Помилка реєстрації",
                    message: j.status.message,
                    buttons: [
                        {
                            title: "Коригувати",
                            buttonType: ButtonTypes.danger,
                        }
                    ]
                });
            }
            else {
                showModal({
                    title: "Успішна реєстрація",
                    message: "Використовуйте е-mail або телефон та пароль для входу",
                    buttons: [
                        {
                            title: "Вхід",
                            buttonType: ButtonTypes.success,
                            action: () => setPageMode("SignIn")
                        }
                    ]
                });
            }
        });
    };

    return <>
        <View>
            <Text>Реєстрація нового користувача</Text>
        </View>

        <View style={AuthStyle.authRow}>
            <Text style={AuthStyle.authRowText}>Ім'я</Text>
            <TextInput style={AuthStyle.authRowInput} 
                value={userFormData.name} 
                onChangeText={t => setUserFormData({...userFormData, name:t})} />
        </View>
        <View style={AuthStyle.authRow}>
            <Text style={AuthStyle.authRowText}>E-mail</Text>
            <TextInput style={AuthStyle.authRowInput} 
                value={userFormData.email} 
                onChangeText={t => setUserFormData({...userFormData, email:t})} />
        </View>
        <View style={AuthStyle.authRow}>
            <Text style={AuthStyle.authRowText}>Телефон</Text>
            <TextInput style={AuthStyle.authRowInput} 
                value={userFormData.phone} 
                onChangeText={t => setUserFormData({...userFormData, phone:t})} />
        </View>

        <View style={AuthStyle.authRow}>
            <Text style={AuthStyle.authRowText}>Дата{"\n"}народження</Text>
            <Text style={AuthStyle.authRowInput}
                onPress={() => setOpen(true)} >
                {userFormData.birthdate?.toDotted()}</Text>  
        </View>
        <DatePicker
            modal
            open={isOpen}
            date={userFormData.birthdate ?? new Date()}
            mode="date"
            onConfirm={(date) => {
                setOpen(false);
                setUserFormData({...userFormData, birthdate:date});
            }}
            onCancel={() => {
                setOpen(false);
                setUserFormData({...userFormData, birthdate:null});
            }} />

        <View style={AuthStyle.authRow}>
            <Text style={AuthStyle.authRowText}>Пароль</Text>
            <TextInput secureTextEntry={true} style={AuthStyle.authRowInput} 
                value={userFormData.password} 
                onChangeText={t => setUserFormData({...userFormData, password:t})} />
        </View>

        <FirmButton 
            buttonType={isFormValid ? ButtonTypes.success : ButtonTypes.danger}
            title="Реєстрація" style={{margin: 20.0,}}
            action={onSignupButtonPress} />
    </>;
}
/*
Д.З. Реєстрація нового користувача:
- додати поле "повторити пароль", до валідації форми додати відповідне порівняння
- посили валідацію пошти та телефону: формат тлф: +(та)12цифр, email - стандартний
- у повідомленні про неправильність заповнення форми деталізувати причини помилки - які поля із зауваженнями
* доробити розширення інтерфейсу дати методом toSqlDateTime
*/

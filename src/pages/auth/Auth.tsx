import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AuthStyle from './css/AuthStyle';
import { useContext, useEffect, useState } from 'react';
import { textColor } from '../../features/values/colors';
import AppContext from '../../features/context/AppContext';
import { ButtonTypes, FirmButton } from '../../features/ui/button/FirmButton';
import SignUpView from './ui/SignUpView';


export default function Auth() {
    const {user} = useContext(AppContext);
    const [pageMode, setPageMode] = useState("SignUp");


    return !!user 
    ? <SignedView />
    : <View style={AuthStyle.authContainer}>        
        <PageSwitchWidget pageMode={pageMode} setPageMode={setPageMode}/>        
        {pageMode == "SignIn"
        ? <SignInView />
        : <SignUpView setPageMode={setPageMode} />
        }
    </View>;
}

function PageSwitchWidget({pageMode, setPageMode}:{pageMode:string, setPageMode:React.Dispatch<React.SetStateAction<string>>}) {
    return <View style={AuthStyle.pageSwitch}>
        <FirmButton title='Вхід' style={AuthStyle.pageSwitchButton}
            buttonType={pageMode == "SignUp" ? ButtonTypes.primary : ButtonTypes.success}
            action={() => setPageMode("SignIn")}/>
        <FirmButton title='Реєстрація' style={AuthStyle.pageSwitchButton}
            buttonType={pageMode == "SignUp" ? ButtonTypes.success : ButtonTypes.primary} 
            action={() => setPageMode("SignUp")} />
    </View>;
}

function SignInView() {   // Log in
    const [login, setLogin] = useState("user");
    const [password, setPassword] = useState("123");
    const [isFormValid, setFormValid] = useState(false);
    const {setUser} = useContext(AppContext);

    useEffect(() => {
        setFormValid(login.length > 2 && password.length > 2);
    }, [login, password]);

    const signInClick = () => {
        if(login == 'user' && password == '123') {
            setUser({
                name: 'User',
                token: '123',
            });
        }
    };

    return <>
        <View style={AuthStyle.authRow}>
            <Text style={AuthStyle.authRowText}>Логін</Text>
            <TextInput style={AuthStyle.authRowInput} value={login} onChangeText={setLogin} />
        </View>

        <View style={AuthStyle.authRow}>
            <Text style={AuthStyle.authRowText}>Пароль</Text>
            <TextInput secureTextEntry={true} style={AuthStyle.authRowInput} value={password} onChangeText={setPassword} />
        </View>

        <TouchableOpacity style={AuthStyle.authButton} onPress={isFormValid ? signInClick : undefined}>
            <Text style={[AuthStyle.authButtonText, {color: isFormValid ? textColor : "#777"}]}>Вхід</Text>
        </TouchableOpacity>
    </>;
}

function SignedView() {
    const {user, setUser} = useContext(AppContext);

    const signOutClick = () => {
        setUser(null);
    }
    return <View style={AuthStyle.authContainer}>
        <View style={AuthStyle.authRow}>
            <Text style={AuthStyle.authRowText}>Вітання, {user!.name}</Text>
            <TouchableOpacity style={AuthStyle.authButton} onPress={signOutClick}>
                <Text style={[AuthStyle.authButtonText, {color: textColor}]}>Вихід</Text>
            </TouchableOpacity>
        </View>
    </View>;
}
/*
Д.З. Розширити дані, що характеризують користувача:
додати номер телефону, E-mail, інші дані (за профілем застосунку)
вивести відповідні дані на сторінці-профілі,
до звіту з ДЗ додати скріншот
*/
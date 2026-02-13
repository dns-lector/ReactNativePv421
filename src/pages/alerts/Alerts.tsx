import { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import AppContext from "../../features/context/AppContext";

export default function Alerts() {
    const {showModal} = useContext(AppContext);

    return <>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => showModal({
            title: "Test title",
            message: "Test message",
            buttons: [
                {
                    title: "Yes",
                    action: () => {}
                },
                {
                    title: "No",
                    action: () => {}
                },
            ]
          })}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
    </>;
}


const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },    
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
});

/*
Д.З. Забезпечити стилізацію модального вікна-повідомлення та кнопок:
- реалізувати відмінність у кнопках різного призначення (колір тексту тощо)
- відмінність розташування кнопок: якщо кнопок три чи менше - вони 
   в один рядок, якщо більше, то в кілька рядків по 2 на рядок.
*/
import { StyleSheet } from "react-native";
import { textColor } from "../../features/values/colors";

const AppStyle = StyleSheet.create({
  container: {
    backgroundColor: '#444',
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  appBar: {   // header
    paddingVertical: 9.5,   // dp (dip) - density (independed) pixel
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  appBackIcon: {
    color: textColor,
    fontWeight: 700,
    fontSize: 25,
    marginLeft: 20,
  },
  appBarTitle: {
    color: textColor,
    fontWeight: 700,
  },
  main: {
    backgroundColor: "#484848",
    flex: 1,
    width: "100%",
  },
  navBar: {   // footer
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: 50,
  },
});

export default AppStyle;
/*
Д.З. Стилізувати надпис "Home" в навігаційній 
панелі застосунку під вигляд кнопки
(рамочка, заокруглення, відступи, *тінь)
*/
import { createContext } from "react";
import IAppContext from "../interfaces/IAppContext";

const AppContext = createContext<IAppContext>({
    navigate: (_) => {throw "AppContext::navigate not implemented"},
    user: null,
    setUser: (_) => {throw "AppContext::setUser not implemented"},
    showModal: (_) => {throw "AppContext::showModal not implemented"},
});

export default AppContext;
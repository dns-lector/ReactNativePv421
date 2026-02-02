import { createContext } from "react";
import IAppContext from "../interfaces/IAppContext";

const AppContext = createContext<IAppContext>({
    navigate: (_) => {throw "AppContext::navigate not implemented"},
});

export default AppContext;
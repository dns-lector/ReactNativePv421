import IRouteInformation from "./IRouteInformation";
import IUser from "./IUser";

interface IAppContext {
    navigate: (route:IRouteInformation) => void,
    user: IUser|null,
    setUser: (user:IUser|null) => void,
};

export default IAppContext;
import IRouteInformation from "./IRouteInformation";
import IUser from "./IUser";
import IModalData from "./modal/IModalData";

interface IAppContext {
    navigate: (route:IRouteInformation) => void,
    user: IUser|null,
    setUser: (user:IUser|null) => void,
    showModal: (data:IModalData) => void,
};

export default IAppContext;
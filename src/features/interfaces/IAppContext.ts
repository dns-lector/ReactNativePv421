import IRouteInformation from "./IRouteInformation";

interface IAppContext {
    navigate: (route:IRouteInformation) => void,
};

export default IAppContext;
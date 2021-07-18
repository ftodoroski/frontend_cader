const defualtState = {
    login: {
        email: "", 
        password: ""
    }, 
    signup: {
        name: "", 
        email: "", 
        password: "", 
        phone_number: "", 
    }, 
    currentUser: {},
    properties: [], 
    originalProperties: [],
    unoccupiedUnits: [], 
    modalDimmer: "blurring", 
    modalToogle: false,
    modalPropertiesToogle: false,
    modalPropertiesDimmer: "blurring",
    modalPropertyToogle: false,
    modalPropertyDimmer: "blurring"

}

export const reducer = (prevState = defualtState, action) => {
    switch(action.type) {
        case "HANDLE_CHANGE":
            return { ...prevState, [action.payload.target.className]: { ...prevState[action.payload.target.className], [action.payload.target.name]: action.payload.target.value }}
            // eslint-disable-next-line
            break;
        case "SET_CURRENT_USER":
            return { ...prevState, currentUser: action.payload }
            // eslint-disable-next-line
            break;
        case "AUTO_LOGIN":
            return { ...prevState, currentUser: action.payload }
            // eslint-disable-next-line
            break;
        case "LOG_OUT":
            return { ...prevState, currentUser: '' }
            // eslint-disable-next-line
            break;
        case "GET_PROPERTIES":
            return { ...prevState, properties: action.payload }
            // eslint-disable-next-line
            break;
        case "GET_ORIGINAL_PROPERTIES":
            return { ...prevState, originalProperties: action.payload }
            // eslint-disable-next-line
            break;
        case "GET_UNOCCUPIED_UNITS":
            return { ...prevState, unoccupiedUnits: action.payload }
            // eslint-disable-next-line
            break;
        case "TOOGLE_MODAL":
            return { ...prevState, modalToogle: action.payload }
            // eslint-disable-next-line
            break;
        case "TOOGLE_PROPERTIES_MODAL":
            return { ...prevState, modalPropertiesToogle: action.payload }
            // eslint-disable-next-line
            break;
        case "TOOGLE_PROPERTY_MODAL": 
            return { ...prevState, modalPropertyToogle: action.payload }
            // eslint-disable-next-line
            break;
        case "RESET_LOGIN_INPUT": 
            return { ...prevState, login: { email: "", password: "" }}
            // eslint-disable-next-line
            break;
        default:
            return prevState
    }
}


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
            break;
        case "SET_CURRENT_USER":
            return { ...prevState, currentUser: action.payload }
            break;
        case "AUTO_LOGIN":
            return { ...prevState, currentUser: action.payload }
            break;
        case "LOG_OUT":
            return { ...prevState, currentUser: '' }
            break;
        case "GET_PROPERTIES":
            return { ...prevState, properties: action.payload }
            break;
        case "GET_ORIGINAL_PROPERTIES":
            return { ...prevState, originalProperties: action.payload }
            break;
        case "GET_UNOCCUPIED_UNITS":
            return { ...prevState, unoccupiedUnits: action.payload }
            break;
        case "TOOGLE_MODAL":
            return { ...prevState, modalToogle: action.payload }
            break;
        case "TOOGLE_PROPERTIES_MODAL":
            return { ...prevState, modalPropertiesToogle: action.payload }
            break;
        case "TOOGLE_PROPERTY_MODAL": 
            return { ...prevState, modalPropertyToogle: action.payload }
            break;
        case "RESET_LOGIN_INPUT": 
            return { ...prevState, login: { email: "", password: "" }}
            break;
        default:
            return prevState
    }
}


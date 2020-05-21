export const handleChange = (e) => {
    return { type: "HANDLE_CHANGE", payload: e}
}

export const handleSignupLogin = (response) => {
    return { type: "SET_CURRENT_USER", payload: response.owner }
}
export const resetLoginInput = () => {
    return { type: "RESET_LOGIN_INPUT" }
}

export const autoLogin = (response) => {
    return { type: "AUTO_LOGIN", payload: response.owner }
}

export const logOut = () => {
    return { type: "LOG_OUT", payload: null }
}

export const getOwnerProperties = (response) => {
    return { type: "GET_PROPERTIES", payload: response }
}

export const getOriginalOwnerProperties = (response) => {
    return { type: "GET_ORIGINAL_PROPERTIES", payload: response }
}

export const getUnoccupiedUnits = (response) => {
    return { type: "GET_UNOCCUPIED_UNITS", payload: response }
}

export const toogleModal = (response) => {
    return { type: "TOOGLE_MODAL", payload: response }
}

export const tooglePropertiesModal = (response) => {
    return { type: "TOOGLE_PROPERTIES_MODAL", payload: response }
}

export const tooglePropertyModal = (response) => {
    return { type: "TOOGLE_PROPERTY_MODAL", payload: response }
}


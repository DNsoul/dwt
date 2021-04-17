
const listSet = (newList) => {
    return {
        type: 'LIST_SET',
        payload: newList
    }
}

const parameterSet = (newParameter) => {
    return {
        type: 'PARAMETER_SET',
        payload: newParameter
    }
}

const urlSet = (newUrl) => {
    return {
        type: 'URL_SET',
        payload: newUrl
    }
}

const nameSet = (name) => {
    return {
        type: 'NAME_SET',
        payload: name
    }
}

const toggleMenu = () => {
    return {
        type: 'TOGGLE_MENU',
    }
}

const toggleName = () => {
    return {
        type: 'TOGGLE_NAME',
    }
}

export {
    listSet,
    parameterSet,
    urlSet,
    toggleMenu,
    toggleName,
    nameSet,
}
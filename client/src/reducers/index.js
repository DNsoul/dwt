
const initialState = {
    url: 'https://www.youtube.com/embed/LpxyH7nQA1E',
    list: {},
    parameters: {
        search: '',
        category: '/movies',
        page: 1,
    },
    loading: true,
    isOpenMenu: false,
    isOpenName: true,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LIST_SET':
            return Object.assign({}, state,{list: action.payload}, {loading: false});
        case 'PARAMETER_SET':
            return Object.assign({}, state,{parameters: action.payload}, {loading: true});
        case 'URL_SET':
            return Object.assign({}, state,{url: action.payload});
        case 'TOGGLE_MENU':
            return Object.assign({}, state,{isOpenMenu: !state.isOpenMenu});
        case 'TOGGLE_NAME':
            return Object.assign({}, state,{isOpenName: !state.isOpenName});
        default:
            return state;
    }
}

export default reducer;
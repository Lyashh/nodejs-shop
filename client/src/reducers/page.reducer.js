const initialState = {'currentPage': 'home'}
export default function fields(state = initialState, action) {
    if(action.type === 'SET_PAGE') return {...state, 'currentPage': action.payload};
    return state
}
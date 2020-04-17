const initialState = {'position': 'tile'}
export default function fields(state = initialState, action) {
    if(action.type === 'SET_POSITION') return {...state, 'position': action.payload};
    return state
}
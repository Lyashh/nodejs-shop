const initialState = {'position': 'tile', 'quantity': 12, 'page': 1}
export default function fields(state = initialState, action) {
    if(action.type === 'SET_POSITION') return {...state, 'position': action.payload};
    if(action.type === 'SET_QUANTITY_ITEMS') return {...state, 'quantity': action.payload};
    if(action.type === 'SET_ITEM_PAGE') return {...state, 'page': action.payload};
    return state
}
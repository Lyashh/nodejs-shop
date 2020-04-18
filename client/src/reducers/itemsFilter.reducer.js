const initialState = {'position': 'tile', 'quantity': 12, 'page': 0, 'maxPage': 1}
export default function fields(state = initialState, action) {
    if(action.type === 'SET_POSITION') return {...state, 'position': action.payload};
    if(action.type === 'SET_QUANTITY_ITEMS') return {...state, 'quantity': action.payload};
    if(action.type === 'SET_ITEM_PAGE') return {...state, 'page': action.payload};
    if(action.type === 'SET_MAX_ITEM_PAGE') return {...state, 'maxPage': action.payload};
    return state
}
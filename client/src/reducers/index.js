import { combineReducers } from 'redux'
import pages from './page.reducer'
import itemsFilter from './itemsFilter.reducer'

export default combineReducers({
    pages,
    itemsFilter
})
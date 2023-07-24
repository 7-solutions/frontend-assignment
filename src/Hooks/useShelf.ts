import { useContext, useReducer } from "react";
import { ShelfContext, ShelfDispatchContext } from '../Contexts/Shelf'

function useShelf():any {
    const appContext = useContext(ShelfContext)
    const dispatch = useContext(ShelfDispatchContext)

    return {...appContext, dispatch}
}

export default useShelf
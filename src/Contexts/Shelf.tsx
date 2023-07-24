import React, { Dispatch, createContext, useReducer } from 'react'
import _ from 'lodash';
import initialData from '../data.json'

export type ShelfData = {
    type: string,
    name: string
}

interface ReducerAction {
    type: string,
    productName?: string
}

type AppContextStruct = {
    lookup?: ShelfData[],
    shelf?: ShelfData[],
    fruits?: ShelfData[],
    veggies?: ShelfData[],
    dispatch?: any | undefined,
}

export const ShelfContext = createContext<AppContextStruct>({})
export const ShelfDispatchContext = createContext<Dispatch<ReducerAction> | undefined>(undefined)

function handleDelete(AppData: AppContextStruct, name: string) {
    const productType = AppData.lookup?.filter(t => t.name === name)[0].type;
    const newShelf = [...AppData.shelf?.filter(t => t.name !== name) as any];
    const newBasket = [...AppData.lookup?.filter(t => t.name === name) as any];

    AppData.shelf = newShelf

    if (productType === 'Fruit')
        AppData.fruits = _.uniqBy([...AppData.fruits as any, ...newBasket], 'name')
    else
        AppData.veggies = _.uniqBy([...AppData.veggies as any, ...newBasket], 'name')

    return _.assign({}, AppData)
}

function handleTimeout(AppData: AppContextStruct, name:string): AppContextStruct {
    const productType = AppData.lookup?.filter(t => t.name === name)[0].type;

    if (productType === 'Fruit') {
        const fruit = _.filter(AppData.lookup, t => t.name === name)[0];
        _.remove(AppData.fruits as ShelfData[], t => t.name === name)
        AppData.shelf = _.uniqBy([...AppData.shelf as ShelfData[], fruit], 'name')
    } else {
        const veggies = _.filter(AppData.lookup, t => t.name === name)[0];
        _.remove(AppData.veggies as ShelfData[], t => t.name === name)
        AppData.shelf = _.uniqBy([...AppData.shelf as ShelfData[], veggies], 'name')
    }

    return _.assign({}, AppData)
}

function shelfReducer(AppData: AppContextStruct, action:ReducerAction): AppContextStruct {
    switch (action.type) {
      case 'timeout': {
        return handleTimeout(AppData, action.productName as string)
      }
      case 'added': {
        return handleDelete(AppData, action.productName as string)
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }

const initialContext: AppContextStruct = {
    lookup: initialData,
    shelf: initialData,
    fruits: [],
    veggies: [],
}

export function ShelfProvider({ children }:any) {
    const [goods, dispatch ] = useReducer(shelfReducer, initialContext)

    return <>
        <ShelfContext.Provider value={goods as AppContextStruct}>
            <ShelfDispatchContext.Provider value={dispatch}>
                { children }
            </ShelfDispatchContext.Provider>
        </ShelfContext.Provider>
    </>
}
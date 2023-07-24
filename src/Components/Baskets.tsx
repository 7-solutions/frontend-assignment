import React from 'react'
import Card from './Card'
import useShelf from '../Hooks/useShelf'

function Baskets() {
    const { fruits, veggies } = useShelf()

    return <>
        <div className='flex flex-row gap-4 mt-5 h-[100%]'>
           <Card header="Fruits" goods={fruits}/>
           <Card header="Vegetables" goods={veggies}/>
        </div>
    </>
}

export default Baskets
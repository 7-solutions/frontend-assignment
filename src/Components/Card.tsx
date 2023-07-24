import React from 'react'
import { ShelfData } from '../Contexts/Shelf'

interface ICard {
    header: string
    goods: ShelfData[]
}

function Card({ header, goods }:ICard) {
    return <>
        <div className='w-[100%] h-[90%] border-slate-400 border-2'>
            <div className='p-5 bg-red-300 border-black mb-4'>
                <p className='text-center text-xl'>{header}</p>
            </div>
            <div className='w-[100%] flex flex-col items-center gap-4'>
                {goods?.map((good) => {
                    return <>
                    <div className='h-20 w-[35%] items-center border-slate-500 border-2 bg-slate-100'>
                        <p className='font-medium text-xl h-full text-center leading-[350%]'>{good.name}</p>
                    </div>
                    </>
                })}
                
            </div>
        </div>
    </>
}

export default Card
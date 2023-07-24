import React, { useEffect } from 'react'
import useShelf from '../Hooks/useShelf'
import { ShelfData } from '../Contexts/Shelf'

function Sidebar() {

    const { shelf } = useShelf()
    
    return <>
        <div className='row-start-1 col-span-1'>
            <div className='space-y-4 ml-3 mr-5 mt-5'>
                {
                    shelf.map((good:ShelfData) => {
                        return <>
                        <div className='h-20 w-[100%] text-center items-center border-2 border-slate-500 bg-slate-100'>
                            <p className='font-medium text-xl h-full text-center leading-[350%]'>{good.name}</p>
                        </div>
                        </>
                    })
                }
            </div>
        </div>
    </>
}

export default Sidebar
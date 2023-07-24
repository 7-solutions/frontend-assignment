import React, { useRef, useState } from 'react'
import useShelf from '../Hooks/useShelf'

function InputBox() {

    const nameRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState({name: ''})

    const { dispatch } = useShelf()

    const handleAddToBasket = () => {
        if (value.name) {
            dispatch({
                type: 'added',
                productName: value.name
            })
            setTimeout(() => {
                dispatch({
                    type: 'timeout',
                    productName: value.name
                })
            }, 5000)
            setValue({
                name: ''
            })
        }
    }

    const handleInputChange = () => {
        setValue({
            name: nameRef.current?.value as string
        })
    }

    return <>
        <div className='mt-5'>
            <div className='flex flex-col'>
                <p className='text-xl pb-3'>Select product</p>
                <div className='w-full'>
                    <form className='w-full flex flex-row space-x-4' onSubmit={(e) => {
                        e.preventDefault()
                        handleAddToBasket()
                        }}>
                        <input name="name" className='w-[90%] h-10' type='text' ref={nameRef} onChange={handleInputChange} value={value.name}/>
                        <button type="submit" className='bg-indigo-200 w-[10%] text-center border-2 border-slate-400 rounded-lg text-lg'>Enter</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default InputBox
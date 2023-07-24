import React from 'react'

interface IMain {
    children: JSX.Element[]
}

function Main({ children }:IMain) {

    return <>
        <div className='row-start-1 col-span-10 bg-slate-300 w-[100%]'>
            {children}
        </div>
    </>
}

export default Main
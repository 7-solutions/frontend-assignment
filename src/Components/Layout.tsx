import React, { ReactComponentElement, ReactNode } from 'react'
import '../styles/Layout.css'

interface ILayout {
    children: JSX.Element
}

function Layout({ children }: ILayout) {

    return <>
    <div className='container'>
        <div className='grid grid-rows-1 grid-flow-col'>
            {children}
        </div>        
    </div>
    </>
}

export default Layout
import React from 'react'
import "./PageHeader.css";

export default function PageHeader({title}) {
    return (
        <section className='pageHeaderSec'>
            <div className='container'>
                <h2>{title}</h2>
            </div>
        </section>
    )
}

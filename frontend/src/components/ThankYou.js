import React, {useEffect, useState} from 'react'

function ThankYou() {
let data = JSON.parse(localStorage.getItem('user'))
// setTimeout(()=> {
//     localStorage.removeItem('user')
// }, 100)

    return (
        <div className='container d-flex flex-column min-vh-100 justify-content-center align-items-center text-center'>
            <div className='card'>
                <div className='card-header'>
                    <div className='card-title fw-bolder fs-2'>
                        धन्यवाद!!!
                    </div>
                </div>
                <div className='card-body'>
                    <div className='card-text fs-3'>
                        तुमचा एकूण गुण <strong>{data.cumlativeScore.toFixed(2)}</strong> आहे
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThankYou

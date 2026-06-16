import React from 'react'
import { useNavigate } from 'react-router-dom'

const buttons = () => {
    // using navigate to send user on desired path
    let send = useNavigate()

    return (
        <div className='btn-container'>
            <button onClick={() => {
                send('/')
            }}>
                Home
            </button>
            <button onClick={() => {
                send(-1)
            }}>
                Prev
            </button>
            <button onClick={() => {
                send(+1)
            }}>
                Next
            </button>
        </div>
    )
}

export default buttons

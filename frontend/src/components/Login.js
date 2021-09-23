import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

function Login() {
    const [userId, setUserId] = useState('')
    const [sessionId, setSessionId] = useState('')
    const [day, setDay] = useState('')
    const history = useHistory();

    const handleServerResponse = (response) => {
        var data = response.data;

        if (data.userId == userId) {
            console.log(userId);
            localStorage.setItem('user', JSON.stringify(response.data))
            // console.log(response.data);
            history.push('/home')
        }
    }

    const handleServerError = (error) => {
        console.log(error.response.data);
        alert('There is an error, check data in the form.')
        alert(JSON.stringify(error.response.data))
    }

    const requestToServer = (request) => {
        axios.post('/api/user/register', request)
            .then(response => handleServerResponse(response))
            .catch(error => handleServerError(error))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        var request = {
            userId: userId,
            sessionId: sessionId,
            day: day
        }

        requestToServer(request)
    }

    return (
        <div className='d-flex flex-column min-vh-100 justify-content-center align-items-center'>
            <div className='card'>
                <div className='card-header p-3 text-center'>
                    <div className='card-title fw-bolder fs-2'>Sign In</div>
                </div>
                <div className='card-body mt-3'>
                    <p className='blockquote-footer card-text fw-bolder fst-italic'>
                        If you are an existing user enter Id, or enter name to create user.
                    </p>
                    <form className='mt-4' onSubmit={e => handleSubmit(e)}>
                        <div className="row g-3 align-items-center">
                            <div className="col">
                                <input
                                    type="text"
                                    id="userId"
                                    autoComplete='off'
                                    value={userId}
                                    className="form-control"
                                    placeholder="Enter your User-Id..."
                                    onChange={(e) => setUserId(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row g-3 align-items-center mt-1">
                            <div className="col">
                                <input
                                    type="text"
                                    id="sessionId"
                                    autoComplete='off'
                                    value={sessionId}
                                    className="form-control"
                                    placeholder="Enter Session-Id..."
                                    onChange={(e) => setSessionId(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row g-3 align-items-center mt-1">
                            <div className="col">
                                <input
                                    type="number"
                                    id="day"
                                    autoComplete='off'
                                    value={day}
                                    className="form-control"
                                    placeholder="Enter Day No..."
                                    onChange={(e) => setDay(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button type='submit' className="btn btn-dark mt-2">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login

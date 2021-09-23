import React, { useEffect, useState } from 'react'

function Login() {
    const [userId, setUserId] = useState('')
    const [sessionId, setSessionId] = useState('')
    const [day, setDay] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();

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
                    <form className='mt-4' onSubmit={(e) => handleSubmit(e)}>
                        <div class="row g-3 align-items-center">
                            <div class="col">
                                <input
                                    type="text"
                                    id="userId"
                                    value={userId}
                                    class="form-control"
                                    placeholder="Enter your User-Id..."
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                            </div>
                        </div>
                        <div class="row g-3 align-items-center mt-1">
                            <div class="col">
                                <input
                                    type="text"
                                    id="sessionId"
                                    value={sessionId}
                                    class="form-control"
                                    placeholder="Enter Session-Id..."
                                    onChange={(e) => setSessionId(e.target.value)}
                                />
                            </div>
                        </div>
                        <div class="row g-3 align-items-center mt-1">
                            <div class="col">
                                <input
                                    type="number"
                                    id="day"
                                    value={day}
                                    class="form-control"
                                    placeholder="Enter Day No..."
                                    onChange={(e) => setDay(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login

import React from 'react'
import Button from '../../Components/button'
import Login from '../../Components/login'
import Side from '../../Components/side'

import './style.css'

const Home = () => {
    return (
        <div className="cac_home">
            <Side className="cac_home_side" />
            <Login />
        </div>
    )
}

export default Home;
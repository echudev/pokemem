import React from 'react'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import title from '../img/pokemon.png'
import './Home.css'

export const Home = () => {

    return (
        <>
            <div className='menu'>
                <img src={title} alt="title" id="img-title"></img>
                <h1>Memotest</h1>
                <Link to="/Game1" style={{ textDecoration: 'none' }}><Button variant="contained" color="primary">Start</Button></Link>
            </div>
        </>
    )
}

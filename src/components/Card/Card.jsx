import React from 'react'
import './Card.css'

export default function Card (props) {
  return (
        <div className="card-container">
            <div className={props.className}>
                <div className="card-front">
                    <div className={`card-body ${props.type}`}>
                        <div className="card-header">
                            <p className="card-name">{props.name}</p>
                        </div>
                        <div className="card-img">
                            <img src={props.image}></img>
                        </div>
                        <div className="card-bottom">
                            <div className="type">
                                <div className="card-id">ID {props.pokemonID}</div>
                                <div>{props.type}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-back">
                    <div className="back-logo"></div>
                </div>
            </div>
        </div>
  )
}

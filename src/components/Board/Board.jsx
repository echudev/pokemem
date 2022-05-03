import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Board.css'
import charmander from '../../img/charmander.gif'
import { GameContext } from "../../context/GameContext";
import Card from "../Card/Card";
import { Button, Fab, Tooltip, Box, Modal, Typography, styled } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';


export const Board = () => {
    //traigo datos de la api desde el context
    const { cards, loading, error } = useContext(GameContext);
    //paso datos de la api a un estado en este componente para poder alterar el array de cartas
    const [cartas, setCartas] = useState([]);
    useEffect(() => {
        setCartas([...cards]);
    }, [cards]);

    //estado que abre el modal al terminar la partida
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    //estilos del modal
    const StyledModal = styled(Modal)({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });
    //evita que cierre el modal al hacer click en el background
    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false)
        }
    }

    //empieza una partida nueva
    const restart = () => {
        setOpen(false);
        window.location.reload();
    }


    //esta función selecciona las cartas cuando el usuario hace click en ellas
    const handlerSelectCard = (index, pokemonID) => {
        const newCartas = cartas.map((card, i) => {
            if (card.pokemonID === pokemonID && i === index && card.disabled === false) {
                return {
                    ...card,
                    className: 'card rotate',
                    selected: true
                }
            } else {
                return card
            }
        })
        setCartas(newCartas);
    }


    //primer if, chequea que haya dos cartas seleccionadas
    //2 if, chequea que las cartas seleccionadas sean iguales
    // si son iguales,las oculta, las deselecciona, y las deshabilita 
    useEffect(() => {
        if (cartas.filter(carta => carta.selected).length === 2) {
            if (cartas.filter(carta => carta.selected)[0].pokemonID === cartas.filter(carta => carta.selected)[1].pokemonID) {
                const newCartas = cartas.map(card => {
                    if (card.selected) {
                        return {
                            ...card,
                            className: 'card hide',
                            selected: false,
                            disabled: true
                        }
                    } else {
                        return card
                    }
                })
                setTimeout(() => {
                    if (newCartas.every(card => card.disabled === true)) {
                        setOpen(true)
                    }
                }, 1500)
                setTimeout(() => {
                    setCartas(newCartas);
                }, 1000);
            } else {
                const newCartas = cartas.map(card => {
                    if (card.selected) {
                        return {
                            ...card,
                            className: 'card',
                            selected: false,
                        }
                    } else {
                        return card
                    }
                })
                setTimeout(() => {
                    setCartas(newCartas);
                }, 1000);
            }
        }
    }, [cartas]);


    return (
        <div className="board-container">
            {/* boton 'volver' */}
            <Fab
                color="error"
                aria-label="back"
                size="small"
                style={{ position: 'relative', right: '20px', margin: '10px' }}
                onClick={() => setOpen2(true)}
            >
                <Tooltip title="volver">
                    <ArrowLeftIcon />
                </Tooltip>
            </Fab>
            <StyledModal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modal-box'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        ¡Ganaste!
                    </Typography>
                    <Button variant="contained" onClick={restart}>Jugar de nuevo</Button>
                    <Link to="/home" style={{ textDecoration: 'none' }}><Button variant="contained">Salir</Button></Link>
                </Box>
            </StyledModal>
            <StyledModal
                open={open2}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modal-box'>
                    <Typography id="modal-modal-title2" variant="h6" component="h2">
                        ¿Seguro deseas salir?
                    </Typography>
                    <div className='modal-buttons'>
                        <Link to="/home" style={{ textDecoration: 'none' }}><Button variant="contained" style={{ margin: '10px' }} color="error">Salir</Button></Link>
                        <Button id="btn-quedarme" variant="outlined" onClick={() => setOpen2(false)}>Quedarme</Button>
                    </div>
                </Box>
            </StyledModal>

            <div className="board">
                {loading && <img src={charmander}></img>}
                {error && <h1>{`error: ${error}`}</h1>}
                <div className="cards">
                    {cartas && cartas.map((card, key) =>
                        <div
                            key={key}
                            onClick={() => handlerSelectCard(key, card.pokemonID)}>
                            <Card
                                pokemonID={card.pokemonID}
                                name={card.name}
                                image={card.image}
                                type={card.type}
                                className={card.className} />
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

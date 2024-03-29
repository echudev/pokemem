import axios from 'axios'
import { useState, useEffect } from 'react'
import { generateRandom } from '../utils/generateRandom'
import { shuffleArray } from '../utils/shuffleArray'

export const useGetCards = (n = 6, handler) => {
  const [data, setData] = useState({
    loading: true,
    error: null,
    cards: []
  })

  const getData = async () => {
    // vacío la mano anterior de cartas
    try {
      // genero una mano de 'n' cantidad de cartas aleatorias
      let cards = []
      for (let i = 0; i < n; i++) {
        const res = await axios(`https://pokeapi.co/api/v2/pokemon/${generateRandom(1, 898)}`)
        cards = [...cards,
          {
            pokemonID: res.data.id,
            name: res.data.name,
            image: res.data.sprites.other.home.front_default,
            type: res.data.types[0].type.name,
            className: 'card',
            selected: false,
            disabled: false
          }
        ]
      }
      // duplico las cartas y las mezclo
      const shuffledCards = shuffleArray([...cards, ...cards])
      setData({
        loading: false,
        error: null,
        cards: shuffledCards
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // vacío la lista de cartas
    setData({
      loading: true,
      error: null,
      cards: []
    })
    // llamo a la función que trae 'n' cantidad de cartas
    getData()
  }, [handler])

  return [data.cards, data.loading, data.error]
}

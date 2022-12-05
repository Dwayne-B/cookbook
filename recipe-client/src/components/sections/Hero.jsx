import React from 'react'
import Searchbar from "../elements/SearchBar"
function Hero({ setRecipe }) {
  return (
    <div className=" cnt flex justify-center items-center">
      <Searchbar setRecipe={setRecipe} />

    </div>
  )
}

export default Hero
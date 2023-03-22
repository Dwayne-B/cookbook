import React from 'react';
import CardDisplay from "../sections/CardDisplay";
import Hero from "../sections/Hero";

function HomePage({ setRecipe, recipes, setData, x }) {

  return (

    <div >
      <Hero setRecipe={setRecipe} />
      <CardDisplay setRecipe={setRecipe} recipes={recipes} setData={setData} x={x} />
    </div>
  )
}
export default HomePage


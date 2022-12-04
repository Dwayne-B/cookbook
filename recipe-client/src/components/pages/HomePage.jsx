import React from 'react';
import CardDisplay from "../sections/CardDisplay";
import Hero from "../sections/Hero";
import Navigation from "../sections/Navigation";
function HomePage({ recipes, setData, x }) {
  console.log(recipes)
  return (

    <div>

      <Navigation />
      <Hero />
      <CardDisplay recipes={recipes} setData={setData} x={x} />
    </div>
  )
}
export default HomePage


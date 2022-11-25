import React from 'react'
import RecipeCards from "../elements/RecipeCards"
function CardDisplay() {
  return (
    <div className="h-screen mt-40  grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-0  justify-items-center  border-2 border-white ">
      <RecipeCards />

    </div>
  )
}

export default CardDisplay
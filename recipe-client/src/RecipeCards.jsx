import React from 'react'
import Card from "./Card"
function RecipeCards({ cardTitle }) {
  return (
    <>
      <h1>
        Recipe cards

      </h1>
      <div>
        <Card title={cardTitle} />
      </div>
    </>
  )
}

export default RecipeCards
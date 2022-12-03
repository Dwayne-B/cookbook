import React from 'react'


function CardDisplay({ recipes }) {
  console.log('recipe in compo', recipes)
  return (
    <div>
      {recipes ? recipes.map((r, i) => {
        return (<div key={i}>
          <p>{r.recipe.label}</p>
        </div>)
      }) : "null"}

    </div>
  )
}

export default CardDisplay
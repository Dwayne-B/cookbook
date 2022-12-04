import React from 'react';


function CardDisplay({ recipes, setData, x }) {
  const create = async (e, title) => {

    console.log(e, title)
    if (title) {
      await fetch(" http://localhost:5000/api/", {
        method: "POST",
        body: JSON.stringify({ title: title }),
        headers: {
          "Content-Type": "application/json",
        }
      }).then(res => res.json()).then(updatedata => { ; setData([...x, updatedata]) })
    } else {

    }

  }
  return (
    <div>
      {recipes ? recipes.map((r, i) => {
        return (<div className="h-content bg-white my-20 text-black" key={i}>
          <button onClick={(e) => {
            create(e, r.recipe.label)
          }} className="btn  w-14 rounded-full h-14 text-white bg-green-300   ">+</button>
          <h4>{r.recipe.label}</h4>
          <p>{r.recipe.cuisineType}</p>
          <p>{r.recipe.dishType}</p>
          <p>ingredients</p>
          <ul>{r.recipe.ingredients.map((ingred, i) => {
            return (<li key={i}>{ingred.text}</li>)
          })}</ul>


        </div>)
      }) : "null"}

    </div>
  )
}

export default CardDisplay
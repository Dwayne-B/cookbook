import { useRef, useState } from 'react';
import { TiPlus } from "react-icons/ti";

function CardDisplay({ setRecipe, recipes, setData, x }) {
  const [edamamQuery, setEdamamQuery] = useState('chicken')
  const [currentCard, setCurrentCard] = useState();

  const create = async (e, recipe) => {
    console.log(recipe)

    if (recipe) {
      await fetch(" https://recipe-node-project.herokuapp.com/api/", {
        method: "POST",
        body: JSON.stringify({
          label: recipe.label,
          cusineType: recipe.cuisineType[0],
          ingredients: recipe.ingredientLines
        }),
        headers: {
          "Content-Type": "application/json",
        }
      }).then(res => res.json()).then(updatedata => { ; setData([...x, updatedata]) })
    } else {

    }

  }
  const handleShow = (e) => {
    const x = (e) => {
      console.log(e.target.id)// 
      setCurrentCard(e.target.id)


    };

    currentCard === e.target.id ? setCurrentCard(null) : x(e);


  };


  return (
    <div className='px-4 mt-14 cardContainer flex flex-col sm:flex-row sm:flex-wrap  items-center sm:items-start max-w-[1100px] m-auto' >
      {recipes ? recipes.map((r, i) => {
        return (<div className={`  relative    bg-white  max-w-[30%] text-black  mb-5 mr-5 flex  flex-col w-1/2 justify-between ${currentCard === i.toString() ? "h-fit" : "min-h-[425px] max-h-[450px]"
          }
        `} key={i}>
          <button onClick={(e) => {
            create(e, r.recipe)
          }} className="  absolute -top-[10px] -right-[10px]
           w-14 rounded-full h-14 text-white bg-green-300  text-2xl "><TiPlus className="m-auto" /></button>
          <img src={r.recipe.images.REGULAR.url} alt="" />

          <span className={`  p-4  `}>
            <h4>{r.recipe.cuisineType}:  {r.recipe.label}</h4>

            <p>Dish type: {r.recipe.dishType}</p>
            <p>ingredients</p>
            <hr />
            {currentCard === i.toString() ?
              <ul>{r.recipe.ingredients.map((ingred, i) => {
                return (<li key={i}>{ingred.text}</li>)
              })}</ul> : null}

          </span>
          <button id={i} onClick={(e) => {
            console.log(e.target.id)
            handleShow(e)
          }} className="bg-blue-300 " >{currentCard === i.toString() ? "hide ingredients" : "Show ingredients"}</button>
        </div>)
      }) : "null"}

    </div>
  )
}

export default CardDisplay
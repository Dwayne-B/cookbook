import { useState } from 'react';
// import { json } from 'react-router-dom';
import CreateCard from '../elements/createCard';

function SavedCardsPage({ x, setData, }) {

  const [editState, setEditState] = useState(false);
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState({

    label: "",
    cusineType: "",
    ingredients: []

  });
  const [currentCard, setCurrentCard] = useState();

  const handleShow = (e) => {
    setShow(!show);
    setEditState(false)
    currentCard === e.target.id && setCurrentCard(null);
    setCurrentCard(e.target.id);
  };

  const handleUpdate = (e) => {
    setUpdate((prevState) => {

      const property = e.target.name;
      if (property === "ingredients") {
        console.log("ing")

        let ing = e.target.value.split([","]);
        prevState[property] = ing;
        return { ...prevState };
      } else {
        prevState[property] = e.target.value;
        console.log("label/cusine type")
        return { ...prevState };
      }


    });

  }



  const handle = (e, recipe) => {
    currentCard === e.target.id && setCurrentCard(null);
    console.log(e.target.innerHTML)

    if (e.target.innerHTML === "edit") {
      setCurrentCard(e.target.id);
      setEditState(true);
      setShow(false);
      setUpdate((prevState) => {

        prevState = {
          label: recipe.label,
          cusineType: recipe.cusineType,
          ingredients: recipe.ingredients
        }
        return prevState;

      });


    } else if (e.target.innerHTML === "submit") {
      setEditState(false);
      setShow(false);

      console.log("fetch", editState);
      console.log("fetch", update);

      fetch(`http://localhost:5000/api/updateCard/${e.target.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          label: update.label,
          cusineType: update.cusineType,
          ingredients: update.ingredients

        }),
        headers: {
          "Content-Type": "application/json",
        }


      }).then(res => res.json()).then((data) => {

        setData(x.map((recipe, i) => {
          if (recipe._id === e.target.id) {
            console.log("to change", recipe)
            recipe.label = update.label
            recipe.cusineType = update.cusineType
            recipe.ingredients = update.ingredients
          }
          return recipe;
        }))

      });

    } else if (e.target.innerHTML === "Delete") {
      // delete
      fetch(`http://localhost:5000/api/deleteCard/${e.target.id}`, {
        method: 'DELETE',
      }).then((res) => { res.json() }).then((data) => {

        setData(x.filter((recipe) => { return recipe._id != e.target.id }))
      });
    }

  }




  return (
    <div className=" flex flex-col items-center  mt-14 min-h-[100vh]">


      <CreateCard x={x} setData={setData} />
      <div className='px-4 mt-14 cardContainer flex flex-col sm:flex-row sm:flex-wrap  items-center sm:items-start max-w-[1100px] m-auto  '>
        {x ? x.map((recipe, i) => {

          return (
            <div className={` bg-white min-w-[191.391px] max-w-[30%] text-black  mb-5 mr-5 flex  flex-col w-1/2  justify-between${currentCard === recipe._id && show ? "bg-red-500 h-fit " : "min-h-[225px] max-h-[250px]"
              }
        `} id={recipe._id} >



              <span className={`p-4`} key={i} >
                {currentCard === recipe._id && editState === true ? <input name="label" type="text" placeholder=" recipe name" className=" w-40 border flex justify-between" value={
                  update.label
                } onChange={handleUpdate} /> : <h4>{recipe.label}</h4>}
                {currentCard === recipe._id && editState === true ? <input name="cusineType" type="text" placeholder=" Dish type" className=" w-40 border flex justify-between" value={
                  update.cusineType
                } onChange={handleUpdate} /> : <p>Dish type: {recipe.cusineType}</p>}



                <p>ingredients</p>
                <hr />
                {currentCard === recipe._id && editState === true ? <input name="ingredients" type="text" placeholder="ingredients" className=" w-40 border flex justify-between" value={
                  update.ingredients
                } onChange={handleUpdate} /> :


                  currentCard === recipe._id && show ?
                    <ul>

                      {recipe.ingredients.map((ing, i) => {

                        return (<li>{ing}</li>)
                      })}

                    </ul> : null




                }


              </span>
              <button id={recipe._id} className="bg-blue-700" type='submit' onClick={(e) => {
                handle(e, recipe)
              }}>{currentCard === recipe._id && editState === true ? "Submit" : "Edit"}
              </button >
              <button id={recipe._id} className="bg-red-700" type='submit' onClick={(e) => {
                handle(e)
              }}>Delete</button >


              <button id={recipe._id} onClick={(e) => {
                console.log(e.target.id)
                handleShow(e)
              }} className="bg-blue-300 " >{currentCard === recipe._id && show ? "Hide ingredients" : "Show ingredients"}</button>
            </div>

          )

        }) : <p>nothing yet</p>}
      </div>

    </div >
  )
}

export default SavedCardsPage
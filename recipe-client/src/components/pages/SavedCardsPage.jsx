import { useState } from 'react';
// import { json } from 'react-router-dom';
import CreateCard from '../elements/createCard';

function SavedCardsPage({ x, setData, }) {

  const [editState, setEditState] = useState(false);
  const [update, setUpdate] = useState('');
  const [currentCard, setCurrentCard] = useState();

  const handleShow = (e) => {
    const x = (e) => {
      console.log(e.target.id)// 
      setCurrentCard(e.target.id)


    };

    currentCard === e.target.id ? setCurrentCard(null) : x(e);


  };

  const handleUpdate = (e) => {
    setUpdate(e.target.value);


  }


  const handle = (e) => {
    currentCard === e.target.id ? setCurrentCard(null) : null
    if (e.target.innerHTML === "edit" && !editState) {
      setEditState(!editState);

      setCurrentCard(e.target.id);
      setUpdate('')
      // setEditState(!editState);

      if (update === '') {
        setUpdate(() => {

          const label = x.filter((r) => {
            return r._id === e.target.id
          })
          console.log('updatedTItle', label[0].label);

          return label[0].label
        });


      }





    } else if (e.target.innerHTML === "submit" && editState) {
      setEditState(!editState);

      if (update !== '' && update.length > 0 && e.target.id === currentCard) {
        console.log("IF", editState)
        setData((prevState) => {
          console.log('update', update);

          const updatedData = prevState.map((r, i) => {
            if (r._id === e.target.id) {
              r.label = update;
            }
            return r;
          })

          console.log("updatedData", updatedData);
          return updatedData
        });

        setUpdate('')

        console.log("fetch", editState);
        console.log("fetch", update);

        fetch(`http://localhost:5000/api/updateCard/${e.target.id}`, {
          method: "PATCH",
          body: JSON.stringify({ label: update }),
          headers: {
            "Content-Type": "application/json",
          }


        })
      }




    }
    else if (e.target.innerHTML === "Delete") {
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
            <div className={` bg-white min-w-[191.391px] max-w-[30%] text-black  mb-5 mr-5 flex  flex-col w-1/2  justify-between${currentCard === recipe._id ? "bg-red-500 h-fit " : "min-h-[225px] max-h-[250px]"
              }
        `} id={recipe._id} >

              {currentCard === recipe._id && editState === true ? <input id={recipe._id} type="text" key={i} className=" w-40 border flex justify-between" value={
                update
              } onChange={handleUpdate} /> : null}

              <span className={`  p-4  `}>
                <h4>{recipe.label}</h4>

                <p>Dish type: {recipe.cusineType}</p>
                <p>ingredients</p>
                <hr />
                {currentCard === recipe._id ?
                  <ul>
                    <li>hello</li>
                    {recipe.ingredients.map((ing, i) => {

                      return (<li>{ing}</li>)
                    })}

                  </ul> : null
                }

              </span>
              <button id={recipe._id} className="bg-blue-700" type='submit' onClick={handle}>{currentCard === recipe._id && editState ? "submit" : "edit"}
              </button >
              <button id={recipe._id} className="bg-red-700" type='submit' onClick={handle}>Delete</button >


              <button id={recipe._id} onClick={(e) => {
                console.log(e.target.id)
                handleShow(e)
              }} className="bg-blue-300 " >{currentCard === recipe._id ? "hide ing" : "show ing"}</button>
            </div>

          )

        }) : <p>nothing yet</p>}
      </div>

    </div >
  )
}

export default SavedCardsPage
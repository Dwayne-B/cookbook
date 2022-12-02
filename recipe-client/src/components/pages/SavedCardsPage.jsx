import { useState } from 'react';
import { json } from 'react-router-dom';

function SavedCardsPage({ x, setData, }) {
  const [input, setInput] = useState("inti")
  const [editState, setEditState] = useState(false);
  const [update, setUpdate] = useState('');
  const [currentCard, setCurrentCard] = useState();

  const handleInput = (e) => {
    setInput(e.target.value);

  }
  const handleUpdate = (e) => {
    setUpdate(e.target.value);


  }
  const handleSubmit = (e) => {
    e.preventDefault();

    create();
    setInput("");
  }

  const handle = (e) => {
    setEditState(!editState);
    currentCard === e.target.id ? setCurrentCard(null) : null
    if (e.target.innerHTML === "edit" && !editState) {
      setCurrentCard(e.target.id);
      setUpdate('')
      // setEditState(!editState);

      if (update === '') {
        setUpdate(() => {

          const title = x.filter((r) => {
            return r._id === e.target.id
          })
          console.log('updatedTItle', title[0].title);

          return title[0].title
        });


      }

      console.log("before IF", editState)



    } else if (e.target.innerHTML === "submit" && editState) {
      if (update !== '') {
        console.log("IF", editState)
        setData((prevState) => {
          console.log('update', update);

          const updatedData = prevState.map((r, i) => {
            if (r._id === e.target.id) {
              r.title = update;
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
          body: JSON.stringify({ title: update }),
          headers: {
            "Content-Type": "application/json",
          }


        })
      }




    }
    else {
      // delete
      // fetch(`http://localhost:5000/api/deleteCard/${e.target.id}`, {
      //   method: 'DELETE',


      // }).then((res) => { res.json(); }).then((data) => {
      //   setData(x.filter((recipe) => { return recipe._id != e.target.id }))
      // });
    }

  }
  const create = async () => {

    if (input.length > 0) {
      await fetch(" http://localhost:5000/api/", {
        method: "POST",
        body: JSON.stringify({ title: input }),
        headers: {
          "Content-Type": "application/json",
        }
      }).then(res => res.json()).then(updatedata => { ; setData([...x, updatedata]) })
    } else {

    }

  }

  return (
    <div className="h-screen  ">
      <form method="post" required>
        <input value={input} onChange={handleInput} type='text' required name="newCard" id="" />
        <button className="bg-black " type="submit" onClick={handleSubmit}>Create New Recipie</button>
      </form>

      <div className='flex flex-wrap justify-between p-8  '>
        {x ? x.map((recipe, i) => {

          return (
            <div id={recipe._id} >
              {<p>{recipe.title}</p>}
              {currentCard === recipe._id && <input id={recipe._id} type="text" key={i} className=" w-40 border flex justify-between" value={
                update
              } onChange={handleUpdate} />}
              <button id={recipe._id} className="bg-blue-700" type='submit' onClick={handle}>{currentCard === recipe._id ? "submit" : "edit"}</button ><button id={recipe._id} className="bg-red-700" type='submit' onClick={handle}>X</button >

            </div>

          )

        }) : <p>nothing yet</p>}
      </div>

    </div >
  )
}

export default SavedCardsPage
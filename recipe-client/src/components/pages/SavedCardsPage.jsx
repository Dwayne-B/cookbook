import { useState } from 'react';

function SavedCardsPage({ x, setData, }) {
  const [input, setInput] = useState("inti")
  const [edit, setEdit] = useState(false);
  const [editCardTitle, setEditCardTitle] = useState('new title');
  const handleInput = (e) => {
    setInput(e.target.value);

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input)
    create();
    setInput("");
  }
  const handleEdit = () => {
    console.log(0)
  }
  const handle = (e) => {
    if (e.target.innerHTML === "edit") {
      console.log(e.target)
      // edit
      console.log("edit", e.target.value)
      fetch(`http://localhost:5000/api/updatecard/${e.target.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ title: editCardTitle }),
        headers: {
          "Content-Type": "application/json",
        }


      }).then((res) => { res.json(); }).then((data) => {
        console.log('JSONdata', data);
      })
    } else {
      // delete
      fetch(`http://localhost:5000/api/deleteCard/${e.target.id}`, {
        method: 'DELETE',


      }).then((res) => { res.json(); }).then((data) => {
        console.log('JSONdata', data); setData(x.filter((recipe) => { return recipe._id != e.target.id }))
      });
    }

  }
  const create = async () => {
    console.log(input)
    if (input.length > 0) {
      await fetch(" http://localhost:5000/api/", {
        method: "POST",
        body: JSON.stringify({ title: input }),
        headers: {
          "Content-Type": "application/json",
        }
      }).then(res => res.json()).then(updatedata => { console.log(updatedata); setData([...x, updatedata]) })
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
          const title = edit ? <input type="text"></input> : <span>{recipe.title}</span>
          return (

            <p key={i} className=" w-40 border flex justify-between">{title}<button id={recipe._id} className="bg-blue-700" type='submit' onClick={handle}>edit</button ><button id={recipe._id} className="bg-red-700" type='submit' onClick={handle}>X</button ></p>
          )

        }) : <p>nothing yet</p>}
      </div>

    </div >
  )
}

export default SavedCardsPage
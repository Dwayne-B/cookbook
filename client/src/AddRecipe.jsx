import { useState } from 'react';

function AddRecipe({ getCards }) {

  const [userInput, setUserInput] = useState("");


  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api", {
      method: "POST",
      body: JSON.stringify({
        title: userInput
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(() => {
      getCards();
    })
    setUserInput("");

  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value)
  }

  return (
    <>
      <h1>
        AddRecipe

      </h1>
      <form onSubmit={handleFormSubmit}  >
        <label htmlFor="formInpt">
          <input onChange={handleUserInput} value={userInput} />
          <button type='submit' >click me</button>
        </label>
      </form>
    </>
  )
}

export default AddRecipe
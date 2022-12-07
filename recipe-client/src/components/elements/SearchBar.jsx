import { useState } from 'react';

function SearchBar({ setRecipe }) {
  const [searchQuery, setSearchQuery] = useState()
  const handleinpt = (e) => {
    setSearchQuery(e.target.value)
  }
  const fetchRecipies = async (e) => {
    console.log(searchQuery)
    e.preventDefault();
    await fetch("http://localhost:5000/edamamApi", {
      method: "POST",
      body: JSON.stringify({ query: searchQuery }),
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json()).then(data => {
      console.log("FWETCH DATA", data);
      setRecipe(data);
      setSearchQuery('')


    })


  };
  return (
    <div>
      <form >
        <input value={searchQuery} type="text" onChange={handleinpt} />
        <button onClick={fetchRecipies} className=" px-2 bg-amber-400 " type="submit">Get Recipe</button>
      </form>
    </div>
  )
}

export default SearchBar
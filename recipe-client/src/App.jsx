import { useEffect, useState } from 'react';
import AddRecipe from './AddRecipe';
import RecipeCards from './RecipeCards';

function App() {
  const getCards = async () => {
    const data = await fetch("http://localhost:3000/api", {
      headers: {
        'Accept': 'application/json'
      }
    }).then(async (res) => {
      const resDataJson = await res.json()
      console.log(resDataJson);
      setCardTitle(resDataJson);

    }).catch(err => console.error(err))
  };

  const [cardTitle, setCardTitle] = useState();
  // useEFFECT
  const getRecipeTitle = useEffect(() => {

    try { getCards() } catch { console.error("error fetching data") }
  }, [])

  return (
    <div className="App">
      <RecipeCards cardTitle={cardTitle} />
      <AddRecipe getCards={getCards} />
    </div>
  )
}

export default App

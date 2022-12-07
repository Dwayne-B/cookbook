
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from './components/elements/NavLinks';
import HomePage from "./components/pages/HomePage";
import NotFound from './components/pages/NotFound';
import SavedCardsPage from "./components/pages/SavedCardsPage";
import "./css/main.css";
function App() {
  const [currentPage, setCurPage] = useState('home');
  const url = "http://localhost:5000/api  ";
  const [recipes, setRecipe] = useState();
  console.log(currentPage)
  const [x, setData] = useState();

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await fetch(url).then(data => data.json())
        setRecipe(res.recipeAPI)
        setData(res.savedCards)
      }

      getData();




    } catch (error) {
      console.error(error);
    }
  }, [])

  return (
    <div className='App ' >
      <BrowserRouter  >
        <Nav />

        <Routes>

          <Route index exact path='/' element={<HomePage recipes={recipes} setRecipe={setRecipe} setData={setData} x={x} />} />
          <Route exact path="SavedCardsPage"
            element={<SavedCardsPage x={x} setData={setData} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>






      </BrowserRouter>
    </div>
  )
}

export default App



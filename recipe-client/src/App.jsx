
import { useEffect, useState } from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from './components/elements/NavLinks';
import HomePage from "./components/pages/HomePage";
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
      const getRecipe = async () => {
        const res = await fetch("http://localhost:5000/edamamApi").then(data => data.json()).then(data => {
          console.log(data.hits)

        })
        setRecipe(res);

      }

      getData();
      // getRecipe();
    } catch (error) {
      console.error(error);
    }
  }, [])

  return (
    <div className='App' >
      <BrowserRouter  >

        <Routes>

          <Route index exact path='/' element={<HomePage recipes={recipes} setData={setData} x={x} />} />
          <Route exact path="SavedCardsPage"
            element={<SavedCardsPage x={x} setData={setData} />} />
        </Routes>






      </BrowserRouter>
    </div>
  )
}

export default App



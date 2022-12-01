
import { useEffect, useState } from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import SavedCardsPage from "./components/pages/SavedCardsPage";

import "./css/main.css";
function App() {
  const [currentPage, setCurPage] = useState('home');
  const url = "http://localhost:5000/api  ";
  console.log(currentPage)
  const [x, setData] = useState();

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await fetch(url).then(data => data.json())
        setData(res)
      }

      getData();
    } catch (error) {
      console.error(error);
    }
  }, [])

  return (
    <div className='App' >
      <BrowserRouter  >
        <Routes>

          <Route index exact path='/' element={<HomePage />} />


          <Route exact path="SavedCardsPage"
            element={<SavedCardsPage x={x} setData={setData} />} />
        </Routes>






      </BrowserRouter>
    </div>
  )
}

export default App




import { useEffect, useState } from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./components/pages/Page";
import "./css/main.css";
function App() {
  const [currentPage, setCurPage] = useState('home');
  console.log(currentPage)

  return (
    <div className='App' >
      <BrowserRouter  >
        <Routes>

          <Route index path='/' element={<Page />} currentPage={currentPage} />


          <Route path="full"
            element={<Page />} />
        </Routes>


      </BrowserRouter>
    </div>
  )
}

export default App

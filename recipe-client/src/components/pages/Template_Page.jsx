import React from 'react';
import { useLocation } from "react-router-dom";
import Navigation from "../sections/Navigation";
import HomePage from './HomePage';
import SavedCardsPage from "./SavedCardsPage";
function TemplatePage({ Data }) {

  const location = useLocation();
  console.log(location)
  return (
    <>
      <Navigation className="" />
      {/* combine hero and carddisplay into one homePage component */}
      {location.pathname === "/SavedCardsPage" ? <SavedCardsPage Data={Data} /> : <HomePage />}

    </>
  )
}

export default TemplatePage
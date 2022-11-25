import React from 'react'

import CardDisplay from "../sections/CardDisplay"
import Hero from "../sections/Hero"
import Navigation from "../sections/Navigation"
function Page({ currentPage }) {
  console.log(currentPage)
  return (
    <>
      <Navigation />
      <Hero />
      <CardDisplay />
    </>
  )
}

export default Page
import React from 'react'
import Hero from '../components/Hero.jsx'
import LatestCollection from '../components/LatestCollection.jsx'
import Bestseller from '../components/Bestseller.jsx'
import Ourpolicy from '../components/Ourpolicy.jsx'
import Newsletterbox from '../components/Newsletterbox.jsx'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <Bestseller/>
      <Ourpolicy/>
      <Newsletterbox/>
  
    </div>
  )
}

export default Home

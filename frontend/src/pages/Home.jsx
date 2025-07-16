import React from 'react'
import Hero from '../components/HeroSection'
import Section1 from '../components/Section1'
import Section2 from '../components/Section2'
import RecentListings from '../components/RecentListings'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Section1/>
        <RecentListings/>
        <Section2/>
    </div>
  )
}

export default Home
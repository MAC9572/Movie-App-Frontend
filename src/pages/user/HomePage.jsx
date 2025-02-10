import React from 'react'
import {RecommendedMovies } from './RecommendedMovies';
import CarouselPage from '../../components/user/CarouselPage';


export const HomePage = () => {
  return (
    <>
      <section>
        <CarouselPage/>
  </section>
  <section>
  <RecommendedMovies/>
  </section>
  </>
  )
}

export default HomePage
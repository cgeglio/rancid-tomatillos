import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import lemon from '../../Assets/lemon.png';
import './Loading.css';

const Loading = () => {
  return (
    <section>
      <p className='loading-text'>loading...</p>
      <img src={lemon} alt='loading lemon' className='lemon-img'/>
    </section>
  )
}

export default Loading;

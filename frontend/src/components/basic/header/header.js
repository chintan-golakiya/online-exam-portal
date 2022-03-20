import React from 'react';
import main from './main.jpg';
import './header.css';

export const HomepageHeader = (props)=>{
  return (
    <div>
      <div className='header-container-2'>
        <img src={main} alt='Logo' className="logo"/>
      </div>
    </div>
  );
}
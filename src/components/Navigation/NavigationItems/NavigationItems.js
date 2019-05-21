import React from 'react';
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const checkActive = (match, location) => {
  //some additional logic to verify you are in the home URI
  if(!location) return false;
  const {pathname} = location;
  console.log(pathname);
  return pathname === "/";
}

const navigationItems = () => (
      <ul className='NavigationItems'>
        <NavigationItem link="/" isActive={checkActive}> Burger Builder</NavigationItem>
        <NavigationItem link="/orders"> Orders </NavigationItem>
      </ul>
)


export default navigationItems;
import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop';

const SideDrawer = props => {
    let attachClasses = ['SideDrawer','Close']
    if(props.open) {
        attachClasses = ['SideDrawer','Open']
    }

  return (
    <React.Fragment>
      <BackDrop show={props.open} clicked={props.closed}/>
      <div className={attachClasses.join(' ')}>
        <div className="SideDrawer__Logo">
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;

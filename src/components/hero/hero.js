import React from 'react';
import styles from "./hero.module.css";

import MainSlider from './../mainSlider/mainSlider';
import Navigation from '@/components/navigation/navigation';

const Hero = (props) => {
  return (
    <div className={styles.hero_container}>
      <Navigation />
      <MainSlider search={props.search}  />
    </div>
  );
}

export default Hero;
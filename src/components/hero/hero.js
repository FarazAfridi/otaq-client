import React from 'react';
import styles from "./hero.module.css";

import MainSlider from './../mainSlider/mainSlider';
import Navigation from '@/components/navigation/navigation';

const Hero = () => {
  return (
    <div className={styles.hero_container}>
      <Navigation />
      <MainSlider />
    </div>
  );
}

export default Hero;
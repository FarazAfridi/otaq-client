import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import sindhImg from "@/assets/sindh.jpg";
import sindhImg2 from "@/assets/sindh2.jpg";
import sindhImg3 from "@/assets/sindh3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./mainStyle.module.css";
import Header from './../header/header';

const MainSlider = () => {
  return (
    <>
      <div className={`${styles["main-slider"]} main-slider`}>
        <Header />
        <Carousel  className={styles.carousel} showStatus={false} showThumbs={false}>
          <div>
            <Image src={sindhImg} alt=""/>
          </div>
          <div >
            <Image src={sindhImg2} alt=""/>
          </div>
          <div >
            <Image src={sindhImg3} alt=""/>
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default MainSlider;
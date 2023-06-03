import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import sindhImg from "@/assets/sindh.jpg";
import sindhImg2 from "@/assets/sindh2.jpg";
import sindhImg3 from "@/assets/sindh3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./mainStyle.module.css";
import Reservation from '../reservation/reservation';

const MainSlider = (props) => {
  return (
    <>
      <div className={`${styles["main-slider"]} main-slider`}>
      <Reservation search={props.search} />
     
        <Carousel showThumbs={false}  className={styles.carousel} autoPlay={6000} infiniteLoop={true} showIndicators={false} showStatus={false} >
          <div>
            <Image src={sindhImg} width={2000} height={2000} alt=""/>
          </div>
          <div >
            <Image src={sindhImg2} width={2000} height={2000} loading='lazy' alt=""/>
          </div>
          <div >
            <Image src={sindhImg3} width={2000} height={2000} loading='lazy' alt=""/>
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default MainSlider;
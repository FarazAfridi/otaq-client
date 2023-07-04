import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";

const Card = (props) => {
  const router = useRouter();
  const places = props.places.slice(-2)
  console.log(places)
  return (
    <div className={styles.cards} id="places">
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <h1
          style={{ marginBottom: "15px", fontWeight: "600", fontSize: "30px" }}
        >
          Recommended Home
        </h1>
        <p style={{ fontSize: "20px", marginBottom: "20px" }}>
          Alluring home where you can stay and enjoy a comfortable life.
        </p>
      </div>

      {places.map((place, i) => (
        <div key={place._id.toString()} className={styles.card}>
          <Carousel
            showStatus={false}
            interval={2000}
            infiniteLoop={false}
            autoPlay={true}
            transitionTime={500}
            showThumbs={false}
            showIndicators={false}
          >
            <div className={styles.card__image_container}>
              <Image
                onClick={() => {
                  router.push(`/place/${place._id.toString()}`);
                }}
                src={'data:image/jpeg;base64,' + place.roomOne.images[0].data.toString('base64')}
                width={300}
                height={300}
                alt=""
              />
            </div>
            <div className={styles.card__image_container}>
              <Image
                onClick={() => {
                  router.push(`/place/${place._id.toString()}`);
                }}
                src={'data:image/jpeg;base64,' + place.roomTwo.images[1].data.toString('base64')}
                width={300}
                height={300}
                alt=""
              />
            </div>
            <div className={styles.card__image_container}>
              <Image
                onClick={() => {
                  router.push(`/place/${place._id.toString()}`);
                }}
                src={'data:image/jpeg;base64,' + place.roomThree.images[2].data.toString('base64')}
                width={300}
                height={300}
                alt=""
              />
            </div>
          </Carousel>
          <div
            className={styles["card--details"]}
            onClick={() => {
              router.push(`/place/${place._id.toString()}`);
            }}
          >
          
            <div className={styles.col}>
              <p className={styles.card__name}>{place.name}</p>
              <div className={styles.card__price_container}>
                <span className={styles.card__price}>Rs{place.roomOne.price}</span>
                <span className={styles.card__night}>/night</span>
              </div>
            </div>
            <div className="divider"></div>
            <div className={styles["card--info"]}>
              <p className={styles.card__distance}>{place.roomOne.name}</p>
              <p className={styles.card__date}>{place.roomTwo.name}</p>
              <p className={styles.card__date}>{place.roomThree.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;

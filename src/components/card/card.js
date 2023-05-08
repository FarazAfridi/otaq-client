import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";

const Card = () => {
  const [places, setPlace] = useState([]);
  console.log(places);

  useEffect(() => {
    async function getPlaces() {
      const resp = await fetch(
        "https://otaq-api.onrender.com/places/get/approved"
      );
      const data = await resp.json();
      setPlace(data);
    }
    getPlaces();
  }, []);

  const router = useRouter();
  return (
    <div className={styles.cards}>
      {places.map((place, i) => (
        <div
          key={place._id.toString()}
          className={styles.card}
          onClick={() => {
            router.push(`/place/${place._id.toString()}`);
          }}
        >
            <Carousel
              showStatus={false}
              interval={2000}
              infiniteLoop={false}
              autoPlay={true}
              transitionTime={500}
              showThumbs={false}
            >
              <div className={styles.card__image_container}>
                <Image
                  src={`https://otaq-api.onrender.com/${place.images[0]}`}
                  width={300}
                  height={300}
                  alt=""
                />
              </div>
              <div className={styles.card__image_container}>
                <Image
                  src={`https://otaq-api.onrender.com/${place.images[1]}`}
                  width={300}
                  height={300}
                  alt=""
                />
              </div>
              <div className={styles.card__image_container}>
                <Image
                  src={`https://otaq-api.onrender.com/${place.images[2]}`}
                  width={300}
                  height={300}
                  alt=""
                />
              </div>
            </Carousel>
          <div>
            <div className={styles.card__name}>
              <p>{place.name}</p>
            </div>
            <div className={styles.card__distance}>
              <p>3000 m elevation</p>
            </div>
            <div className={styles.card__date}>
              <p>April 5-10</p>
            </div>
            <div className={styles.card__price_container}>
              <span className={styles.card__price}>Rs{place.price} </span>
              <span className={styles.card__night}>night</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;

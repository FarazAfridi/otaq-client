import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./card.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { useRouter } from "next/router";

export default function NewCard(props) {
  const router = useRouter();
  const places = props.places;
  const imagesrc =
    "https://images.pexels.com/photos/533769/pexels-photo-533769.jpeg?cs=srgb&dl=pexels-pixabay-533769.jpg&fm=jpg";

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

      <ul style={{}} className="items">
        {places.map((place) => {
          const liked = props.favourites.includes(place._id);
          return (
            <li key={place._id.toString()}>
            
            <div
              className={styles.parent}
            >
              <Image
                onClick={() => props.handleFavourites(place._id)}
                className={styles.card__icon}
                src={liked ? "/images/heart_full.png" : "/images/heart.png"}
                width={30}
                height={30}
                alt="like"
              />
            </div>

                <div className="images">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={1}
                    pagination={{
                      clickable: true,
                      dynamicBullets: true,
                      dynamicMainBullets: 8,
                    }}
                    navigation={{
                      nextEl: `.swiper-button-nextx${place._id}`,
                      prevEl: `.swiper-button-prevx${place._id}`,
                    }}
                    allowTouchMove={false}
                  >
                    {[
                      
                        place.roomOne.images[0].data,
                     
                        place.roomTwo.images[1].data,
                     
                        place.roomThree.images[0].data,
                    ].map((picture) => {
                      return (
                        <SwiperSlide key={picture}>
                          <Image
                            src={picture}
                            width={500}
                            height={500}
                            alt="some place"
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className={`swiper-button-prevx${place._id} btnn prev`}
                  >
                    <PrevIcon />
                  </button>{" "}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className={`swiper-button-nextx${place._id} btnn next`}
                  >
                    <NextIcon />
                  </button>
                </div>
                <div className="text" onClick={() => router.push(`/place/${place._id.toString()}`)}>
                  <div className="up">
                    <p className="city">{place.city}</p>
                    <div className="rate">
                      <StarIcon />
                      <p>4.56</p>
                    </div>
                  </div>
                  <div className="view">{place.name}</div>
                  <div className="date">Aug 20 - 25</div>
                  <div className="price">
                    <span>Rs {place.roomOne.price} </span>
                    night
                  </div>
                </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const NextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    display="block"
    height="12px"
    width="12px"
    fill="none"
    stroke="currentcolor"
    stroke-width="5.33333"
    overflow="visible"
  >
    <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path>
  </svg>
);

const PrevIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    display="block"
    height="12px"
    width="12px"
    fill="none"
    stroke="currentcolor"
    stroke-width="5.33333"
    overflow="visible"
  >
    <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path>
  </svg>
);

export const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    display="block"
    height="12px"
    width="12px"
    fill="currentcolor"
  >
    <path
      fillRule="evenodd"
      d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
    ></path>
  </svg>
);

import styles from "@/components/card/card.module.css";
import Layout from "@/components/layout/layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function SinglePlace() {
  const router = useRouter();
  const { cid } = router.query;
  const [places, setPlaces] = useState(null);
  const [arePlacesLoaded, setArePlacesLoaded] = useState(false);

  console.log(arePlacesLoaded, places)

  useEffect(() => {
    if (!router.isReady) return;
    const getPlaces = async (values) => {
      const url = "https://otaq-api.onrender.com/places/get/approved?city=" + cid;
      const resp = await fetch(url);
      if (resp.ok) {
        const data = await resp.json();
        setPlaces(data);
        setArePlacesLoaded(true);
      }
    };
    getPlaces();
  }, [router.isReady]);

  return (
    <Layout>
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
            style={{
              marginBottom: "15px",
              fontWeight: "600",
              fontSize: "30px",
            }}
          >
            Recommended Home
          </h1>
          <p style={{ fontSize: "20px", marginBottom: "20px" }}>
            Alluring home where you can stay and enjoy a comfortable life.
          </p>
           {!arePlacesLoaded ? <Image className="loading" src="/loading.svg" alt="loading" width={32} height={32}/> : null}
        </div>

        {arePlacesLoaded && places.length !== 0
          ? places.map((place, i) => (
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
                      <span className={styles.card__price}>
                        Rs{place.price}
                      </span>
                      <span className={styles.card__night}>/night</span>
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className={styles["card--info"]}>
                    <p className={styles.card__distance}>3000m elevation</p>
                    <p className={styles.card__date}>{place.roomType}</p>
                  </div>
                </div>
              </div>
            ))
          : <h1>No Search Result Found</h1>}
      </div>
    </Layout>
  );
}

import Card from "@/components/card/card";
import Footer from "@/components/footer/footer";
import Hero from "@/components/hero/hero";
import Layout from "@/components/layout/layout";
import Testimonials from "./../components/testimonials/testimonials";
import { useEffect, useState } from "react";
import TopDestinations from "@/components/top-destinations/topDestinations";
import NewCard from "@/components/card/newCard";
import { headers } from "next.config";

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [favourites, setFavourites] = useState([]);

  async function addToFavourites (placeId) {

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://otaq-api.onrender.com/places/add/favourites",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            placeId,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    }

  }

  async function removeFromFavourites (placeId) {

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://otaq-api.onrender.com/places/remove/favourites",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            placeId,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    }

  }

  const handleFavourites = async (id) => {
    if (!id) return;
    if (favourites.length > 0) {
      const exist = favourites.find(fav => fav === id);
      if (exist) {
        const removeItem = favourites.filter((fav) => fav !== id);
        removeFromFavourites(id)
        setFavourites(removeItem);
      } else {
        addToFavourites(id)
        setFavourites((prev) => [...prev, id]);     
      }
    } else {
      addToFavourites(id)
      setFavourites([id]);
    }
  };

  useEffect(() => {
    async function getPlaces() {
      const resp = await fetch(
        "https://otaq-api.onrender.com/places/get/approved",{
          headers: {
              "Content-Type": "application/json",     
          }
        }
      );
      const data = await resp.json();

      setPlaces(data);
    }

    const getFavourites = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://otaq-api.onrender.com/places/get/favourites",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setFavourites(data);
        console.log(data);
      }
    };

    getFavourites();
    getPlaces();
  }, []);

  const handleSearch = async (values) => {
    if (!values.query && !values.city) return;
    if (values.city) {
      const url =
        "https://otaq-api.onrender.com/places/get/approved?city=" +
        values.city +
        "&searchquery=" +
        values.query;
      const resp = await fetch(url);
      if (resp.ok) {
        const data = await resp.json();
        setPlaces(data);
        document
          .getElementById("places")
          .scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div>
      <Hero search={handleSearch} />
      <Layout>
        <div className="divider"></div>
         {/* <Search handleSearch={handleSearch} />  */}
        <div className="divider"></div>
      </Layout>
      <div className="full-width">
        <Layout>
          <TopDestinations />
        </Layout>
      </div>
      <Layout>
        {/* <Card
          handleFavourites={handleFavourites}
          favourites={favourites}
          places={places}
        /> */}
        <NewCard 
          handleFavourites={handleFavourites}
          favourites={favourites}
          places={places}
        />
      </Layout>
      <div className="full-width">
        <Layout>
          <Testimonials />
        </Layout>
      </div>
      <Layout>
        <Footer />
      </Layout>
    </div>
  );
}

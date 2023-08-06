import Card from "@/components/card/card";
import Footer from "@/components/footer/footer";
import Hero from "@/components/hero/hero";
import Layout from "@/components/layout/layout";
import Testimonials from "./../components/testimonials/testimonials";
import { useEffect, useState } from "react";
import TopDestinations from "@/components/top-destinations/topDestinations";

export default function Home() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function getPlaces() {
      const resp = await fetch(
        "https://otaq-api.onrender.com/places/get/approved"
      );
      const data = await resp.json();

      setPlaces(data);
    }
    getPlaces();
  }, []);

  const handleSearch = async (values) => {
    if(!values.query && !values.city) return;
    if(values.city) { 
    const url =
      "https://otaq-api.onrender.com/places/get/approved?city=" +
      values.city +
      "&searchquery=" +
      values.query
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      setPlaces(data);
      document.getElementById("places").scrollIntoView({ behavior: "smooth" });
    }
  }
  };

  return (
    <div>
      <Hero search={handleSearch} />
      <Layout>
        <div className="divider"></div>
        {/* <Search handleSearch={handleSearch} /> */}
        <div className="divider"></div>
      </Layout>
      <div className="full-width">
        <Layout>
          <TopDestinations />
        </Layout>
      </div>
      <Layout>
        <Card places={places} />
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

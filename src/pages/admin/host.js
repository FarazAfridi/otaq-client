import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/vendor.module.css";
import uploadIcon from "@/assets/upload-icon2.svg";
import Footer from "@/components/footer/footer";
import Navigation from "@/components/navigation/navigation";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Host() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [city, setCity] = useState(null);
  const [description, setDescription] = useState(null);
  const [token, setToken] = useState("");

  const router = useRouter()

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);


  const previewImages = (img) => {
    const image = URL.createObjectURL(img);
    return <img className={styles.preview_image} src={image} />;
  };

  async function addPlace(e) {
    e.preventDefault();
    const formData = new FormData();
    console.log(file);
    for (let i = 0; i < file.length; i++) {
      formData.append("images", file[i]);
    }

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("roomType", roomType);
    formData.append("city", city);
    formData.append("persons", capacity);
    try {
      const response = await fetch("https://otaq-api.onrender.com/add/approved", {
      method: "POST",
      headers: {
        Authorization: `bearar ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    console.log(data)
    toast("Place added successfully", { hideProgressBar: true, autoClose: 2000, type: 'success' })
    router.push("/admin")
    } catch (error) {
      toast.error("Error", { hideProgressBar: true, autoClose: 2000, type: 'failure' })
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles["nav--container"]}>
        <Navigation />
      </div>
      <div className={styles.form__main_container}>
        <form
          className={styles["form"]}
          onSubmit={addPlace}
          encType="multipart/form-data"
        >
          <h1 className={styles.main_heading}>Host A Place</h1>
          <div className="col">
            <input
              className={styles.input}
              type="text"
              name=""
              id=""
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={styles.input}
              type="number"
              name=""
              id=""
              placeholder="Capacity"
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              className={styles.input}
              type="number"
              name=""
              id=""
              placeholder="Rent"
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              className={styles.input}
              type="text"
              name=""
              id=""
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <select
            className={styles["select"]}
            onChange={(e) => setRoomType(e.target.value)}
            name="roomType"
          >
            <option selected disabled hidden>
              Room Type
            </option>
            <option value="">None</option>
            <option value="Normal">Normal</option>
            <option value="Air Conditioned">Air Conditioned</option>
          </select>
          
          <textarea
            className={styles.textarea}
            name=""
            id=""
            cols="20"
            rows="2"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></textarea>

          <input
            onChange={(e) => {
              const newFiles = [];
              for (let i = 0; i < e.target.files.length; i++) {
                newFiles.push(e.target.files[i]);
              }
              setFile((prev) => (prev ? [...prev, ...newFiles] : newFiles));
            }}
            name="images"
            multiple
            className={styles["image--input"]}
            type="file"
            id="file_input"
          />
          <label className={styles.label} htmlFor="file_input" name="images">
            <Image className={styles.img} src={uploadIcon} alt="" /> Choose A
            Photo
          </label>

          <div className={styles.images}>
            {file ? file.map((file) => previewImages(file)) : ""}
          </div>

          <button className={styles.button} type="submit">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

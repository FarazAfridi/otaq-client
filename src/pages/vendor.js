import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/vendor.module.css";
import uploadIcon from "@/assets/upload-icon2.svg";
import Header from "@/components/search/search";
import Footer from "@/components/footer/footer";
import Navigation from "@/components/navigation/navigation";

export default function Admin() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [imagesSrc, SetImagesSrc] = useState(null);
  const [token, setToken] = useState("");

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

    const response = await fetch("https://otaq-api.onrender.com/places/add", {
      method: "POST",
      headers: {
        Authorization: `bearar ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    SetImagesSrc(data.images);
    console.log(data);
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
          <h1 className={styles.main_heading}>Vendor</h1>

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
            type="text"
            name=""
            id=""
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            className={styles.textarea}
            name=""
            id=""
            cols="30"
            rows="4"
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
            <Image className={styles.img} src={uploadIcon} alt="" />{" "}
            Choose A Photo
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

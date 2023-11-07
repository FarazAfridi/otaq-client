import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/vendor.module.css";
import uploadIcon from "@/assets/upload-icon2.svg";
import Footer from "@/components/footer/footer";
import Navigation from "@/components/navigation/navigation";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Host() {
  const [room1Images, setRoom1Images] = useState(null);
  const [room1Name, setRoom1Name] = useState(null);
  const [room1Description, setRoom1Description] = useState(null);
  const [room1Price, setRoom1Price] = useState(null);
  const [room1Capacity, setRoom1Capacity] = useState(null);

  const [room2Images, setRoom2Images] = useState(null);
  const [room2Name, setRoom2Name] = useState(null);
  const [room2Description, setRoom2Description] = useState(null);
  const [room2Price, setRoom2Price] = useState(null);
  const [room2Capacity, setRoom2Capacity] = useState(null);

  const [room3Images, setRoom3Images] = useState(null);
  const [room3Name, setRoom3Name] = useState(null);
  const [room3Description, setRoom3Description] = useState(null);
  const [room3Price, setRoom3Price] = useState(null);
  const [room3Capacity, setRoom3Capacity] = useState(null);

  const [name, setName] = useState(null);

  const [city, setCity] = useState(null);
  const [description, setDescription] = useState(null);
  const [token, setToken] = useState("");

  const router = useRouter();

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

    for (let i = 0; i < room1Images.length; i++) {
      formData.append("room1", room1Images[i]);
    }

    for (let i = 0; i < room2Images.length; i++) {
      formData.append("room2", room2Images[i]);
    }

    for (let i = 0; i < room3Images.length; i++) {
      formData.append("room3", room3Images[i]);
    }

    formData.append("name", name);
    formData.append("description", description);
    formData.append("city", city.charAt(0).toUpperCase() + city.slice(1));

    formData.append("room1Name", room1Name);
    formData.append("room1Description", room1Description);
    formData.append("room1Capacity", room1Capacity);
    formData.append("room1Price", room1Price);

    formData.append("room2Name", room2Name);
    formData.append("room2Description", room2Description);
    formData.append("room2Capacity", room2Capacity);
    formData.append("room2Price", room2Price);

    formData.append("room3Name", room3Name);
    formData.append("room3Description", room3Description);
    formData.append("room3Capacity", room3Capacity);
    formData.append("room3Price", room3Price);

    try {
      const response = await fetch(
        "https://otaq-api.onrender.com/places/add",
        {
          method: "POST",
          headers: {
            Authorization: `bearar ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();

      toast("Place added successfully", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
    //   router.push({
    //     pathname: '/admin',
    //     query: { tab: 'places' },
    // })
    } catch (error) {
      toast("Error", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
      console.log(error);
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
          <div className={styles["room--container"]}>
            <div className={styles["inputs"]}>
              <select
                className={styles["select"]}
                onChange={(e) => setRoom1Name(e.target.value)}
                name="roomType"
              >
                <option selected disabled hidden>
                  Room Type
                </option>
                <option value="">None</option>
                <option value="Normal">Normal</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Executive">Executive</option>
                <option value="Super Deluxe">Super Deluxe</option>
              </select>
              <textarea
                className={styles.textarea}
                name=""
                id=""
                cols="20"
                rows="2"
                onChange={(e) => setRoom1Description(e.target.value)}
                placeholder="Room 1 Description"
              ></textarea>
              <input
                className={styles.input}
                type="text"
                name=""
                id=""
                placeholder="Room 1 Rent"
                onChange={(e) => setRoom1Price(e.target.value)}
              />
              <input
                className={styles.input}
                type="number"
                name=""
                id=""
                placeholder="Room 1 Capacity"
                onChange={(e) => setRoom1Capacity(e.target.value)}
              />
            </div>
            <div className={styles["images"]}>
              <input
                onChange={(e) => {
                  const newFiles = [];
                  for (let i = 0; i < e.target.files.length; i++) {
                    newFiles.push(e.target.files[i]);
                  }
                  setRoom1Images((prev) =>
                    prev ? [...prev, ...newFiles] : newFiles
                  );
                }}
                name="room1"
                multiple
                className={styles["image--input"]}
                type="file"
                id="file_input"
              />
              <label
                className={styles.label}
                htmlFor="file_input"
                name="images"
              >
                <Image className={styles.img} src={uploadIcon} alt="" /> Choose
                A Photo
              </label>
              <div className={styles.images}>
                {room1Images
                  ? room1Images.map((file) => previewImages(file))
                  : ""}
              </div>
            </div>
          </div>
          <div className={styles["room--container"]}>
            <div className={styles["inputs"]}>
              <select
                className={styles["select"]}
                onChange={(e) => setRoom2Name(e.target.value)}
                name="roomType"
              >
                <option selected disabled hidden>
                  Room Type
                </option>
                <option value="">None</option>
                <option value="Normal">Normal</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Executive">Executive</option>
                <option value="Super Deluxe">Super Deluxe</option>
              </select>
              <textarea
                className={styles.textarea}
                name=""
                id=""
                cols="20"
                rows="2"
                onChange={(e) => setRoom2Description(e.target.value)}
                placeholder="Room 2 Description"
              ></textarea>
              <input
                className={styles.input}
                type="text"
                name=""
                id=""
                placeholder="Room 2 Rent"
                onChange={(e) => setRoom2Price(e.target.value)}
              />
              <input
                className={styles.input}
                type="number"
                name=""
                id=""
                placeholder="Room 2 Capacity"
                onChange={(e) => setRoom2Capacity(e.target.value)}
              />
            </div>
            <div className={styles["images"]}>
              <input
                onChange={(e) => {
                  const newFiles = [];
                  for (let i = 0; i < e.target.files.length; i++) {
                    newFiles.push(e.target.files[i]);
                  }
                  setRoom2Images((prev) =>
                    prev ? [...prev, ...newFiles] : newFiles
                  );
                }}
                name="room2"
                multiple
                className={styles["image--input"]}
                type="file"
                id="file_input2"
              />
              <label
                className={styles.label}
                htmlFor="file_input2"
                name="images"
              >
                <Image className={styles.img} src={uploadIcon} alt="" /> Choose
                A Photo
              </label>
              <div className={styles.images}>
                {room2Images
                  ? room2Images.map((file) => previewImages(file))
                  : ""}
              </div>
            </div>
          </div>
          <div className={styles["room--container"]}>
            <div className={styles["inputs"]}>
              <select
                className={styles["select"]}
                onChange={(e) => setRoom3Name(e.target.value)}
                name="roomType"
              >
                <option selected disabled hidden>
                  Room Type
                </option>
                <option value="">None</option>
                <option value="Normal">Normal</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Executive">Executive</option>
                <option value="Super Deluxe">Super Deluxe</option>
              </select>

              <textarea
                className={styles.textarea}
                name=""
                id=""
                cols="20"
                rows="2"
                onChange={(e) => setRoom3Description(e.target.value)}
                placeholder="Room 3 Description"
              ></textarea>
              <input
                className={styles.input}
                type="text"
                name=""
                id=""
                placeholder="Room 3 Rent"
                onChange={(e) => setRoom3Price(e.target.value)}
              />
              <input
                className={styles.input}
                type="number"
                name=""
                id=""
                placeholder="Room 3 Capacity"
                onChange={(e) => setRoom3Capacity(e.target.value)}
              />
            </div>
            <div className={styles["images"]}>
              <input
                onChange={(e) => {
                  const newFiles = [];
                  for (let i = 0; i < e.target.files.length; i++) {
                    newFiles.push(e.target.files[i]);
                  }
                  setRoom3Images((prev) =>
                    prev ? [...prev, ...newFiles] : newFiles
                  );
                }}
                name="room3"
                multiple
                className={styles["image--input"]}
                type="file"
                id="file_input3"
              />
              <label
                className={styles.label}
                htmlFor="file_input3"
                name="images"
              >
                <Image className={styles.img} src={uploadIcon} alt="" /> Choose
                A Photo
              </label>

              <div className={styles.images}>
                {room3Images
                  ? room3Images.map((file) => previewImages(file))
                  : ""}
              </div>
            </div>
          </div>
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
              type="text"
              name=""
              id=""
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <textarea
            className={styles.textarea}
            name=""
            id=""
            cols="20"
            rows="2"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></textarea>

          <button className={styles.button} type="submit">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

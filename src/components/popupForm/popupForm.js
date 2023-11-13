import { useRouter } from "next/router";
import { useState } from "react";
import Popup from "reactjs-popup";

export default function PopupForm(props) {

  const router = useRouter()

  const [roomPrice, setRoomPrice] = useState({
    roomOnePrice: props.price[0],
    roomTwoPrice: props.price[1],
    roomThreePrice: props.price[2],
  });

  function handleForm() {
    props.updateListing(
      props.id,
      roomPrice.roomOnePrice,
      roomPrice.roomTwoPrice,
      roomPrice.roomThreePrice
    );
  }

  return (
    <Popup
      trigger={<button className="button">{props.buttonText}</button>}
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>

          <div>
            <input type="text" value="some place" />
            <label>Deluxe Price</label>
            <input
              onChange={(e) =>
                setRoomPrice({ ...roomPrice, roomOnePrice: e.target.value })
              }
              type="number"
              value={roomPrice.roomOnePrice}
            />
            <label>Executive Price</label>
            <input
              onChange={(e) =>
                setRoomPrice({ ...roomPrice, roomTwoPrice: e.target.value })
              }
              type="number"
              value={roomPrice.roomTwoPrice}
            />
            <label>Super Deluxe Price</label>
            <input
              onChange={(e) =>
                setRoomPrice({ ...roomPrice, roomThreePrice: e.target.value })
              }
              type="number"
              value={roomPrice.roomThreePrice}
            />
            <button onClick={handleForm}>Submit</button>
          </div>

          <div className="actions">
            <Popup
              trigger={<button className="button"> Trigger </button>}
              position="top center"
              nested
            ></Popup>
            <button
              className="button"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

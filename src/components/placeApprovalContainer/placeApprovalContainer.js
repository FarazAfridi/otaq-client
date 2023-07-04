import PlaceApproval from "../placeApproval/placeApproval";

export default function PlaceApprovalContainer (props) {
  return (
    <>
    {props.unapprovedPlace.map((uPlace) => uPlace.hasOwnProperty('roomOne') ? (
      <PlaceApproval
        approvedPlaces={props.approvedPlaces}
        key={uPlace._id}
        id={uPlace._id}
        name={uPlace.name}
        description={uPlace.description}
        price={uPlace.roomOne.price}
        images={[uPlace.roomOne.images[0], uPlace.roomTwo.images[1], uPlace.roomThree.images[2]] }
      />
    ) : null)}
    </>
  )
}
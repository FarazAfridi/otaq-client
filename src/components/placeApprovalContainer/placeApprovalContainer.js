import PlaceApproval from "../placeApproval/placeApproval";

export default function PlaceApprovalContainer (props) {
  return (
    <>
    {props.unapprovedPlace.map((uPlace) => (
      <PlaceApproval
        approvedPlaces={props.approvedPlaces}
        key={uPlace._id}
        id={uPlace._id}
        name={uPlace.name}
        description={uPlace.description}
        price={uPlace.price}
        images={uPlace.images}
      />
    ))}
    </>
  )
}
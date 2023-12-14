import styles from "./testimonial.module.css"
import Testimonial from './testimonial';
import image from "@/assets/pfp.svg"
import { Carousel } from "react-responsive-carousel";
function Testimonials() {
  return (
    <Carousel showThumbs={false} showStatus={false} interval={2000} infiniteLoop={true} autoPlay={true} transitionTime={500} swipeable={false} >
      <div className={styles["testimonials--container"]} id="testimonials">
        <Testimonial imageLink={image} username="Ayesha" userText="I had an amazing time on my trip to Kenjar Lake. The scenery was breathtaking and the locals were incredibly friendly. I highly recommend visiting!" />
        <Testimonial imageLink={image} username="Sarah" userText="I am so glad I booked my vacation through this tourism site. The staff was friendly and professional and the trip exceeded all of my expectations. I had an amazing time and can't wait to book my next vacation with them!" />
        <Testimonial imageLink={image} username="Simran" userText="The tour package I booked through this tourism site was absolutely incredible. From the luxurious accommodations to the exciting activities, everything was perfectly planned and executed. I would definitely book through them again!" />
      </div>
      <div className={styles["testimonials--container"]}>
        <Testimonial imageLink={image} username="Kamran" userText="My family and I had a fantastic time on our [destination] adventure. The tour guide was knowledgeable and entertaining, and we learned so much about the history and culture of the area. We will definitely be returning!" />
        <Testimonial imageLink={image} username="Ali" userText="I recently went on a solo trip to Rooplo kohi resort and I couldn't have had a better experience. The locals were welcoming and friendly, and there were so many unique things to do and see and love the place." />
        <Testimonial imageLink={image} username="Sameer" userText="My partner and I decided to book a romantic getaway through this tourism site and it was the best decision we could have made. The accommodations were beautiful and the activities were perfectly tailored!" />
      </div>
    </Carousel>
  )
}

export default Testimonials;
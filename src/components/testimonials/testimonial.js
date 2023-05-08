import styles from "./testimonial.module.css"
import Image from 'next/image';

function Testimonial(props) {
  return (
    <div className={styles.testimonial}>
      <Image className={styles.testimonial__pfp} src={props.imageLink} alt="some image" />
      <span className={styles.testimonial__username}>{props.username}</span>
      <p className={styles.testimonial__usertext}>{props.userText}</p>
    </div>
  )
}

export default Testimonial;
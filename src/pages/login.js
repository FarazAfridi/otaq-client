import styles from "@/styles/login.module.css";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import google from "@/assets/google.png"
import facebook from "@/assets/facebook.png"
import apple from "@/assets/apple-logo.png"
import emailImage from "@/assets/email.png"
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push("/")
    }
  }, [router])

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await fetch("https://otaq-api.onrender.com/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    })
    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.userRole)
      router.push('/')
    }

  }

  return (
    <div className={styles.login__container}>
      <div className={styles.main_container}>
        <div className={styles.container}>
          <h2 className={styles.heading_1}>Log in</h2>
          <hr />
          <form onSubmit={handleSubmit} className={styles.login_form}>
            <h1 className={styles.heading_2}>Welcome to Ottaq</h1>

            <input type="text" name="" id="" placeholder="EMAIL" className={styles.Username} onChange={(e) => setEmail(e.target.value)} />


            <input type="password" name="" id="" placeholder="PASSWORD" className={styles.Password} onChange={(e) => setPassword(e.target.value)} />


            <p className={styles.text}>We’ll call or text you to confirm your number. Standard message and data rates apply.</p>
            <a href="#" className={styles.privacy_policy}>Privacy Policy</a>

            <button type="submit" className={styles.btn}>Continue</button>



            <div className={styles.lines}></div>
            <div className={styles.or}>OR</div>

            <div className={styles.signup}>
              <a href=""><Image src={facebook} alt="" className={styles.img}></Image> Continue With Facebook</a>
              <a href=""> <Image src={google} alt="" className={styles.img}></Image> Continue With Google</a>
              <a href=""> <Image src={apple} alt="" className={styles.img}></Image>Continue With Apple</a>
              <a href=""> <Image src={emailImage} alt="" className={styles.img}></Image> Continue With email</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

{/* <form onSubmit={handleSubmit}>
<input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
<input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
<button type="submit">Login</button>
</form> */}
import { useEffect, useState } from "react"
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from "@/styles/login.module.css"
import google from "@/assets/google.png"
import facebook from "@/assets/facebook.png"
import apple from "@/assets/apple-logo.png"
import emailImage from "@/assets/email.png"
import Link from "next/link";
import { toast } from "react-toastify";

export default function Registration () {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      router.push("/")
    }
  },[router])

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await fetch("https://otaq-api.onrender.com/auth/signup", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: username,
        email,
        password
      })
    })
    const data = await response.json()
    router.push('/login')
    toast("User registered successfully", { hideProgressBar: true, autoClose: 2000, type: 'success' })
  }

  return (
    <div className={styles.login__container}>
    <div className={styles.main_container}>
      <div className={styles.container}>
        <h2 className={styles.heading_1}>Sign up</h2>
        <hr />
        <form onSubmit={handleSubmit} className={styles.login_form}>
          <h1 className={styles.heading_2}>Welcome to Ottaq</h1>

          <input type="text" name="" id="" placeholder="NAME" className={styles.Username} onChange={(e) => setUsername(e.target.value)} />

          <input type="text" name="" id="" placeholder="EMAIL" className={styles.Password} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" name="" id="" placeholder="PASSWORD" className={styles.Username} onChange={(e) => setPassword(e.target.value)} />

          <p className={styles.text}>Have an account ? <Link style={{color: 'black', fontWeight: 400 }} href="/login">Login.</Link></p>
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
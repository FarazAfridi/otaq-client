import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import 'reactjs-popup/dist/index.css';
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

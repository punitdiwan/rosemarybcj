import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
// import SimpleReactLightbox from "simple-react-lightbox";
import 'react-calendar/dist/Calendar.css';

function MyApp({ Component, pageProps }) {
  return <>

    
      <Component {...pageProps} />
    
  </>
}

export default MyApp

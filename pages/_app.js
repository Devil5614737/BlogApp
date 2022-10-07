import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from '../context/AuthContext';
import { BlogContextProvider } from '../context/BlogContext';

function MyApp({ Component, pageProps }) {
  return <AuthContextProvider>
  <BlogContextProvider>
  <Component {...pageProps} />
  </BlogContextProvider>
  </AuthContextProvider>
}

export default MyApp

import '../styles/globals.css'
// Pulling helpful hook from from react firebase
import { useAuthState } from 'react-firebase-hooks/auth'
import { db, auth } from '../firebase'
import Login from './login'
import Loading from './loading'

function MyApp({ Component, pageProps }) {
  // Goes to firebase and checks if theirs a user logged in if their is they get assigned user
  const [user, loading] = useAuthState(auth)

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />
}

export default MyApp

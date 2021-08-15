import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import ContextProvider from '../context';
import theme from '../theme';
import '../index.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={ theme }>
      <ContextProvider>
        <>
          <Head>
            <link rel="icon" href="/images/heineken_ico.png" />
            <title>Delivery App</title>
          </Head>
          <Component {...pageProps} />
        </>
      </ContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
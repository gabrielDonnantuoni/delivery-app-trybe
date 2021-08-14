import { ThemeProvider } from '@material-ui/core/styles';
import ContextProvider from '../context';
import theme from '../theme';
import '../index.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={ theme }>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
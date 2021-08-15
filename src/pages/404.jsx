import Img from 'next/image';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import blanckCanvas from '../../public/images/blank_canvas.svg';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    position: 'relative',
  },
  messages: {
    position: 'absolute',
    zIndex: 10,
    marginLeft: '20px',
    top: 0,
    left: 0,
    '& > h2,h3': {
      fontFamily: 'Style Script',
    },
  },
}));

export default function Page404() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Grid container className={ classes.root }>
      <Grid className={ classes.wrap }>
        <Grid item className={ classes.messages }>
          <Typography variant="h2">Oops...</Typography>
          <Typography variant="h3">404</Typography>
        </Grid>
        <Img src={ blanckCanvas } alt="not found page" />
      </Grid>
      <Button
        type="button"
        variant="contained"
        onClick={ () => router.push('/login') }
        color="primary"
      >
        Voltar para Home
      </Button>
    </Grid>
  );
}
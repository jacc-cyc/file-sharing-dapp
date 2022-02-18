import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const cards = [1, 2, 3, 4, 5, 6];

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">

            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Explore Shared Files
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Here you can explore variety of files shared from other users. To let your files being listed here and share to the public,
               just press below button and upload your file.
            </Typography>

            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Share to Public
                  </Button>
                </Grid>
              </Grid>
            </div>

          </Container>
        </div>
        
        <Container className={classes.cardGrid} maxWidth="md">

          {/* End hero unit */}

          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>

                  {/* image */}
                  <CardMedia
                    className={classes.cardMedia}
                    image="/images/NFT.jpg"
                    title="Image title"
                  />

                  {/* Description */}
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Sample File
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>

                  {/* Button */}
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Get
                    </Button>
                  </CardActions>
                  
                </Card>
              </Grid>
            ))}
          </Grid>

        </Container>

      </main>

    </React.Fragment>
  );
}
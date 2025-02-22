import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCocktails } from '../../features/cocktails/cocktailsSlice';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchAllCocktails } from '../../features/cocktails/cocktailsThunks';
import { Card, CardContent, CardMedia } from '@mui/material';
import { apiUrl } from '../../globalConstants';
import Button from '@mui/material/Button';

const MainPage = () => {
  const cocktails = useAppSelector(selectCocktails);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCocktails());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Cocktails
        </Typography>
        <Grid container spacing={3}>
          {cocktails.map((cocktail) => (
            <Grid key={cocktail._id} component='div'>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  src={`${apiUrl}/${cocktail.image}`} // Путь к изображению
                  alt={cocktail.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {cocktail.name}
                  </Typography>
                  <Link to={`/cocktail/${cocktail._id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    Read more
                  </Link>
                </CardContent>
                <Button variant='contained'>Publish</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MainPage;
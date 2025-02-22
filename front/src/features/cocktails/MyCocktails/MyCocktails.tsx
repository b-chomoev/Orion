import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCocktails } from '../cocktailsSlice';
import { useEffect } from 'react';
import { fetchMyCocktails } from '../cocktailsThunks';
import Typography from '@mui/material/Typography';
import { selectUser } from '../../users/usersSlice';
import { Card, CardContent, CardMedia } from '@mui/material';
import { apiUrl } from '../../../globalConstants';

const MyCocktails = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const cocktails = useAppSelector(selectCocktails);

  useEffect(() => {
    dispatch(fetchMyCocktails());
  }, [dispatch]);

  return (
    <>
      {user && (
        <Typography variant="h4" gutterBottom>
          {user.displayName}'s cocktails
        </Typography>
      )}
      {cocktails.map((cocktail) => (
        <Card key={cocktail._id} sx={{ mb: 2, maxWidth: 600 }}>
          {cocktail.image && (
            <CardMedia
              component="img"
              height="200"
              image={`${apiUrl}/${cocktail.image}`}
              alt={cocktail.name}
              sx={{ objectFit: 'cover' }}
            />
          )}
          <CardContent>
            <Typography variant="h6">{cocktail.name}</Typography>
            <Typography variant="body2">
              {cocktail.recipe}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Ingredients:</strong>
            </Typography>
            {cocktail.ingredients.map((ing, i) => (
              <Typography key={i} variant="body2">
                • {ing.name}: {ing.amount}
              </Typography>
            ))}
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default MyCocktails;
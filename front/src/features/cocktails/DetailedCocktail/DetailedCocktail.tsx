import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectOneCocktail } from '../cocktailsSlice';
import { fetchOneCocktail } from '../cocktailsThunks';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { apiUrl } from '../../../globalConstants';
import { Cocktail } from '../../../types';
import StarIcon from '@mui/icons-material/Star';

const DetailedCocktail = () => {
  const { id } = useParams<{ id: string }>();
  const cocktail = useAppSelector(selectOneCocktail) as Cocktail;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOneCocktail(id));
    }
  }, [dispatch, id]);

  return (
    <>
      {cocktail && (
        <Box
          sx={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
          }}
        >
          <Card
            sx={{
              maxWidth: 800,
              width: '100%',
              borderRadius: 4,
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              overflow: 'hidden',
            }}
          >
            <CardMedia
              component="img"
              height="400"
              src={`${apiUrl}/${cocktail.image}`}
              alt={cocktail.name}
              sx={{
                objectFit: 'cover',
                filter: 'brightness(0.9)',
                borderBottom: '4px solid #1976d2',
              }}
            />
            <CardContent sx={{ padding: 4 }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  color: '#1976d2',
                  textAlign: 'center',
                  marginBottom: 2,
                }}
              >
                {cocktail.name}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Ingredients:
              </Typography>
              <List sx={{ marginBottom: 4 }}>
                {cocktail.ingredients.map((ingredient, index) => (
                  <ListItem key={index} sx={{ padding: 0 }}>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${ingredient.name} – ${ingredient.amount}`}
                      sx={{ color: '#333', fontSize: '1.1rem' }}
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Recipe:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.6,
                  color: '#555',
                  backgroundColor: '#f9f9f9',
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)',
                }}
              >
                {cocktail.recipe}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
};

export default DetailedCocktail;
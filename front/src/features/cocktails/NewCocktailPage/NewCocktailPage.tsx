import React, { ChangeEvent, FormEvent, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Button, TextField, Typography, Container } from '@mui/material';
import { CocktailMutation } from '../../../types';
import FileInput from '../../../components/FileInput/FileInput';
import { useAppDispatch } from '../../../app/hooks';
import { createCocktail } from '../cocktailsThunks';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
  name: '',
  recipe: '',
  ingredients: '',
  image: null,
};

const NewCocktailPage = () => {
  const [form, setForm] = useState<CocktailMutation>(initialState);
  const [ingredients, setIngredients] = useState<{ name: string; amount: string }[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();

    dispatch(createCocktail({ ...form, ingredients: JSON.stringify(ingredients) }));
    setForm(initialState);
    navigate('/');
    toast.success('Cocktail created successfully, and your cocktail on admin review');
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const addIngredient = () => {
    setIngredients((prev) => [...prev, { name: '', amount: '' }]);
  };

  const deleteIngredient = (index: number) => {
    setIngredients(ingredients.filter((_ing, i) => i !== index));
  };

  const onChangeIngredientsInputs = (i: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setIngredients(ingredients.map((ing, index) => {
      if (index === i) {
        return { ...ing, [name]: value };
      }
      return ing;
    }));
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={submitFormHandler}>
        <Grid container direction="column" spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">Name of the cocktail</Typography>
            <TextField
              id="name"
              name="name"
              label="Cocktail name"
              required
              value={form.name}
              onChange={inputChangeHandler}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">Ingredients</Typography>
            <Grid container direction="column" spacing={2}>
              {ingredients.map((ing, i) => (
                <Grid key={i}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 5 }}>
                      <TextField
                        name="name"
                        label="Name"
                        required
                        value={ing.name}
                        onChange={(e) => onChangeIngredientsInputs(i, e)}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid size={{ xs: 5 }}>
                      <TextField
                        type="number"
                        name="amount"
                        label="Amount"
                        required
                        value={ing.amount}
                        onChange={(e) => onChangeIngredientsInputs(i, e)}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                      {ingredients.length > 1 && (
                        <Button type="button" onClick={() => deleteIngredient(i)} size="small">
                          <DeleteIcon />
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Button type="button" onClick={addIngredient} variant="outlined" sx={{ mt: 2 }}>
              + Add new ingredient
            </Button>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">Рецепт</Typography>
            <TextField
              id="recipe"
              name="recipe"
              label="Recipe"
              required
              value={form.recipe}
              onChange={inputChangeHandler}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">Image</Typography>
            <FileInput name="image" label="Image" onGetFile={fileEventChangeHandler} />
          </Grid>

          <Grid container justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
              Create Cocktail
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default NewCocktailPage;
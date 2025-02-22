import { CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './features/users/LoginPage';
import RegisterPage from './features/users/RegisterPage';
import NewCocktailPage from './features/cocktails/NewCocktailPage/NewCocktailPage';
import MainPage from './containers/MainPage/MainPage';
import DetailedCocktail from './features/cocktails/DetailedCocktail/DetailedCocktail';
import MyCocktails from './features/cocktails/MyCocktails/MyCocktails';

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>

      <main>
        <Container maxWidth='xl'>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/cocktail/:id' element={<DetailedCocktail />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/new-cocktail' element={<NewCocktailPage />} />
            <Route path='/cocktails/my' element={<MyCocktails />} />
            <Route path='*' element={<h3>Not Found</h3>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
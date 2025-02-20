import { CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './features/users/LoginPage';
import RegisterPage from './features/users/RegisterPage';

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
            <Route path='/' element={<h3>Here is going to be the main page</h3>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='*' element={<h3>Not Found</h3>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
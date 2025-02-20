import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
      <AppBar position="sticky" sx={{mb: 2}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <Link to="/">Orion Bar Menu</Link>
          </Typography>

          {user ?
              <>
                <UserMenu user={user}/>
              </>
              :
              <>
                <AnonymousMenu/>
              </>
          }
        </Toolbar>
      </AppBar>
  );
};

export default AppToolbar;

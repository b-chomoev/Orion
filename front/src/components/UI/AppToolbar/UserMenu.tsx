import { Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../../types';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser, unsetUser } from '../../../features/users/usersSlice';
import { logout } from '../../../features/users/usersThunks';
import { useNavigate } from 'react-router-dom';

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userAdmin = useAppSelector(selectUser);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        dispatch(logout());
        dispatch(unsetUser());
    };

    return (
        <>
            <Button color="inherit" onClick={handleClick}>
                Hello, {user.displayName}
            </Button>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {userAdmin && userAdmin.role === 'admin' && <MenuItem onClick={() => {
                    navigate('/admin');
                    setAnchorEl(null);
                }}
                >
                    Admin
                </MenuItem>}
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;

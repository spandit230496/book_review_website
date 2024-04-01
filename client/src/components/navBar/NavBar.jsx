import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { filterBooks } from '../../redux/bookSlice';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    const { value } = event.target;
    dispatch(filterBooks(value));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <AppBar position="sticky" sx={{ marginBottom: 3, bgcolor: 'black', height: "10vh" }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex'}}>
          <Link to="/books" style={{ textDecoration: 'none' }}>
            <IconButton
              size="large"
              color="inherit"
              aria-label="home"
              sx={{ mr: 2 }}
            >
              <h5>Book Review</h5>
            </IconButton>
          </Link>
        </div>
        < div sx={{width:"50%"}}>
          <Link to="/books" style={{ textDecoration: 'none' }}>
            <IconButton
              size="large"
              color="inherit"
              aria-label="home"
             
            >
              <HomeIcon />
              <h6>Books</h6>
            </IconButton>
          </Link>

          <Link to="/favorites" style={{ textDecoration: 'none' }}>
            <IconButton
              size="large"
              color="inherit"
              aria-label="favorites"
              sx={{ mr: 2 }}
            >
              <FavoriteIcon />
              <h6>Favorites</h6>
            </IconButton>
          </Link>
          {token ? (
            <Button onClick={handleLogout} sx={{
              background:"red",
              color:"white",
            }}>Logout</Button>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button>Login</Button>
            </Link>
          )}
        </div>
        {token ?
          <div
            sx={{
              position: 'relative',
              borderRadius: 2,
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'lightgray',
              },
              width: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <>
              <InputBase
                placeholder="Search by title, author, or genre…"
                sx={{
                  '& input': {
                    width: '100%',
                    padding: '8px 12px',
                    border: 'none',
                    outline: 'none',
                    fontSize: 'inherit',
                    color: 'white',
                    background: 'transparent'
                  },
                  '& input::placeholder': {
                    color: 'white',
                  },
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearch}
              />
              <IconButton
                size="large"
                color="inherit"
                aria-label="search"
                sx={{ position: 'absolute', right: 0 }}
              >
                <SearchIcon />
              </IconButton>
            </>
          </div> : null}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

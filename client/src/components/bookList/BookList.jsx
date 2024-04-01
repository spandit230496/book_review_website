import React, { useEffect, useState } from 'react';
import BookCard from '../bookCard/BookCard';
import { Grid, Typography, Button } from '@mui/material'; // Removed unnecessary import of Select
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setBooks } from '../../redux/bookSlice';
import axios from 'axios';

const BookList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const filteredBooks = useSelector(state => state.books.filteredBooks);
  const [sortBy, setSortBy] = useState('title'); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:8080/books?page=${currentPage}&limit=${pageSize}&sortBy=${sortBy}`);
        dispatch(setBooks(data.docs));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, dispatch, pageSize, sortBy]); 

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <div>
      <div style={{ width:"50%", display: 'flex', justifyContent: 'center', alignItems:"center"}}>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</Button>
        <Button variant="contained" onClick={handleNextPage}>Next Page</Button>
      </div>
      <div>
        <label>Sort By</label>
      <select name='sortBy' id='sortBy' value={sortBy} onChange={handleSort}>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>
      </div>
      </div>

      <Grid container spacing={2} boxSizing={'border-box'} padding={"2rem"}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <BookCard
                title={item.title}
                author={item.authors}
                coverImage={item.image_url}
                description={item.description}
                genre={item.genres}
                id={item._id}
                item={item}
                publicationYear={item.publication_year}
                onClick={() => navigate(`/book_details/${item._id}`)}
                isDoingBookmarking={false}
              />
            </Grid>
          ))
        ) : (
          <Typography>No books found</Typography>
        )}
      </Grid>

    </div>
  );
};

export default BookList;

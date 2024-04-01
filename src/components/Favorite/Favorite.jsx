import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material'; 
import BookCard from '../bookCard/BookCard';

const Favorite = () => {
  const bookmarked = useSelector((state) => state.books.bookmarked);

  const hasBookmarks = bookmarked && bookmarked.length > 0;

  return (
    <div>
      <Grid container spacing={2} boxSizing={'border-box'} padding={"2rem"}> 
        {hasBookmarks ? (
          bookmarked.map((book) => (
            <Grid item xs={12} sm={6} md={3} key={book.id}> 
              <BookCard
                title={book.title}
                author={book.authors}
                coverImage={book.image_url}
                description={book.description}
                genre={book.genres}
                publicationYear={book.publication_year}
                isDoingookmarking={false}
              />
            </Grid>
          ))
        ) : (
          <h3>No Bookmarks</h3>
        )}
      </Grid>
    </div>
  );
};

export default Favorite;

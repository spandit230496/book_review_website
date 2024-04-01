import React from 'react';
import { Typography, Card, CardContent, CardMedia, Box, Rating, Divider } from '@mui/material';

const Book = ({ book }) => {
  return (
    <Card sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)', flexDirection: 'column', justifyContent: 'center' }}>
      <CardMedia
        component="img"
        image={book.image_url}
        alt={book.title}
        sx={{ height: 300, objectFit: 'cover' }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <Box>
            <Typography variant="h5" gutterBottom>{book.title}</Typography>
            <Typography variant="body2" color="text.secondary">Genre: {book.genres}</Typography>
            <Typography variant="body2" color="text.secondary">Author: {book.authors}</Typography>
            <Typography variant="body2" color="text.secondary">Description: {book.description}</Typography>

          </Box>
          <Divider />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Book;

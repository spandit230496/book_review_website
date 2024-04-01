import React, { useEffect, useState } from 'react';
import Book from '../Book/Book';
import { useParams } from 'react-router-dom';
import { Typography, Box, TextField, Button, Rating, Grid } from '@mui/material';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [overallrating, setOverallRating] = useState(0);
  const token= localStorage.getItem('token');

  const getBookById = async () => {
    try {
      const data = await fetch('http://localhost:8080/books/' + id);
      if (!data.ok) {
        throw new Error('Failed to fetch book');
      }
      const result = await data.json();
      setBook(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewSubmit = async () => {

    try{
      const response = await axios.post('http://localhost:8080/reviews', {
        userId: token,
        bookId: id,
        comment: review,
        rating: rating
      });
      setReview('');
      setRating(0);    
      toast("Thank you for your review");

      window.location.reload();
    }
    catch(error){
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    }
    
  };

  useEffect(() => {
    getBookById();
  }, [id]);

  const getReviewsByBookId = async () => {
    try {
      const data = await fetch('http://localhost:8080/reviews/' + id);
      if (!data.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const result = await data.json();
      setReviews(result);
      setOverallRating(reviews.reduce((total, review) => total + Number(review.rating), 0) / reviews.length);

    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  getReviewsByBookId();
}, []);
  return (
    <>
      <Grid container spacing={3} style={{ minHeight: 'calc(100vh - 64px)', padding: '20px' }}>
        <Grid item xs={12} md={8}>
          <Book book={book} />
          <Typography variant="h6">Rating</Typography>
          <Rating
            value={Number(overallrating)}
            readOnly
          />
          <Typography variant="h6">Reviews</Typography>
          <Box sx={{ mt: 2 }}>
            
                  {reviews&&reviews.map((review) => (
                    <Box key={review._id} sx={{ mb: 2 }}>
                      <Typography variant="body1">{review.comment}</Typography>
                      <Typography variant="body2">
                      </Typography>
                    </Box>
                  ))}
                </Box>
              
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 4 }}>
            <Typography variant="h6">Add Review</Typography>
            <TextField
              label="Your Review"
              multiline
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <Typography variant="subtitle1">Rating:</Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleReviewSubmit}
              disabled={!review || rating === 0}
              sx={{ mt: 2 }}
            >
              Submit Review
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default BookDetails;

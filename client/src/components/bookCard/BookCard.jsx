import React, { useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'; 
import BookmarkIcon from '@mui/icons-material/Bookmark'; 
import { useDispatch } from 'react-redux';
import { bookmark ,unbookmark} from '../../redux/bookSlice'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function BookCard({
  id,
  title,
  author,
  genre,
  coverImage,
  item,
  isDoingBookmarking,
  onClick,
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const dispatch = useDispatch();
  
  const handleClick = () => {
    onClick(id); 
  };

  const handleBookmarkClick = async (event) => {
    event.stopPropagation(); 
    try{
       console.log(localStorage.getItem('userId'))
       console.log(id);
      const response=await axios.post('http://localhost:8080/bookmark',{
        userId: localStorage.getItem('userId'),
        bookId: id
      } );
    }
    catch(error){
      console.log(error);
    }
    (!isBookmarked) ?dispatch(bookmark(item)):dispatch(unbookmark(item));
    setIsBookmarked((prev) => !prev); 
    !isBookmarked ? toast('Bookmarked!') : toast('Unbookmarked!'); 
  };

  return (
    <Card sx={{ width: 250, bgcolor: 'black', color: 'white' }} onClick={handleClick}>
      <div>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" sx={{ color: 'gray', mt: 1 }}>Genre: {genre}</Typography>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={coverImage}
          srcSet={coverImage}
          loading="lazy"
          alt={title}
        />
      </AspectRatio>
      <CardContent orientation="horizontal" sx={{ mt: 1 }}>
        <div>
          <Typography variant="body2" sx={{ color: 'lightgray' }}>Author</Typography>
          <Typography variant="h6" sx={{ color: 'white' }}>{author}</Typography>
        </div>
      </CardContent>
      {!isDoingBookmarking ? (
        isBookmarked ? (
          <BookmarkIcon
            onClick={handleBookmarkClick}
            sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
          />
        ) : (
          <BookmarkBorderIcon
            onClick={handleBookmarkClick}
            sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
          />
        )
      ) : null}
    </Card>
  );
}

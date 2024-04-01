import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  filteredBooks: [], 
  bookmarked:[]
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
      state.filteredBooks =action.payload;
    },
    bookmark(state, action) {
      const isDuplicate = state.bookmarked.some(book => book.id === action.payload.id);
    
      if (!isDuplicate) {
        state.bookmarked = [...state.bookmarked, action.payload];
      }
    },
    unbookmark(state, action) {
    state.bookmarked.pop(action.payload)
    },
    filterBooks(state, action) {
      
      const searchTerm = action.payload.toLowerCase();
      if (!searchTerm) {
        state.filteredBooks = [...state.books];
      } else {
        state.filteredBooks = state.books.filter(book =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.authors.toLowerCase().includes(searchTerm) ||
          book.genres.toLowerCase().includes(searchTerm)
        );
      }
      
    }
  },
});

export const { setBooks, filterBooks,bookmark ,unbookmark} = booksSlice.actions;
export default booksSlice.reducer;

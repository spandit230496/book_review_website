import './App.css';
import BookList from './components/bookList/BookList';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import BookDetails from './components/bookDetails/BookDetails';
import { Provider } from 'react-redux';
import LoginPage from './components/Login/Login';
import store from './redux/store';
import Favorite from './components/Favorite/Favorite';
import Home from './components/HomeComponent/Home';
import NavBar from './components/navBar/NavBar';
import Register from './components/Register/Register';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';

function App() {
  const token = localStorage.getItem('token');

  return (
    <div className="App">
      <ToastContainer/>
      <Provider store={store}>
          <NavBar />
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<Register />} />
             <Route element={<ProtectedRoutes />}>
                <Route path='/books' element={<Home />}>
                  <Route index element={<BookList />} />
                </Route>
                <Route path='/favorites' element={<Favorite />} />
                <Route path='/book_details/:id' element={<BookDetails />} />
              </Route>
            
          </Routes>
      </Provider>
    </div>
  );
}

export default App;

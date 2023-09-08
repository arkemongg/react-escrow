import logo from './logo.svg';
import './App.css';

import { AuthProvider } from './AuthContext';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

import Navigation from './Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';

function App() {
  return (

    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              {/* <Route path="register" element={<Register />} /> */}
              {/* <Route path="reset" element={<Reset />} /> */}
              {/* <Route path="profile" element={<Profile />} /> */}
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </ScrollToTop>
      </BrowserRouter>

    </AuthProvider>


  );
}

export default App;

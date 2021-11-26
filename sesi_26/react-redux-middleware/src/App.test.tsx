import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// router
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// react components
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import NotFound from './pages/NotFound';
import Account from './pages/Account';
import store from './store';

// react redux
import {Provider} from 'react-redux';

test('renders learn react link', () => {
  render(
    <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />}/>
            <Route path="contact" element={<Contact />}/>
            <Route path="about" element={<About />}/>
          </Route>
          <Route path="/profile" element={<App />}>
            <Route index element={<Account />}/>
            <Route path=":name" element={<Account />}/>
            <Route path="settings" element={<Home />}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  );
  const linkElement = screen.getByText(/Ini untuk test/i);
  expect(linkElement).toBeInTheDocument();
});

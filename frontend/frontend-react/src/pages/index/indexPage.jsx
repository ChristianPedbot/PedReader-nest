import React from 'react';
import { BrowserRouter, Routes, Route, createBrowserRouter } from 'react-router-dom';
import Footer from '../../ui/components/Footer.jsx';
import Navbar from '../../ui/components/Navbar.jsx';
import Index from './index.jsx';

function IndexPage() {
  return (
    <div>
      <Navbar />
      <Index />
      <Footer />
    </div>
  );
}

export default function IndexApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  );
}

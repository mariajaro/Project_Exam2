import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/customer/Home';
import RegisterPage from './pages/RegisterPage';

function App() {
    return (
        <Router>
            <Header />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<RegisterPage />} />
                    // other routes
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;

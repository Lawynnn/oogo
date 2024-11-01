import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Profile from './routes/Profile';

function loaderLanguage(params) {
    const lang = params["lang"];
    return lang || "en"
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/:lang?" element={<Home />} />
                <Route path="/:lang?/login" element={<Login />} />
                <Route path="/:lang?/register" element={<Register />} />
                <Route path="/:lang?/profile" element={<Profile />} />
            </Routes>
        </Router>
    )
}
export default App;

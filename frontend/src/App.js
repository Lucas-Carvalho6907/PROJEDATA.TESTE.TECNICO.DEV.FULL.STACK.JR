import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import RawMaterialForm from './components/RawMaterialForm';
import ProductionSuggestions from './components/ProductionSuggestions';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Inventory System</a>
            <div className="navbar-nav">
              <a className="nav-link" href="/products">Products</a>
              <a className="nav-link" href="/raw-materials">Raw Materials</a>
              <a className="nav-link" href="/production">Production Suggestions</a>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/products" element={<ProductForm />} />
          <Route path="/raw-materials" element={<RawMaterialForm />} />
          <Route path="/production" element={<ProductionSuggestions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductionSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/production/suggestions').then((res) => setSuggestions(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Production Suggestions</h2>
      <ul className="list-group">
        {suggestions.map((s, index) => (
          <li key={index} className="list-group-item">
            <strong>{s.productName}</strong> - Quantity: {s.quantity} - Total Value: ${s.totalValue.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductionSuggestions;
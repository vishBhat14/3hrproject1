import React, { useState, useEffect } from 'react';

const SellerAdminPage = () => {
  const [stockItems, setStockItems] = useState([]);

  useEffect(() => {
    const storedStockItems = localStorage.getItem('stockItems');
    if (storedStockItems) {
      setStockItems(JSON.parse(storedStockItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stockItems', JSON.stringify(stockItems));
  }, [stockItems]);

  const handleAddStockItem = () => {
    setStockItems((prevItems) => [
      ...prevItems,
      { id: Date.now(), name: '', quantity: 0, price: 0 },
    ]);
  };

  const handleRemoveStockItem = (itemId) => {
    setStockItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleInputChange = (itemId, field, value) => {
    setStockItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const totalStockValue = stockItems.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  return (
    <div>
      <h1>Products Update Page</h1>
      <button onClick={handleAddStockItem}>Add Stock Item</button>

      {stockItems.map((item) => (
        <div key={item.id}>
          <label htmlFor={`name-${item.id}`}>Name:</label>
          <input
            type="text"
            id={`name-${item.id}`}
            value={item.name}
            onChange={(e) => handleInputChange(item.id, 'name', e.target.value)}
          />

          <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
          <input
            type="number"
            id={`quantity-${item.id}`}
            value={item.quantity}
            onChange={(e) => handleInputChange(item.id, 'quantity', e.target.value)}
          />

          <label htmlFor={`price-${item.id}`}>Price:</label>
          <input
            type="number"
            id={`price-${item.id}`}
            value={item.price}
            onChange={(e) => handleInputChange(item.id, 'price', e.target.value)}
          />

          <button onClick={() => handleRemoveStockItem(item.id)}>Remove</button>
        </div>
      ))}

      <h3>Total value of the product: {totalStockValue}</h3>
    </div>
  );
};

export default SellerAdminPage;

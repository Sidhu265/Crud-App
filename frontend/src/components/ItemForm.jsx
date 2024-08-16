import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ItemForm = ({ onItemSaved }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = { firstname, lastname };

    try {
      const response = await axios.post('http://localhost:3000/items', itemData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      onItemSaved(response.data);
      setFirstname('');
      setLastname('');
    } catch (error) {
      console.error('Error saving item', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

ItemForm.propTypes = {
  onItemSaved: PropTypes.func.isRequired,
};

export default ItemForm;
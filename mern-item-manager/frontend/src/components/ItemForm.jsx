import { useState } from 'react';
import { createItem } from '../api';

export default function ItemForm({ onItemAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('[ItemForm] Submit handler fired');
    alert('Debug: submit handler fired');

    const itemData = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
    };

    console.log('[ItemForm] About to create item:', itemData);

    if (!itemData.name || !itemData.description || Number.isNaN(itemData.price)) {
      alert('Please enter a valid name, description, and price.');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await createItem(itemData);

      console.log('[ItemForm] POST response received:', response.data);
      alert('Debug: POST response came back. Item created.');

      setName('');
      setDescription('');
      setPrice('');

      console.log('[ItemForm] Calling onItemAdded to refresh list');
      await onItemAdded();
      alert('Debug: list refresh finished');
    } catch (error) {
      console.error('[ItemForm] Create item failed:', error);
      console.error('[ItemForm] Error response:', error.response?.data);
      alert(
        'Create item failed. Check the browser console and Network tab. ' +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>Add New Item</h2>
      <div>
        <input
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          placeholder="Price (e.g. 29.99)"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Item'}
      </button>
    </form>
  );
}

import { deleteItem } from '../api';

export default function ItemList({ items, onRefresh }) {
  const handleDelete = async (id) => {
    console.log('[ItemList] Delete clicked for item:', id);

    try {
      await deleteItem(id);
      console.log('[ItemList] Delete response received, refreshing list');
      await onRefresh();
    } catch (error) {
      console.error('[ItemList] Delete failed:', error);
      alert('Delete failed. Check the browser console.');
    }
  };

  console.log('[ItemList] Rendering items:', items);

  return (
    <div>
      <h2>Items</h2>
      {items.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        items.map((item) => (
          <div
            key={item._id}
            style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}
          >
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>
              <strong>Price: ${item.price}</strong>
            </p>
            <button type="button" onClick={() => handleDelete(item._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

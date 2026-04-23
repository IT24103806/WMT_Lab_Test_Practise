import { useEffect, useState } from 'react';
import { getItems } from './api';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    console.log('[App] Refreshing item list with GET /items');

    try {
      setLoading(true);
      const res = await getItems();
      console.log('[App] GET /items response:', res.data);
      setItems(res.data);
    } catch (error) {
      console.error('[App] Fetch items error:', error);
      console.error('[App] Error response:', error.response?.data);
      alert('Could not load items. Check the browser console and backend server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Item Manager</h1>
      <ItemForm onItemAdded={fetchItems} />
      {loading && <p>Loading items...</p>}
      <ItemList items={items} onRefresh={fetchItems} />
    </div>
  );
}

export default App;

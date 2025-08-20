// File: src/components/HallList.jsx
// Purpose: A simple component to display a list of available halls.

import React from 'react';

const HallList = ({ halls }) => {
  const styles = {
    list: { listStyle: 'none', padding: 0 },
    listItem: { backgroundColor: '#fff', border: '1px solid #e8e8e8', borderRadius: '4px', padding: '12px', marginBottom: '8px' }
  };

  return (
    <div>
      <h3>Available Halls</h3>
      {halls.length === 0 ? (
        <p>No halls available.</p>
      ) : (
        <ul style={styles.list}>
          {halls.map(hall => (
            <li key={hall.id} style={styles.listItem}>
              <strong>{hall.name}</strong> (Capacity: {hall.capacity}) - {hall.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HallList;
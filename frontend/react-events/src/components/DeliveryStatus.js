import React from 'react';

function DeliveryStatus({ delivery }) {
  // Mostriamo lo stato in un formato leggibile
  return (
    <div className="status-display">
      <h3>Stato Corrente (ID: {delivery.id})</h3>
      <pre>{JSON.stringify(delivery, null, 2)}</pre>
    </div>
  );
}

export default DeliveryStatus;
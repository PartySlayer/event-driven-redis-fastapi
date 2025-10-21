import React, { useState } from 'react';

function EventButtons({ delivery, onTriggerEvent }) {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sellPrice, setSellPrice] = useState('');

  const handlePickup = () => {
    if (!purchasePrice || !quantity) {
      alert("Inserisci prezzo e quantità per il ritiro");
      return;
    }
    onTriggerEvent("PICKUP_PRODUCTS", {
      purchase_price: parseInt(purchasePrice),
      quantity: parseInt(quantity)
    });
    setPurchasePrice('');
    setQuantity('');
  };

  const handleDelivery = () => {
    if (!sellPrice || !quantity) {
      alert("Inserisci prezzo e quantità per la vendita");
      return;
    }
    onTriggerEvent("DELIVER_PRODUCTS", {
      sell_price: parseInt(sellPrice),
      quantity: parseInt(quantity)
    });
    setSellPrice('');
    setQuantity('');
  };
  
  return (
    <div className="event-buttons">
      <button onClick={() => onTriggerEvent("START_DELIVERY", {})} disabled={delivery.status !== 'ready'}>
        Inizia Consegna
      </button>

      <div className="event-form">
        <h4>Ritira Prodotti</h4>
        <input type="number" placeholder="Prezzo d'acquisto" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} />
        <input type="number" placeholder="Quantità" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <button onClick={handlePickup} disabled={delivery.status !== 'active'}>Ritira</button>
      </div>

      <div className="event-form">
        <h4>Vendi Prodotti</h4>
        <input type="number" placeholder="Prezzo di vendita" value={sellPrice} onChange={e => setSellPrice(e.target.value)} />
        <input type="number" placeholder="Quantità" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <button onClick={handleDelivery} disabled={delivery.status !== 'collected'}>Vendi</button>
      </div>

      <button onClick={() => onTriggerEvent("INCREASE_BUDGET", { budget: 100 })}>
        Aumenta Budget (+100)
      </button>
    </div>
  );
}

export default EventButtons;
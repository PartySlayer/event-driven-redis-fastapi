import React, { useState } from 'react';
import CreateDeliveryForm from './components/CreateDeliveryForm';
import DeliveryStatus from './components/DeliveryStatus';
import EventButtons from './components/EventButtons';
import './App.css';

const API_URL = "http://localhost:8000";

function App() {
  // Stato per memorizzare i dati della delivery corrente
  const [delivery, setDelivery] = useState(null);
  // Stato per l'ID della delivery che vogliamo visualizzare
  const [deliveryIdToFetch, setDeliveryIdToFetch] = useState('');

  // Funzione per creare una nuova delivery
  const handleCreateDelivery = async (budget, notes) => {
    const payload = {
      type: "CREATE_DELIVERY",
      data: { budget: parseInt(budget), notes }
    };

    const response = await fetch(`${API_URL}/deliveries/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const newDelivery = await response.json();
    setDelivery(newDelivery); // Aggiorna lo stato con la nuova delivery
    setDeliveryIdToFetch(newDelivery.id); // Imposta l'ID per visualizzarla subito
  };

  // Funzione per recuperare lo stato di una delivery
  const handleFetchStatus = async () => {
    if (!deliveryIdToFetch) return;
    const response = await fetch(`${API_URL}/deliveries/${deliveryIdToFetch}/status`);
    const status = await response.json();
    setDelivery(status);
  };

  // Funzione generica per inviare un evento
  const handleTriggerEvent = async (eventType, data) => {
    if (!delivery) {
      alert("Prima crea o seleziona una delivery!");
      return;
    }
    const payload = {
      delivery_id: delivery.id,
      type: eventType,
      data
    };

    const response = await fetch(`${API_URL}/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const updatedDelivery = await response.json();
    setDelivery(updatedDelivery); // Aggiorna lo stato con i nuovi dati
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestione Deliveries</h1>
      </header>
      <main>
        <div className="card">
          <h2>1. Crea una Nuova Delivery</h2>
          <CreateDeliveryForm onCreate={handleCreateDelivery} />
        </div>

        <div className="card">
          <h2>2. Visualizza Stato Delivery</h2>
          <div className="fetch-section">
            <input
              type="text"
              placeholder="Inserisci ID Delivery (es. 01H...)"
              value={deliveryIdToFetch}
              onChange={(e) => setDeliveryIdToFetch(e.target.value)}
            />
            <button onClick={handleFetchStatus}>Recupera Stato</button>
          </div>
          {delivery && <DeliveryStatus delivery={delivery} />}
        </div>

        <div className="card">
          <h2>3. Attiva Eventi</h2>
          {delivery && <EventButtons delivery={delivery} onTriggerEvent={handleTriggerEvent} />}
          {!delivery && <p>Prima crea o seleziona una delivery per attivare eventi.</p>}
        </div>
      </main>
    </div>
  );
}

export default App;
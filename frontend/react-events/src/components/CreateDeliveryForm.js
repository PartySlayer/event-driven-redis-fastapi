import React, { useState } from 'react';

function CreateDeliveryForm({ onCreate }) {
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Impedisce il ricaricamento della pagina
    if (!budget || !notes) {
      alert("Compila tutti i campi");
      return;
    }
    onCreate(budget, notes);
    setBudget(''); // Svuota i campi dopo l'invio
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <input
        type="text"
        placeholder="Note"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit">Crea Delivery</button>
    </form>
  );
}

export default CreateDeliveryForm;
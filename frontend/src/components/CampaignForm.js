import React, { useState } from 'react';
import axios from 'axios';

const CampaignForm = ({ token, onCampaignAdded }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [impressions, setImpressions] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [conversions, setConversions] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/campaigns', 
        { name, date, impressions, clicks, conversions },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onCampaignAdded();
      // Reset form
      setName('');
      setDate('');
      setImpressions(0);
      setClicks(0);
      setConversions(0);
    } catch (err) {
      alert('Error adding campaign');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <input
        type="text"
        placeholder="Campaign Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      /><br /><br />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      /><br /><br />
      <input
        type="number"
        placeholder="Impressions"
        value={impressions}
        onChange={(e) => setImpressions(Number(e.target.value))}
      /><br /><br />
      <input
        type="number"
        placeholder="Clicks"
        value={clicks}
        onChange={(e) => setClicks(Number(e.target.value))}
      /><br /><br />
      <input
        type="number"
        placeholder="Conversions"
        value={conversions}
        onChange={(e) => setConversions(Number(e.target.value))}
      /><br /><br />
      <button type="submit">Add Campaign</button>
    </form>
  );
};

export default CampaignForm;

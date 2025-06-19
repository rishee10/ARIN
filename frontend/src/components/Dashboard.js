import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ onLogout }) {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [form, setForm] = useState({
    name: "",
    date: "",
    impressions: "",
    clicks: "",
    conversions: ""
  });
  const [filterName, setFilterName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://localhost:5000/api/campaigns",
    headers: { Authorization: `Bearer ${token}` }
  });

  // Fetch campaigns from backend
  const fetchCampaigns = async () => {
    try {
      const res = await api.get("/");
      setCampaigns(res.data);
      setFilteredCampaigns(res.data);
    } catch (err) {
      alert("Error fetching campaigns");
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Add or update campaign
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/", form);
      }
      setForm({ name: "", date: "", impressions: "", clicks: "", conversions: "" });
      fetchCampaigns();
    } catch (err) {
      alert("Failed to save campaign");
    }
  };

  // Edit campaign
  const handleEdit = (campaign) => {
    setForm({
      name: campaign.name,
      date: campaign.date,
      impressions: campaign.impressions,
      clicks: campaign.clicks,
      conversions: campaign.conversions
    });
    setEditingId(campaign.id);
  };

  // Delete campaign
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        await api.delete(`/${id}`);
        fetchCampaigns();
      } catch (err) {
        alert("Failed to delete campaign");
      }
    }
  };

  // Filter campaigns
  const handleFilter = (e) => {
    const name = e.target.value;
    setFilterName(name);
    const filtered = campaigns.filter((c) =>
      c.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredCampaigns(filtered);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={onLogout}>Logout</button>

      <h3>{editingId ? "Edit" : "Add"} Campaign</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Campaign Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <input type="number" placeholder="Impressions" value={form.impressions} onChange={(e) => setForm({ ...form, impressions: e.target.value })} required />
        <input type="number" placeholder="Clicks" value={form.clicks} onChange={(e) => setForm({ ...form, clicks: e.target.value })} required />
        <input type="number" placeholder="Conversions" value={form.conversions} onChange={(e) => setForm({ ...form, conversions: e.target.value })} required />
        <button type="submit">{editingId ? "Update" : "Add"} Campaign</button>
      </form>

      <h3>Filter by Campaign Name</h3>
      <input type="text" value={filterName} onChange={handleFilter} placeholder="Type campaign name" />

      <h3>Campaigns</h3>
      <ul>
        {filteredCampaigns.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong> ({c.date}) - {c.impressions} impressions, {c.clicks} clicks, {c.conversions} conversions<br />
            <button onClick={() => handleEdit(c)}>Edit</button>
            <button onClick={() => handleDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

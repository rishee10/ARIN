const { Campaign } = require('../models');

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({ where: { userId: req.user.userId } });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createCampaign = async (req, res) => {
  const { name, date, impressions, clicks, conversions } = req.body;
  try {
    const campaign = await Campaign.create({
      name,
      date,
      impressions,
      clicks,
      conversions,
      userId: req.user.userId,
    });
    res.status(201).json(campaign);
  } catch (err) {
    res.status(400).json({ error: 'Error creating campaign' });
  }
};

exports.updateCampaign = async (req, res) => {
  const { id } = req.params;
  try {
    const campaign = await Campaign.findOne({ where: { id, userId: req.user.userId } });
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    await campaign.update(req.body);
    res.json(campaign);
  } catch (err) {
    res.status(400).json({ error: 'Error updating campaign' });
  }
};

exports.deleteCampaign = async (req, res) => {
  const { id } = req.params;
  try {
    const campaign = await Campaign.findOne({ where: { id, userId: req.user.userId } });
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    await campaign.destroy();
    res.json({ message: 'Campaign deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting campaign' });
  }
};

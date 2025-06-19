const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} = require('../controllers/campaignController');

router.use(authMiddleware); // ✅ now this works

router.get('/', getCampaigns);
router.post('/', createCampaign);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

module.exports = router;

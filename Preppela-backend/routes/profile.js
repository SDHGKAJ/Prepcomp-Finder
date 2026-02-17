const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// POST create or upsert profile (match by email if provided, else create)
router.post("/", async (req, res) => {
  try {
    const { name, age, phone, email, school, subject, targetScore } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: "Name is required" });

    let profile;
    if (email) {
      profile = await Profile.findOneAndUpdate(
        { email: email.toLowerCase().trim() },
        { name, age: age || undefined, phone, email: email.toLowerCase().trim(), school, subject, targetScore },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
    } else {
      profile = new Profile({ name, age, phone, email, school, subject, targetScore });
      await profile.save();
    }

    return res.json(profile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET profile by email: /api/profile?email=you@domain.com
router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "email query required" });
    const profile = await Profile.findOne({ email: email.toLowerCase().trim() });
    if (!profile) return res.status(404).json({ message: "Not found" });
    return res.json(profile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// PUT update by id: /api/profile/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const profile = await Profile.findByIdAndUpdate(id, update, { new: true });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    return res.json(profile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
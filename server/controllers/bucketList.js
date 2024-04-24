const User = require("../model/UserSchema");
const BucketList = require("../model/BucketListSchema");

// Get all bucket list items for the logged-in user
const getBucketList = async (req, res) => {
  try {
    const bucketList = await BucketList.find({ user: req.user.id });
    if (!bucketList || bucketList.length === 0) {
      return res.status(404).json({ message: "No bucket list items found." });
    }
    res.status(200).json(bucketList);
  } catch (error) {
    console.error("Error fetching bucket list:", error);
    res.status(500).json({ message: 'Internal server error', error: error });
  }
};

// Add a new item to the bucket list
const addBucketList = async (req, res) => {
  if (!req.body.place) {
    return res.status(400).json({ message: "Please add a destination" });
  }

  try {
    const bucketList = await BucketList.create({
      user: req.user.id,
      place: req.body.place,
    });
    res.status(201).json(bucketList);
  } catch (error) {
    console.error("Error adding to bucket list:", error);
    res.status(500).json({ message: 'Internal server error', error: error });
  }
};

// Delete an item from the bucket list
const deleteBucketList = async (req, res) => {
  try {
    const bucketList = await BucketList.findById(req.params.id);

    if (!bucketList) {
      return res.status(404).json({ message: "No Place found" });
    }

    if (bucketList.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await bucketList.remove();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    console.error("Error removing bucket list item:", error);
    res.status(500).json({ message: 'Internal server error', error: error });
  }
};

module.exports = { getBucketList, addBucketList, deleteBucketList };

const express = require("express");
const router = express.Router();
const Review = require("../models/reviewSchema");
const upload = require("../middleware/multer");

// Create a Review
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
      console.log("Received form data:", req.body);
      console.log("Uploaded file data:", req.file);

      if (!req.body.username || !req.body.review || !req.body.date) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      let imageBase64 = null;
      if (req.file) {
          imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      }

      const newReview = new Review({
          userId: req.body.username,
          review: req.body.review,
          date: req.body.date,
          image: imageBase64
      });

      await newReview.save();
      res.status(201).json({ message: "Review submitted successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit review", details: error.message });
    }
});

// Read All Reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch reviews", details: error.message });
    }
});

// Update a Review
router.put("/update/:id", upload.single("image"), async (req, res) => {
    try {
        const { username, review, date } = req.body;
        let imageBase64 = null;

        if (req.file) {
            imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        }

        const updatedReview = await Review.findByIdAndUpdate(req.params.id, {
            userId,
            review,
            date,
            image: imageBase64
        }, { new: true });

        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ error: "Failed to update review", details: error.message });
    }
});

// Delete a Review
router.delete("/delete/:id", async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: "Review deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete review", details: error.message });
    }
});

module.exports = router;

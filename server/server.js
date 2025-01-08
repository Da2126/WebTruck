const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const Truck = require('../model/truckModel'); // Adjust the path as necessary
const Task = require('../model/taskmodel'); // Adjust the path as necessary
const Feedback = require('../model/feedbackModel'); // Adjust the path as necessary


const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' })); // Increase the limit for JSON payloads

// Root route for testing
app.get('/', (req, res) => {
    res.send('Hello, World! Your server is running on port 3000.');
});

// Database connection
const mongoUrl = "mongodb+srv://daryl:daryl123@cluster0.cvaruww.mongodb.net/truckdb?appName=Cluster0";

mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database Connected"))
    .catch((e) => console.error("Database connection error:", e));



// Route to fetch the count of trucks
app.get('/trucks/count', async (req, res) => {
    try {
        const count = await Truck.countDocuments(); // Get the number of truck documents
        res.status(200).json({ count });
    } catch (error) {
        console.error("Error fetching truck count:", error);
        res.status(500).json({ message: "Error fetching truck count", error: error.message });
    }
});

// Fetch a truck by ID
app.get('/truck/:id', async (req, res) => {
    try {
        const truckId = req.params.id;
        const truck = await Truck.findById(truckId);

        if (!truck) {
            return res.status(404).json({ message: 'Truck not found' });
        }

        res.status(200).json(truck);
    } catch (error) {
        console.error("Truck not found", error);
        res.status(500).json({ message: "Truck not found", error: error.message });
    }
});


// Route to fetch the count of available trucks (status = 0)
app.get('/trucks/available/count', async (req, res) => {
    try {
        const count = await Truck.countDocuments({ status: 0 }); // Count trucks with status 0
        res.status(200).json({ count });
    } catch (error) {
        console.error("Error fetching available truck count:", error);
        res.status(500).json({ message: "Error fetching available truck count", error: error.message });
    }
});


// Route to fetch the count of trucks in transit (status = 1)
app.get('/trucks/in-transit/count', async (req, res) => {
    try {
        const inTransitCount = await Truck.countDocuments({ status: 1 }); // Count trucks with status 1
        res.status(200).json({ count: inTransitCount });
    } catch (error) {
        console.error("Error fetching trucks in transit count:", error);
        res.status(500).json({ message: "Error fetching trucks in transit count", error: error.message });
    }
});

app.get('/api/completed-tasks/count', async (req, res) => {
    try {
      const completeTaskCount = await Task.countDocuments({ status: 2 });
      res.json({ count: completeTaskCount });
    } catch (error) {
      console.error('Error fetching complete tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


 app.post('/submit-feedback', async (req, res) => {
    const { name, email, message } = req.body;

    // Validate that all fields are present
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        // Save feedback
        const newFeedback = new Feedback({ name, email, message });
        await newFeedback.save();
        res.json({ success: true, message: 'Your feedback has been submitted successfully.' });
    } catch (error) {
        console.error('Error occurred during feedback submission:', error);
        res.status(500).json({ success: false, message: 'There was an error submitting your feedback. Please try again later.' });
    }
});


app.get("/feedbacks", async (req, res) => {
    try {
        // Fetch all feedback entries from the database (only name and message)
        const feedbacks = await Feedback.find({}, 'name message'); // You can adjust the fields if needed
        
        // Send feedbacks data as JSON response
        res.json(feedbacks);
    } catch (err) {
        console.error("Error fetching feedbacks:", err);
        res.status(500).send("Error fetching feedbacks");
    }
});


// Create the server
const server = http.createServer(app);
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Node.js server started on port ${PORT}`);
});

import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { OAuth2Client } from 'google-auth-library';
import cors from 'cors';

// testing purpose
import userRoute from './routes/user.route.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
import User from './models/user.model.js';
const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));

const apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 500,
    message: 'Too many requests, please try again later.',
});

// Applied rate limiter;
app.use('/api/leaderboard/', apiLimiter);

app.get('/', (req, res) => {
    res.send('Server running!');
});

// new user signup 
app.post('/api/register/user', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            // create new user with hashed password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: 'User created successfully' });
        }
        else {
            // user already exists
            res.status(500).json({ message: 'User already exists' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// login
app.get('/api/auth', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.json({ message: 'Login successful' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Google OAuth2 configuration
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google authentication endpoint
app.post('/api/auth/google', async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const { sub, email, name } = payload;

        // Check if user exists
        let user = await User.findOne({ googleId: sub });
        if (!user) {
            // Create new user with Google data
            user = new User({
                googleId: sub,
                username: name,
                email: email,
                password: '' // No password required for Google auth
            });
            await user.save();
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//update user points, total, daily, weekly, monthly
app.put('/api/points/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const { calBurnt, carbonSaved } = req.query;
        // if no query params, then default to 0
        if (!calBurnt && !carbonSaved) {
            calBurnt = 0;
            carbonSaved = 0;
        }
        points = (calBurnt * 0.4) + (carbonSaved * 0.6);
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.totalPts += points;
        user.dailyPts += points;
        user.weeklyPts += points;
        user.monthlyPts += points;
        await user.save();
        res.json({ message: 'User points updated successfully' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/*
get leaderboard, max 100 users top and sorted by points
if type is daily then sort by dailyPts, weekly then sort by weeklyPts, monthly then sort by monthlyPts
if type is not daily, weekly, or monthly then sort by totalPts
return a json object with username and points
 */
app.get('/api/leaderboard/:type', async (req, res) => {
    try {
        const { type } = req.params;
        let sortField;
        if (type === 'daily') {
            sortField = 'dailyPts';
        } else if (type === 'weekly') {
            sortField = 'weeklyPts';
        } else if (type === 'monthly') {
            sortField = 'monthlyPts';
        } else if (type ==='total') {
            sortField ='totalPts';
        } else {
            return res.status(400).json({ message: 'Invalid type' });
        }
        const users = await User.find({}).sort({ [sortField]: -1 }).limit(100).select('username ' + sortField);
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// reset daily, weekly, monthly points
import schedule from 'node-schedule';
async function resetDaily() {
    await User.updateMany({}, { dailyPts: 0 });
}

async function resetWeekly() {
    await User.updateMany({}, { weeklyPts: 0 });
}

async function resetMonthly() {
    await User.updateMany({}, { monthlyPts: 0 });
}
// Schedule daily reset at midnight EST
schedule.scheduleJob('0 0 * * *', { tz: 'America/New_York' }, resetDaily);

// Schedule weekly reset at midnight on Sunday EST
schedule.scheduleJob('0 0 * * 0', { tz: 'America/New_York' }, resetWeekly);

// Schedule monthly reset at midnight on last day of month EST
schedule.scheduleJob('0 0 L * *', { tz: 'America/New_York' }, resetMonthly);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
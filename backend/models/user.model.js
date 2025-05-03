import mongoose from 'mongoose';
// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String },
    GoogleId: { type: String},
    email: { type: String},
    totalPts: { type: Number, default: 0 },
    dailyPts: { type: Number, default: 0 },
    weeklyPts: { type: Number, default: 0 },
    monthlyPts: { type: Number, default: 0 },
    tripInfo : [{
        carbonSaved: { type: Number, default: 0 },
        calBurnt: { type: Number, default: 0 },
        completedCount: { type: Number, default: 0 },
    }]
  });
  
const User = mongoose.model('User', userSchema);

export default User;
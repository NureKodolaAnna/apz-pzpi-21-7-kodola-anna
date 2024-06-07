const mongoose = require('mongoose');

if (!mongoose.models.User) {
    const userSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        role: { type: String, enum: ['patient', 'doctor', 'admin'], required: true }
    });

    module.exports = mongoose.model('User', userSchema);
} else {
    module.exports = mongoose.model('User');
}
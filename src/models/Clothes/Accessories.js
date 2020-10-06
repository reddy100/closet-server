const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
    userId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        unique: true,
        required: true
    }
});

mongoose.model('Accessories', accessoriesSchema);

const mongoose = require('mongoose');


const tripSchema = new mongoose.Schema({
    userId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    tops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TopClothes'
    }],
    bottoms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BottomClothes'
    }],
    outerwears: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OuterwearClothes'
    }],
    accessories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accessories'
    }],
    outfits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Outfits'
    }]
});

mongoose.model('Trips', tripSchema);
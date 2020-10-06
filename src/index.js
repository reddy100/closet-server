const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require('./models/User');
require('./models/clothes/Accessories')
require('./models/clothes/TopClothes')
require('./models/clothes/BottomClothes')
require('./models/clothes/OuterwearClothes')
require('./models/Outfits')
require('./models/Trips')
const authRoutes = require('./routes/authRoutes')
const clothesRoutes = require('./routes/clothesRoutes')
const outfitsRoutes = require('./routes/outfitsRoutes')
const tripsRoutes = require('./routes/tripsRoutes')
const requireAuth = require('./middlewares/requiredAuth')

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(clothesRoutes);
app.use(outfitsRoutes);
app.use(tripsRoutes);

const mongoUri = 'mongodb+srv://admin:Goethe1992@cluster0-pk9im.mongodb.net/closet-app?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
}) 
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Hi there! I know you. You email is ${req.user.email}`);
});

app.listen(3000 , () => {
    console.log('Listening on port 3000')
});
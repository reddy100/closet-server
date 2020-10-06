const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const requireAuth = require('../middlewares/requiredAuth');

const Trips = mongoose.model('Trips');

const router = express.Router();
router.use(requireAuth);

router.get('/trips', async (req, res) => {
    const trips = await Trips.find({userId: req.user._id})
        .populate('tops')
        .populate('bottoms')
        .populate('outerwears')
        .populate('accessories')
        .populate('outfits')
        .exec (function (err, trips) {
        return res.json(trips);
      });
});

router.post('/trips', bodyParser.json(), async(req, res) => {
    const {name, location, description, tops, bottoms, outerwears, accessories, outfits} = req.body;
    if(!name) {
        return res
        .status(422)
        .send({error: 'You must provide a name'})
    }
    if(!location) {
        return res
        .status(422)
        .send({error: 'You must provide a location'})
    }
    if(!(tops || bottoms || outerwears || accessories || outfits) || !((tops && tops.length != 0) || (bottoms && bottoms.length != 0) || (outerwears && outerwears.length != 0) || (accessories && accessories.length != 0) || (outfits && outfits.length != 0))) {
        return res 
        .status(422)
        .send({error: 'You must provide atleast one item of clothing'})
    }
    try{
        const trips = new Trips({name, location, description, tops, bottoms, outerwears, accessories, outfits, userId: req.user._id});

        trips.save(function(error) {
            if (!error) {
                Trips.find({})
                    .populate('tops')
                    .populate('bottoms')
                    .populate('outerwears')
                    .populate('accessories')
                    .populate('outfits')
                    .exec(function(error, posts) {
                        console.log(JSON.stringify(posts, null, "\t"))
                    })
            }
        });

        res.send(trips);
    }
    catch(err) {
        console.log(err)
        return res.status(422).send("Item already exists")
    }
})

router.delete('/trips/:id', async(req, res) => {
    const {id} = req.params;
    console.log(id)
    if(!id) {
        return res
        .status(422)
        .send({error: 'You must provide an id'})
    }
    try{
        const result = await Trips.remove({_id: id, userId: req.user._id});
        res.send(result);
    }
    catch(err){
        return res.status(422).send(err.message)
    }
})

module.exports = router;
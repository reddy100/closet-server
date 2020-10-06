const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const requireAuth = require('../middlewares/requiredAuth');

const Outfits = mongoose.model('Outfits');

const router = express.Router();
router.use(requireAuth);

router.get('/outfits', async (req, res) => {
    const outfits = await Outfits.find({userId: req.user._id})
        .populate('tops')
        .populate('bottoms')
        .populate('outerwears')
        .populate('accessories')
        .exec (function (err, outfits) {
        return res.json(outfits);
      });
});

router.post('/outfits', bodyParser.json(), async(req, res) => {
    const {name, description, tops, bottoms, outerwears, accessories} = req.body;
    if(!name) {
        return res
        .status(422)
        .send({error: 'You must provide a name'})
    }
    if(!(tops || bottoms || outerwears || accessories) || !((tops && tops.length != 0) || (bottoms && bottoms.length != 0) || (outerwears && outerwears.length != 0) || (accessories && accessories.length != 0))) {
        return res 
        .status(422)
        .send({error: 'You must provide atleast one item of clothing'})
    }
    try{
        const outfits = new Outfits({name, description, tops, bottoms, outerwears, accessories, userId: req.user._id});

        outfits.save(function(error) {
            if (!error) {
                Outfits.find({})
                    .populate('tops')
                    .populate('bottoms')
                    .populate('outerwears')
                    .populate('accessories')
                    .exec(function(error, posts) {
                        console.log(JSON.stringify(posts, null, "\t"))
                    })
            }
        });

        res.send(outfits);
    }
    catch(err) {
        console.log(err)
        return res.status(422).send("Item already exists")
    }
})

router.delete('/outfits/:id', async(req, res) => {
    const {id} = req.params;
    console.log(id)
    if(!id) {
        return res
        .status(422)
        .send({error: 'You must provide an id'})
    }
    try{
        const result = await Outfits.remove({_id: id, userId: req.user._id});
        res.send(result);
    }
    catch(err){
        return res.status(422).send(err.message)
    }
})

module.exports = router;
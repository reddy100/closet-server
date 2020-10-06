const express = require('express');
const mongoose = require('mongoose');

const requireAuth = require('../middlewares/requiredAuth')

const TopClothes = mongoose.model('TopClothes');
const BottomClothes = mongoose.model('BottomClothes');
const OuterwearClothes = mongoose.model('OuterwearClothes');
const Accessories = mongoose.model('Accessories');

const router = express.Router();
router.use(requireAuth);
//Add endpoints to return top 10 items for each category
router.get('/topClothes', async (req, res) => {
    const topClothes = await TopClothes.find({userId: req.user._id});
    res.send(topClothes);
});

router.post('/topClothes', async(req, res) => {
    const {name} = req.body;
    if(!name) {
        return res
        .status(422)
        .end({error: 'You must provide a name'})
    }
    try{
        const topClothes = new TopClothes({name, userId: req.user._id});
        await topClothes.save();
        res.send(topClothes);
    }
    catch(err) {
        return res.status(422).send('Item already exists')
    }
})

router.delete('/topClothes/:name', async(req, res) => {
    const {name} = req.params;
    if(!name) {
        return res
        .status(422)
        .end({error: 'You must provide a name'})
    }
    try{
        const result = await TopClothes.remove({name, userId: req.user._id});
        res.send(result);
    }
    catch(err){
        return res.status(422).send(err.message)
    }
})

router.get('/bottomClothes', async (req, res) => {
    const bottomClothes = await BottomClothes.find({userId: req.user._id});

    res.send(bottomClothes);
});

router.post('/bottomClothes', async(req, res) => {
    const {name} = req.body;

    if(!name) {
        return res
        .status(422)
        .end({error: 'You must provide a name'})
    }
    try{
        const bottomClothes = new BottomClothes({name, userId: req.user._id});
        await bottomClothes.save();
        res.send(bottomClothes);
    }
    catch(err) {
        return res.status(422).send('Item already exists')
    }
})

router.delete('/bottomClothes', async(req, res) => {
    const {name} = req.body;

    if(!name) {
        return res
        .status(422)
        .end({error: 'You must provide a name'})
    }
    try{
        const result = await BottomClothes.remove({name, userId: req.user._id});
        res.send(result);
    }
    catch(err){
        return res.status(422).send(err.message)
    }
})

router.get('/outerwearClothes', async (req, res) => {
    const outerwearClothes = await OuterwearClothes.find({userId: req.user._id});

    res.send(outerwearClothes);
});

router.post('/outerwearClothes', async(req, res) => {
    const {name} = req.body;

    if(!name) {
        return res
        .status(422)
        .end({error: 'You must provide a name'})
    }
    try{
        const outerwearClothes = new OuterwearClothes({name, userId: req.user._id});
        await outerwearClothes.save();
        res.send(outerwearClothes);
    }
    catch(err) {
        return res.status(422).send('Item already exists')
    }
})

router.delete('/outerwearClothes', async(req, res) => {
    const {name} = req.body;

    if(!name) {
        return res
        .status(422)
        .end({error: 'You must provide a name'})
    }
    try{
        const result = await OuterwearClothes.remove({name, userId: req.user._id});
        res.send(result);
    }
    catch(err){
        return res.status(422).send(err.message)
    }
})

router.get('/accessories', async (req, res) => {
    const accessories = await Accessories.find({userId: req.user._id});

    res.send(accessories);
});

router.post('/accessories', async(req, res) => {
    const {name} = req.body;

    if(!name) {
        return res
        .status(422)
        .end({error: 'You must provide a name'})
    }
    try{
        const accessories = new Accessories({name, userId: req.user._id});
        await accessories.save();
        res.send(accessories);
    }
    catch(err) {
        return res.status(422).send('Item already exists')
    }
})

router.delete('/accessories', async(req, res) => {
    const {name} = req.body;

    if(!name) {
        return res
        .status(422)
        .end({error: 'You must provide a name'})
    }
    try{
        const result = await Accessories.remove({name, userId: req.user._id});
        res.send(result);
    }
    catch(err){
        return res.status(422).send(err.message)
    }
})


module.exports = router;
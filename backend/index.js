require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB_URI);
const ItemSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
});
const Item = mongoose.model('Item',ItemSchema);
//create
app.post('/items',async(req,res) =>{
    const item = new Item(req.body);
    try{
        await item.save();
        res.status(201).send(item);
    }
    catch(err){
        res.status(400).send(err);
    }
});
//Read-all
app.get('/items',async(req,res)=>{
    try{
        const items = await Item.find();
        res.status(200).send(items);
    }catch(err){
        res.status(500).send(err);
    }
});
//Read-one
app.get('/items/:id',async(req,res)=>{
    const _id=req.params.id;
    try{
        const item=await Item.findById(_id);
        if(!item)
        {
            return res.status(404).send();
        }
        res.status(200).send(item);
    }
    catch(err)
    {
        res.status(500).send(err);
    }
});
//Update
app.put('/items/:id',async(req,res)=>{
    const _id=req.params.id;
    const item= await Item.findByIdAndUpdate(_id,{ firstname: 'Shyam', lastname: 'Mishra'});
    if(!item)
    {
        return res.status(404).send();
    }
    res.status(200).send(item);
});
app.delete('/items/:id',async(req,res) =>
{
    const _id=req.params.id;
    try{
        const item = await Item.findByIdAndDelete(_id);
        if(!item)
        {
           return res.status(404).send();
        }
        res.status(200).send(item);
    }
    catch(err)
    {
        res.status(500).send(err);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
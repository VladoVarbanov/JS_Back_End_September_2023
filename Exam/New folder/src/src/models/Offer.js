const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
   name: { type: String, required: true ,minLength:10},
   type: { type: String, required: true , minLength:2 },
   damages: { type: String, required: true ,minLength:10},
   image: { type: String, required: true ,match:[/^https?:\/\/.+/,'Image must start with https or http']},
   description: { type: String, required: true,minLength:10,maxLength:200 },
   production: { type: Number, required: true ,minLength:1900,maxLength:2023},
   exploitation: { type: Number, required: true,min:0 },
   price: { type: Number, required: true ,min:0},
   buyingList: [{
      type: mongoose.Types.ObjectId,
      ref: "User"
   }],
   owner: {
      type: mongoose.Types.ObjectId,
      ref: "User"
   }
})

const Offer = mongoose.model("offer", offerSchema);

module.exports = Offer;
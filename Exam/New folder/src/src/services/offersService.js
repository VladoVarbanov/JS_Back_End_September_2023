const Offer = require("../models/Offer.js");
exports.create = (createData) => Offer.create(createData)
exports.getAll = () => Offer.find()
exports.singleCreature = (offerId) => Offer.findById(offerId)
exports.update = (offerId, offerData) => Offer.findByIdAndUpdate(offerId, offerData)
exports.delete = (offerId) => Offer.findByIdAndDelete(offerId)
exports.getOne = (offerId) => Offer.findById(offerId)

exports.buyProduct = async (offerId, userId) => {
    const offer = await this.singleCreature(offerId)

    const isPurchased = offer.buyingList.some((v) => v?.toString() === userId)
    if (isPurchased) {
        return
    }
    offer.buyingList.push(userId)
    return offer.save()
}


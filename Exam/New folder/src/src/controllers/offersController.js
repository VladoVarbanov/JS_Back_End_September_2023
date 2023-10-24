const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const offerService = require('../services/offersService');
const { extractErrorMsgs } = require("../utils/errorHandler")

//CATALOG
router.get("/catalog", async (req, res) => {
    const offers = await offerService.getAll().lean()
    res.render('offer/catalog', { offers })
});

//CREATE
router.get("/create", isAuth, (req, res) => {
    res.render("offer/create");
});

router.post("/create", isAuth, async (req, res) => {
    const { name, type, damages, image, description, production, exploitation, price, buyingList } = req.body;
    try {
        await offerService.create({ name, type, damages, image, description, production, exploitation, price, buyingList, owner: req.user });
        res.redirect('/offers/catalog')
    } catch (err) {
        const errorMessages = extractErrorMsgs(err)
        res.status(404).render('offer/create', { errorMessages })
    }
});

//DETAILS
router.get('/:offerId/details', async (req, res) => {
    const { offerId } = req.params
    const offer = await offerService.singleCreature(offerId).lean()
    const { user } = req
    const { owner } = offer
    const isOwner = user?._id == owner.toString()
    const isBuyer = offer.buyingList?.some((v) => v?._id.toString() === user?._id)
    res.render('offer/details', { offer, isOwner, isBuyer })
})


//EDIT 
router.get('/:offerId/edit', isAuth, async (req, res) => {
    const { offerId } = req.params
    const offer = await offerService.singleCreature(offerId).lean()

    res.render('offer/edit', { offer })

})
router.post('/:offerId/edit', isAuth, async (req, res) => {
    try {
        const { offerId } = req.params
        const { name, type, damages, image, description, production, exploitation, price, buyingList } = req.body;
        await offerService.update(offerId, { name, type, damages, image, description, production, exploitation, price, buyingList, owner: req.user })
        res.redirect(`/offers/${offerId}/details`)

    } catch (error) {
        const errorMessages = extractErrorMsgs(err)
        res.status(404).render('offer/create', { errorMessages })
    }

})

//DELETE
router.get('/:offerId/delete', isAuth, async (req, res) => {
    try {
        const { offerId } = req.params

        await offerService.delete(offerId)

        res.redirect('/offers/catalog')

    } catch (error) {
        const errorMessages = extractErrorMsgs(err)
        res.status(404).render('offer/create', { errorMessages })

    }


})

//BUY product
router.get('/:offerId/buy', async (req, res) => {
    const { offerId } = req.params
    const { _id } = req.user
    await offerService.buyProduct(offerId, _id)
    res.redirect(`/offers/${offerId}/details`)

})

router.get("/search", async (req, res) => {
    const offer = await offerService.getAll().lean();
    res.render("offer/search", { offer });
  });

  router.post("/search", async (req, res) => {
    const { name, type } = req.body;
    let result = await offerService.getAll().lean();
    console.log(result);
    result = result.filter((el) => {
      let all = el.name.toLowerCase().includes(name.toLowerCase());
      if (type) {
        all = el.type.toLowerCase().includes(type.toLowerCase());
      }
      return all;
    });
  
    const offer = result;
  
    res.render("offer/search", { offer });
  });

module.exports = router

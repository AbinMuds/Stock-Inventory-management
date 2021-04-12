const express = require("express")
const router = express.Router()
const db = require("../models")

// New Items route
router.get('/:id/new', (req, res) => {
  res.render('items/new',{pid:req.params.id});
});

//Create Items route
router.post('/:id/new', (req, res)=>{
  db.profile.findOne({
      where:{
          id: req.params.id
      }
  }).then((profile)=>{
        const itemimage = req.files.itemimg;

        itemimage.mv('public/itemimages/' + itemimage.name, function(error){
            if(error){
                console.log("Could.t upload image")
                console.log(error)
            }else{
                console.log("Image uploaded")
            }
        })
      db.item.create({
              name: req.body.name,
              imageLink: itemimage.name,
              quantityOfPackage: req.body.quantityOfPackage,
              quantityOfitemsPerPackage: req.body.quantityOfitemsPerPackage,
              totalCP: req.body.totalCP,
              sellingPricePerPackage: req.body.sellingPricePerPackage,
              sellingPricePerItem: req.body.sellingPricePerItem,
              costPricePerPackage: req.body.costPricePerPackage,
              profileId: profile.id
      }).then((newitem) =>{
          profile.addItem(newitem.dataValues.id).then(()=>{
              req.flash('success', 'Items created')
              res.redirect(`/business/${req.params.id}`)
          })
      }).catch((err) => {
          res.status(400).render('404')
      })
  })
})

//All items route
router.get('/:id', (req,res) => {
    db.profile.findOne({
        where:{
            id: req.params.id
        },
        include : [db.item]
    }).then((profile)=>{
        res.render("business/show",{items:profile.items,profile:profile})
    }).catch((error)=>{
        res.status(400).render('404')
    })
  })

// business delete route
router.get('/delete/:id', (req,res) => {
    db.profile.findOne({
        where:{
            id: req.params.id
        }
    }).then((profile)=>{
        res.render("business/delete",{profile:profile})
    }).catch((error)=>{
        res.status(400).render('404')
        console.log(error)
    })
})

// delete action
router.delete('/:id', (req,res) => {
    db.profile.destroy({
        where: {
            id:req.params.id
        },
        include:[db.item]
    }).then((deletedProfile) => {
        db.item.destroy({
            where : {
                profileId: req.params.id
            }
        }).then((deleted)=>{
            req.flash('success', 'Successfully deleted profile with its child items')
            res.redirect("/business")
        })
        }).catch((error)=>{
            res.status(400).render('404')
    })
})

// Business ITems showpage
router.get('/:id/items/:pk',(req,res) =>{
    db.profile.findOne({
        where: {
            id:req.params.id
        },
    }).then((profile) => {
        db.item.findOne({
            where: {
                id: req.params.pk
            },
        }).then((item)=>{
            res.render('items/show',{item:item,profile:profile})
        })
    })
})

// Items delete Route
router.delete('/:id/items/:pk', (req,res) => {
    db.item.destroy({
        where: {
            id:req.params.pk
        },
    }).then((deleted) => {
        req.flash('success', 'Items deleted')
        res.redirect(`/business/${req.params.id}`)
    })
})

// Items edit form route
router.get('/:id/items/edit/:pk', (req,res)=> {
    db.item.findOne({
        where: {
            id:req.params.pk
        }
    }).then((item) => {
        res.render('items/edit',{pid:req.params.id,itemId:req.params.pk,item:item});
    })
})

// Items edit action route
router.put('/:id/items/:pk', (req,res)=>{
    const itemimage = req.files.itemimg;

        itemimage.mv('public/itemimages/' + itemimage.name, function(error){
            if(error){
                console.log("Could.t upload image")
                console.log(error)
            }else{
                console.log("Image uploaded")
            }
        })
   db.item.update(
       {
            name: req.body.name,
            imageLink: itemimage.name,
            quantityOfPackage: req.body.quantityOfPackage,
            quantityOfitemsPerPackage: req.body.quantityOfitemsPerPackage,
            totalCP: req.body.totalCP,
            sellingPricePerPackage: req.body.sellingPricePerPackage,
            sellingPricePerItem: req.body.sellingPricePerItem,
            costPricePerPackage: req.body.costPricePerPackage,
            profileId: req.params.id
       },
       {where: {id:req.params.pk}}
   ).then((updated)=> {
    req.flash('success', 'Items updated')
       res.redirect(`/business/${req.params.id}/items/${req.params.pk}`)
   }).catch((error)=>{
    res.status(400).render('404')
    })
})

  module.exports = router;

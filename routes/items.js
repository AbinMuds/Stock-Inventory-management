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
        console.log(itemimage)
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
              res.redirect(`/business/${req.params.id}`)
          })
      }).catch((err) => {
          res.status(400).render('404')
          console.log(err)
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
        console.log(error)
    })
  })

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
            res.redirect("/business")
        })
        }).catch((error)=>{
            res.status(400).render('404')
            console.log(error)
    })
})



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

router.delete('/:id/items/:pk', (req,res) => {
    db.item.destroy({
        where: {
            id:req.params.pk
        },
    }).then((deleted) => {
        res.redirect(`/business/${req.params.id}`)
    })
})

router.get('/:id/items/edit/:pk', (req,res)=> {
    db.item.findOne({
        where: {
            id:req.params.pk
        }
    }).then((item) => {
        res.render('items/edit',{pid:req.params.id,itemId:req.params.pk,item:item});
    })
})


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
       res.redirect(`/business/${req.params.id}/items/${req.params.pk}`)
   }).catch((error)=>{
    res.status(400).render('404')
    console.log(error)
    })
})

  module.exports = router;

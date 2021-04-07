const express = require("express")
const router = express.Router()
const db = require("../models")

//All items route
router.get('/', (req,res) => {
//   db.profile.findOne({
//       where:{
//           id: req.profile.id
//       },
//       include : [db.item]
//   }).then((profile)=>{
//       res.render("items/index",{items:profile.item,profile:profile})
//   }).catch((error)=>{
//       res.status(400).render('404')
//   })
// })
    res.send("items")
  })

// New Items route
router.get('/new', (req, res) => {
  res.render('items/new');
});

//Create Items route
router.post('/new', (req, res)=>{
  db.profile.findOne({
      where:{
          id: req.profile.id
      }
  }).then((profile)=>{
      db.item.create({
              name: req.body.name,
              imageLink: req.body.itemimg.name,
              quantityOfPackage: req.body.quantityOfPackage,
              quantityOfitemsPerPackage: req.body.quantityOfitemsPerPackage,
              totalCP: req.body.totalCP,
              sellingPricePerPackage: req.body.sellingPricePerPackage,
              sellingPricePerItem: req.body.sellingPricePerItem,
              costPricePerPackage: req.body.costPricePerPackage,
              profileId: profile.id
      }).then((newitem) =>{
          console.log('-----------------')
          console.log(newitem)
          console.log('-----------------')
          profile.addItem(newitem.dataValues.id).then(()=>{
              res.redirect('/items/index')
          })
      }).catch((err) => {
          res.status(400).render('404')
          console.log(err)
      })
  })
})



module.exports = router;
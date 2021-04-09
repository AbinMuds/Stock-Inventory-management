const express = require("express")
const router = express.Router()
const db = require('../models')
const itemsorders = require("../models/itemsorders")

// All order route
router.get('/', (req,res) => {
    db.user.findOne({
        where:{
            id: req.user.id
        },
        include : [db.order]
    }).then((user)=>{
        res.render("order/index",{orders:user.orders,user:user})
    }).catch((error)=>{
        res.status(400).render('404')
    })
})

// New order route
router.get('/new', (req, res) => {
    res.render('order/new');
  });

//Create order route
router.post('/new', (req, res)=>{
    db.user.findOne({
        where:{
            id: req.user.id
        }
    }).then((user)=>{
        db.order.create({
                userId: user.id,
                orderName: req.body.orderName,
                orderFrom: req.body.orderFrom,
                orderTo: req.body.orderTo,
                complete: req.body.complete
        }).then((newOrder) =>{
            user.addOrder(newOrder.dataValues.id).then(()=>{
                res.redirect('/order')
            })
        }).catch((err) => {
            res.status(400).render('404')
            console.log(err)
        })
    })
})

router.get('/:id', (req,res) => {
  db.order.findOne({
      where:{
          id: req.params.id
      },
      include:[db.item]
  }).then((order)=>{
      order.getItems().then((items)=> {
        res.render("order/show",{order:order,items:items})
      })
  }).catch((error)=>{
      res.status(400).render('404')
      console.log(error)
  })
})

router.get('/items/:id', (req,res)=> {
    db.item.findOne({
        where: {
            id: req.params.id
        }
    }).then((item)=> {
        res.render('order/itemOrderForm',{item:item})
    })
})

// router.post('/items/:id',(req,res) => {
//     db.item.findOne({
//         where: {
//             id: req.params.id
//         }
//     }).then((item)=> {
//         db.itemsorders.create(
//           {
//             itemQuantity: req.body.orderQ,
//             itemId: req.body.itemId,
//             orderId: req.body.orderId
//           }
//         ).then((newItemOrder) => {
//             item.addItemsorders(itemsorders.datavalues.id).then(()=>{
//                 res.redirect('/order')
//             })
//         })
//     })
// })
// router.post('/items/:id', (req,res)=> {
//   db.item.findOne({
//     where: {
//       id:req.params.id
//     }
//   }).then((item)=> {
//     db.order.findOne({
//       where: {
//         id: req.body.orderId
//       }
//     }).then((order)=> {
//       order.addItem(item).then((addded)=> {
//         res.redirect(`/order/${order.id}`)
//       })
//     })
//   })
// })
router.post('/items/:id', (req,res)=> {
  db.item.findOne({
    where: {
      id:req.params.id
    }
  }).then((item)=> {
    db.order.findOne({
      where: {
        id: req.body.orderId
      }
    }).then((order)=> {
      db.itemsOrders.findOrCreate({
        where: {
          itemQuantity: req.body.orderQ,
          itemId: req.body.itemId,
          orderId: req.body.orderId
        }
      }).then(([newv,created]) => {
        res.redirect(`/order/${order.id}`)
      })
    })
  }).catch((error)=>{
    res.status(400).render('404')
    console.log(error)
  })
})
module.exports = router;
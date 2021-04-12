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
                req.flash('success', 'Order Created')
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
        db.user.findOne({
          where:{
            id:req.user.id
          }
        }).then((user) => {
          user.getOrders().then((order) => {
              res.render('order/itemOrderForm',{item:item,order:order})
          })
        })
    })
})

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


router.get('/:id/complete', (req,res)=>{
  let total_price = null
  let quantArr = {}
  function propAndValAdder(){
    for (var i = 0; i < arguments.length; i+=2) {
        quantArr[arguments[i]] = arguments[i + 1];
    }
  }
  db.order.findOne({ where:{
    id: req.params.id
  }}).then((order) => {
      order.getItems().then((item) => {
        let y = true
        console.log('------------------------')
        console.log(item)
        console.log('------------------------')
        item.forEach((item) => {
          let x = item.dataValues
          total_price += x.sellingPricePerPackage * x.itemsOrders.dataValues.itemQuantity
          console.log(x.quantityOfPackage)

          let qvalue = x.quantityOfPackage - x.itemsOrders.dataValues.itemQuantity
          let qkey = item.dataValues.id
          propAndValAdder(qkey,qvalue)
          // quantArr = qvalue
          // quantArr.value = qvalue
          if (x.quantityOfPackage < x.itemsOrders.dataValues.itemQuantity) {
              req.flash('success', 'Quantity is less in the inventory,Try ording less Packages')
              res.redirect(`/order/${req.params.id}`)
          }
        })
        console.log('------------------------')
        console.log(quantArr)
        console.log('------------------------')
        res.render('order/orderForm',{total_price:total_price,y:y,order:order,quantArr:quantArr})
        console.log(total_price)
        // res.render('order/show',{total_price:total_price})
      })
      console.log("outside items ==dont get this value")
  })
  console.log('------------------------')
})

router.put('/:id/ready',(req,res)=> {
    let quantArr = {}
    function propAndValAdder(){
      for (var i = 0; i < arguments.length; i+=2) {
          quantArr[arguments[i]] = arguments[i + 1];
      }
    }
    db.order.update(
      {
        complete: req.body.complete,
        totalPrice: req.body.totalPrice
      },
      {where: {id:req.params.id}}
    ).then((updated) => {
        req.flash('success', 'Order Complete!')
        res.redirect("/order")
    })
})

// router.get('order/:id/quantityupdate')
// router.put('order/:id/quantityupdate')

// db.order.findOne({
//   where :{
//     id: req.params.id
//   }.then((order) => {
//       order.getItems().then((item) => {
//         item.forEach((item) => {
//           let x = item.dataValues
//           let qvalue = x.quantityOfPackage - x.itemsOrders.dataValues.itemQuantity
//           let qkey = item.dataValues.id
//           propAndValAdder(qkey,qvalue)
//         })
//           res.render('order/quantityUpdate',{quantArr:quantArr})
//       })
//   })
// })

router.delete('/:pk/item/:id/delete' , (req, res) => {
    db.itemsOrders.destroy({
      where:{itemId: req.params.id}
    }).then((deleted) => {
        req.flash('success', 'Order Item deleted')
        res.redirect(`/order/${req.params.pk}`)
    })
})

router.delete('/:id/delete',(req, res) => {
    db.order.destroy({
      where:{id:req.params.id
      }
    }).then((deleted) => {
      req.flash('success', 'Order deleted')
      res.redirect(`/order`)
    })
})

module.exports = router;
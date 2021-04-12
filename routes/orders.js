const express = require("express")
const router = express.Router()
const db = require('../models')

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
        })
    })
})

// order show page route
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
  })
})

// itemsOrders form 
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

// order show page with order items
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
  })
})

// when order is complete route for form
router.get('/:id/complete', (req,res)=>{
  let total_price = null
  db.order.findOne({ where:{
    id: req.params.id
  }}).then((order) => {
      order.getItems().then((item) => {
        let y = true
        item.forEach((item) => {
          let x = item.dataValues
          total_price += x.sellingPricePerPackage * x.itemsOrders.dataValues.itemQuantity
          if (x.quantityOfPackage < x.itemsOrders.dataValues.itemQuantity) {
              req.flash('success', 'Quantity is less in the inventory,Try ording less Packages')
              res.redirect(`/order/${req.params.id}`)
          }
        })
        res.render('order/orderForm',{total_price:total_price,y:y,order:order})
      })
  })
})

// update the order complete status and adds totalprice to order
router.put('/:id/ready',(req,res)=> {
    db.order.update(
      {
        complete: req.body.complete,
        totalPrice: req.body.totalPrice
      },
      {where: {id:req.params.id}}
    ).then((updated) => {
        req.flash('success', 'Order Complete!')
        res.redirect(`/order/${req.params.id}`)
    })
})

//items delete route in order page
router.delete('/:pk/item/:id/delete' , (req, res) => {
    db.itemsOrders.destroy({
      where:{itemId: req.params.id}
    }).then((deleted) => {
        req.flash('success', 'Order Item deleted')
        res.redirect(`/order/${req.params.pk}`)
    })
})

// order delete route 
router.delete('/:id/delete',(req, res) => {
    db.order.destroy({
      where:{id:req.params.id
      }
    }).then((deleted) => {
      req.flash('success', 'Order deleted')
      res.redirect(`/order`)
    })
})

// update quantityOfPackage route
router.get('/:id/itemupdate' , (req,res) => {
  db.order.findOne({
      where: {id:req.params.id}
  }).then((order) => {
      res.render('order/quantityUpdate' ,{order:order})
  })
})

// Updates items quantity
router.put('/:id/itemupdate', (req,res)=>{
  db.order.findOne({ where:{
    id: req.params.id
  }}).then((order) => {
      order.getItems().then((item) => {
        item.forEach((item) => {
          let x = item.dataValues
          let qdiff = x.quantityOfPackage - x.itemsOrders.dataValues.itemQuantity
          if (x.quantityOfPackage < x.itemsOrders.dataValues.itemQuantity) {
              req.flash('success', 'Quantity is less in the inventory,Try ording less Packages')
              res.redirect(`/order/${req.params.id}`)
          }
          item.update(
              {quantityOfPackage:qdiff},
              {where: {id:item.id}}
              ).then((updated) => {
                  req.flash('success', 'item quantity updated!')
                  res.redirect("/")
              })
          })
        res.redirect(`/order/${req.params.id}`)
      })
  })
})


module.exports = router;
//add to order buttton in the items 

// const db = require("../models");
// const { route } = require("../routes/orders");
// const router = require("../routes/orders");

// takes to the form with quantity of items

// if quantity is less than the order given it gives the meessage "order cannot be done"
//else takes to chooose the order and adds it there and bring back to the items page

//so many items can be added to the order 

// initially we have to have a order 

// so we have to create an order 

//for that we need to have an order form 
// Add order =======  takes to form to have orderName, form and ToOrder

// order are added to order page
// so in order page we have a lots of orders and if we click order page it will take us to the orderdetails with some items added to that order 
// theres a button saying complete ////if clicked it will add that details to the Bull of sale and we can delete that order
//DOnt need to edit order if created so only delete functionality

// router('/:id/:pk',(req,res) => {
//     db.item.findOne({
//         where: {
//             id: req.params.pk
//         }
//     }).then((item)=> {
//         db.order.findOne({
//             where: {
//                 id:req.params.id
//             }
//         }).then((order) => {
//             order.addItems(item.datavalues.id).then(()=>{
//                 res.redirect('/order')
//             })
//         })
//     })
// })
// link =>item/< item.id >/     => id=item.id 
// route('order/item/:id', (req,res)=> {
//     db.item.findOne({
//         where: {
//             id: req.params.id
//         }
//     }).then((item)=> {
//         res.render('/form',{item:item})
//     })
// })

// form for item to choose quantity
// itemsorder form 
// form post =>
// quantity value => we decide 
// itemId: item.id
// orderId: 1   =>linkage done
// form action =/order/



///Complete functionality
    // we need to pass order.id and item.id to the routes 
    // so in the routes 
    // router.post(':id/:pk', (req,res)=>{
    //     db.itemsOrders.findOne({
    //         where: {
    //             orderId: req.params.id,
    //             itemId: req.params.pk
    //         }
    //     }).then((newi)=>{
    //        let  total_price = null
    //        new1.order.items.forEach((item) => {
    //             total_price += item.Sp
    //        })
    //        new1.order.complete = true
    //            res.render('order/billOfSale',{item,itemOrders,order})
    //         console.log(totalPrice)
    //     })
    // })


// Reduce the itemquantity if order is made
// Requirements: orderitems : can be accessed from order.getItems, item.itemOrders.itemQuantity, item.quantity
// router.put('', (req,res) => {
//     db.order.findOne({
//         where: {id:req.params.id}
//     }).then((order) => {
//         order.getItems().then((item) => {
//             item.update(
//                 {
//                 quantityOfPackage:req.body.quantityOfPackage
//                 },
//                 {where: {id:req.params.id}}
//             ).then((updated) => {
//                 req.flash('success', 'item quantity updated!')
//                 res.redirect("/")
//             })
//         })
//     })
// })
// so we are asking for quantity of packages , we need a input hidden with updated quantity

// now get

// router.get('/:id/itemupdate' , (req,res) => {
//     db.order.findOne({
//         where: {id:req.params.id}
//     }).then((order) => {
//         res.render('order/quantityUpdate' ,{order:order})
//     })
// })

// router.put('/:id/itemupdate', (req,res)=>{
//     let qvalue = []
//     let qkey = []
//     db.order.findOne({ where:{
//       id: req.params.id
//     }}).then((order) => {
//         order.getItems().then((item) => {
//           item.forEach((item) => {
//             let x = item.dataValues
//             total_price += x.sellingPricePerPackage * x.itemsOrders.dataValues.itemQuantity
//             qvalue.push(x.quantityOfPackage - x.itemsOrders.dataValues.itemQuantity)
//             qkey.push(item.dataValues.id)
//             if (x.quantityOfPackage < x.itemsOrders.dataValues.itemQuantity) {
//                 req.flash('success', 'Quantity is less in the inventory,Try ording less Packages')
//                 res.redirect(`/order/${req.params.id}`)
//             }
//             item.update(
//                 {quantityOfPackage:req.body.quantityOfPackage},
//                 {where: {id:item.id}}
//                 ).then((updated) => {
//                     req.flash('success', 'item quantity updated!')
//                     res.redirect("/")
//                 })
//             })
//           res.render('order/orderUpdateForm',{order:order,qvalue,qkey})
//         })
//     })
//   })
  
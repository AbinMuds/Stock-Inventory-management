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


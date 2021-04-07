const express = require("express")
const router = express.Router()
const db = require('../models')
// const Profile = new db.profile()

// All business route
router.get('/', (req,res) => {
    db.user.findOne({
        where:{
            id: req.user.id
        },
        include : [db.profile]
    }).then((user)=>{
        res.render("business/index",{profiles:user.profiles,user:user})
    }).catch((error)=>{
        res.status(400).render('404')
    })
})

// New Business route
router.get('/new', (req, res) => {
    res.render('business/new');
  });

//Create Business route
router.post('/new', (req, res)=>{
    db.user.findOne({
        where:{
            id: req.user.id
        }
    }).then((user)=>{
        console.log('-----------------')
        console.log(user.id)
        console.log('-----------------')
        db.profile.create({
                userId:user.id,
                name: req.body.name,
                imageLink: req.body.businessimg.name,
                description: req.body.description,
                type: req.body.type
        }).then((newprofile) =>{
            console.log('-----------------')
            console.log(newprofile)
            console.log('-----------------')
            user.addProfile(newprofile.dataValues.id).then(()=>{
                res.redirect('/business/index')
            })
        }).catch((err) => {
            res.status(400).render('404')
            console.log(err)
        })
    })
})

//Create Business route
// router.post('/new' ,(req,res) => {
//     res.send(req.body.businessimg.name)
// })

//Business Page
router.get('/:id/show', (req,res) => {
    db.profile.findOne({
        where:{
            id: req.params.id
        }
    }).then((profile)=>{
        res.render(`business/show`,{profile:profile})
    }).catch((error)=>{
        res.status(400).render('404')
    })
})


module.exports = router;
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
        const businessimage = req.files.businessimg;

        businessimage.mv('public/businessImage/' + businessimage.name, function(error){
            if(error){
                console.log("Could.t upload image")
                console.log(error)
            }else{
                console.log("Image uploaded")
            }
        })
        db.profile.create({
                userId:user.id,
                name: req.body.name,
                imageLink: businessimage.name,
                description: req.body.description,
                type: req.body.type
        }).then((newprofile) =>{
            user.addProfile(newprofile.dataValues.id).then(()=>{
                res.redirect('/business')
            })
        }).catch((err) => {
            res.status(400).render('404')
            console.log(err)
        })
    })
})

router.get('/:id/edit', (req,res) => {
    db.profile.findOne({
        where: {
            id:req.params.id
        }
    }).then((profile)=> {
        res.render('business/edit', {profile:profile})
    })
})

router.put('/:id', (req,res) => {
    const businessimage = req.files.businessimg;

    businessimage.mv('public/businessImage/' + businessimage.name, function(error){
        if(error){
            console.log("Could.t upload image")
            console.log(error)
        }else{
            console.log("Image uploaded")
        }
    })
    db.profile.update(
        {   
            name: req.body.name,
            imageLink: businessimage.name,
            description: req.body.description,
            type: req.body.type
        },
        {where: {id: req.params.id}}
    ).then((updated)=>{
        res.redirect(`/business`)
    }).catch((err) => {
        res.status(400).render('404')
        console.log(err)
    })
})

module.exports = router;
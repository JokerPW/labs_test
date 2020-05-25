const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const confirmation = require('../utils/productConfirmation')

const url = 'http://challenge-api.luizalabs.com/api/product/'


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/favorite', auth, async (req, res) => {
    try {
        const favorite = req.body.product
        if(req.user.checkFavoriteExistence(favorite))
            return res.status(404).send()
        
        const product = await confirmation(url + favorite)
        if(product === null || product === undefined)
            return res.status(404).send()
        
        req.user.favorites = req.user.favorites.concat({product: favorite})
        
        await req.user.save()
        res.send({favorite})
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/users/favorite/:id', auth, async (req, res) => {
    try {
        const favorite = req.params.id
        if(!req.user.checkFavoriteExistence(favorite))
            return res.status(404).send()

        const product = await confirmation(url + favorite)
        product.url = url + favorite
        res.send({product})
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid update!'})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router
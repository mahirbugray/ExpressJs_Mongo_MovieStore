const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user')

exports.getLogin = (req, res, next) => {
    res.render('login')
}

exports.postLogin = (req, res, next) => {
    const {email, password} = req.body;
    User.findOne({email: email})
    .then(user =>{
        if(user){
            bcrypt.compare(password, user.password)
            .then(result => {
                if(result){
                    req.session.isAuthenticated = true;
                    req.session.user = user;
                    res.redirect('/movies')
                }
                else{
                    res.redirect('/users/login')
                }
            })
        }
        else{
            res.redirect('/users/login')
        }


            //result == true;
        
        // if(user.password == password) {
        //     req.session.isAuthenticated = true;
        //     res.redirect('/movies');
        // }
        // else{
        //     res.redirect('/users/login');
        // }
    })
    //COOKİ İLE KULLANIMI
    // if(email == 'ali@gmail.com' && password == '123') {
    //     //cooki parser yüklenmeli
    //     //res.cookie(cookieİsmi, cookie değeri, yaşam ömrü)
    //     res.cookie('isAuthenticated', true//, {expires: new Date(Date.now() + 60000)} cookie ömrü 1 dakikadır.
    //     )
    //     res.redirect('/movies')
    // }

   
}

exports.getLogout = (req, res, next) => {
    //req.session.destroy();  bütün sessionları siler
    delete req.session.isAuthenticated;   //sadece isAuthenticated sessionunu siler.
    res.redirect('/movies');
}

exports.getRegister = (req, res, next) => {
    res.render('register')
}

exports.postRegister = (req, res, next) => {
    const {name, surname, email, password} = req.body

    bcrypt.hash(password, 10)
    .then(hashedPassword => {
        console.log(hashedPassword)
        const user = new User({
            email: email,
            name: name,
            surname: surname,
            password: hashedPassword
        })
    user.save()
    .then(() => {
        res.redirect('/users/login');
    }).catch((err) => {
        console.log(err)
    })
    })
 
    // const user = new User(req.body);

   
}
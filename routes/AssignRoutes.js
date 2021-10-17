// import expressjs & filesystem
const express = require('express')
const fs = require('fs')

// constant containing data location
const users = ('./users/users.json')
let app = express()

// Test Home / Default Page
app.get('/', (req, res) => {
    res.send("<h1>This is the assignment home page</h1>")
})

// 3.A Endpoint /user?uid=?
app.get('/user', (req, res) => {

    // Gets uid through request query
    let userId = parseInt(req.query.uid)
    let userFound = false;

    fs.readFile(users, 'utf8', (err, data) => {
        // Gets all data from users.json file & puts into newArray
        let newArray = (JSON.parse(data))
        let arrayResponse = []

        // Loops to find matching id in the newArray
        for (let x = 0; x < newArray.length; x++){

            // If found gets fields from newArray[x] & set userFound to true
            if (newArray[x].id == userId) {
                arrayResponse[0] = {
                    'id': newArray[x].id,
                    'name': newArray[x].name,
                    'email': newArray[x].email,
                    'address': (`${newArray[x].address.street} ${newArray[x].address.suite}, ${newArray[x].address.city}, ${newArray[x].address.zipcode}`),
                    'phone': newArray[x].phone
                }
                userFound = true
            }
        }

        // If user is not found send message "No user found"
        if (userFound == false) {
            return res.status(400).send({
                message: "No user found"
            })
        }

        // Sends JSON response of arrayResponse if userFound is true
        return res.json(arrayResponse)
    })
})

// 3.B Endpoint /users/all
app.get('/user/all', (req, res) => {

    fs.readFile(users, 'utf8', (err, data) => {
        // Gets all data from users.json file & puts into newArray
        let newArray = (JSON.parse(data))

        // Sorts newArray by username field 
        newArray.sort((a,b) => (a.username > b.username ? 1 : -1))
        
        // Sends JSON response of sorted newArray
        res.json(newArray)
    })
})

module.exports = app
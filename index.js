// 101203877 Chi Calvin Nguyen
// Import expressjs
const express = require('express')
let app = express()

// import routes
let assignRoute = require('./routes/AssignRoutes')
app.use(assignRoute)

// start server
let server = app.listen(8081, () => {
    let port = server.address().port
    console.log(`Server started at port ${port}`)
})
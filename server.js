const express = require('express')
const app = express()
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

let db,
 dbConnectionStr = process.env.DB_STRING,
 dbName = 'to-do-list'

MongoClient.connect(dbConnectionStr,{
    useUnifiedTopology: true
}) .then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (request,response)=> {
  db.collection('to-do-list').find().toArray()
  .then(data =>{
      response.render('index.ejs', {info:data})
  })
  .catch(error => console.error(error))
})


app.post('/addJob',(request,response)=>{
  db.collection('to-do-list').insertOne(request.body)
  .then(result =>{
      console.log('job added')
      response.redirect('/')
  })
  .catch(error => console.error(error))
})



app.delete('/completeTask',(request,response)=>{
    db.collection('to-do-list').deleteOne({jobName: request.body.task})
    .then(result =>{
        console.log('Job completed')
        response.json('Job completed')
    })
    .catch(error=>console.error(error))
})


app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})
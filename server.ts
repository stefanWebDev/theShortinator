import Converter from "./utils/Converter";
import { data } from "jquery";

const URLData = require('./model/URLData');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path =  require('path');

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: true }));

interface urlData {
  shortUrl: string,
  longUrl: string,
  _id?: string,
}



mongoose.connect('mongodb://localhost:27017/shortinator', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to mongodb")
    })
    .catch(err => {
        console.log("connection to mongodb failed")
        console.log(err)
    })


    app.get('/urls',  async (req, res) => {
      const urls = await URLData.find({});
      res.send(urls)
    })
  


app.get('/',  (req, res) => {
    res.sendFile(__dirname + './src/index.html')
  })


app.post('/',  async(req, res) => {
   const longUrl: string =  req.body.url;
   const shortenedURL: string = Converter.longToShortConversion(longUrl);
   const cleanedUrl: string = Converter.removeSpecialCharsFromShortUrl(shortenedURL);
   const data: urlData = {
     shortUrl: cleanedUrl,
     longUrl: longUrl
   }


   const urlData = new URLData(data);

   URLData.countDocuments({longUrl: longUrl},  async(err, count) => { 
    if(count === 0){
      await urlData.save();
    }
}); 
  
   res.render('outcomeShort', {cleanedUrl});

  })


  app.get('/:shorturl',  async (req, res) => {


   await URLData.findOne({shortUrl :  req.params.shorturl}, (err, result) => {
        console.log("amount");
        if(result !== null){
          const longUrl: string = result.longUrl
          console.log(result)
          res.render('outcomeLong', {longUrl});
        } else {
          console.log("error" + err);
        }     
      });
  })


  app.listen(3000, () => {
    console.log('Server is up on port ' + 3000)
})
import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser';
import moment from 'moment/moment.js';
const app = express()
const port = 3000
const apiKey = "d79d08b803e6a8b372671872b6e40c5c";

app.use(express.static("public/"));
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', (req, res) => {

    res.render("index.ejs")})

app.post('/', async (req, res) => {
        try{
            const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${req.body.city}&limit=5&appid=${apiKey}`)
            res.render("index.ejs", {content: response.data})
        }
        catch (error){
            res.send('Hello World!')}
        })   
 

app.post('/city', async (req, res) => {
  
    const latLon = req.body.lat
    // console.log(req.body.lat)
    const [lat, lon] = latLon.split(',');

try{

const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
const result = response.data;
const d = Date.now() + (result.timezone *1000);
const p = new Date(d);
const day = p.toUTCString();

var dateString = day.split(' ').slice(0, 4).join(' ');
var timeString = day.split(' ').slice(4, 5).join(' ');
// console.log(dateString)
// console.log(timeString)

time(timeString)

function time(time24){
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? 'AM' : 'PM';
    const hours = +sHours % 12 || 12;
  
     return `${hours}:${minutes} ${period}`;
  }

   res.render("weather.ejs", {content: result, date: dateString, time:time(timeString)})
    }
    catch (error){
    res.send('error')}
    })
    app.get('*', function(req, res){
        res.redirect("/")
        res.status(404).send('what???');
      });
      

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

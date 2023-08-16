var sunrise = document.querySelectorAll(".degcard")[2];
var sunset = document.querySelectorAll(".degcard")[5]

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector(".loader").style.visibility = "visible";
    } else {
        document.querySelector(
          ".loader").style.display = "none";
        document.querySelector(
          "body").style.visibility = "visible";
          document.querySelector(".loader").style.animation = "fadeInAnimation ease 3s";
          document.querySelector("img").style.animation = "fadeInAnimation ease 2s";
    }
};

document.querySelector("input").addEventListener("click", slider)

function slider(){
    document.querySelector("body").style.marginTop = "15vw";
    
}
document.querySelector("body").style.transition = "all 1s";
function barposition(){
    document.querySelector("body").style.marginTop = "30px";
}
// background: -webkit-gradient(linear, left top, left bottom, from(#0d0177), to(#005eff)) fixed;



function sunRise(dt, timezone){
    sunrise.querySelector("h3").innerText = sunLi(dt, timezone)

}

function sunSet(dt, timezone){
    sunset.querySelector("h3").innerText = sunLi(dt, timezone)

}

function sunLi(dt, timezone){

const d = dt*1000 + (timezone*1000);
const p = new Date(d);
const day = p.toUTCString()

var timeString = day.split(' ').slice(4, 5).join(' ');

return(time(timeString));

function time(time24){
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? 'AM' : 'PM';
    const hours = +sHours % 12 || 12;
  
     return(`${hours}:${minutes} ${period}`);
  }

}
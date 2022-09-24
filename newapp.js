var jet = document.getElementById("jet");
var board = document.getElementById("board");
var star_list = [];

class Star{
    constructor(top, left, width, height, image) {
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = width;
        this.image = image;
        
    }
}

const star_1 = new Star(25, 25,22,20, "rocket.png");
const star_2 = new Star(100, 100,50, 50, "rocket.png");
const star_3 = new Star(350, 350,75,75, "sun.jpg");
star_list.push(star_1);
star_list.push(star_2);
star_list.push(star_3);


window.addEventListener("keydown", (e) => {
    var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
    if (e.key == "ArrowLeft" && left > 0) {
      jet.style.left = left - 10 + "px";
      
    }

    //460  =>  board width - jet width
    else if (e.key == "ArrowRight" && left <= 460) {
        jet.style.left = left + 10 + "px";
        // console.log(jet.style.right);
  }
  if(e.key == "ArrowUp" || e.key == "Space"){
    var bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);
    bullet.style.left = left + "px";

    var movebullet = setInterval(function(){
        var stars = document.getElementsByClassName("stars");
        var bulletbottom = parseInt(
            window.getComputedStyle(bullet).getPropertyValue("bottom")
        );
        for(var i = 0; i < stars.length; i++) {
            var star_ = stars[i]
            if (star_ != undefined){
                var starbound = star_.getBoundingClientRect();
                var bulletbound = bullet.getBoundingClientRect();

                if(
                    bulletbound.left >= starbound.left &&
                    bulletbound.right <= starbound.right &&
                    bulletbound.top <= starbound.top && 
                    bulletbound.bottom <= starbound.bottom 
                ){
                    star_.parentElement.removeChild(star_);
                    document.getElementById("points").innerHTML =
                    parseInt(document.getElementById("points").innerHTML) + 1;
                }
            }
        }

        bullet.style.bottom = bulletbottom + 3 + "px";
        

    })
  }

}, 1);



var generatecoins = setInterval(function(){
    var coin_ = document.createElement("div");
    coin_.classList.add("coins");

    // var rockleft = parseInt(
    //     window.getComputedStyle(coin).getPropertyValue("left")
    //   );

    coin_.style.left = Math.floor(Math.random() * 450) + "px";
    board.appendChild(coin_);

}, 3000);


var movecoins = setInterval(function(){
    var coins = document.getElementsByClassName("coins");

    if (coins != undefined) {
        for(var i = 0; i < coins.length; i++) {
            var coin = coins[i];
            var cointop = parseInt(
                window.getComputedStyle(coin).getPropertyValue("top")
            );
            
            coin.style.top = cointop + 25 + "px";
        }

    }
}, 1000);


var check_coin_touch = setInterval(function(){
    var coins = document.getElementsByClassName("coins");
    if(coins != undefined){
        for(var i = 0; i < coins.length; i++) {
            var coin = coins[i];
            coin_rect = coin.getBoundingClientRect();
            jet_rect = jet.getBoundingClientRect();
            
            if(coin_rect.left <= jet_rect.left &&
                coin_rect.right >= jet_rect.left &&
                coin_rect.bottom >= jet_rect.top) 
                {
                document.getElementById("coin_count").innerHTML =
                parseInt(document.getElementById("coin_count").innerHTML) + 1;
                coin.parentElement.removeChild(coin);
                console.log(jet_rect.top, jet_rect.bottom);
            }

        }
        
    }

}, 1);



var generatestar  = function(){
    for(i=0 ; i < star_list.length ; i++){
        // var star_ = document.createElement("div");
        // star_.classList.add("stars");
        // star_.innerHTML = "<img class='starimage' onclick='changeimage()' border='0' src=star_list[i].image width='35' height='35' />";
        // star_.style.top = star_list[i].top + "px";
        // star_.style.left = star_list[i].left + "px";
        
        var star_ = document.createElement('img');
        star_.src = star_list[i].image;
        star_.style.top = star_list[i].top + "px";
        star_.style.left = star_list[i].left + "px";
        star_.style.width = star_list[i].width +  "px";       
        star_.style.height = star_list[i].height+ "px";
        
        star_.classList.add("stars");
        console.log(star_list[i].top, star_list[i].left, star_list[i].width, star_list[i].height);
        board.appendChild(star_);
    };

};

generatestar();





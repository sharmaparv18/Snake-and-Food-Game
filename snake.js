

function init(){       // initialization function
    canvas= document.getElementById("mycanvas");
    // console.log("in init");
    h=w=canvas.height=canvas.width=1000;
    pen=canvas.getContext("2d");  // this will allow me for rendering the canvas in 2d
    cs=66.5;
    gameover=false;
    // creating food image here
    food_img=new Image();
    food_img.src="assets/food.png";
    food=getrandomfood();
    // score count
    score=5;
    // trophy with score
    trophy=new Image();
    trophy.src="assets/troph.png";
    snake={   
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",
        
        //function to create snake initially created internally on memory
        createsnake: function(){
            for(var i=this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },

        //drawing the snake displaying it on grid
        drawsnake:function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle=this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
        },

        //movements of snake
        updatesnake:function(){
            var headx=this.cells[0].x;
            var heady=this.cells[0].y;
            if(headx==food.x && heady==food.y){
                food=getrandomfood();
                score++;
            }
            else{
            this.cells.pop();
            }
            
            var xnew,ynew;
            if(this.direction=="right"){
                xnew=headx+1;
                ynew=heady;

            }
            else if(this.direction=="left"){
                xnew=headx-1;
                ynew=heady;
            }
            else if(this.direction=="down"){
                xnew=headx;
                ynew=heady+1;
            }
            else if(this.direction=="up"){
                xnew=headx;
                ynew=heady-1;
            }
            this.cells.unshift({x:xnew,y:ynew});
            
            if(xnew*cs<0 || (xnew*cs)+cs>w)
               gameover=true;
            else if(ynew*cs<0 || (ynew*cs)+cs>h )
            gameover=true;
             
        }
    };
    snake.createsnake();
    
    function keypressed(e){
        // conditional statements
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowUp"){
            snake.direction="up";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        
    }
    // adding event listener for taking input from keyboard
    document.addEventListener('keydown',keypressed);
}

function draw(){
    // console.log("in draw");
    pen.clearRect(0,0,h,w);
    snake.drawsnake();
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(trophy,20,20,cs,cs);
    pen.fillStyle="purple";
    pen.font="25px Roboto";
    pen.fillText(score,46,53);
}

function update(){
    // console.log("in update");
    snake.updatesnake();
  
}
  // function for creating food
  function getrandomfood(){
      var foodx=Math.round(Math.random()*(w-cs)/cs);
      var foody=Math.round(Math.random()*(h-cs)/cs);

      var food={
          x:foodx,
          y:foody,
          color:"red",
      }
      return food;
  }
function gameloop(){
    // console.log("in gameloop");
    if(gameover==true){
        // window.alert("GAME OVER !!!");
        clearInterval(f);
    }
    draw();
    update();

}

init();
  // since init will be called only once but draw update need to be called infinitely using setinterval
var f=setInterval(gameloop,100);

 


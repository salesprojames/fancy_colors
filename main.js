//Create the Canvas
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var boxes = [];

    var gameSettings = {
      numberOfBoxes: 75,
      maxSize: 20,
      maxDuration: 100
    }

    //Generate Random Number
    function randomNum(n, min){
      return Math.floor((Math.random() * n) + min)
    }

    //Create a certain number of boxes
    function createBoxes(n){
      for(i=0;i<n;i++){
        boxes.push(
          {
            color: colors[randomNum(colors.length, 0)],
            size: randomNum(gameSettings.maxSize, 5),
            x: randomNum(canvas.width, 0),
            y: randomNum(canvas.height, 0),
            duration: randomNum(gameSettings.maxDuration, 5)
          }
        )
      }
    }

    //Draw the boxes on the screen
    function drawBoxes(){
      for(i=0;i<boxes.length;i++){
        if(boxes[i].duration < 0){
          context.clearRect(boxes[i].x,boxes[i].y,boxes[i].size,boxes[i].size);
          boxes.splice(i,1);
          createBoxes(1);
        } else {
          boxes[i].duration -= 1;
          context.fillStyle = boxes[i].color
          context.fillRect(
            boxes[i].x,
            boxes[i].y,
            boxes[i].size,
            boxes[i].size
          )
        }
      }
    }

    function runGame(){
      drawBoxes();
      requestAnimationFrame(runGame);
    }

    createBoxes(gameSettings.numberOfBoxes);
    runGame();

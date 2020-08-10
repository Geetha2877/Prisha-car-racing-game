class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,200);
    player1.addImage(player1_img);
    player2 = createSprite(300,200);
    player2.addImage(player2_img);
    player2_img.scale = 0.5;
    player3 = createSprite(500,200);
    player3.addImage(player3_img);
    player4 = createSprite(700,200);
    player4.addImage(player4_img);
    players = [player1, player2, player3, player4];

   // obstacle1 = createSprite(400,500);
    //obstacle1.addImage(obstacleImg);
    //obstacle2 = createSprite(600,500);
    //obstacle2.addImage(obstacleImg);
    //obstacle3 = createSprite(800,500);
    //obstacle3.addImage(obstacleImg);
    //obstacle4 = createSprite(1000,500);
    //obstacle4.addImage(obstacleImg)
    /*console.log(obstacle2);
    console.log(obstacle3);
    console.log(obstacle4);

    obstacle1.velocityY = 2;
    obstacle2.velocityY = -2;
    obstacle3.velocityY = -2;
    obstacle4.velocityY = -2;
    */
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getPlayersAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;
        console.log(index);

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          players[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = players[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank += 1;
      Player.updatePlayersAtEnd(player.rank);
    }
   
   /* if (players.x-obstacle.x<obstacle.width/2+players.width/2 && players.y-obstacle.y<obstacle.width/2+players.width/2
       && obstacle.x-players.x<players.x+obstacle.width/2 && obstacle.y-players.y<players.y+obstacle.width/2)
       {
        obstacle.destroy();
       }
   */

    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}

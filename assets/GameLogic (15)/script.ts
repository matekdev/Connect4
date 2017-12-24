    var boardgame = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
    
    var playerspot = 0;
    var marker1 = 1;
    var marker2 = 2;
    var playerturn = true;
    var compturn = false;
    var winner = 0;


    // Converts the y array position to the proper y value within the scene
    function convert_to_posy(value) {
      return value = value * -3.3;
    }

    // Converts the x array position to the proper x value within the scene
    function convert_to_posx(value) {
      return value = value * 3.7;
    }

    // Checks the spots available for placement of chip (excluding type)
    function check_available_spots(gameboard, yvalue) {
      for (let i = 5; i >= 0; --i) {
        if (gameboard[i][yvalue] == 0) {
          return i;
        }
      }
      return -1;
    }

    // Checks the spots available for placement of chip (including type)
    function check_placed_spots(gameboard, yvalue) {
      for (let i = 0; i < 6; ++i) {
        if (gameboard[i][yvalue] != 0) {
          return i;
        } else {
          return -1;
        }
      }
    }

    // Creates a brand new actor and places it in the proper location
    function place_sprite(spot, yvalue, marker) {
      let chip = new Sup.Actor("chip");
      new Sup.SpriteRenderer(chip);
      chip.spriteRenderer.setSprite(marker);
      chip.setPosition(convert_to_posx(yvalue), convert_to_posy(spot), -1);      
    }

    // Placement of the chip
    function choice_column_y(gameboard, yvalue, marker, sprite) {
      let spot = check_available_spots(gameboard, yvalue);
      
      for (let i = 5; i >= 0; --i) {
        if (spot == i) {
          gameboard[i][yvalue] = marker;
          place_sprite(spot, yvalue, sprite);
          return i;
        }
      }
    }

    // Generates a valid random number
    function generate_valid_num(gameboard) {
      var rng = Math.floor(Math.random() * 6) + 0;
      
      while (check_available_spots(gameboard, rng) == -1) {
        rng = Math.floor(Math.random()*7);
        Sup.log("GENERATING NUMBER");
        
      }
      Sup.log(rng);
      return rng;
    }

    // Computers entire game logic
    function comp_turn(gameboard) {
        let rng = generate_valid_num(gameboard);
      
        choice_column_y(gameboard, rng, marker2, "compchip");
        playerturn = true;
    }

    // Horizontal line check
    function horizontal_check(gameboard, marker) {
      let count = 0;
     
      for (let r = 0; r < 6; ++r) {
        count = 0;
        for (let n = 0; n < 4; ++n) {
          count = 0;
          for (let i = 0; i < 4; ++i) {
            if (gameboard[0+r][0+i+n] == marker) {
              count++;
              if (count >= 4) {
                return 1;
              }
            }
          }
        }
      }
    }

    // Vertical line check
    function vertical_check(gameboard, marker) {
      let count = 0;
     
      for (let r = 0; r < 7; ++r) {
        count = 0;
        for (let n = 0; n < 3; ++n) {
          count = 0;
          for (let i = 0; i < 4; ++i) {
            if (gameboard[0+i+n][r] == marker) {
              count++;
              if (count >= 4) {
                return 1;
              }
            }
          }
        }
      }
    }
      


    // Diagonal right check
    function diag_right_check(gameboard, marker) {
      let count = 0;
    
      for (let i = 0; i < 4; ++i) {
        count = 0;
        for (let n = 0; n < 4; ++n) {
          if (gameboard[0+n][6-n-i] == marker) {
            count++;
            if (count >= 4) {
              return 1;
            }
          }
        }
      }
      
      for (let i = 0; i < 4; ++i) {
        count = 0;
        for (let n = 0; n < 4; ++n) {
          if (gameboard[1+n][6-n-i] == marker) {
            count++;
            if (count >= 4) {
              return 1;
            }
          }
        }
      }
      
      for (let i = 0; i < 4; ++i) {
        count = 0;
        for (let n = 0; n < 4; ++n) {
          if (gameboard[2+n][6-n-i] == marker) {
            count++;
            if (count >= 4) {
              return 1;
            }
          }
        }
      }
      return 0;
    }

    // Diagonal left check
    function diag_left_check(gameboard, marker) {
      let count = 0;
    
      for (let i = 0; i < 4; ++i) {
        count = 0;
        for (let n = 0; n < 4; ++n) {
          if (gameboard[0+n][0+n+i] == marker) {
            count++;
            if (count >= 4) {
              return 1;
            }
          }
        }
      }     
      
      for (let i = 0; i < 4; ++i) {
        count = 0;
        for (let n = 0; n < 4; ++n) {
          if (gameboard[1+n][0+n+i] == marker) {
            count++;
            if (count >= 4) {
              return 1;
            }
          }
        }
      }  
      
      for (let i = 0; i < 4; ++i) {
        count = 0;
        for (let n = 0; n < 4; ++n) {
          if (gameboard[2+n][0+n+i] == marker) {
            count++;
            if (count >= 4) {
              return 1;
            }
          }
        }
      }  
    }



    // Check if game is a draw
    function drawcondition(gameboard) {
      let count = 0;
      
      for (let i = 0; i <= 6; ++i) {
        if (gameboard[0][i] != 0 && gameboard[1][i] != 0 && gameboard[2][i] != 0 && gameboard[3][i] != 0 && gameboard[4][i] != 0 && gameboard[5][i] != 0) {
          count++;
        }
      }
      
      if (count == 7) {
        return true;
      }
      return false;
    }

    // Win condition combined
    function win_condition(gameboard, marker) {
      if (horizontal_check(gameboard, marker) == 1) {
        return 1;
      } else if (vertical_check(gameboard, marker) == 1) {
        return 1;
      } else if (diag_right_check(gameboard, marker) == 1) {
        return 1;
      } else if (diag_left_check(gameboard, marker) == 1) {
        return 1;
      } else {
        return 0;
      }
      
    
      
      
  }

    
class GameLogicBehavior extends Sup.Behavior {
  awake() {
    
  }
  
  
  

  update() {
    
      if (win_condition(boardgame, marker1) == 1) {
        winner = 1;
        Sup.log("Player 1 wins!!!");
        let text = new Sup.Actor("text");
        new Sup.TextRenderer(text);
        text.textRenderer.setFont("Normal");
        text.textRenderer.setText("Player 1 wins!");
        text.setPosition(11.115, 7.55, -1); 
      }
    
      if (win_condition(boardgame, marker2) == 1) {
        winner = 2;
        Sup.log("Player 2 wins!!!");
        let text = new Sup.Actor("text");
        new Sup.TextRenderer(text);
        text.textRenderer.setFont("Normal");
        text.textRenderer.setText("The computer wins!");
        text.setPosition(11.115, 7.55, -1); 
      }
    
      if (drawcondition(boardgame)) {
        Sup.log("Draw");
        let text = new Sup.Actor("text");
        new Sup.TextRenderer(text);
        text.textRenderer.setFont("Normal");
        text.textRenderer.setText("The game is a draw!");
        text.setPosition(11.115, 7.55, -1);
      }
    
      if (Sup.Input.wasKeyJustPressed("RETURN")) {
         boardgame = [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0]
        ];

        playerspot = 0;
        marker1 = 1;
        marker2 = 2;
        playerturn = true;
        compturn = false;
        winner = 0;
        Sup.loadScene("GameScene");
      }
    
   if (winner == 0) { 
      if (Sup.getActor("playerchip").getX() >= -1 && Sup.getActor("playerchip").getX() <= 3) {
        playerspot = 0;
      } else if (Sup.getActor("playerchip").getX() >= 3.2 && Sup.getActor("playerchip").getX() <= 5.2) {
        playerspot = 1;
      } else if (Sup.getActor("playerchip").getX() >= 7 && Sup.getActor("playerchip").getX() <= 9) {
        playerspot = 2;
      } else if (Sup.getActor("playerchip").getX() >= 10 && Sup.getActor("playerchip").getX() <= 12) {
        playerspot = 3;
      } else if (Sup.getActor("playerchip").getX() >= 13 && Sup.getActor("playerchip").getX() <= 15) {
        playerspot = 4;
      } else if (Sup.getActor("playerchip").getX() >= 16 && Sup.getActor("playerchip").getX() <= 19) {
        playerspot = 5;
      } else if (Sup.getActor("playerchip").getX() >= 20 && Sup.getActor("playerchip").getX() <= 25) {
        playerspot = 6;
      } 

      if (Sup.getActor("playerchip").getX() > 1) {
        if (playerturn == true){
          if (Sup.Input.wasKeyJustPressed("LEFT")) {
            Sup.getActor("playerchip").move(-3.7, 0, 0);
          }
        }
      }

      if (Sup.getActor("playerchip").getX() < 22.2) {
        if (playerturn == true){
          if (Sup.Input.wasKeyJustPressed("RIGHT")) {
            Sup.getActor("playerchip").move(3.7, 0, 0);
          }
        }
      }

      if (Sup.Input.wasKeyJustPressed("SPACE")) {
        if (playerturn == true){
          if (check_placed_spots(boardgame, playerspot) != 0) {
            if (boardgame[0][playerspot] != 1 || boardgame[0][playerspot] != 2) {
              choice_column_y(boardgame, playerspot, marker1, "playerchip");
              Sup.Audio.playSound("chipsound", 0.4);
              playerturn = false;
            }
          }
        }
      }
    
      if (win_condition(boardgame, marker1) == 0) {
        if (playerturn == false) {
          comp_turn(boardgame);
        }
      }
   }
    
  }
}
Sup.registerBehavior(GameLogicBehavior);

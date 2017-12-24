class Startgame extends Sup.Behavior {
  awake() {
    
  }

  update() {
        if (Sup.Input.wasKeyJustPressed("RETURN")) {
          Sup.loadScene("GameScene");
        }
  }
}
Sup.registerBehavior(Startgame);

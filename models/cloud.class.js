class Cloud extends MovableObject {
    y = 20;
    width = 350;
    height = 600;
    
    
    
    constructor(){
        super().loadImage(' img/5_background/layers/4_clouds/1.png');        
         this.x  = Math.random() * 5000;
         this.speed =  Math.random()* 0.5;
         this.animate();
         
       
    }

    animate(){ 
      setInterval(() => {
          this.moveLeft();

          // Überprüfen und Anpassen der x-Koordinate
          if (this.x <= -2000) {
              this.x += 4000; // Anpassen der x-Koordinate auf 2400px
          }
      }, 1000 / 60);
  }

    
    
   
}
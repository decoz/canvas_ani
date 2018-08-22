// need anicanvas.js
var jmath = {

    v2l: function(x,y){    // get vector's length
      return Math.sqrt(x*x + y*y)
    },

    v2theta: function(x,y){ // get radian from vector
      return Math.atan2(x,y)
    },

    theta2v: function(th, l){ // get vector from radian and length
      return [l * Math.sin(th), l * Math.cos(th)]
    }



}


var jumper = {
  cvs : null , // need anicanvas
  groundrange:  10,
  gravity: 1,
  jpower: 20,
  character: {
    x: 10, y: 10, vx: 0.5, vy: 0.3,
    scale:0.3
  },

  ready :  function(){ // check ready to run
    if( this.objects !== undefined &&
        this.bg !== undefined &&
        this.view !== undefined )
          return true
    else  return false
  },

  dmsg : function(msg){
    if(this.ondmsg !== undefined) this.ondmsg(msg)
  },

  state : function(obj){  // return obj state
    var footy = obj.y + obj.src.height * obj.scale
    if( Math.abs(footy - this.bg.height) < this.groundrange )
      return 1
    else return 0
  },

  init_character : function(obj){ // register jumper
    this.cvs.addimgobj("obj", "jmp.png", this.character)
  },

  init_cvs : function(canvas){
    this.cvs = new anicanvas(canvas)
    this.objects = this.cvs.objects
    this.bg = {
      width: canvas.clientWidth,
      height: canvas.clientHeight
    }

    this.cvs.onmousedown = function(x,y){
      var obj = this.objects["obj"]
      var dx = x - obj.x , dy = y - obj.y,
          r = Math.sqrt(dx * dx + dy * dy )
      var px = dx / r * this.jpower,
          py = dy / r * this.jpower
      //debugger
      this.dmsg("[ox:" + obj.x.toFixed(2) + ",oy" + obj.y.toFixed(2) + "]" +
                "[" + x + "," + y + "]")
      //dx *= 0.01, dy *= 0.03
      obj.vx += px, obj.vy += py
    }.bind(this)

    



    this.cvs.ontick = function(){
      var obj = this.objects["obj"]
      if( obj === undefined ) return

      this.dmsg(" x:" + obj.x.toFixed(0) + " y:" + obj.y.toFixed(0) +
                " vx:" + obj.vx.toFixed(2) + " vy:" + obj.vy.toFixed(2))

      var h = obj.src.height * obj.scale
      obj.vy += this.gravity

      var state = this.state(obj)

      if(state == 1 ) {
        if( obj.vy > 0 ) obj.vy *= -0.5
        obj.vx *= 0.9

        if( Math.abs(obj.vy) < 0.2 ) obj.vy = 0
        if( Math.abs(obj.vx) < 0.2 ) obj.vx = 0
      }
      //if(obj.y > this.cvs.canvas.height - h) obj.vy *= -0.7
    }.bind(this)
  },

  run : function() {
      this.cvs.update()
  }
};

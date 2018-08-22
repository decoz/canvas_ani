
var anicanvas = function(canvas_element){
  this.canvas = canvas_element
  this.ctx =  this.canvas.getContext('2d')
  this.objects = {}
  this.fcnt = 0

  this.running = false
  this.onmousedown = null
  this.ontick = null

  this.bg = {
    color:"#FADDCD",
    src:null,
  }

  var me = this

  this.canvas.onmousedown = function(e){
    if(me.onmousedown != null) {
      me.onmousedown(e.offsetX, e.offsetY)
    }
  }

  this.run = function(){
    this.running = true
    this.update()
  }

  this.setbackground = function(bgoptions){
    Object.assign(this.bg, bgoptions)
  }

  this.addimgobj = function(objname, fname, options){
    var img = new Image()
    img.src = fname
    img.onload = function(e){
      var obj = {
        x: 0,
        y: 0,
        scale : 1,
        vx : 1,
        vy : 0
      }
      if(options !== undefined) Object.assign(obj, options)
      obj.src = e.srcElement
      me.objects[objname] = obj
    }
  }

  this.addobj = function(obj){
    this.objects.push(obj)
  }

  this.drawbg = function(obj){
    if( this.bg.src == null ){
      this.ctx.fillStyle = this.bg.color
      this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height)
    } else {
      ctx.drawImage(this.bg.src,0,0)
    }
  }

  this.update = function() {

    if(this.ontick) this.ontick()

    this.drawbg()
    for(k in this.objects){
      var  obj = this.objects[k]
      this.drawobj(obj)
    }
    this.ctx.fillText(this.fcnt, 0, 0 )
    me.fcnt += 1
    window.requestAnimationFrame(this.update.bind(this))
  }


  this.drawobj = function(obj){
    var w = obj.src.width * obj.scale
    var h = obj.src.height * obj.scale
    this.ctx.drawImage(obj.src, obj.x, obj.y, w, h)
  
    obj.x += obj.vx
    obj.y += obj.vy
  }

}

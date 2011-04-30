//
// Simple circles game
//

var util = require('util')
  , Maga = require('maga')

var Circle = function() {
  Maga.Object.apply(this, arguments)

  this.register({
    // Values used to render (draw) object
    render: {
      x: 0
    , y: 0
    }
    
    // Input values that determine behavior
  , input: {
      tx: 0
    , ty: 0
    }

    // Values that change
  , dynamic: {
      vx: 0
    , vy: 0
    , ox: 0
    , oy: 0  
    }
    
    // Values that don't change
  , static: {
      f: 0.94
    }
  })
}

util.inherits(Circle, Maga.Object)

Circle.prototype.update = function() {
  this.vx += (this.tx - this.ox) / 80
  this.vy += (this.ty - this.oy) / 80
  this.x += this.vx
  this.y += this.vy
  this.vx *= this.f
  this.vy *= this.f  
  this.ox = this.x
  this.oy = this.y
  return this
}

Circle.prototype.move = function(x, y) {
  this.tx = x
  this.ty = y
  return this
}

Circle.prototype.create = function() {
  var val = parseInt(this.id, 32), r, g, b
  r = parseInt(val.toString().substr(5, 3), 10)
  while (r > 255) { r = Math.floor(r / 2) }
  g = parseInt(val.toString().substr(9, 3), 10)
  while (g > 255) { g = Math.floor(g / 2) }
  b = parseInt(val.toString().substr(11, 3), 10)
  while (b > 255) { b = Math.floor(b / 2) }

  this.object = $('<div class="circle" style="background-color:rgb(' + [r,g,b] + ') !important;" id="'+ this.id +'"></div>')
  this.object.appendTo('body')

  return this
}

Circle.prototype.render = function(state) {
  this.object.css({ left: state.x, top: state.y })
  return this
}

Circle.prototype.destroy = function() {
  this.object.remove()
}

// The player!
var Player = exports.Player = function() {
  Circle.apply(this, arguments)
}
util.inherits(Player, Circle)
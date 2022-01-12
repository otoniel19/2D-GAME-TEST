const cvs = document.querySelector('canvas')
const ctx = cvs.getContext('2d')

const background = new Image()
background.src = 'game.jpeg'
var Player = new Image()
Player.src = 'player.jpg'

var GameSprites = []

var player = {
  img: Player,
  x: 0,
  y: 245,
  width: 114,
  height: 124
}

var camera = {
  img: background,
  x: 0,
  y: 0,
  width: cvs.clientWidth,
  height: cvs.clientHeight
}

var world = {
  img: background,
  x: 0,
  y: 0,
  width: cvs.clientWidth,
  height: cvs.clientHeight
}


const stick = new JoyStick('stick',{},data => {
  const px = stick.GetPosX()
  const py = stick.GetPosY()
  if(px > 50) { 
    player.x+=2
    camera.x++
    Player.src = 'player.jpg'
  }
  if(px < 50) { 
    player.x-=2
    camera.x--
    Player.src = 'player_flipped.jpg'
  }
  
  //impede bugs e sair pra fora do mundo
  if(camera.x < 0) { 
    player.x = 2
    camera.x = 0
  }
  //impede bugs de visualização
  if(camera.x >= 97) {
    camera.x = 97
  }
  //impede sair do mapa
  if(player.x >= 388) {
    player.x = 388
  }
  //impede sair do chão
  if(player.y >= 246) {
    player.y = 244
  }
  
})

GameSprites.push(world,player)

function render() {
  ctx.save()
  ctx.translate(-camera.x,-camera.y)
  GameSprites.forEach(S => {
    ctx.drawImage(S.img,0,0,S.width,S.height,S.x,S.y,S.width,S.height)
  })
  ctx.restore()
}


function main() {
  render()
  requestAnimationFrame(main)
}

main()
namespace SpriteKind {
    export const Coin = SpriteKind.create()
    export const pollor = SpriteKind.create()
    export const bola_de_fuego = SpriteKind.create()
}

//  Destruye al sprite enemigo al tocarlo
sprites.onOverlap(SpriteKind.Player, SpriteKind.pollor, function on_on_overlap(sprite4: Sprite, otherSprite2: Sprite) {
    
    otherSprite2.destroy()
    pika = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            `, SpriteKind.Enemy)
    animation.runImageAnimation(pika, [img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . f f f f f f f . . . . .
            . . . f 2 2 2 f 2 2 2 f . . . .
            . . . f 2 f 2 f 2 f 2 f . . . .
            . . . . . 2 2 2 2 2 . . . . . .
            . . . . f f f f f f f . . . . .
            . . . f f f f f f f f f . . . .
            . . . f f f f f f f f f . . . .
            . . . f f f f f f f f f . . . .
            . . . . f f f f f f f . . . . .
            `], 100, true)
    pika.setPosition(perro.x + 80, perro.y - 80)
    pika.follow(perro, 50)
})
//  Incrementa la puntuación y destruye la moneda al tocarla
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function on_on_overlap2(sprite: Sprite, otherSprite: Sprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
//  Resta vidas al jugador al tocar la bola de fuego y la destruye
sprites.onOverlap(SpriteKind.Player, SpriteKind.bola_de_fuego, function on_on_overlap3(sprite5: Sprite, otherSprite3: Sprite) {
    info.changeLifeBy(-2)
    otherSprite3.destroy()
})
//  Hace que el jugador salte al presionar A
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    if (perro.vy == 0) {
        perro.vy = -150
    }
    
})
//  Maneja el choque con un enemigo
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap4(sprite6: Sprite, otherSprite4: Sprite) {
    otherSprite4.destroy()
    if (perro.y < otherSprite4.y) {
        info.changeScoreBy(3)
    } else {
        info.changeLifeBy(-1)
    }
    
})
//  Termina el juego si el jugador toca el tile peligroso
scene.onOverlapTile(SpriteKind.Player, assets.tile`
        tile3
        `, function on_overlap_tile(sprite2: Sprite, location: tiles.Location) {
    game.over(false, effects.melt)
})
//  Avanza al siguiente nivel al tocar el tile de salida
scene.onOverlapTile(SpriteKind.Player, assets.tile`
        tile2
        `, function on_overlap_tile2(sprite3: Sprite, location2: tiles.Location) {
    
    current_level += 1
    startLevel()
})
//  Configura el nivel actual, coloca al jugador y limpia enemigos y objetos
function startLevel() {
    
    if (current_level == 0) {
        tiles.setTilemap(tilemap`
            level
            `)
    } else if (current_level == 1) {
        tiles.setTilemap(tilemap`
            level_0
            `)
    } else if (current_level == 2) {
        tiles.setTilemap(tilemap`
            level_1
            `)
    } else {
        game.over(true)
    }
    
    tiles.placeOnRandomTile(perro, assets.tile`
        tile6
        `)
    for (let value of tiles.getTilesByType(assets.tile`
        tile6
        `)) {
        tiles.setTileAt(value, assets.tile`
            tile0
            `)
    }
    scene.cameraFollowSprite(perro)
    info.setLife(5)
    for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Coin)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.pollor)) {
        value4.destroy()
    }
    for (let value5 of tiles.getTilesByType(assets.tile`
        tile4
        `)) {
        pollor = sprites.create(img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . f f f f f f f . . . .
                . . . . f 5 5 5 5 5 5 5 f . . .
                . . . f 5 5 4 4 4 4 5 5 5 f . .
                . . f 5 5 5 5 5 5 5 5 5 5 5 f .
                . . f 5 4 5 5 5 5 5 5 5 5 5 f .
                . . f 5 4 5 5 5 5 5 5 5 5 5 f .
                . . f 5 4 5 5 5 5 5 5 5 5 5 f .
                . . f 5 4 5 5 5 5 5 5 5 5 5 f .
                . . f 5 4 5 5 5 5 5 5 5 5 5 f .
                . . f 5 4 5 5 5 5 5 5 5 5 5 f .
                . . . f 5 5 4 4 5 5 5 5 5 f . .
                . . . . f 5 5 5 5 5 5 5 f . . .
                . . . . . f f f f f f f . . . .
                . . . . . . . . . . . . . . . .
                `, SpriteKind.Coin)
        animation.runImageAnimation(pollor, [img`
                    . . . . . . . . . . . . . . . .
                    . . . . f f f f f f f . . . . .
                    . . . f 5 5 5 5 5 5 5 f . . . .
                    . . f 5 4 4 4 4 4 5 5 5 f . . .
                    . f 5 4 5 5 5 5 5 5 5 5 5 f . .
                    . f 5 4 5 5 5 5 5 5 5 5 5 f . .
                    . f 5 4 5 5 5 5 5 5 5 5 5 f . .
                    . f 5 4 5 5 5 5 5 5 5 5 5 f . .
                    . f 5 4 5 5 5 5 5 5 5 5 5 f . .
                    . f 5 4 5 5 5 5 5 5 5 5 5 f . .
                    . f 5 5 5 5 5 5 5 5 5 5 5 f . .
                    . . f 5 5 4 4 4 5 5 5 5 f . . .
                    . . . f 5 5 5 5 5 5 5 f . . . .
                    . . . . f f f f f f f . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    `, img`
                    . . . . . . . . . . . . . . . .
                    . . . . . f f f f f . . . . . .
                    . . . . f 5 5 5 5 5 f . . . . .
                    . . . f 5 4 4 4 4 5 5 f . . . .
                    . . f 5 4 5 5 5 5 5 5 5 f . . .
                    . . f 5 4 5 5 5 5 5 5 5 f . . .
                    . . f 5 4 5 5 5 5 5 5 5 f . . .
                    . . f 5 4 5 5 5 5 5 5 5 f . . .
                    . . f 5 4 5 5 5 5 5 5 5 f . . .
                    . . f 5 4 5 5 5 5 5 5 5 f . . .
                    . . f 5 5 5 5 5 5 5 5 5 f . . .
                    . . . f 5 5 4 4 5 5 5 f . . . .
                    . . . . f 5 5 5 5 5 f . . . . .
                    . . . . . f f f f f . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    `, img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . f f f . . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . f 5 4 4 5 5 f . . . . .
                    . . . f 5 4 5 5 5 5 5 f . . . .
                    . . . f 5 4 5 5 5 5 5 f . . . .
                    . . . f 5 4 5 5 5 5 5 f . . . .
                    . . . f 5 4 5 5 5 5 5 f . . . .
                    . . . f 5 4 5 5 5 5 5 f . . . .
                    . . . f 5 4 5 5 5 5 5 f . . . .
                    . . . f 5 5 5 5 5 5 5 f . . . .
                    . . . . f 5 5 4 5 5 f . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . . f f f . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    `, img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . f . . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . f 5 4 5 f . . . . . .
                    . . . . f 5 4 5 5 5 f . . . . .
                    . . . . f 5 4 5 5 5 f . . . . .
                    . . . . f 5 4 5 5 5 f . . . . .
                    . . . . f 5 4 5 5 5 f . . . . .
                    . . . . f 5 4 5 5 5 f . . . . .
                    . . . . f 5 4 5 5 5 f . . . . .
                    . . . . f 5 5 5 5 5 f . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . . f . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    `, img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . f . . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . f 4 f . . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . . f . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    `, img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . f . . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . f 4 f . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . . f . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    `, img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . f . . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . f 4 f . . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . . f . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    `, img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . f . . . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . f 5 4 5 f . . . . . .
                    . . . . f 5 4 5 5 5 f . . . . .
                    . . . . f 5 4 5 5 5 f . . . . .
                    . . . . f 5 4 5 5 5 f . . . . .
                    . . . . f 5 4 5 5 5 f . . . . .
                    . . . . f 5 4 5 5 5 f . . . . .
                    . . . . f 5 4 5 5 5 f . . . . .
                    . . . . f 5 5 5 5 5 f . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . . f 5 f . . . . . . .
                    . . . . . . . f f . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    `, img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . f f f . . . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . f 5 4 4 5 5 f . . . . .
                    . . . f 5 4 5 5 5 5 5 f . . . .
                    . . . f 5 4 5 5 5 5 5 f . . . .
                    . . . f 5 4 5 5 5 5 5 f . . . .
                    . . . f 5 4 5 5 5 5 5 f . . . .
                    . . . f 5 4 5 5 5 5 5 f . . . .
                    . . . f 5 4 5 5 5 5 5 f . . . .
                    . . . f 5 5 5 5 5 5 5 f . . . .
                    . . . . f 5 5 4 5 5 f . . . . .
                    . . . . . f 5 5 5 f . . . . . .
                    . . . . . . f f f . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    `], 100, true)
        tiles.placeOnTile(pollor, value5)
        tiles.setTileAt(value5, assets.tile`
            tile0
            `)
    }
    for (let value6 of tiles.getTilesByType(assets.tile`
        tile5
        `)) {
        pollor = sprites.create(assets.image`
            pollo
            `, SpriteKind.pollor)
        tiles.placeOnTile(pollor, value6)
        tiles.setTileAt(value6, assets.tile`
            tile0
            `)
    }
    for (let value7 of tiles.getTilesByType(assets.tile`
        tile11
        `)) {
        bola_de_fuego = sprites.create(assets.image`
            portal
            `, SpriteKind.bola_de_fuego)
        tiles.placeOnTile(bola_de_fuego, value7)
        tiles.setTileAt(value7, assets.tile`
            tile0
            `)
        animation.runMovementAnimation(bola_de_fuego, "c 0 -100 0 100 0 0", 2000, true)
        bola_de_fuego.startEffect(effects.fire)
    }
}

let bola_de_fuego : Sprite = null
let pollor : Sprite = null
let pika : Sprite = null
let perro : Sprite = null
let current_level = 0
scene.setBackgroundColor(9)
scene.setBackgroundImage(assets.image`
    snow
    `)
current_level = 0
perro = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . e e e . . . .
        . . . . . . . . e e f e e . . .
        . . . . . . . e e e e e e e . .
        e e e e e e e e e e e e e e . .
        . . . . e e e e e e e e e e . .
        . . . . e e e e e e e e e . . .
        . . . . e . e . . . e . e . . .
        . . . . e . e . . . e . e . . .
        `, SpriteKind.Player)
controller.moveSprite(perro, 80, 0)
startLevel()
game.onUpdate(function on_on_update() {
    if (perro.vy < 0) {
        //  Perro saltando hacia arriba
        perro.setImage(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . e e e . . .
            . . . . . . . . . e e f e e . .
            . . . . . . . . . e e e e e e .
            . . . . . . . . . e e e e e . .
            . . . . . . . . e e e e e . . .
            . . . . . . . . e e e e . . . .
            . . . . . . . . e e e e e e e e
            . . . . . . . e e e e e . . . .
            . . . e . . e e e e e e e e e .
            . . . e e e e e e e e . . . . .
            . . . . . . e e e . . . . . . .
            . . . . . e e . e . . . . . . .
            . . . . . e . . e . . . . . . .
            . . . . . e . . . . . . . . . .
            `)
    } else if (perro.vy > 0) {
        //  Perro cayendo
        perro.setImage(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . e . . . . . . . . . .
            . . . . . e . . . . . . . . . .
            . . . . . e . . . . . . . . . .
            . . . . e e e e e . . . . . . .
            . . . . e e e e e . . . . . . .
            . . . . e e e e e e . . . . . .
            . . . . e . e e e e e . e . . .
            . . . . e . e e e e e e e e e .
            . . . . e . e . e e e e e e f e
            . . . . . . . . e e e e e e e e
            . . . . . . . . e . e . . . . .
            . . . . . . . . e . e . . . . .
            . . . . . . . . e . e e . . . .
            `)
    } else if (perro.x % 2 == 0) {
        //  Perro caminando - posición 1
        perro.setImage(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . e e e . .
            . . . . . . . . . . e e f e e .
            . . . . . . . . . e e e e e e e
            . . e e e e e e e e e e e e e e
            . . . . e e e e e e e e e e . .
            . . . . e e e e e e e e e . . .
            . . . . e e . . . . . e e . . .
            . . . . e e . . . . . e e . . .
            `)
    } else {
        //  Perro caminando - posición 2
        perro.setImage(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . e e e . .
            . . . . . . . . . . e e f e e .
            . . . . . . . . . e e e e e e e
            . . . e e e e e e e e e e e e e
            . . . . e e e e e e e e e e . .
            . . . . e e e e e e e e e . . .
            . . . . e . e . . . e . e . . .
            . . . . e . e . . . e . e . . .
            `)
    }
    
    if ((perro.isHittingTile(CollisionDirection.Left) || perro.isHittingTile(CollisionDirection.Right)) && perro.vy >= 0) {
        //  Perro escalando pared
        perro.vy = 0
        perro.ay = 0
        perro.setImage(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . e e e . .
            . . . . . . . . . . e e f e . .
            . . . . . . . . . . e e e e . .
            . . . . . . . . . e e e e e . .
            . . . . . . . . . . . e e e e e
            . . . . . . . . . . . e e e . .
            . . . . . . . . . . . e e e e e
            . . . . . . . . . . . e e e . .
            . . . . . . . . . . . e e e . .
            . . . . . . . . . . . e e e . .
            . . . . . . . . . . . e e e e e
            . . . . . . . e e . . e e e . .
            . . . . . . . . e e e e e e e e
            `)
    } else {
        perro.ay = 350
    }
    
    if (perro.vx < 0 || perro.isHittingTile(CollisionDirection.Left)) {
        perro.image.flipX()
        perro.setImage(perro.image)
    }
    
})

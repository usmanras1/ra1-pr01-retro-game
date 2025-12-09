namespace SpriteKind {
    export const Coin = SpriteKind.create()
    export const Flower = SpriteKind.create()
    export const Fireball = SpriteKind.create()
}

//  Destruye al sprite enemigo al tocarlo
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flower, function on_on_overlap(sprite4: Sprite, otherSprite2: Sprite) {
    
    otherSprite2.destroy()
    bee = sprites.create(img`
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
    animation.runImageAnimation(bee, [img`
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
    bee.setPosition(Hops_and_Paw.x + 80, Hops_and_Paw.y - 80)
    bee.follow(Hops_and_Paw, 50)
})
//  Incrementa la puntuación y destruye la moneda al tocarla
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function on_on_overlap2(sprite: Sprite, otherSprite: Sprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
//  Resta vidas al jugador al tocar la bola de fuego y la destruye
sprites.onOverlap(SpriteKind.Player, SpriteKind.Fireball, function on_on_overlap3(sprite5: Sprite, otherSprite3: Sprite) {
    info.changeLifeBy(-2)
    otherSprite3.destroy()
})
//  Hace que el jugador salte al presionar A
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    if (Hops_and_Paw.vy == 0) {
        Hops_and_Paw.vy = -150
    }
    
})
//  Maneja el choque con un enemigo
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap4(sprite6: Sprite, otherSprite4: Sprite) {
    otherSprite4.destroy()
    if (Hops_and_Paw.y < otherSprite4.y) {
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
    
    tiles.placeOnRandomTile(Hops_and_Paw, assets.tile`
        tile6
        `)
    for (let value of tiles.getTilesByType(assets.tile`
        tile6
        `)) {
        tiles.setTileAt(value, assets.tile`
            tile0
            `)
    }
    scene.cameraFollowSprite(Hops_and_Paw)
    info.setLife(5)
    for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Coin)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flower)) {
        value4.destroy()
    }
    for (let value5 of tiles.getTilesByType(assets.tile`
        tile4
        `)) {
        flower = sprites.create(img`
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
        animation.runImageAnimation(flower, [img`
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
        tiles.placeOnTile(flower, value5)
        tiles.setTileAt(value5, assets.tile`
            tile0
            `)
    }
    for (let value6 of tiles.getTilesByType(assets.tile`
        tile5
        `)) {
        flower = sprites.create(assets.image`
            pollo
            `, SpriteKind.Flower)
        tiles.placeOnTile(flower, value6)
        tiles.setTileAt(value6, assets.tile`
            tile0
            `)
    }
    for (let value7 of tiles.getTilesByType(assets.tile`
        tile11
        `)) {
        fireball = sprites.create(assets.image`
            portal
            `, SpriteKind.Fireball)
        tiles.placeOnTile(fireball, value7)
        tiles.setTileAt(value7, assets.tile`
            tile0
            `)
        animation.runMovementAnimation(fireball, "c 0 -100 0 100 0 0", 2000, true)
        fireball.startEffect(effects.fire)
    }
}

let fireball : Sprite = null
let flower : Sprite = null
let bee : Sprite = null
let Hops_and_Paw : Sprite = null
let current_level = 0
scene.setBackgroundColor(9)
scene.setBackgroundImage(assets.image`
    snow
    `)
current_level = 0
Hops_and_Paw = sprites.create(img`
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
controller.moveSprite(Hops_and_Paw, 80, 0)
startLevel()
game.onUpdate(function on_on_update() {
    if (Hops_and_Paw.vy < 0) {
        //  Perro saltando hacia arriba
        Hops_and_Paw.setImage(img`
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
    } else if (Hops_and_Paw.vy > 0) {
        //  Perro cayendo
        Hops_and_Paw.setImage(img`
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
    } else if (Hops_and_Paw.x % 2 == 0) {
        //  Perro caminando - posición 1
        Hops_and_Paw.setImage(img`
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
        Hops_and_Paw.setImage(img`
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
    
    if ((Hops_and_Paw.isHittingTile(CollisionDirection.Left) || Hops_and_Paw.isHittingTile(CollisionDirection.Right)) && Hops_and_Paw.vy >= 0) {
        //  Perro escalando pared
        Hops_and_Paw.vy = 0
        Hops_and_Paw.ay = 0
        Hops_and_Paw.setImage(img`
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
        Hops_and_Paw.ay = 350
    }
    
    if (Hops_and_Paw.vx < 0 || Hops_and_Paw.isHittingTile(CollisionDirection.Left)) {
        Hops_and_Paw.image.flipX()
        Hops_and_Paw.setImage(Hops_and_Paw.image)
    }
    
})

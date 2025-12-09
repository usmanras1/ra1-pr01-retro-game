@namespace
class SpriteKind:
    Coin = SpriteKind.create()
    pollor = SpriteKind.create()
    bola_de_fuego = SpriteKind.create()
# Destruye al sprite enemigo al tocarlo

def on_on_overlap(sprite4, otherSprite2):
    global pika
    otherSprite2.destroy()
    pika = sprites.create(img("""
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
            """),
        SpriteKind.enemy)
    animation.run_image_animation(pika,
        [img("""
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
            """)],
        100,
        True)
    pika.set_position(perro.x + 80, perro.y - 80)
    pika.follow(perro, 50)
sprites.on_overlap(SpriteKind.player, SpriteKind.pollor, on_on_overlap)

# Incrementa la puntuación y destruye la moneda al tocarla

def on_on_overlap2(sprite, otherSprite):
    info.change_score_by(1)
    otherSprite.destroy()
sprites.on_overlap(SpriteKind.player, SpriteKind.Coin, on_on_overlap2)

# Resta vidas al jugador al tocar la bola de fuego y la destruye

def on_on_overlap3(sprite5, otherSprite3):
    info.change_life_by(-2)
    otherSprite3.destroy()
sprites.on_overlap(SpriteKind.player, SpriteKind.bola_de_fuego, on_on_overlap3)

# Hace que el jugador salte al presionar A

def on_a_pressed():
    if perro.vy == 0:
        perro.vy = -150
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

# Maneja el choque con un enemigo

def on_on_overlap4(sprite6, otherSprite4):
    otherSprite4.destroy()
    if perro.y < otherSprite4.y:
        info.change_score_by(3)
    else:
        info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap4)

# Termina el juego si el jugador toca el tile peligroso

def on_overlap_tile(sprite2, location):
    game.over(False, effects.melt)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        tile3
        """),
    on_overlap_tile)

# Avanza al siguiente nivel al tocar el tile de salida

def on_overlap_tile2(sprite3, location2):
    global current_level
    current_level += 1
    startLevel()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        tile2
        """),
    on_overlap_tile2)

# Configura el nivel actual, coloca al jugador y limpia enemigos y objetos
def startLevel():
    global pollor, bola_de_fuego
    if current_level == 0:
        tiles.set_tilemap(tilemap("""
            level
            """))
    elif current_level == 1:
        tiles.set_tilemap(tilemap("""
            level_0
            """))
    elif current_level == 2:
        tiles.set_tilemap(tilemap("""
            level_1
            """))
    else:
        game.over(True)
    tiles.place_on_random_tile(perro, assets.tile("""
        tile6
        """))
    for value in tiles.get_tiles_by_type(assets.tile("""
        tile6
        """)):
        tiles.set_tile_at(value, assets.tile("""
            tile0
            """))
    scene.camera_follow_sprite(perro)
    info.set_life(5)
    for value2 in sprites.all_of_kind(SpriteKind.enemy):
        value2.destroy()
    for value3 in sprites.all_of_kind(SpriteKind.Coin):
        value3.destroy()
    for value4 in sprites.all_of_kind(SpriteKind.pollor):
        value4.destroy()
    for value5 in tiles.get_tiles_by_type(assets.tile("""
        tile4
        """)):
        pollor = sprites.create(img("""
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
                """),
            SpriteKind.Coin)
        animation.run_image_animation(pollor,
            [img("""
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
                    """),
                img("""
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
                    """),
                img("""
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
                    """),
                img("""
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
                    """),
                img("""
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
                    """),
                img("""
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
                    """),
                img("""
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
                    """),
                img("""
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
                    """),
                img("""
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
                    """)],
            100,
            True)
        tiles.place_on_tile(pollor, value5)
        tiles.set_tile_at(value5, assets.tile("""
            tile0
            """))
    for value6 in tiles.get_tiles_by_type(assets.tile("""
        tile5
        """)):
        pollor = sprites.create(assets.image("""
            pollo
            """), SpriteKind.pollor)
        tiles.place_on_tile(pollor, value6)
        tiles.set_tile_at(value6, assets.tile("""
            tile0
            """))
    for value7 in tiles.get_tiles_by_type(assets.tile("""
        tile11
        """)):
        bola_de_fuego = sprites.create(assets.image("""
            portal
            """), SpriteKind.bola_de_fuego)
        tiles.place_on_tile(bola_de_fuego, value7)
        tiles.set_tile_at(value7, assets.tile("""
            tile0
            """))
        animation.run_movement_animation(bola_de_fuego, "c 0 -100 0 100 0 0", 2000, True)
        bola_de_fuego.start_effect(effects.fire)
bola_de_fuego: Sprite = None
pollor: Sprite = None
pika: Sprite = None
perro: Sprite = None
current_level = 0
scene.set_background_color(9)
scene.set_background_image(assets.image("""
    snow
    """))
current_level = 0
perro = sprites.create(img("""
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
        """),
    SpriteKind.player)
controller.move_sprite(perro, 80, 0)
startLevel()

def on_on_update():
    if perro.vy < 0:
        # Perro saltando hacia arriba
        perro.set_image(img("""
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
            """))
    elif perro.vy > 0:
        # Perro cayendo
        perro.set_image(img("""
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
            """))
    elif perro.x % 2 == 0:
        # Perro caminando - posición 1
        perro.set_image(img("""
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
            """))
    else:
        # Perro caminando - posición 2
        perro.set_image(img("""
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
            """))
    if (perro.is_hitting_tile(CollisionDirection.LEFT) or perro.is_hitting_tile(CollisionDirection.RIGHT)) and perro.vy >= 0:
        # Perro escalando pared
        perro.vy = 0
        perro.ay = 0
        perro.set_image(img("""
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
            """))
    else:
        perro.ay = 350
    if perro.vx < 0 or perro.is_hitting_tile(CollisionDirection.LEFT):
        perro.image.flip_x()
        perro.set_image(perro.image)
game.on_update(on_on_update)

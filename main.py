@namespace
class SpriteKind:
    Coin = SpriteKind.create()
    Flower = SpriteKind.create()
    Fireball = SpriteKind.create()
# Destruye al sprite enemigo al tocarlo

def on_on_overlap(sprite4, otherSprite2):
    global bee
    otherSprite2.destroy()
    bee = sprites.create(img("""
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
    animation.run_image_animation(bee,
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
    bee.set_position(Hops_and_Paw.x + 80, Hops_and_Paw.y - 80)
    bee.follow(Hops_and_Paw, 50)
sprites.on_overlap(SpriteKind.player, SpriteKind.Flower, on_on_overlap)

# Incrementa la puntuación y destruye la moneda al tocarla

def on_on_overlap2(sprite, otherSprite):
    info.change_score_by(1)
    otherSprite.destroy()
sprites.on_overlap(SpriteKind.player, SpriteKind.Coin, on_on_overlap2)

# Resta vidas al jugador al tocar la bola de fuego y la destruye

def on_on_overlap3(sprite5, otherSprite3):
    info.change_life_by(-2)
    otherSprite3.destroy()
sprites.on_overlap(SpriteKind.player, SpriteKind.Fireball, on_on_overlap3)

# Hace que el jugador salte al presionar A

def on_a_pressed():
    if Hops_and_Paw.vy == 0:
        Hops_and_Paw.vy = -150
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

# Maneja el choque con un enemigo

def on_on_overlap4(sprite6, otherSprite4):
    otherSprite4.destroy()
    if Hops_and_Paw.y < otherSprite4.y:
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
    global flower, fireball
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
    tiles.place_on_random_tile(Hops_and_Paw, assets.tile("""
        tile6
        """))
    for value in tiles.get_tiles_by_type(assets.tile("""
        tile6
        """)):
        tiles.set_tile_at(value, assets.tile("""
            tile0
            """))
    scene.camera_follow_sprite(Hops_and_Paw)
    info.set_life(5)
    for value2 in sprites.all_of_kind(SpriteKind.enemy):
        value2.destroy()
    for value3 in sprites.all_of_kind(SpriteKind.Coin):
        value3.destroy()
    for value4 in sprites.all_of_kind(SpriteKind.Flower):
        value4.destroy()
    for value5 in tiles.get_tiles_by_type(assets.tile("""
        tile4
        """)):
        flower = sprites.create(img("""
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
        animation.run_image_animation(flower,
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
        tiles.place_on_tile(flower, value5)
        tiles.set_tile_at(value5, assets.tile("""
            tile0
            """))
    for value6 in tiles.get_tiles_by_type(assets.tile("""
        tile5
        """)):
        flower = sprites.create(assets.image("""
            pollo
            """), SpriteKind.Flower)
        tiles.place_on_tile(flower, value6)
        tiles.set_tile_at(value6, assets.tile("""
            tile0
            """))
    for value7 in tiles.get_tiles_by_type(assets.tile("""
        tile11
        """)):
        fireball = sprites.create(assets.image("""
            portal
            """), SpriteKind.Fireball)
        tiles.place_on_tile(fireball, value7)
        tiles.set_tile_at(value7, assets.tile("""
            tile0
            """))
        animation.run_movement_animation(fireball, "c 0 -100 0 100 0 0", 2000, True)
        fireball.start_effect(effects.fire)
fireball: Sprite = None
flower: Sprite = None
bee: Sprite = None
Hops_and_Paw: Sprite = None
current_level = 0
scene.set_background_color(9)
scene.set_background_image(assets.image("""
    snow
    """))
current_level = 0
Hops_and_Paw = sprites.create(img("""
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
controller.move_sprite(Hops_and_Paw, 80, 0)
startLevel()

def on_on_update():
    if Hops_and_Paw.vy < 0:
        # Perro saltando hacia arriba
        Hops_and_Paw.set_image(img("""
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
    elif Hops_and_Paw.vy > 0:
        # Perro cayendo
        Hops_and_Paw.set_image(img("""
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
    elif Hops_and_Paw.x % 2 == 0:
        # Perro caminando - posición 1
        Hops_and_Paw.set_image(img("""
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
        Hops_and_Paw.set_image(img("""
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
    if (Hops_and_Paw.is_hitting_tile(CollisionDirection.LEFT) or Hops_and_Paw.is_hitting_tile(CollisionDirection.RIGHT)) and Hops_and_Paw.vy >= 0:
        # Perro escalando pared
        Hops_and_Paw.vy = 0
        Hops_and_Paw.ay = 0
        Hops_and_Paw.set_image(img("""
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
        Hops_and_Paw.ay = 350
    if Hops_and_Paw.vx < 0 or Hops_and_Paw.is_hitting_tile(CollisionDirection.LEFT):
        Hops_and_Paw.image.flip_x()
        Hops_and_Paw.set_image(Hops_and_Paw.image)
game.on_update(on_on_update)

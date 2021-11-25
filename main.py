def on_pin_pressed_p0():
    global pause2
    pause2 = 0
input.on_pin_pressed(TouchPin.P0, on_pin_pressed_p0)

def compare():
    global scoreP, scoreC
    if playerhand < hand:
        if playerhand == 1 and hand == 3:
            music.play_melody("C D E C G - - - ", 120)
            basic.show_string("WIN")
            scoreP += 1
        else:
            music.play_melody("G E E D C - - - ", 120)
            basic.show_string("LOSE")
            scoreC += 1
    elif playerhand == hand:
        music.play_melody("E E - - - - - - ", 120)
        basic.show_string("DRAW")
    elif playerhand == 3 and hand == 1:
        music.play_melody("G E E D C - - - ", 120)
        scoreC += 1
        basic.show_string("LOSE")
    else:
        music.play_melody("C D E C G - - - ", 120)
        scoreP += 1
        basic.show_string("WIN")
    basic.show_string("C")
    basic.show_string(":")
    basic.show_number(scoreC)
    basic.show_string("P")
    basic.show_string(":")
    basic.show_number(scoreP)
def countdown():
    global index2, current_index, pause2
    index2 = 6
    current_index = 0
    pause2 = 0
    while index2 > 0:
        if pause2 == 0:
            index2 = index2 - 1
            if index2 == 0:
                music.play_tone(392, music.beat(BeatFraction.WHOLE))
            else:
                music.play_tone(392, music.beat(BeatFraction.HALF))
            basic.show_number(index2)
        else:
            while index2 > 0:
                current_index = index2 + 1
                basic.show_string("PAUSE")
                if pause2 == 0:
                    current_index = current_index - 1
                    if current_index == 0:
                        music.play_tone(392, music.beat(BeatFraction.WHOLE))
                    else:
                        music.play_tone(392, music.beat(BeatFraction.HALF))
                    basic.show_number(current_index)
                    break
                break

def on_button_pressed_a():
    global playerhand
    playerhand = 1
    basic.show_icon(IconNames.SCISSORS)
input.on_button_pressed(Button.A, on_button_pressed_a)

def playerBot():
    global hand
    basic.pause(500)
    hand = randint(1, 3)
    if hand == 1:
        basic.show_icon(IconNames.SCISSORS)
    elif hand == 2:
        basic.show_leds("""
            . . . . .
                        . . . # #
                        # # # # #
                        . . . # #
                        . . . . .
        """)
    else:
        basic.show_icon(IconNames.SQUARE)

def on_pin_pressed_p2():
    history()
input.on_pin_pressed(TouchPin.P2, on_pin_pressed_p2)

def on_button_pressed_ab():
    global playerhand
    playerhand = 3
    basic.show_icon(IconNames.SQUARE)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def history():
    global win, lose
    basic.show_string("HISTORY")
    win = 0
    lose = 0
    max_score = high_score_list[0]
    for res in history_list:
        if res == 0:
            lose += history_list.count(res)
        else:
            win += history_list.count(res)
    for scr in high_score_list:
        if max_score < scr:
            max_score = scr
    basic.show_string("HISTORY")
    basic.show_string("W")
    basic.show_string(":")
    basic.show_number(win)
    basic.pause(500)
    basic.show_string("L")
    basic.show_string(":")
    basic.show_number(lose)
    basic.pause(500)
    basic.show_string("YOUR HIGHEST SCORE:")
    basic.show_number(max_score)
    basic.clear_screen()

def on_button_pressed_b():
    global playerhand
    playerhand = 2
    basic.show_leds("""
        . . . . .
                . . . # #
                # # # # #
                . . . # #
                . . . . .
    """)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_pin_pressed_p1():
    global pause2
    pause2 = 1
input.on_pin_pressed(TouchPin.P1, on_pin_pressed_p1)

def Bo3():
    global scoreC, scoreP, playerhand, result
    basic.show_string("BEST OF 3")
    scoreC = 0
    scoreP = 0
    while scoreC <= 2 or scoreP <= 2:
        playerhand = 0
        countdown()
        playerBot()
        compare()
        if scoreC == 2:
            result = 0
            basic.show_string("YOU LOSE")
            basic.clear_screen()
            break
        if scoreP == 2:
            result = 1
            basic.show_string("YOU WIN")
            basic.clear_screen()
            break
    history_list.append(result)

def on_gesture_shake():
    Bo3()
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def on_logo_pressed():
    endless()
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

def endless():
    global scoreC, scoreP
    basic.show_string("ENDLESS MODE")
    scoreC = 0
    scoreP = 0
    while scoreC < 1:
        countdown()
        playerBot()
        compare()
        if scoreC == 1:
            basic.show_string("GAME OVER")
            basic.show_string("YOUR SCORE:")
            basic.pause(1000)
            basic.show_number(scoreP)
            basic.clear_screen()
            break
    high_score_list.append(scoreP)
result = 0
lose = 0
win = 0
current_index = 0
index2 = 0
scoreC = 0
scoreP = 0
hand = 0
playerhand = 0
pause2 = 0
high_score_list: List[number] = []
history_list: List[number] = []
high_score_list = []
history_list = []
music.start_melody(music.built_in_melody(Melodies.PRELUDE),
    MelodyOptions.ONCE_IN_BACKGROUND)
music.set_volume(127)
basic.show_string("R")
basic.pause(700)
basic.show_leds("""
    . . . . .
        . . . # #
        # # # # #
        . . . # #
        . . . . .
""")
basic.pause(1000)
basic.show_string("P")
basic.pause(700)
basic.show_icon(IconNames.SQUARE)
basic.pause(1000)
basic.show_string("S")
basic.pause(700)
basic.show_icon(IconNames.SCISSORS)
basic.pause(1000)
basic.show_leds("""
    . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
""")
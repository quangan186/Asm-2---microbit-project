function player_bot () {
    bot_choice = randint(1, 3)
    if (bot_choice == 1) {
        basic.showIcon(IconNames.Scissors)
    } else if (bot_choice == 2) {
        basic.showLeds(`
            . . . . .
            . . . # #
            # # # # #
            . . . # #
            . . . . .
            `)
    } else {
        basic.showIcon(IconNames.Square)
    }
}
input.onPinPressed(TouchPin.P0, function () {
    pause2 = 0
})
function compare () {
    if (player_choice < bot_choice) {
        if (player_choice == 1 && bot_choice == 3) {
            music.playMelody("C D E C G - - - ", 120)
            basic.showString("WIN")
            player_score += 1
        } else {
            music.playMelody("G E E D C - - - ", 120)
            basic.showString("LOSE")
            bot_score += 1
        }
    } else if (player_choice == bot_choice) {
        music.playMelody("E E - - - - - - ", 120)
        basic.showString("DRAW")
    } else if (player_choice == 3 && bot_choice == 1) {
        music.playMelody("G E E D C - - - ", 120)
        bot_score += 1
        basic.showString("LOSE")
    } else {
        music.playMelody("C D E C G - - - ", 120)
        player_score += 1
        basic.showString("WIN")
    }
    basic.showString("P")
    basic.showLeds(`
        . . . . .
        . . # . .
        . . . . .
        . . # . .
        . . . . .
        `)
    basic.showNumber(player_score)
    basic.showString("B")
    basic.showLeds(`
        . . . . .
        . . # . .
        . . . . .
        . . # . .
        . . . . .
        `)
    basic.showNumber(bot_score)
}
function countdown () {
    seconds = 6
    current_second = 0
    pause2 = 0
    while (seconds > 0) {
        if (pause2 == 0) {
            seconds = seconds - 1
            if (seconds == 0) {
                music.playTone(392, music.beat(BeatFraction.Whole))
            } else {
                music.playTone(392, music.beat(BeatFraction.Half))
            }
            basic.showNumber(seconds)
        } else {
            while (seconds > 0) {
                current_second = seconds + 1
                basic.showString("PAUSE")
                if (pause2 == 0) {
                    current_second = current_second - 1
                    if (current_second == 0) {
                        music.playTone(392, music.beat(BeatFraction.Whole))
                    } else {
                        music.playTone(392, music.beat(BeatFraction.Half))
                    }
                    basic.showNumber(current_second)
                    break;
                }
                break;
            }
        }
    }
}
input.onButtonPressed(Button.A, function () {
    player_choice = 1
    basic.showIcon(IconNames.Scissors)
})
input.onPinPressed(TouchPin.P2, function () {
    history()
})
input.onButtonPressed(Button.AB, function () {
    player_choice = 3
    basic.showIcon(IconNames.Square)
})
function history () {
    basic.showString("HISTORY")
    win = 0
    lose = 0
    max_score = high_score_list[0]
    for (let res of history_list) {
        if (res == 0) {
            lose = _py.py_array_count(history_list, res)
        } else {
            win = _py.py_array_count(history_list, res)
        }
    }
    for (let scr of high_score_list) {
        if (max_score <= scr) {
            max_score = scr
        }
    }
    basic.showString("W")
    basic.showLeds(`
        . . . . .
        . . # . .
        . . . . .
        . . # . .
        . . . . .
        `)
    basic.showNumber(win)
    basic.pause(500)
    basic.showString("L")
    basic.showLeds(`
        . . . . .
        . . # . .
        . . . . .
        . . # . .
        . . . . .
        `)
    basic.showNumber(lose)
    basic.pause(500)
    basic.showString("HIGH SCORE:")
    basic.showNumber(max_score)
    basic.pause(1000)
    basic.clearScreen()
}
input.onButtonPressed(Button.B, function () {
    player_choice = 2
    basic.showLeds(`
        . . . . .
        . . . # #
        # # # # #
        . . . # #
        . . . . .
        `)
})
input.onPinPressed(TouchPin.P1, function () {
    pause2 = 1
})
function Bo3 () {
    basic.showString("BEST OF 3")
    bot_score = 0
    player_score = 0
    while (bot_score <= 2 || player_score <= 2) {
        player_choice = 0
        countdown()
        player_bot()
        compare()
        if (bot_score == 2) {
            result = 0
            history_list.push(result)
            basic.showString("YOU LOSE")
            basic.clearScreen()
            break;
        }
        if (player_score == 2) {
            result = 1
            basic.showString("YOU WIN")
            basic.clearScreen()
            break;
        }
    }
    history_list.push(result)
}
input.onGesture(Gesture.Shake, function () {
    Bo3()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    endless()
})
function endless () {
    basic.showString("ENDLESS MODE")
    bot_score = 0
    player_score = 0
    while (bot_score < 1) {
        player_choice = 0
        countdown()
        player_bot()
        compare()
        if (bot_score == 1) {
            basic.showString("GAME OVER")
            basic.showString("YOUR SCORE:")
            basic.pause(1000)
            basic.showNumber(player_score)
            high_score_list.push(player_score)
            basic.clearScreen()
            break;
        }
    }
}
let result = 0
let max_score = 0
let current_second = 0
let seconds = 0
let bot_score = 0
let player_score = 0
let player_choice = 0
let pause2 = 0
let bot_choice = 0
let high_score_list: number[] = []
let history_list : number[] = []
let win = 0
let lose = 0
high_score_list = [0]
history_list = []
music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.OnceInBackground)
music.setVolume(127)
basic.showString("R")
basic.pause(700)
basic.showLeds(`
    . . . . .
    . . . # #
    # # # # #
    . . . # #
    . . . . .
    `)
basic.pause(1000)
basic.showString("P")
basic.pause(700)
basic.showIcon(IconNames.Square)
basic.pause(1000)
basic.showString("S")
basic.pause(700)
basic.showIcon(IconNames.Scissors)
basic.pause(1000)
basic.clearScreen()

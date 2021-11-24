input.onPinPressed(TouchPin.P0, function () {
    pause2 = 0
})
function compare () {
    if (playerhand < hand) {
        if (playerhand == 1 && hand == 3) {
            music.playMelody("C D E C G - - - ", 120)
            basic.showString("WIN")
            scoreP += 1
        } else {
            music.playMelody("G E E D C - - - ", 120)
            basic.showString("LOSE")
            scoreC += 1
        }
    } else if (playerhand == hand) {
        music.playMelody("E E - - - - - - ", 120)
        basic.showString("DRAW")
    } else if (playerhand == 3 && hand == 1) {
        music.playMelody("G E E D C - - - ", 120)
        scoreC += 1
        basic.showString("LOSE")
    } else {
        music.playMelody("C D E C G - - - ", 120)
        scoreP += 1
        basic.showString("WIN")
    }
    basic.showString("C")
    basic.showString(":")
    basic.showNumber(scoreC)
    basic.showString("P")
    basic.showString(":")
    basic.showNumber(scoreP)
}
function countdown () {
    index2 = 6
    current_index = 0
    pause2 = 0
    while (index2 > 0) {
        if (pause2 == 0) {
            index2 = index2 - 1
            if (index2 == 0) {
                music.playTone(392, music.beat(BeatFraction.Whole))
            } else {
                music.playTone(392, music.beat(BeatFraction.Half))
            }
            basic.showNumber(index2)
        } else {
            while (index2 > 0) {
                current_index = index2 + 1
                basic.showString("PAUSE")
                if (pause2 == 0) {
                    current_index = current_index - 1
                    if (current_index == 0) {
                        music.playTone(392, music.beat(BeatFraction.Whole))
                    } else {
                        music.playTone(392, music.beat(BeatFraction.Half))
                    }
                    basic.showNumber(current_index)
                    break;
                }
                break;
            }
        }
    }
}
input.onButtonPressed(Button.A, function () {
    playerhand = 1
    basic.showIcon(IconNames.Scissors)
})
function playerBot () {
    basic.pause(500)
    hand = randint(1, 3)
    if (hand == 1) {
        basic.showIcon(IconNames.Scissors)
    } else if (hand == 2) {
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
input.onPinPressed(TouchPin.P2, function () {
    history()
})
input.onButtonPressed(Button.AB, function () {
    playerhand = 3
    basic.showIcon(IconNames.Square)
})
function history () {
    basic.showString("HISTORY")
    win = 0
    lose = 0
    for (let res of history_list) {
        if (res == 0) {
            lose += _py.py_array_count(history_list, res)
        } else {
            win += _py.py_array_count(history_list, res)
        }
    }
    basic.showString("HISTORY")
    basic.showString("W")
    basic.showString(":")
    basic.showNumber(win)
    basic.pause(500)
    basic.showString("L")
    basic.showString(":")
    basic.showNumber(lose)
    basic.pause(500)
    basic.clearScreen()
}
input.onButtonPressed(Button.B, function () {
    playerhand = 2
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
input.onGesture(Gesture.Shake, function () {
    gameplay()
})
function gameplay () {
    basic.showString("BEST OF 3")
    scoreC = 0
    scoreP = 0
    while (scoreC <= 2 || scoreP <= 2) {
        playerhand = 0
        countdown()
        playerBot()
        compare()
        if (scoreC == 2) {
            result = 0
            basic.showString("YOU LOSE")
            basic.clearScreen()
            break;
        }
        if (scoreP == 2) {
            result = 1
            basic.showString("YOU WIN")
            basic.clearScreen()
            break;
        }
    }
    history_list.push(result)
}
let result = 0
let lose = 0
let win = 0
let current_index = 0
let index2 = 0
let scoreC = 0
let scoreP = 0
let hand = 0
let playerhand = 0
let pause2 = 0
let history_list : number[] = []
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
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)

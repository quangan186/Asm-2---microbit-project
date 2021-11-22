function compare () {
    basic.pause(200)
    if (playerhand == hand) {
        music.playMelody("E E - - - - - - ", 120)
        basic.showString("Draw")
    } else if (playerhand < 3) {
        if (playerhand == 1) {
            if (hand == 2) {
                music.playMelody("G E E D C - - - ", 120)
                basic.showString("Lose")
                scoreC += 1
            } else {
                music.playMelody("C D E C G - - - ", 120)
                basic.showString("Win")
                scoreP += 1
            }
        } else {
            if (hand == 3) {
                music.playMelody("G E E D C - - - ", 120)
                basic.showString("Lose")
                scoreC += 1
            } else {
                music.playMelody("C D E C G - - - ", 120)
                basic.showString("Win")
                scoreP += 1
            }
        }
    } else if (playerhand == 0) {
        music.playMelody("G E E D C - - - ", 120)
        basic.showString("Lose")
        scoreC += 1
    } else {
        if (hand == 1) {
            music.playMelody("G E E D C - - - ", 120)
            basic.showString("Lose")
            scoreC += 1
        } else {
            music.playMelody("C D E C G - - - ", 120)
            basic.showString("Win")
            scoreP += 1
        }
    }
    basic.showString("C")
    basic.showNumber(scoreC)
    basic.showString("P")
    basic.showNumber(scoreP)
}
function countdown () {
    index2 = 6
    while (index2 > 0) {
        index2 = index2 - 1
        basic.showNumber(index2)
        basic.pause(500)
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
input.onButtonPressed(Button.AB, function () {
    playerhand = 3
    basic.showIcon(IconNames.Square)
})
function bo3 () {
    if (scoreC == 2) {
        basic.showString("You lose")
        basic.clearScreen()
    }
    if (scoreP == 2) {
        basic.showString("You win")
        basic.clearScreen()
    }
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
input.onGesture(Gesture.Shake, function () {
    countdown()
    gameplay()
})
function gameplay () {
    playerBot()
    compare()
    bo3()
}
let index2 = 0
let scoreP = 0
let scoreC = 0
let hand = 0
let playerhand = 0
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

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
    } else {
        if (playerhand == 3 && hand == 1) {
            music.playMelody("G E E D C - - - ", 120)
            basic.showString("LOSE")
            scoreC += 1
        } else {
            music.playMelody("C D E C G - - - ", 120)
            basic.showString("WIN")
            scoreP += 1
        }
    }
    basic.showString("C")
    basic.showString(":")
    basic.showNumber(scoreC)
    basic.showString("P")
    basic.showString(":")
    basic.showNumber(scoreP)
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
    gameplay()
})
function count_Down () {
    timer = 6
    for (let index = 0; index < 6; index++) {
        music.playTone(392, music.beat(BeatFraction.Eighth))
        timer += -1
        basic.showNumber(timer)
        basic.pause(1000)
        if (timer == 1) {
            music.playTone(392, music.beat(BeatFraction.Breve))
        }
        if (timer == 0) {
            music.stopAllSounds()
        }
    }
}
function gameplay () {
    while (scoreC <= 2 && scoreP <= 2) {
        count_Down()
        playerBot()
        compare()
        if (scoreC == 2) {
            basic.showString("YOU LOSE")
            basic.clearScreen()
            break;
        }
        if (scoreP == 2) {
            basic.showString("YOU WIN")
            basic.clearScreen()
            break;
        }
    }
}
let timer = 0
let scoreC = 0
let scoreP = 0
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

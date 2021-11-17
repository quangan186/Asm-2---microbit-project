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

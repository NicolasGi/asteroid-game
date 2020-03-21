const controller = {
    game: null,
    init(game) {
        this.game = game
        window.addEventListener('keydown', (e) => {
            this.checkClick(e)
        })
    },
    checkClick(e) {

        if (e.code === 'ArrowUp' || e.keyCode === 90) {
            this.game.moveToUp()
        }
        if (e.code === 'ArrowDown' || e.keyCode === 83) {
            this.game.moveToDown()
        }
        if (e.code === 'ArrowLeft' || e.keyCode === 81) {
            this.game.moveToLeft()
        }
        if (e.code === 'ArrowRight' || e.keyCode === 68) {
            this.game.moveToRight()
        }
        if (e.code === 'Space' || e.keyCode === 32) {
            console.log('Fire')
        }
    }
}

export default controller
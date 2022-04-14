const tiles = Array.from(document.querySelectorAll(".tile"))
const playerDisplay = document.querySelector(".player-display")
const resetButton = document.querySelector("#reset")
const announcer = document.querySelector(".announcer")

resetButton.addEventListener("click", resetBoard)

let board = Array(9).fill("")
let currentPlayer = "x"
let isGameActive = true

const PLAYERX_WON = "Player X won!"
const PLAYERO_WON = "Player O won!"
const TIE = "It's a draw!"

const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

function handleResultValidation() {
	let roundWon = false
	for (let i = 0; i < winningConditions.length; i++) {
		const winCondition = winningConditions[i]
		const a = board[winCondition[0]]
		const b = board[winCondition[1]]
		const c = board[winCondition[2]]
		if (a === "" || b === "" || c === "") {
			continue
		}
		if (a === b && b === c) {
			roundWon = true
			break
		}
	}

	if (roundWon) {
		announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON)
		isGameActive = false
		return
	}

	if (!board.includes("")) announce(TIE)
}

const announce = (type) => {
	switch (type) {
		case PLAYERX_WON:
			announcer.innerHTML = `<p>Player <span class="playerX">X</span>Won</p>`
			break
		case PLAYERO_WON:
			announcer.innerHTML = `<p>Player <span class="playerO">O</span>Won</p>`
			break
		case TIE:
			announcer.innerHTML = `<p>It's a draw</p>`
	}
	announcer.classList.remove(".hide")
}

const isValidAction = (tile) => {
	if (tile.innerHTML !== "" || !isGameActive) return false
	return true
}

const updateBoard = (index) => {
	board[index] = currentPlayer
}

const changePlayer = () => {
	playerDisplay.classList.remove(`player${currentPlayer}`)
	currentPlayer = currentPlayer === "x" ? "o" : "x"
	playerDisplay.innerText = `Current Player: ${currentPlayer}`
	playerDisplay.classList.add(`player${currentPlayer}`)
}

const userAction = (tile, index) => {
	if (isValidAction(tile) && isGameActive) {
		tile.innerText = currentPlayer
		tile.classList.add(`player${currentPlayer}`)
		updateBoard(index)
		handleResultValidation()
		changePlayer()
	}
}

function resetBoard() {
	board = Array(9).fill("")
	isGameActive = true
	announcer.classList.add(".hide")

	if (currentPlayer === "O") {
		changePlayer()
	}

	tiles.forEach((tile) => {
		tile.innerText = ""
		tile.classList.remove("playerX", "playerO")
	})
}

tiles.forEach((tile, index) => {
	tile.addEventListener("click", () => userAction(tile, index))
})

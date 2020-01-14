const winningCombinations = [
	[1, 2, 3],
	[1, 4, 7],
	[1, 5, 9],
	[2, 5, 8],
	[3, 5, 7],
	[3, 6, 9],
	[4, 5, 6],
	[7, 8, 9]
]

export const getWinner = (boxes, turn) => {
	const winnerCheck = winningCombinations.some((combination) => {
		return combination.every((boxId) => boxes[boxId] === turn);
	});
	if (winnerCheck) return turn;
	return null;
}
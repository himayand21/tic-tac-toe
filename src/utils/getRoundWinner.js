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

export const getRoundWinner = (boxes, turn) => {
	let winningCombination;
	const winnerCheck = winningCombinations.some((combination) => {
		const winFlag = combination.every((boxId) => boxes[boxId] === turn);
		if (winFlag) {
			winningCombination = combination;
		}
		return winFlag;
	});
	if (winnerCheck) return winningCombination;
	return null;
}
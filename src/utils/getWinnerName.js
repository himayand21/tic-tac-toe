export const getWinnerName = (player1, player2) => {
    if (player1.score > player2.score) return player1.name;
    if (player2.score > player1.score) return player2.name;
}
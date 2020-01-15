const generateRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

export const getAIMove = (boxes) => {
    const emptyBoxes = Object.keys(boxes).filter(boxID => !boxes[boxID]);
    const randomInt = generateRandomInt(emptyBoxes.length - 1);
    return emptyBoxes[randomInt];
}
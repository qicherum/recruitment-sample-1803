export const shuffle = (array)  => {
	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	while (0 !== currentIndex) {

		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

export const isValidLetter = (e) => {
	const objRegExp = /^[a-zA-Z]+$/;

  if( (!objRegExp.test(e.key)) || (e.target.value.length > 0) ) {
		return e.preventDefault();
	}

  return true;
}

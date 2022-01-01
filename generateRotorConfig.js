const fs = require("fs")
const globals = require("./globals")

const getShuffledArray = function (array) {
	let mutatedArray = Array.from(array)
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1))
		let temp = mutatedArray[i]
		mutatedArray[i] = mutatedArray[j]
		mutatedArray[j] = temp
	}
	return mutatedArray
}

function getRandomHashMap(array) {
	let map = {}
	for (let i of array) {
		let found = false
		while (found != true) {
			let pair = array[Math.floor(Math.random() * array.length)]

			if (map.hasOwnProperty(i)) {
				map[map[i]] = i
				found = true
			} else if (i == pair || Object.values(map).includes(pair)) {
				found = false
			} else if (map.hasOwnProperty(pair)) {
				map[map[pair]] = pair
				found = true
			} else {
				map[i] = pair
				map[pair] = i
				found = true
			}
		}
	}
	return map
}

fs.writeFileSync(
	"./config.json",
	JSON.stringify(
		{
			reflector: getRandomHashMap(getShuffledArray(globals.alphabetArray)),
			rotors: Array(5)
				.fill(null)
				.map(() => {
					let sA = getShuffledArray(globals.alphabetArray)
					return {
						rotor: sA,
						crossConnections: getRandomHashMap(sA),
						rotationsDone: 0,
					}
				}),
		},
		null,
		"\t"
	)
)

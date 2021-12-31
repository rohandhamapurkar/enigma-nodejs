const alphabetsString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const alphabetArr = alphabetsString.split("")

// const shuffleRotor = function (rotorArr) {
// 	let mutatedArray = Array.from(rotorArr)
// 	for (var i = rotorArr.length - 1; i > 0; i--) {
// 		var j = Math.floor(Math.random() * (i + 1))
// 		let temp = mutatedArray[i]
// 		mutatedArray[i] = mutatedArray[j]
// 		mutatedArray[j] = temp
// 	}
// 	return mutatedArray
// }

function rotateRight(arr) {
	let last = arr.pop()
	arr.unshift(last)
	return arr
}
const reflector = {
	N: "W",
	B: "J",
	V: "F",
	M: "H",
	D: "I",
	E: "U",
	G: "T",
	Q: "C",
	O: "A",
	R: "Z",
	L: "Y",
	S: "X",
	K: "P",
	P: "K",
	X: "S",
	Y: "L",
	Z: "R",
	A: "O",
	C: "Q",
	T: "G",
	U: "E",
	I: "D",
	H: "M",
	F: "V",
	J: "B",
	W: "N",
}

let rotors = [
	{
		rotor: ["A", "U", "N", "P", "K", "R", "V", "W", "T", "B", "O", "J", "D", "F", "E", "X", "Q", "I", "G", "Z", "C", "H", "M", "L", "S", "Y"],
		crossConnections: {
			A: "Y",
			U: "S",
			N: "L",
			P: "M",
			K: "H",
			R: "C",
			V: "Z",
			W: "G",
			T: "I",
			B: "Q",
			O: "X",
			J: "E",
			D: "F",
			F: "D",
			E: "J",
			X: "O",
			Q: "B",
			I: "T",
			G: "W",
			Z: "V",
			C: "R",
			H: "K",
			M: "P",
			L: "N",
			S: "U",
			Y: "A",
		},
		rotationsDone: 0,
	},
	{
		rotor: ["N", "B", "V", "M", "D", "E", "G", "Q", "O", "R", "L", "S", "K", "P", "X", "Y", "Z", "A", "C", "T", "U", "I", "H", "F", "J", "W"],
		crossConnections: {
			N: "W",
			B: "J",
			V: "F",
			M: "H",
			D: "I",
			E: "U",
			G: "T",
			Q: "C",
			O: "A",
			R: "Z",
			L: "Y",
			S: "X",
			K: "P",
			P: "K",
			X: "S",
			Y: "L",
			Z: "R",
			A: "O",
			C: "Q",
			T: "G",
			U: "E",
			I: "D",
			H: "M",
			F: "V",
			J: "B",
			W: "N",
		},
		rotationsDone: 0,
	},
	{
		rotor: ["R", "P", "G", "K", "L", "Y", "X", "T", "W", "E", "C", "Q", "O", "I", "J", "M", "H", "S", "F", "A", "V", "N", "B", "D", "Z", "U"],
		crossConnections: {
			R: "U",
			P: "Z",
			G: "D",
			K: "B",
			L: "N",
			Y: "V",
			X: "A",
			T: "F",
			W: "S",
			E: "H",
			C: "M",
			Q: "J",
			O: "I",
			I: "O",
			J: "Q",
			M: "C",
			H: "E",
			S: "W",
			F: "T",
			A: "X",
			V: "Y",
			N: "L",
			B: "K",
			D: "G",
			Z: "P",
			U: "R",
		},
		rotationsDone: 0,
	},
]

let inputString = `
`

function scrambleAlphabet(alphabet) {
	let alphabetIndex = alphabetsString.indexOf(alphabet.toUpperCase())
	if (alphabetIndex === -1) return alphabet

	let finalScrambledIndex = alphabetIndex

	// first run through the 3 rotors
	for (let rIndex = 0; rIndex < rotors.length; rIndex++) {
		let rotorLetter = rotors[rIndex].rotor[finalScrambledIndex]
		let mappedLetter = rotors[rIndex].crossConnections[rotorLetter]
		finalScrambledIndex = rotors[rIndex].rotor.indexOf(mappedLetter)
	}

	// get the reflected letter
	let reflectedLetter = reflector[rotors[rotors.length - 1].rotor[finalScrambledIndex]]

	finalScrambledIndex = rotors[rotors.length - 1].rotor.indexOf(reflectedLetter)

	// run back through the 3 rotors in opposite direction
	for (let rIndex = rotors.length - 1; rIndex >= 0; rIndex--) {
		let rotorLetter = rotors[rIndex].rotor[finalScrambledIndex]
		let mappedLetter = rotors[rIndex].crossConnections[rotorLetter]
		finalScrambledIndex = rotors[rIndex].rotor.indexOf(mappedLetter)
	}

	// rotate the rotors
	for (let rIndex = 0; rIndex <= rotors.length - 1; rIndex++) {
		if (rIndex == 0) {
			rotors[rIndex].rotor = rotateRight(rotors[rIndex].rotor)
			rotors[rIndex].rotationsDone = rotors[rIndex].rotationsDone + 1
		} else {
			if (rotors[rIndex - 1].rotationsDone !== 0 && rotors[rIndex - 1].rotationsDone % 26 == 0) {
				rotors[rIndex].rotor = rotateRight(rotors[rIndex].rotor)
				rotors[rIndex].rotationsDone = rotors[rIndex].rotationsDone + 1
			}
		}
	}

	return alphabetArr[finalScrambledIndex]
}

let scrambledString = ""
for (let index in inputString) {
	scrambledString += scrambleAlphabet(inputString[index])
}

console.log(scrambledString)

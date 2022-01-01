let globals = require("./globals")
let config = require("./config")
const fs = require("fs")

function rotateRight(arr) {
	let last = arr.pop()
	arr.unshift(last)
	return arr
}

console.log(globals.alphabetArray.length)

const reflector = config.reflector

let rotors = config.rotors

let inputString = fs.readFileSync("./input.txt", { encoding: "utf-8" })

function scrambleAlphabet(alphabet) {
	let alphabetIndex = globals.alphabetsString.indexOf(alphabet.toUpperCase())
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
			if (rotors[rIndex - 1].rotationsDone !== 0 && rotors[rIndex - 1].rotationsDone % rotors[rIndex].rotor.length == 0) {
				rotors[rIndex].rotor = rotateRight(rotors[rIndex].rotor)
				rotors[rIndex].rotationsDone = rotors[rIndex].rotationsDone + 1
			}
		}
	}

	return globals.alphabetArray[finalScrambledIndex]
}

let scrambledString = ""
for (let index in inputString) {
	scrambledString += scrambleAlphabet(inputString[index])
}

console.log(scrambledString)

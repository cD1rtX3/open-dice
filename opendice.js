// Copyright COArSe_D1RTxxx under GPLv3 on 8 December 2022
class Dice {
	constructor (t, n) {
		switch (typeof t) {
			case "number":
				//
				break
			case "object":
				if (Array.isArray(t)) {
					//
				} else {
					//
				}
				break
			default:
				throw new Error("Die must be a number, array, or die")
		}
	}
}

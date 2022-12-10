// Copyright COArSe_D1RTxxx under GPLv3 on 8 December 2022
function convolve (a, b) {
	if (Array.isArray(a) && Array.isArray(b)) {
		let c = []
		let d
		for (let i = 0; i < a.length + b.length - 1; i++) {
			d = 0
			for (let j = 0; j <= i && j < a.length; j++) {
				if (i-j >= b.length) { continue }
				d += a[j] * b[i-j]
			}
			c.push(d)
		}
		return c
	} else {
		return undefined
	}
}
class Dice {
	a = []
	hist = 1
	m;
	constructor (t, n) {
		switch (typeof t) {
			case "number":
				m = n
				a = [...Array(n).keys()].map(x => 1)
				b = [...Array(n).keys()].map(x => 1)
				for (let i = 1; i < n; i++) {
					a = convolve(a, b)
				}
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

// Licensed by Coarse Rosinflower under GPLv3 on 8 December 2022

class _d {
	static convolve (n:any, o:any) {
		if (typeof n == "object") { if (typeof o == "object") {
			//
		} else {
			throw new Error((typeof o) + "type passed as second argument to convolve, expected an object")
		}} else {
			throw new Error((typeof n) + "type passed as first argument to convolve, expected an object")
		}
	}
	//
	constructor (n:number, o?:number) {
		//
	}
}

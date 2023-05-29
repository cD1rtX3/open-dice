// Licensed by Coarse Rosinflower under GPLv3 on 8 December 2022

class _d {
	static sort (x:number[]):number[]; static sort (x:number[], a:boolean):object;
	static sort (x:number[], a?:boolean):object { // shell sort
		if (x.length == 0) {return (a ? [[], []] : [])}
		let arr = x, n:number[] = [...(Array(x.length).keys())], t:number
		const gaps = [1750, 701, 301, 132, 57, 23, 10, 4, 1]
		if (a) {
			gaps.forEach(function(g){
				let b = true
				while (b) {b = false; for (let i = g; i < x.length; i++) {
					if (arr[i] < arr[i - g]) {t = arr[i]; arr[i] = arr[i - g]; arr[i - g] = t; t = n[i]; n[i] = n[i - g]; n[i - g] = t; b = true}
				}}
			})
		} else {
			gaps.forEach(function(g){
				let b = true
				while (b) {b = false; for (let i = g; i < x.length; i++) {
					if (arr[i] < arr[i - g]) {t = arr[i]; arr[i] = arr[i - g]; arr[i - g] = t; b = true}
				}}
			})
		}
		return (a ? [arr, n] : arr)
	}
	static convolve (x:number[], y:number[]):number[]; static convolve (x:_d, y:_d):_d;
	static convolve (x:object, y:object):object {
		//
	}
}

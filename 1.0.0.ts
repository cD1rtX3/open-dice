// Licensed by Coarse Rosinflower under GPLv3 on 8 December 2022

class _d {
	static sort (x:number[]):number[]; static sort (x:number[], a:boolean):object; static sort (x:number[], a:number[]):number[][];
	static sort (x:number[], a?:any):object {
		if (x.length == 0) {return (a ? [[], []] : [])}
		let arr = x, n:number[], t:number, b:boolean
		if (Array.isArray(a)) {n = a} else {n = [...(Array(x.length).keys())]}
		const gaps = [1750, 701, 301, 132, 57, 23, 10, 4, 1]
		if (a) {
			gaps.forEach(function(g){
				b = true
				while (b) {b = false; for (let i = g; i < x.length; i++) {
					if (arr[i] < arr[i - g]) {t = arr[i]; arr[i] = arr[i - g]; arr[i - g] = t; t = n[i]; n[i] = n[i - g]; n[i - g] = t; b = true}
				}}
			})
		} else {
			gaps.forEach(function(g){
				b = true
				while (b) {b = false; for (let i = g; i < x.length; i++) {
					if (arr[i] < arr[i - g]) {t = arr[i]; arr[i] = arr[i - g]; arr[i - g] = t; b = true}
				}}
			})
		}
		return (a ? [arr, n] : arr)
	}
	static convolve (x:number[], y:number[]):number[]; static convolve (x:_d, y:_d):_d;
	static convolve (x:object, y:object):object {
		if (x instanceof Array) {
			let a = [...Array(x.length + y.length - 1)].map(n => 0)
			for (let i = 0; i < x.length; i++) {for (let j = 0; j < y.length; j++) {a[i + j] += x[i] * y[j]}}
			return a
		} else {
			//
		}
	}
	nums: [], prob: [] baseNums: [], baseProb: [], length: 0
	constructor (x:number, n?:number); constructor (x:number[], n?:number); constructor (x:_d, n?:number); constructor ();
	constructor (x?:any, n?:number) {
		if (typeof x == "undefined") {} else {
			if (n < 1 || n % 1 > 0) { // Specifically designed NOT to throw on undefined
				throw new Error("Second argument must be a positive integer or undefined.")
			} else {
				if (typeof x == "number") {
					this.baseProb = [...Array(x)].map(() => 1/x)
					let b = this.baseProb
					this.baseNums = [...[...Array(x)].keys()].map(m => m + 1)
					for (i = 1; i < n; i++) {
						b = convolve(b, this.baseProb)
					}
					this.prob = b
					this.nums = [...[...Array(b.length)].keys()].map(m => m + 1)
				} else if (x instanceof Array) {
					//
				} else {}
			}
		}
	}
}

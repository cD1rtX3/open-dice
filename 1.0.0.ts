// Licensed by Coarse Rosinflower under GPLv3 on 8 December 2022

class _d {
	static sort (x:number[]):number[]; static sort (x:number[], a:boolean):object; static sort (x:number[], a:number[]):number[][];
	static sort (x:number[], z?:any):object {
		if (x.length == 0) {return (z ? [[], []] : [])}
		let a = x, b = Array(x.length), m: number, e: number, li: number, ri: number, ti: number, z2 = z ? (typeof z === "object" ? z : [...Array(x.length).keys()]) : undefined, c
		if (z) {
			for (let w = 1; w < x.length; w *= 2) {
				for (let s = 0; s < x.length; s += 2*w) {
					m = Math.min(s + w, x.length)
					e = Math.min(s + 2*w, x.length)
					li = s, ri = m, ti = s
					while (li < m && ri < e) {
						if (a[li] <= a[ri]) {
							b[ti] = a[li]; c[ti++] = z2[li++]
						} else {
							b[ti] = a[ri]; c[ti++] = z2[ri++]
						}
					}
					while (li < m) {
						b[ti] = a[li]; c[ti++] = z2[li++]
					}
					while (ri < e) {
						b[ti] = a[ri]; c[ti++] = z2[ri++]
					}
					for (let i = s; i < e; i++) a[i] = b[i]
					for (let i = s; i < e; i++) z2[i] = c[i]
				}
			}
		} else {
			for (let w = 1; w < x.length; w *= 2) {
				for (let s = 0; s < x.length; s += 2*w) {
					m = Math.min(s + w, x.length)
					e = Math.min(s + 2*w, x.length)
					li = s, ri = m, ti = s
					while (li < m && ri < e) {
						if (a[li] <= a[ri]) {
							b[ti++] = a[li++]
						} else {
							b[ti++] = a[ri++]
						}
					}
					while (li < m) b[ti++] = a[li++]
					while (ri < e) b[ti++] = a[ri++]
					for (let i = s; i < e; i++) {
						a[i] = b[i]
					}
				}
			}
		}
		return z ? [a, z2] : a
	}
	static convolve (x:number[], y:number[]):number[]; static convolve (x:_d, y:_d):_d;
	static convolve (x:any, y:any):object {
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

/*
 * open-dice: Probability calculator for dice!
 * Copyright (C) 2023  Coarse Rosinflower
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

"use strict";

class _d {
	/**
	 * Returns the first argument, sorted in ascending order. If the second argument is true, also returns the list of indexes. Otherwise, if the second argument is an array, also returns the second argument sorted in accordance to the first.
	 */
	static sort(x: number[]): number[];
	static sort(x: number[], z: boolean): any;
	static sort(x: number[], z: any[]): [number[], any[]];
	static sort(x: number[], z?: any): any {
		if (x.length == 0) {
			return (z ? [[], []] : []);
		}
		let a = x.slice(), b = Array(x.length), s: number, m: number, e: number, w: number, li: number, ri: number, ti: number, z2 = z ? (typeof z === "object" ? z.slice() : [...Array(x.length).keys()]) : undefined, c = Array(x.length);
		if (z) {
			for (w = 1; w < x.length; w *= 2) {
				for (s = 0; s < x.length; s += 2*w) {
					m = Math.min(s + w, x.length);
					e = Math.min(s + 2 * w, x.length);
					li = s, ri = m, ti = s;
					while (li < m && ri < e) {
						if (a[li] <= a[ri]) {
							b[ti] = a[li]; c[ti++] = z2[li++];
						} else {
							b[ti] = a[ri]; c[ti++] = z2[ri++];
						}
					}
					while (li < m) {
						b[ti] = a[li]; c[ti++] = z2[li++];
					}
					while (ri < e) {
						b[ti] = a[ri]; c[ti++] = z2[ri++];
					}
				}
				a = b.slice();
				z2 = c.slice();
			}
		} else {
			for (w = 1; w < x.length; w *= 2) {
				for (s = 0; s < x.length; s += 2*w) {
					m = Math.min(s + w, x.length);
					e = Math.min(s + 2*w, x.length);
					li = s, ri = m, ti = s;
					while (li < m && ri < e) {
						if (a[li] <= a[ri]) {
							b[ti++] = a[li++];
						} else {
							b[ti++] = a[ri++];
						}
					}
					while (li < m) {
						b[ti++] = a[li++];
					}
					while (ri < e) {
						b[ti++] = a[ri++];
					}
				}
				a = b.slice();
			}
		}
		return z ? [a, z2] : a;
	}
	/**
	 * Returns the convolution of two numerical arrays.
	 */
	static convolve(x: number[], y: number[]): number[] {
		// TODO: fftconvolve
		let a = [...Array(x.length + y.length - 1)].map(() => 0);
		for (let i = 0; i < x.length; i++) {
			for (let j = 0; j < y.length; j++) {
				a[i + j] += x[i] * y[j];
			}
		}
		return a;
	}
	/**
	 * Converts an array of values into an [n, p] array, where n is the list of numbers and p is the list of probabilities.
	 */
	static arrayToNP(x: number[]): [number[], number[]] {
		// This complicated nightmare is to avoid the 0.1 + 0.2 problem, as well as an inefficiency in linear search.
		let a: number[] = [], n: number[] = [], p: number[] = [];
		for (let f of x) {
			if (!a[f]) {
				n.push(f);
				a[f]++;
			}
		}
		n = _d.sort(n);
		for (let i in n) {
			p[i] = a[n[i]] / x.length;
		}
		return [n, p];
	}
	/**
	 * Takes a list of values, an array of values, an [n, p] array, or a die, and returns the median. If a die or [n, p] is passed, it is expected that its probabilities sum to 1.
	 */
	static median(x: number[]): number;
	static median(x: [number[], number[]]): number;
	static median(x: _d): number;
	static median(...x: number[]): number
	static median(...argv: any[]): any {
		switch (typeof argv[0]) {
			case "number":
					let a = _d.sort(argv);
					let b = (argv.length - 1) / 2;
					return (a[Math.floor(b)] + a[Math.ceil(b)]) / 2;
			case "object":
				if (argv[0] instanceof _d) {
					let [n, p] = _d.sort(argv[0].totN, argv[0].totP);
					let x = 0.5, i = 0;
					for (; x > 0; i++) {
						x -= p[i];
					}
					return n[i - 1];
				}
				else if (Array.isArray(argv[0])) {
					if (Array.isArray(argv[0][0])) {
						let [n, p] = _d.sort(argv[0][0], argv[0][1]);
						let x = 0.5, i = 0;
						for (; x > 0; i++) {
							x -= p[i];
						}
						return n[i - 1];
					}
					else {
						let a = _d.sort(argv[0]);
						let b = (argv[0].length - 1) / 2;
						return (a[Math.floor(b)] + a[Math.ceil(b)]) / 2;
					}
				}
				throw new Error("Invalid argument vector to median; must be a list of numbers, Array<number>, [n, p] array, or _d.");
			default:
				throw new Error("Invalid argument vector to median; must be a list of numbers, Array<number>, [n, p] array, or _d.");
		}
	}
	/**
	 * Takes a list of values, an array of values, an [n, p] array, or a die, and returns the mean. If a die or [n, p] is passed, it is expected that its probabilities sum to 1.
	 */
	static mean(x: number[]): number;
	static mean(x: [number[], number[]]): number;
	static mean(x: _d): number;
	static mean(...x: number[]): number;
	static mean(...argv: any): any {
		switch (typeof argv[0]) {
			case "number":
				let sum = argv.reduce((x: number, y: number) => x + y);
				return sum / argv.length;
			case "object":
				if (argv[0] instanceof _d) {
					let sum = 0;
					for (let i in argv[0].totN) {
						sum += argv[0].totN[i] / argv[0].totP[i];
					}
					return sum;
				}
				else if (Array.isArray(argv[0])) {
					if (Array.isArray(argv[0][0])) {
						let sum = 0;
						for (let i in argv[0][0]) {
							sum += argv[0][0][i] / argv[0][1][i];
						}
						return sum;
					}
					else {
						let sum = argv[0].reduce((x, y) => x + y);
						return sum / argv[0].length;
					}
				}
				throw new Error("Invalid argument vector to mean; must be a list of numbers, Array<number>, [n, p] array, or _d.");
			default:
				throw new Error("Invalid argument vector to mean; must be a list of numbers, Array<number>, [n, p] array, or _d.");
		}
	}
	/**
	 * The array of number arrays.
	 */
	nums: number[][] = [[]];
	/**
	 * The array of probability arrays.
	 */
	prob: number[][] = [[]];
	/**
	 * The total amout of dice in the object. Remember to update this when adding a die.
	 */
	length = 0;
	/**
	 * The entire object's number array.
	 */
	totN: number[] = [];
	/**
	 * The entire object's probability array.
	 */
	totP: number[] = [];
	[Symbol.iterator]: any;
	constructor(die: number, amt?: number);
	constructor(die: number[], amt?: number);
	constructor(die: _d, amt?: number);
	constructor();
	constructor(die?: any, amt: number = 1) {
		if (typeof die !== "undefined") {
			if (amt < 1 || !Number.isSafeInteger(amt)) {
				throw new Error("Second argument to constructor must be a positive integer or undefined.");
			} else {
				if (typeof die === "number") {
					let n = [...Array(die).keys()].map(n1 => n1 + 1), p = [...Array(die)].map(() => 1/die);
					for (let i = 0; i < amt; i++) {
						this.nums[i] = n;
						this.prob[i] = p;
					}
					this.length = amt;
					this.totN = [...Array(amt * (die - 1) + 1).keys()].map(x => x + amt);
					this.totP = this.prob.reduce((x, y) => _d.convolve(x, y));
				}
				else if (Array.isArray(die)) {
					let [n, p] = _d.arrayToNP(die);
					for (let i = 0; i < amt; i++) {
						this.nums[i] = n;
						this.prob[i] = p;
					}
					length = amt;
					this.totN = this.nums.reduce((x, y) => _d.convolve(x, y));
					this.totP = this.prob.reduce((x, y) => _d.convolve(x, y));
				}
				else if (die instanceof _d) {
					let n = die.totN, p = die.totP;
					this.length = amt;
					while (amt--) {
						this.nums[amt] = n;
						this.prob[amt] = p;
					}
					this.totN = this.nums.reduce((x, y) => _d.convolve(x, y));
					this.totP = this.prob.reduce((x, y) => _d.convolve(x, y));
				}
				else {
					throw new Error("First argument to constructor must be a number, Array<number>, _d, or undefined.");
				}
			}
		}
		this[Symbol.iterator] = function* () {
			let a: _d;
			for (let i = 0; i < this.length; i++) {
				a = new _d;
				a.nums = [this.nums[i]];
				a.prob = [this.prob[i]];
				a.length = 1;
				a.totN = this.nums[i];
				a.totP = this.prob[i];
				yield a;
			}
		}
	}
	[Symbol.toPrimitive]() {
		return this.roll();
	}
	/**
	 * Rolls the nth die in the object, where n is the first argument. If no first argument is specified, rolls the entire object.
	 */
	roll(n?: number): number {
		// TODO: Reduce from Θ(n) to Θ(log n).
		let rand = Math.random(), i = 0;
		if (typeof n === "undefined") {
			for (; i < this.totP.length; i++) {
				rand -= this.totP[i];
				if (rand < 0) {
					return this.totN[i];
				}
			}
		}
		else {
			for (; i < this.prob[n].length; i++) {
				rand -= this.prob[n][i];
				if (rand < 0) {
					return this.nums[n][i];
				}
			}
		}
		throw new Error("Tried to roll a value outside the bounds of the die. This means that the probabilities add up to less than 1. Use the _d.prototype.fixProbs() method in this case.");
	}
	/**
	 * If totP does not sum to 1, fixes totP.
	 */
	fixProbs(): void {
		let sum = this.totP.reduce((x, y) => x + y);
		if (sum === 1) {
			return;
		}
		// Divides each element by the sum, so that they will now (hopefully) sum to 1.
		this.totP.map((x) => x / sum);
		sum = this.totP.reduce((x, y) => x + y);
		if (sum === 1) {
			return;
		}
		// If they *still* don't sum to 1, force them to.
		if (sum > 1) {
			let epsilon = 2.220446049250313e-16;
			do {
				for (let i = 0; sum !== 1 && i < this.totP.length; i--) {
					if (this.totP[i] < epsilon) {
						continue;
					}
					this.totP[i] -= epsilon;
					sum -= epsilon;
				}
			} while (sum !== 1);
			sum = this.totP.reduce((x, y) => x + y);
		}
		if (sum < 1) {
			let epsilon = 1.1102230246251565e-16;
			do {
				for (let i = 0; sum !== 1 && i < this.totP.length; i--) {
					// So that we don't give the graph a tail
					if (this.totP[i] < 2.220446049250313e-16) {
						continue;
					}
					this.totP[i] += epsilon;
					sum += epsilon;
				}
			} while (sum !== 1);
		}
	}
	/**
	 * Returns a clone of the die.
	 */
	clone(): _d {
		let a = new _d;
		a.nums = this.nums;
		a.prob = this.prob;
		a.length = this.length;
		a.totN = this.totN;
		a.totP = this.totP;
		return a;
	}
	/**
	 * Pushes a list of _ds or [n, p] arrays onto the die.
	 */
	push(...argv: [number[], number[]][]): void;
	push(...argv: _d[]): void;
	push(...argv: any[]): void {
		for (let i = 0; i < argv.length; i++) {
			if (Array.isArray(argv[i])) {
				if (Array.isArray(argv[i][0])) {
					this.nums.push(argv[i][0]);
					this.prob.push(argv[i][1]);
					this.length++;
					this.totN = _d.convolve(this.totN, argv[i][0]);
					this.totP = _d.convolve(this.totP, argv[i][1]);
					continue;
				}
				throw new Error("Every argument to push must either be an [n, p] array or _d.");
			}
			else if (argv[i] instanceof _d) {
				this.nums.push(...argv[i].nums);
				this.prob.push(...argv[i].prob);
				this.length += argv[i].length;
				this.totN = _d.convolve(this.totN, argv[i].totN);
				this.totP = _d.convolve(this.totP, argv[i].totP);
				continue;
			}
			throw new Error("Every argument to push must either be an [n, p] array or _d.");
		}
	}
}
var Die = _d;

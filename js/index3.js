"use strict";
/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: ts类
 * @Date: 2019-04-22 15:40:22
 * @LastEditTime: 2019-04-22 20:31:39
 */
/*  es5
function run() {
    this.name = name;
    this.age = age;
    this.go = function (params) {
        console.log('params: ', params);
    }
}
let run1 = new run();
 */
// ts 类
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* class run {
    name: string
    constructor(n: string) {
        this.name = n
    }
    getname(): string {
        return this.name
    }
    setname(name: string): void {
        this.name = name
    }
}
const p = new run('yang')
p.getname()
console.log('p.getname(): ', p.getname())
p.setname('eqwe')
console.log('p.getname(): ', p.getname()) */
/* class run {
    name: string
    constructor(name: string) {
        this.name = name
    }
    run(): string {
        return `${this.name}在运动`
    }
}
// const p = new run('yang')
// console.log('p.run(): ', p.run())
class web extends run {
    constructor(name: string) {
        super(name)
    }
}
const p1 = new web('yang')
console.log('p1: ', p1)
console.log('p1.web(): ', p1.run()) */
/* class run {
    name: string
    constructor(name: string) {
        this.name = name
    }
    run(): string {
        return `${this.name}在运动`
    }
}
class web extends run {
    constructor(name: string) {
        super(name)
    }
    run(): string {
        return `${this.name}在运动`
    }
}
const p1 = new web('yang')
console.log('p1: ', p1)
console.log('p1.web(): ', p1.run()) */
// ts 修饰符
/*
    public : 公有 在类里面，子类，外面可以访问
    protected  类外不可以访问
    private 子类 类外不可以访问
    属性不加修饰符默认 公有
 */
// class run {
// 	private name: string
// 	constructor(name: string) {
// 		this.name = name
// 	}
// 	run(): string {
// 		return `${this.name}在运动`
// 	}
// }
// class web extends run {
// 	constructor(name: string) {
// 		super(name)
// 	}
// 	run(): string {
// 		return `${this.name}在运动`
// 	}
// 	work(): string {
// 		return `${this.name}在运动`
// 	}
// }
// const p1 = new web('yang')
// console.log('p1.web(): ', p1.run())
// const p = new run('3122')
// console.log(p.name)
// 静态方法
// class run {
// 	public name: string
// 	constructor(name: string) {
// 		this.name = name
// 	}
// 	run(): string {
// 		return `${this.name}在运动`
// 	}
// 	static sex: string = '男'
// 	work(): void {
// 		console.log('work', this.sex)
// 	}
// }
// 抽象类 不能直接实例 标准类
var run = /** @class */ (function () {
    function run(name) {
        this.name = name;
    }
    return run;
}());
var work = /** @class */ (function (_super) {
    __extends(work, _super);
    function work(name) {
        return _super.call(this, name) || this;
    }
    work.prototype.eat = function () { };
    return work;
}(run));

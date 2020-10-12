/*
 * @Author: 杨宏旋
 * @Date: 2020-10-10 16:02:10
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-10 18:25:42
 * @Description:
 */
/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
var ParkingSystem = function (big, medium, small) {
  this.big = big
  this.medium = medium
  this.small = small
}

/**
 * @param {number} carType
 * @return {boolean}
 */
ParkingSystem.prototype.addCar = function (carType) {
  console.log('this: ', this)
  switch (carType) {
    case 1:
      return this.big-- > 0
    case 2:
      return this.medium-- > 0
    case 3:
      return this.small-- > 0
  }
}

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */
var obj = new ParkingSystem([[1, 1, 0], [1], [2], [3], [1]])
obj.addCar(1)
obj.addCar(1)
obj.addCar(2)
obj.addCar(3)
obj.addCar(1)

'use strict'
//检测存入数据类型
function getType(data) {
  var type = Object.prototype.toString.call(data)
  switch (type) {
    case '[object String]':
      return 'String'
    case '[object Number]':
      return 'Number'
    case "[object Boolean]":
      return 'Boolean'
    case "[object Function]":
      return 'Function'
    case "[object Object]":
      return 'Object'
    case "[object Array]":
      return 'Array'
    case "[object Date]":
      return 'Date'
  }
}

//获取值并根据类型转换
function getValue(type, item) {
  switch (type) {
    case 'String':
      return item
    case 'Number':
      return Number(item)
    case "Boolean":
      let value;
      return value = (item === 'true') ? true : false;
    case "Function":
      let fun = (new Function("return " + item))();
      return fun;
    case "Object":
      return JSON.parse(item);
    case "Array":
      return JSON.parse(item);
    case "Date":
      return new Date(item);
  }
}

module.exports.getType = getType;

module.exports.getValue = getValue;

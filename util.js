'use strict'
//检测存入数据类型
function getType(data) {
    var type = Object.prototype.toString.call(data)
    switch (type) {
        case '[object String]':
            return 'String'
            break;
        case '[object Number]':
            return 'Number'
            break;
        case "[object Boolean]":
            return 'Boolean'
            break;
        case "[object Function]":
            return 'Function'
            break;
        case "[object Object]":
            return 'Object'
            break;
        case "[object Array]":
            return 'Array'
            break;
        case "[object Date]":
            return 'Date'
            break;
    }
}

//获取值并根据类型转换
function getValue(type, item) {
    switch (type) {
        case 'String':
            return item
            break;
        case 'Number':
            return Number(item)
            break;
        case "Boolean":
            let value;
            return value = (item === 'true') ? true : false;
            break;
        case "Function":
            let fun = (new Function("return " + item))();
            return fun;
            break;
        case "Object":
            return JSON.parse(item);
            break;
        case "Array":
            return JSON.parse(item);
            break;
        case "Date":
            return new Date(item);
            break;
    }
}

module.exports.getType = getType;

module.exports.getValue = getValue;
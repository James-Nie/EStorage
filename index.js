'use strict';
/*
	author:niejianbo
    name:EStorage.js
    date:2019-02-18
    VERSION = "1.1.0"
    DATATYPE = String,Number,Boolean,Function,Date,Object,Array 支持的数据类型
*/
var EStorage =require('./EStorage').default

var sessionStore = new EStorage('session')
var lcoalStore = new EStorage('local')

module.exports = {
    session: sessionStore,
    local: lcoalStore
} 

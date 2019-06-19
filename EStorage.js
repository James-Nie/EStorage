'use strict'
import { getType, getValue } from './util'

//存储类型id
const KEYWORDID = 'KEYWORDID'
const VERSION = "1.1.0"
//支持的数据类型
const DATATYPE = 'String,Number,Boolean,Function,Date,Object,Array'

//存储类
export default class EStorage {
    constructor(type) {
        this.VERSION = VERSION
        this.DATATYPE = DATATYPE
        this.type = type
        this.data = null
        this.events = {}
        this.init()
    }

    init() {
        if (this.type === 'session') {
            this.data = window.sessionStorage
        } else if (this.type === 'local') {
            this.data = window.localStorage
        }

        this.set(KEYWORDID,{KEYWORDID:'Object'});
    }

    set(key, newVal) {
        if(!newVal) return
        let oldVal = key !==KEYWORDID ? this.get(key) : ''
        let type = getType(newVal), saveData = ''
        if (type === 'String' || type === 'Number' || type === 'Boolean' || type === 'Function' || type === 'Date') {
            saveData = ''.concat(newVal);
        } else if (type === 'Object' || type === 'Array') {
            saveData = ''.concat(JSON.stringify(newVal))
        }

        this.data.setItem(key, saveData)
        if (key !== KEYWORDID) {
            this.updateKeys(key, type, 'set')
        }

        var eventType = oldVal ? 'update' : 'set'
        this.call(key, newVal, oldVal, eventType)
    }
    //获取会话级数据
    get(key) {
        let sessionKeys = this.getKeys();
        let item = this.data.getItem(key);
        return getValue(sessionKeys[key], item);
    }
    //获取所有会话级数据
    getAll() {
        let obj = {};
        for (let i in this.data) {
            if (this.data.hasOwnProperty(i) && i !== KEYWORDID) { //filter,只输出sessionS的私有属性 
                obj[i] = this.get(i)
            }
        }
        return obj
    }

    //清除会话级数据
    clear() {
        this.data.clear()
        this.set(KEYWORDID, { KEYWORDID: 'Object' })

        for(let key in this.events){
            this.call(key,null, null, 'clear')
        }
    }
    //更新key值
    update(key, newVal) {
        if (!this.isexist(key)) {
            return
        }
        this.set(key, newVal)
    }
    //删除key值
    remove(key) {
        let oldVal = this.get(key)
        if (!this.isexist(key) || key === '') {
            return
        }
        this.data.removeItem(key);
        this.updateKeys(key, '', 'remove')

        this.call(key, null, oldVal, 'remove')
    }
    //获取数据类型
    keyType(key) {
        let sessionKeys = this.getKeys();
        if (this.isexist(key)) {
            return sessionKeys[key]
        }
    }

    getKeys() {
        let item = this.data.getItem(KEYWORDID);
        return getValue('Object', item);
    }

    //校验是否存在某个值
    isexist(key) {
        let sessionKeys = this.getKeys();
        return (key && sessionKeys[key]) ? true : false
    }

    //更新key值类型
    updateKeys(key, keytype, operate) {
        let keys = this.get(KEYWORDID)
        switch (operate) {
            case 'set':
                keys[key] = keytype;
                break;
            case 'remove':
                delete keys[key];
                break;
            case 'clear':
                for (let i in keys) {
                    if (i !== KEYWORDID) {
                        delete keys[i];
                    }
                }
                break;
        }
        this.set(KEYWORDID, keys)
    }

    // 添加键监听事件
    addEvent(key, callback){
        if(key && typeof callback === 'function'){
            this.events[key] = callback
        }
    }

    call(key, newVal, oldVal, type){
        var events = this.events
        if(events[key] && typeof events[key] === 'function'){
            var fun = this.events[key]
            fun(newVal, oldVal, type)
        }
    }

}
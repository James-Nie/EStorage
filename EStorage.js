/*
    EStorage.js
    2017-12-25

    VERSION = "1.0.0"

    DATATYPE = String,Number,Boolean,Function,Date,Object,Array 支持的数据类型
*/

var EStorage = (function () {
    "use strict";

    var VERSION = "1.0.0";
    //支持的数据类型
    var DATATYPE = 'String,Number,Boolean,Function,Date,Object,Array';

    //存储类型id
    var KEYWORDID = 'KEYWORDID';
    //检测存入数据类型
    function getType(data){
        var type = Object.prototype.toString.call(data)
        switch(type)
        {
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
    function getValue(type,item){
        switch(type)
        {
        case 'String':
          return item
          break;
        case 'Number':
          return Number(item)
          break;
        case "Boolean":
          var value;
          return value = (item ==='true') ?  true : false;
          break;
        case "Function":
          var fun=(new Function("return "+item))();
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
        default:
          return item;
        }
    }

    //存储类
    function EStorage(){
        this.VERSION = VERSION;
        this.DATATYPE = DATATYPE;
    }


    //会话级存储类
    EStorage.prototype.session = {
        data:window.sessionStorage,
        //新增或更新会话级数据
        set:function(key,data){
            var type = getType(data);
            var saveData = '';

            if(type === 'String' || type === 'Number' || type === 'Boolean' || type === 'Function' || type === 'Date'){
                saveData = ''.concat(data);
            }else if(type === 'Object' || type === 'Array'){
                saveData = ''.concat(JSON.stringify(data));
            }

            this.data.setItem(key,saveData);

            if(key !==KEYWORDID){
                updateKeys(key,type,'set','session');            
            }

        },
        //获取会话级数据
        get:function(key){
            if(!isexist(key,'session')){
                return;
            }else{
                var sessionKeys = getKeys('session');
                var item = this.data.getItem(key);
                return getValue(sessionKeys[key],item);
            }    
        },
        //获取所有会话级数据
        getAll:function(){ 
            var obj={};
            for(var i in this.data){
                if (this.data.hasOwnProperty(i) && i !==KEYWORDID) { //filter,只输出sessionS的私有属性 
                    obj[i] = this.get(i)
                };
            }
            return obj;
        },
        //校验是否存在某个值
        isexist:function(key){
            return isexist(key,'session');           
        },
        //清除会话级数据
        clear:function(){ 
            this.data.clear();
            this.set(KEYWORDID,{KEYWORDID:'Object'});
        },
        //更新key值
        update:function(key,data){ 
            if(!isexist(key,'session')) {
                return;
            }
            this.set(key,data);
        },
        //删除key值
        remove:function(key){ 
            if(!isexist(key,'session') || key ==='') {
                return;
            }
            this.data.removeItem(key);
            updateKeys(key,'','remove','session')
        },
        //获取数据类型
        keyType:function(key){
            var sessionKeys = getKeys('session');
            if(isexist(key,'session')) {
                return sessionKeys[key];
            }
        }
    }

    //磁盘存储类
    EStorage.prototype.local = {
        data:window.localStorage,
        set : function(key,data){ //新增或更新浏览器永久数据
            var type = getType(data);
            var saveData = '';

            if(type === 'String' || type === 'Number' || type === 'Boolean' || type === 'Function' || type === 'Date'){
                saveData = ''.concat(data);
            }else if(type === 'Object' || type === 'Array'){
                saveData = ''.concat(JSON.stringify(data));
            }

            this.data.setItem(key,saveData);
            if(key !==KEYWORDID){
                updateKeys(key,type,'set','local');
            }
        },
        //获取key值
        get:function(key){
            if(!isexist(key,'local')){
                return;
            }else{
                var localKeys = getKeys('local');
                var item = this.data.getItem(key);
                return getValue(localKeys[key],item);
            }
        },
        //获取所有永久数据
        getAll:function(){
            var obj={};
            for(var i in this.data){
                if (this.data.hasOwnProperty(i) && i !==KEYWORDID) { //filter,只输出sessionS的私有属性 
                    obj[i] = this.get(i)
                };
            }
            return obj;
        },
        //校验是否存在某个值
        isexist:function(key){
            return isexist(key,'local');           
        },
        //清除浏览器永久数据
        clear:function(){
            this.data.clear();

        },
        //更新key值
        update:function(key,data){
            if(!isexist(key,'local')) {
                return;
            }
            this.set(key,data);
        },
        //删除key值
        remove:function(key){
            if(!isexist(key,'local')) {
                return;
            }
            this.data.removeItem(key);
            updateKeys(key,'','remove','local')   
        },
        //获取数据类型
        keyType:function(key){
            var localKeys = getKeys('local');
            if(isexist(key,'local')) {
                return localKeys[key];
            }
        }
    }

    var storage = new EStorage() 

    if(!sessionStorage.getItem(KEYWORDID)){
        storage.session.set(KEYWORDID,{KEYWORDID:'Object'});
    }
    
    if(!localStorage.getItem(KEYWORDID)){
        storage.local.set(KEYWORDID,{KEYWORDID:'Object'});
    }

    //是否存在
    function isexist(key,type){
        if(type ==='session'){
            var flag = (key && sessionStorage.getItem(key)) ? true : false;

            // var sessionKeys = getKeys('session');
            // var flag = (key && sessionKeys[key]) ? true : false;
            return flag;
        }else if(type ==='local'){
            // var localKeys = getKeys('local');
            // var flag = (key && localKeys[key]) ? true : false;
            var flag = (key && localStorage.getItem(key)) ? true : false;
            return flag;
        }     
    }

    //获取key列表
    function getKeys(type){
        if(type ==='session'){
            var item = sessionStorage.getItem(KEYWORDID);
            return getValue('Object',item);
        }else if(type ==='local'){
            var item = localStorage.getItem(KEYWORDID);
            return getValue('Object',item);
        }
        
    }

    //更新key值类型
    function updateKeys(key,keytype,operate,saveType){
        var keys = saveType ==='session' ? storage.session.get(KEYWORDID) : storage.local.get(KEYWORDID);

        switch(operate)
        {
        case 'set':
          keys[key] = keytype;
          break;
        case 'remove':
          delete keys[key];
          break;
        case 'clear':
          for(var i in keys){
            if(i !==KEYWORDID){
                delete keys[i];
            }
          }
          break;
        } 
        saveType ==='session' ? storage.session.set(KEYWORDID,keys) : storage.local.set(KEYWORDID,keys); 
    }

    //对外提供接口
    return storage;

}());
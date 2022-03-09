## 简介
基于Web Storage (sessionStorage 和localStorage)做的方法扩展，旨在减少浏览器存储过程的数据序列化和反序列化操作，使得Web Storage的使用更加简单，开发者不用关心存入的数据类型是什么，原生数据存取。
并且在原生基础上增加了Function类型, Date类型的存储。

## 数据格式
* 支持七种数据存储格式
> - String，Number，Boolean，Function，Date，Object，Array

* 存入什么数据类型，取出什么数据类型
* 与原生方法共存
* 易扩展
  
## 安装使用

```html
<!DOCTYPE html>
<html>

<head>
<title>extend-storage使用</title>
</head>

<body>
<script src="./dist/extend-storage.min.js"></script>
<script>
  EStorage.session.set('sessionKey', {key:'value'})
  console.log(EStorage.session.get('sessionKey'))


  EStorage.local.set('localKey', {key:'value'})
  console.log(EStorage.local.get('localKey'))
</script>
</body>

</html>

```

### **npm：**

```bash
npm install extend-storage
```

```javascript
// commonjs 引入
const EStorage = require('extend-storage')
EStorage.session.set('newObj', {key: 'value'})
console.log(EStorage.session.get('newObj')) // 

// es6 引入
import EStorage from 'extend-storage'
EStorage.local.set('number', 123)
console.log(EStorage.local.get('number'))

```
# API

* 两个操作对象EStorage.session和EStorage.local
* 支持以下方法：

> - set(key,value,expireIn)：创建新数据项和更新已存在的值。接受三个参数——要创建/修改的数据项的键、值、过期时间（非必填、毫秒）。
> - update(key,value,expireIn)：更新已存在的值。接受三个参数——要创建/修改的数据项的键、值、过期时间（非必填、毫秒）。
> - remove(key)：接受一个参数——你想要移除的数据项的键，然后会将对应的数据项从域名对应的存储对象中移除。
> - clear()：不接受参数，清空域名对应的整个存储对象。
> - get(key)：接受数据项的键作为参数，并返回从存储中的数据项
> - keyType(key)： 返回对应key值的数据类型 
> - isExist(key)： 接受数据项的键作为参数，并返回布尔值
> - getAll()： 不接受具体参数，获取所有的键值对,返回Object

## 事件
addEvent支持对某个键值对进行监听，如果监听的值发生变化（set， update，remove，clear），则触发注册的回调函数
```
EStorage.session.addEvent("key", function(newVal, oldVal, type){
  console.log( newVal, oldVal, type) // 
})
```

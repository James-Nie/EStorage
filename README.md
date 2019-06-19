# 安装使用

### **浏览器：**

浏览器兼容：ie10及以上版本、chrome 58及以上版本

```html
<script src="./dist/EStorage.min.js"></script>
<script>
  EStorage.session.set('newObj', {key:'value'})
  console.log(EStorage.session.get('newObj'))
</script>
```

### **npm：**

```bash
npm install EStorage
```

```javascript
// commonjs 引入
const EStorage = require('EStorage')
EStorage.session.set('newObj', {key: 'value'})
console.log(EStorage.session.get('newObj'))

// es6 引入
import EStorage from 'EStorage'
EStorage.local.set('number', 123)
console.log(EStorage.local.get('number'))

```
# API

* 两个操作对象EStorage.session和EStorage.local
* 支持以下方法：

> - set(key,value)：创建新数据项和更新已存在的值。接受两个参数——要创建/修改的数据项的键，和对应的值。
> - update()：更新已存在的值。接受两个参数——修改的数据项的键和对应的值。
> - remove(key)：接受一个参数——你想要移除的数据项的键，然后会将对应的数据项从域名对应的存储对象中移除。
> - clear(key,value)：不接受参数，清空域名对应的整个存储对象。
> - get(key)：接受数据项的键作为参数，并返回从存储中的数据项
> - keyType(key)： 返回对应key值的数据类型 
> - isexist(key)： 接受数据项的键作为参数，并返回布尔值
> - getAll()： 不接受具体参数，获取所有的键值对,返回Object

* 支持七种数据存储格式
> - String，Number，Boolean，Function，Date，Object，Array

* 存入什么数据类型，取出什么数据类型
* 与原生方法共存
* 易扩展

## 事件
addEvent支持对某个键值对进行监听，如果监听的值发生变化（set， update，remove，clear），则触发注册的回调函数
```
EStorage.session.addEvent("key", function(newVal, oldVal, type){
  console.log( newVal, oldVal, type)
})
```

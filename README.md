## Web存储(Web Storage)扩展EStorage
[TOC]

我们知道HTML5中新增了Web Storage的规范，目的是解决客户端存储数据，而无需将数据持续的发回服务器。它提供了两个对象sessionStorage和localStorage，这两个对象都是以windows对象属性的形式存在的，区别在于localStorage存储的数据不会过期，sessionStorage存储的数据每次关闭浏览器后都会被清空。

------

### **为什么出这个扩展类**

Web Storage的出现解决了cookie不适合浏览器存储大量数据和每次请求时，cookie都会存放在请求头中，传输到服务器端的问题。

Storage的两个实例提供了以下五个方法：
> - clear()：删除所有值；Firefox中没有实现。
> - getItem(name)：根据指定的name获取对应的值。
> - key(index)：获得index位置处的值的名字。
> - removeItem(name)：删除由name指定的名值对。
> - setItem(name,value)：为指定的name设置一个对应的值。

虽然Storage的几个方法调用很简单，但是只能存储字符串格式的数据，这给实际编码过程中带来了很大的困扰，比如：当我存入一个Object数据时，每次存入之前都要数据转化成字符串，取出使用的时候也要将字符串再转化为对象，并且人为的要记住存入值的格式。
所以，为了减少重复劳动，以后少些重复代码，顺便提升下效率，要造个独轮车。

![我的头像](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514354549051&di=83c6ae4aa396229b0afcd7fdea2b81f0&imgtype=0&src=http%3A%2F%2Fimg2.xiukee.com%2Fupload%2F2016%2F4%2F18%2F4840009549c3da32961.jpg%40100q.jpg)

------

### **特点**
* 两个操作对象EStorage.session和EStorage.local
* 8个方法

> - set(key,value)：为指定的key设置一个对应的值。
> - remove(key)：删除由key指定的名值对。
> - clear()：删除所有值；Firefox中没有实现。
> - update 更新(key,value)。
> - get(key)：根据指定的key获取对应的值。
> - keyType(key)： 对应key值的数据类型 
> - isexist(key)： 是否存在
> - getAll()： 获取所有的值,返回object

* 支持七种数据存储格式
> - String，Number，Boolean，Function，Date，Object，Array

* 存入什么格式，取出什么格式
* 通过原生方法存入的数据，只能取出字符串
* 与原生方法共存
* 易扩展

------

### **使用入门**
```
<script src="EStorage.js"></script>
<script>
    var objData = {
        name:王二,
        age:25
    }
    EStorage.session.set('objData',objData);//存值
    var data = EStorage.session.get('objData'); //取值
</script>
```
### **比较**
*以存取一个Object数据为例：*
>  存值

```
var objData = {
        name:王二,
        age:25
    }
*原生方式*
var stringD = JSON.stringify(objData)
sessionStorage.setItem('objData',stringD)

*EStorage方式*
EStorage.session.set('objData',objData);
```
>  取值

```
*原生方式*
var stringD = sessionStorage.getItem('objData')
var objData = JSON.parse(stringD)

*EStorage方式*
var objData = EStorage.session.get('objData');
```


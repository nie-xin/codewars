#JS练习

>最近JavaScript刚入门，这门过去被我认为只是用来做点网页小交互的语言其实并不简单。我也开始渐渐理解为何JS被称为“披着C语言外套的LISP”，并开始喜欢上了这门语言。实践是学习的最佳途径，于是我开始通过[codewar](http://www.codewars.com/)来复习巩固JavaScript的技能。在这里摘录一些包含不少我认为有意义的题目，并记录下自己的解题过程。

##1. 排序对象数组（array of objects）

给定如下对象数组：
```
[ 
    {a: 1, b: 3}, 
    {a: 3, b: 2}, 
    {a: 2, b: 40}, 
    {a: 4, b: 12} 
]
```

根据对象的某个特定属性，按降序对整个数组进行排列。例如按属性a进行排序后，结果如下：

```
[ 
    {a: 4, b: 12}, 
    {a: 3, b: 2}, 
    {a: 2, b: 40}, 
    {a: 1, b: 3} 
]
```

###解题思路

让我们从对象数组开始。JS中的数组可以包含任何元素，包括对象。包含多个对象的数组构成一个对象数组。在数组中用花括号标记对象中并由逗号分隔各个对象，对象的属性则由键/值对组成。数组中的对象可以通过数组名加上数组索引进行访问。

例如有如下对象数组：

```
myArray = [
  { "name": "John Doe", "age": 29 }, 
  { "name": "Anna Smith", "age": 24 }, 
  { "name": "Peter Jones", "age": 39 }
]
```

则``myArray[0].name`` 将返回 ``John Doe``

下面来看看数组排序。JS的Array对象有一个sort方法可用于排序，该方法可接受一个比较函数用于比较数组元素，决定排序顺序。

定义： ``arr.sort([compareFunction])``

> * compareFunction(a, b) 返回值 < 0， 则a排在b前
> * compareFunction(a, b) 返回值 > 0，则b在a前
> * compareFunction(a, b) 返回值 === 0，则a、b的位置不变

###解决方案

构建函数function sortList (sortBy, list)，其中sortBy是排序依据的属性，list是需要排序的对象数组。根据要sortBy访问数组中对象的相应属性，并将该属性的值作为参数传递给比较函数compareFunction进行排序。

```
function sortList (sortBy, list) {
  return list.sort(function(a, b) {
    var valueA, valueB;
    
    // 取出对应属性的值
    valueA = a[sortBy];
    valueB = b[sortBy];
    
    // 降序，若需要升序则互换两者位置
    return valueB - valueA;
  })
}

// 精简版答案
function sortList (sortBy, list) {
  return list.sort(function(a, b) { 
  
    // 降序，若需要升序则互换两者位置
    return b[sortBy] - a[sortBy]; 
    });
}
```

###reference: 

> * [JSON](http://www.json.com/)

> * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

---

##2. 构建numberOfOccurrences函数， 使其返回数组中某个特定元素的出现次数。

例如：
```
var arr = [0,1,2,2,3];
arr.numberOfOccurrences(0) === 1;
arr.numberOfOccurrences(4) === 0;
arr.numberOfOccurrences(2) === 2;
arr.numberOfOccurrences("a") === 0;
```

传统解法：
```
Array.prototype.numberOfOccurrences = function(x) {
   var counter = 0;
   for (var i = 0; i < this.length; i++)
       if (this[i] === x) counter++;
   return counter;
}
```
评价：代码臃肿，不够优雅


较好的解法：
```
Array.prototype.numberOfOccurrences = function(n) {
  return this.filter( function(x) { 
    return x === n;
    }).length;
}
```
分析：利用Array.prototype.filter()方法，该方法创建一个新数组，数组中的元素通过function的测试。具体在该解法中，利用过滤函数构造一个等同于参数的元素构成的数组，再取该数组长度。该数组就是该元素出现的数组，而长度就是该元素出现的次数。

参考：[Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)


奇怪的解法：
```
Array.prototype.numberOfOccurrences = function(n) {
  return this.reduce( function(p, c) { 
    return p + (c === n) 
    }, 0);
}
```
分析：利用Array.prototype.reduce()中的叠加器来缩减数组中的值。该解法并不直观，至少我不推荐。

参考：[Array.prototype.reduce()](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/Array/Reduce)

---

##3. Get key/value pairs as arrays

Complete the keysAndValues function so that it takes in an object and returns the keys and values as separate arrays.

Example:
```
keysAndValues({a: 1, b: 2, c: 3}) // should return [['a', 'b', 'c'], [1, 2, 3]]
```

My solution:
```
function keysAndValues(data){
  var result = new Array();
  result[0] = new Array();
  result[1] = new Array();
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      result[0].push(key);
      result[1].push(data[key]);
    }
  }
  
  return result;
}
```
Improved solution:
```
function keysAndValues(data){
  var keys = [];
  var values = [];

  for (var key in data) {
    keys.push(key);
    values.push(data[key]);
  }

  return [keys, values];
}
```
思路：利用for in循环来遍历对象可枚举的属性，并建立一个嵌套数组分别保存建和值。

Best solution:
```
function keysAndValues(data){
  var keys = Object.getOwnPropertyNames(data),
      vals = keys.map(function (key) { return data[key]; });
  return [keys, vals];
}
```
思路：先利用getOwnPropertyNames取出所有属性的键，再利用array.map()来构建一个由array中每个元素调用function后的返回值组成的新数组。注意，function的参数key是keys数组的元素。
___

##4. 设有sumDigits函数，接收一个整数作为输入

首先假设输入的都是整数，要求方程返回所有数位之和。例如：
```
sumDigits(10); // Returns 1
sumDigits(99); // Returns 18
sumDigits(-32); // Returns 5
```

一开始觉得挺简单的，类似的题之前就做过了。于是我自信满满地给出了第一个答案：
```
function sumDigits(number) {
  var sum = 0;
  
  while (number !== 0) {
    sum += number % 10;
    number /= 10;
  }
  
  return sum;
}
```
每次取个位的值，然后将数字右移一位。这么简单！

可是测试很快就报错了，输入为11的时候，输出居然是1.1111111111111。怎么回事？解过很多次的题，不应该有错阿？

仔细思考了一下，原来我把弱类型的js和强类型的C/Java弄混淆了。在C语言中，int值相除的结果是截断的，也就是说1/10结果为0。而在js中，所有的数字都是浮点表示的，1/10将等会0.1。这就解释了我犯的错误了。解决办法倒也简单，强制转换结构就好了：
```
function sumDigits(number) {
  var sum = 0;
  var value = Math.abs(number);
  
  while (value !== 0) {
    sum += value % 10;
    value = Math.floor(value/10);
  }
  
  return sum;
}
```
[Math.floor()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)表示下去整，强制将结果的小数部分去掉了。

答案是正确的，可是解法太old school了。看了别人的解法，真叫我无地自容阿……
```
function sumDigits(number) {
  return Math.abs(number).toString().split('').reduce(function(a,b){return +a + +b}, 0);
}
```
现将数字转为字符串，再将字符串分别切割开。最后利用reduce函数将单独的数字依次累加。比较困惑是+a, +b这两个部分，其实他们的作用是将string转换回number:
```
var test = "5";
typeof test; //返回"string"

var test = +"5";
typeof test; //返回"number"
```

啥时候我也能写出这种精妙的答案阿……

___

##5. Building Strings From a Hash

Complete the solution so that it takes the object (JavaScript/CoffeeScript) or hash (ruby) passed in and generates a human readable string from its key/value pairs.

The format should be "KEY = VALUE". Each key/value pair should be separated by a comma except for the last pair.
```
solution({a: 1, b: '2'}) // should return "a = 1,b = 2"
```

My solution:
```
function solution(pairs){
  var result = "";
  
  for (key in pairs) {
    if (result.length > 0) result += ", ";
    result += key + " = " + pairs[key];
  }
  
  return result;
}
```

A better approach:
```
function solution(pairs){
  lines = [];
  for(var key in pairs){
    lines.push(key + " = " + pairs[key]);
  }
  
  return lines.join(",");
}
```
[Array.prototype.join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join): join all elements of an array to a string.

A neat approach:
```
function solution(pairs){
  return Object.keys(pairs)
    .map(function(k) { return k + ' = ' + pairs[k] })
    .join(',');
}
```
[Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

[Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

join同上

---

##6. returns the values of an array that are not odd

Description:

Write a small function that returns the values of an array that are not odd.

All values in the array will be integers. Return the good values in the order they are given.

function noOdds( values )

```
// old school
function noOdds( values ){

  var result = [];
  
  for (var i = 0; i < values.length; i++) {
    if ( (values[i] % 2) === 0 ) {
      result.push(values[i]);
    }
  }
  
  return result;
}

// map()
function onOdds( values ) {
  return values.filter( function( x ) {
    return ( x % 2 === 0 );
  });
}
```

这里要注意Array几个函数的用法，第二种解法就是因为混淆了map和filter导致了错误。需要做一个笔记整理一下这几个常用的函数。

[参考](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

---



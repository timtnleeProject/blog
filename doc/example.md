# Javascript

###### tags: `javascript` `iterator` `js` `es6`

## 名詞、概念

### factory function
> In JavaScript, any function can return a new object. When it’s not a constructor function or class, it’s called a factory function. - Eric Elliott

### JS編寫style參考

[google](https://google.github.io/styleguide/jsguide.html)

## Operator

### + (Unary plus)

[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Unary_plus_())
轉值為number

## Object

### Object.assign(`target`,`...sources`)

合併物件的屬性 [MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

並回傳target物件。
```javascript
const obj = Object.assign({},{a:1})
console.log(obj)//{a:1}
const obj2 = Object.assign({c:3},{a:1},{b:2})
console.log(obj2)//{a:1, b:2, c:3}
```

## Array

#### reduce

```javascript
arr.reduce(callback[, initialValue])
callback(accumulator, currentValue)
//ex
const sum = (...args) => args.reduce((a, b) => a + b, 0)
```

## Iterator/Iterable

### Iterator
Iterator 簡單來說可以看成是一個object
有一個`next`方法回傳`{value:<any>,done:<bolean>}`

*(i-1)*
```javascript
function makeIterator(array) {
    var nextIndex = 0;
    
    return { //這個就是iterator
       next: function() {
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false} :
               {done: true};
       }
    };
}
```
用上述面的function產生iterator

*(i-2)*
```javascript
const iterator = makeIterator([1,2,3]);
iterator.next(); //{value:1 ,done:false}
iterator.next(); //{value:2 ,done:false}
iterator.next(); //{value:3 ,done:false}
iterator.next(); //{done:true}
```
以上是一個iterator，但並不是*iterable*，
例如我們使用iterable的展開符號便會出錯
```javascript
const ary = [...iterator] //iterator is not iterable
```

iterator 歷遍完一遍就結束了，無法再重新

### Iterable

要成為Iterable的物件，必須要實作 **@@iterator** 方法
*該方法會回傳一個 **iterator***
該方法是以`Symbol.iterator`作為物件的property
我們可以進行實作(接續*(i-1)*,*(i-2)*)

*(i-3)*
```javascript
iterator[Symbol.iterator] = ()=> iterator;
[...iterator] //[1,2,3]
```
這樣我們剛剛創建的iterator就也是iterable了

`Array`,`String`,`Map`,`Set`等都是Iterable，但非iterator
可以呼叫 **@@iteraor** 來得到相對應的itrator
```javascript
const ary = [6,7,8];
[...ary]//[6,7,8] => iterable

const aryIterator = ary[Symbol.iterator](); //返回iterator (同時也是iterable的!!!)

aryIterator.next() //{value:6, done:false}
```
### Generator Function
也可以用特殊的[Generator function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)
generator function會返回 [Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)
他同時是iterator也是iterable
以下為簡單範例

*(i-4)*
```javascript
function* gen(ary){
    for(let i=0; i<array.length;i++){
        yield array[i]
    }
}

const iterator = gen([1,2,3]);

//是iterator
iterator.next() //{value:1, done:false} 

//同時也是iterable
iterator[Symbol.iterator]() === iterator; //true
```

## Proxy

代理器，保護實際的物件、物件的前處理
一個實際物件，只能透過代理器物件來連絡他

```javascript
const obj = {}

const proxy = new Proxy(obj ,{
    set(target,key, proxy) {
        if(proxy>50) target[key] = 50
        else target[key]= proxy
    }
})
proxy.a = 55;
proxy.b =110
proxy.c =12
console.log(obj)
/*
 {
   a: 50,
   b: 50,
   c: 12
 }
*/
```

## Reflect

[說明][reflect]

使用函數，而非陳述式(statement), 並且更合理的操作。

## ES5 computed property name feature

```javascript
const fnName = 'myFunction'

const state = {
    [fnName](){
        console.log('hello')
    }
}
state.myFunction()
```

## Object Rest/Spread Properties (Es6)
:+1: [link](https://github.com/tc39/proposal-object-rest-spread)

```javascript
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a: 3, b: 4 }

const others = {
  b: 2,
  c: 3,
}
const computed = {
  a: 1,
  ...others
}
// {a:1, b:2, c:3}
```

新增property且產生一個新的物件

```javascript
const oldObj = {a:1};
const newObj = {...oldObj, b:2}
//use object.assign
const newObj2 = Object.assign({}, oldObj)
```

## Symbol

>Symbols give a whole new sense of purpose to Objects - they provide a kind of hidden under layer to Objects - not iterable over, not fetched using the already existing Reflection tools and guaranteed not to conflict with other properties in the object!

[reference](https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/)

```javascript
var myObj = {};
var fooSym = Symbol('foo');
var otherSym = Symbol('bar');
myObj['foo'] = 'bar';
myObj[fooSym] = 'baz';
myObj[otherSym] = 'bing';
assert(myObj.foo === 'bar');
assert(myObj[fooSym] === 'baz');
assert(myObj[otherSym] === 'bing');
```

## Decorators

為物件裝飾加上一些功能而不影響其他同類的物件
待續...


[reflect]:http://es6.ruanyifeng.com/#docs/reflect
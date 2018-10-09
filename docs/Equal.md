## Equal
* 不完善的值比较。目前支持除function以外的数据类型严格比较。不支持嵌套

### usage
* Equal有两个参数，分别是需要比较的两个变量或值，必选。
* Equal采用严格相等来比较。除function以外的数据类型均可以比较，包括`NaN, null, undefined, true, false`，但不支持Object和Array的嵌套

### demo code
1. 原生js调用
``` js
    import { Equal } from 'util-list'

    const result1 = Equal(3, '3') // false,因为是严格相等，所以不会存在隐式类型转换
    const result2 = Equal(NaN, NaN) // true,NaN是等于NaN。但是不等于任意以外的值
    const result3 = Equal(0, false) // false,因为是严格相等，所以不会存在隐式类型转换
    const result4 = Equal(null, undefined) // false,因为是严格相等，所以不会存在隐式类型转换
    const result5 = Equal({a: 1, b: 2}, {a: 1, b: 2, c: 3}) // false,对象和数组比较，必须key和value完全一致，即长度也一致才会相等
    const result6 = Equal([1, 2, 3], [1, 2, 3]) // true,长度相等，并且每个value均相等
```
2. 作为vue插件使用
```js
    // main.js
    import { Equal, InjectVue } from 'util-list'
    Vue.use(InjectVue(Equal))

    // example.vue
    export default {
        data() {
            return {
                left: [
                    1,
                    null,
                    '3'
                ],
                right: [
                    1,
                    null,
                    '3'
                ]
            }
        },
        created() {
            const result = this.$_Equal(this.left, this.right) // true
        }
    }
```
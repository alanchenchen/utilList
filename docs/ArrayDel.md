## ArrayDel
* 扩展了Array自带的splice，删除指定数组项的元素

### usage
* ArrayDel有两个参数，第一个是源数组，必选。数组可以包含任意非function类型的数据，也可以嵌套数组。因为fucntion类型不容易判断是否严格相等
* 第二个参数是需要删除的数组，数组项可以是源数组内没有的值，会直接跳过。可选，默认为空数组
* 两个参数均支持删除`NaN, null, undefined, true, false`等。所有支持的数据类型均是严格相等判断，即不会存在隐式类型转换
### demo code
1. 原生js调用
``` js
    import { ArrayDel } from 'util-list'

    let Arr = [
        1,
        true,
        false,
        NaN,
        null,
        undefined,
        {a: '1'},
        {b: 2},
        [2, 3]
    ]

    const args = [
        true,
        NaN,
        undefined,
        [2, 3],
        {a: '1'},
        {b: '2'}, // 不会隐式转换‘2’到2。所有不会删除{b: 2}
        3   // 源数组内不存在的项将直接跳过
    ]

    let delArr = ArrayDel(Arr, args) // delArr 的值为 [1, false, null, {b: 2}]
```
2. 作为vue插件使用
```js
    // main.js
    import { ArrayDel, InjectVue } from 'util-list'
    Vue.use(InjectVue(ArrayDel))

    // example.vue
    export default {
        data() {
            return {
                arr: [
                    1,
                    true,
                    false,
                    NaN,
                    null,
                    undefined,
                    {a: '1'},
                    {b: 2},
                    [2, 3]
                ]
            }
        },
        created() {
            const args = [
                true,
                NaN,
                undefined,
                [2, 3],
                {a: '1'},
                {b: '2'}, // 不会隐式转换‘2’到2。所有不会删除{b: 2}
                3   // 源数组内不存在的项将直接跳过
            ]

            let delArr = this.$_ArrayDel(this.arr, args) // delArr 的值为 [1, false, null, {b: 2}], arr的值是响应式的，delArr也是响应式的
        }
    }
```
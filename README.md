# utilList

![](https://img.shields.io/npm/v/util-list.svg)
![](https://img.shields.io/npm/dt/util-list.svg)
![](https://img.shields.io/github/license/alanchenchen/utilList.svg)

Several util modules to optimise your project
> Author：Alan Chen

> E-mail: 739709491@qq.com

> version: 0.0.4

> date: 2018/12/25


## Feature
* 包含DateFormat、EventBus、ArrayDel、Equal和InjectVue五个方法。
* DateFormat是个极简的用于日期对象格式化字符串工具，如果需要Date原型链扩展请使用[moment.js](https://github.com/moment/moment)。
* EventBus是只适用于vue插件的工具，简化了官网推荐的event bus，用于跨组件传递事件。
* ArrayDel扩展了Array原生的splice，更加符合大部分删除数组元素的使用场景。
* Equal是个极简的用于判断变量是否严格相等工具，如果需要全数据类型比较，请使用[lodash](https://github.com/lodash/lodash)。
* 提供一个InjectVue工具，可以快速包装原生js方法，转换成vue插件的对象。

## Component doc
* [DateFormat](docs/DateFormat.md)
* [EventBus](docs/EventBus.md)
* [ArrayDel](docs/ArrayDel.md)
* [Equal](docs/Equal.md)

## Usage
* `yarn add util-list` or `npm install util-list --save` 安装npm包
* import引入
    ```js
        import utilList from 'util-list' // 全部引入
        import { DateFormat, EventBus, ArrayDel, Equal, InjectVue } from 'util-list' // 单个引入

        DateFormat() // 原生js方法使用

        import Vue from 'vue' // 作为vue插件使用
        const DateUtil = InjectVue(DateFormat)
        Vue.use(DateUtil)
    ```
* `InjectVue`方法提供第2个参数可选，默认为空，当提供第二个参数时，挂在`vue.prototype`上的方法名会被重置。例如: 
    ```js
        // main.js
        import Vue from 'vue'

        import { DateFormat, InjectVue } from 'util-list' 
        const DateUtil = InjectVue(DateFormat, 'format')
        Vue.use(DateUtil)

        // example.vue
        export default {
            created() {
                this.$_format('yy-MM-dd') // 方法名被重置为$_format
            }
        }
    ```
## Attentions
1. 模块导出的均为原生js方法(除EventBus以外)，如果想在vue中`Vue.use()`使用，必须先用`InjectVue()`。
2. EventBus是vue插件，只能在vue中`Vue.use()`使用。


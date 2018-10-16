## EventBus
* vue跨父子组件事件传递插件(根实例上的事件订阅发布)
* 用于处理vue中跨组件传递事件(非父子组件)
* 跨组件传值建议使用vuex，虽然插件本身也可以实现

### usage
* 插件使用后会在vue实例上添加4个方法`$_BusDispatch`,`$_BusOn`,`$_BusOnce`,`$_BusOff`，使用的api与vue类似
* 插件在使用`Vue.use()`时，提供一个options参数可选。参数prefix用来给所有事件名加前缀，默认为'project'
* `$_BusOn(eventNamem, cb, componentName)`订阅一个事件，每调用一次就订阅一次，会累计，有3个参数，
    * eventName是事件名，必选。
    * cb是回调函数，必选。参数是`$_BusDispatch`中下发的值
    * componentName是组件名，可选。默认为使用此方法的this指向组件的name选项。所以需要在组件中写名name，也可以自己指定是哪个组件名

* `$_BusOnce(eventNamem, cb, componentName)`订阅一个事件，重复调用不会累计，事件不会重叠，有3个参数，
    * eventName是事件名，必选。
    * cb是回调函数，必选。参数是`$_BusDispatch`中下发的值
    * componentName是组件名，可选。默认为使用此方法的this指向组件的name选项。所以需要在组件中写名name，也可以自己指定是哪个组件名

* `$_BusOff(eventNamem, componentName)`解除订阅一个事件，有2个参数，
    * eventName是事件名，必选。
    * componentName是组件名，必选。

* `$_BusDispatch(componentName, eventName, payload)`订阅一个事件，至少有3个参数，
    * componentName是组件名，必选。
    * eventName是事件名，必选。
    * payload可以是任意类型的值，可选。会传入给`$_BusOn`或`$_BusOnce`中的cb函数来触发。支持传入多个参数

* 建议使用`$_BusOnce`来订阅事件，不会出现事件累加
### demo code
```js
    // main.js
    import { EventBus } from 'util-list'
    Vue.use(EventBus)
    
    // 所有的事件名前缀均改为Alan，目前用处不大，但是可以避免根实例上的事件名冲突。在vue-devtool可以看到完整的事件流
    // Vue.use(EventBus, {
    //     prefix: 'Alan'
    // })

    // a.vue
    export default {
        name: 'a',
        data() {
            return {
            }
        },
        created() {
            this.$_BusOnce('hello', (...msg) => { // 订阅hello事件, 接收多个返回参数，可以通过剩余操作符转换成数组
                console.log(msg)
            })
        }
    }
    // b.vue
    export default {
        name: 'b',
        data() {
            return {
            }
        },
        created() {
            this.$_BusDispatch('a', 'hello', 'hello', 'world') // 触发a组件中的hello事件，传入多个参数。打印hello world
        }
    }
```

## DateFormat
* 通过提供完善的占位符，来组合高度定制的日期对象字符串

### usage
* DateFormat有两个参数，第一个是组合字符串，可选。默认为空字符串。
* 第二个参数是日期对象Date。可选，默认为当前日期`new Date()`。可以传入指定的Date对象
* 如果不传入第一个参数，则默认返回`toLocaleString()`的值
### 占位符
* yyyy => 2018 (年四位数)
* yy => 18 (年两位数)
* MM => 08 (月两位数)
* M => 8 (月一位数)
* dd => 08 (天两位数)
* d => 8 (天一位数)
* HH => 13 (24小时制)
* hh => 01 (12小时制)
* mm => 22 (分)
* ss => 30 (秒)
* A => AM 上午 (AM/PM)
* a => am 上午 (am/pm)

### demo code
1. 原生js调用
``` js
    import { DateFormat } from 'util-list'

    const dateStr = DateFormat('yyyy年MM月d日 A hh时mm分ss秒') // dateStr 的值为 ‘2018年10月9日 PM 02时34分09秒’
    const customDate = DateFormat('yyyy-MM-dd', new Date('2030/3/16')) // customDate 的值为 ‘2030-30-16’
```
2. 作为vue插件使用
```js
    // main.js
    import { DateFormat, InjectVue } from 'util-list'
    Vue.use(InjectVue(DateFormat))

    // example.vue
    export default {
        data() {
            return {
                dateStr: ''
            }
        },
        created() {
            this.dateStr = this.$_DateFormat('yyyy年MM月d日 A hh时mm分ss秒') // dateStr 的值为 ‘2018年10月9日 PM 02时34分09秒’
        }
    }
```
/**
 * @description 插件的入口模块。webpack的entry
 */
/**!
 * @author Alan Chen
 * @Date 2018/12/25
 * @version 0.0.4
 * @license MIT
 */
import EventBus from './EventBus/index'
import { Equal, ArrayDel } from './ArrayExtend/index'
import DateFormat from './DateFormat/index'

const defaultMap = {
    'Equal': Equal,
    'ArrayDel': ArrayDel,
    'DateFormat': DateFormat
}
/**
 * @function injectVue 用于将js函数转换成vue插件对象
 * @param {Function} handler 源函数
 * @param {String} prefix unrequired 默认为空。如果传入该参数，则会覆盖defaultMap中对应的key
 * @returns {Object} 符合vue插件格式的对象，所有方法均挂载vue.prototype上
 */
const InjectVue = (handler, prefix = '') => {
    let name
    for(let key in defaultMap) {
        if(defaultMap[key] === handler) {
            name = prefix || key
        }
    }

    return {
        install(Vue, options) {
            Vue.prototype[`$_${name}`] = handler
        }
    }
}

export {
    EventBus,
    Equal,
    ArrayDel,
    DateFormat,
    InjectVue
}

export default {
    EventBus,
    Equal,
    ArrayDel,
    DateFormat,
    InjectVue
}

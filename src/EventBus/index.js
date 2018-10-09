/**
 * @module EventBus 
 * @author Alan Chen
 * @version 0.0.1
 * @description vue跨父子组件事件传递插件(根实例上的事件订阅发布),用于处理vue中跨组件传递事件(非父子组件)。跨组件传值建议使用vuex，虽然插件本身也可以实现
 * @argument {String} prefix unrequired 插件的options选项中的key。用于挂载根实例上事件订阅的前缀，默认为'project'
 * 
 * @method $_BusDispatch 
 *  @param {String} componentName 发布的组件名
 *  @param {String} eventName 发布的事件名
 *  @param {any} payload 传递的值
 * 
 * @method $_BusOn
 *  @param {String} eventName 订阅的事件名
 *  @param {Function} cb 订阅的回调函数,默认参数为$_BusDispatch中的payload
 *  @param {String} componentName unrequired 订阅的组件名,默认会自动设置成this所指向组件的name选项
 * 
 * @method $_BusOnce
 *  @param {String} eventName 订阅的事件名
 *  @param {Function} cb 订阅的回调函数,默认参数为$_BusDispatch中的payload
 *  @param {String} componentName unrequired 订阅的组件名,默认会自动设置成this所指向组件的name选项
 * 
 * @method $_BusOff
 *  @param {String} eventName 解除订阅的事件名
 *  @param {String} componentName 解除订阅的组件名
 * 
 * @summary
 *  1. $_BusOn方法只要调用一次就会累积一次，事件会重复订阅。$_BusOnce无论调用多少次都只会订阅一次，建议使用$_BusOnce
 *  2. vue中事件传递的使用顺序为，先订阅，后发布。也就是说，你需要在业务逻辑触发的组件发布，调用$_BusDispatch，而在需要传值的组件订阅
 *  3. 只能在同一个vue根实例下的子组件中使用，多个vue根实例之间传递事件建议手动写gloabal-bus来实现(vue文档有介绍)
 */

export default {
    install(Vue, options) {
        const prefix = options.prefix || 'project'

        Vue.prototype.$_BusDispatch = function (componentName, eventName, ...payload) {
            const rootIns = this.$root
            const targetComponentName = componentName
            const ev = `${prefix}~${targetComponentName}~${eventName}`
            rootIns.$emit(ev, ...payload)
        }

        Vue.prototype.$_BusOn = function (eventName, cb, componentName = '') {
            const rootIns = this.$root
            const currentComponentName = componentName || this.$vnode.tag.split('-')[3]
            const ev = `${prefix}~${currentComponentName}~${eventName}`
            rootIns.$on(ev, cb)
        }

        Vue.prototype.$_BusOnce = function (eventName, cb, componentName = '') {
            const rootIns = this.$root
            const currentComponentName = componentName || this.$vnode.tag.split('-')[3]
            const ev = `${prefix}~${currentComponentName}~${eventName}`
            rootIns.$once(ev, cb)
        }

        Vue.prototype.$_BusOff = function (eventName, componentName) {
            const rootIns = this.$root
            const targetComponentName = componentName
            const ev = `${prefix}~${targetComponentName}~${eventName}`
            rootIns.$off(ev)
        }
    }
}
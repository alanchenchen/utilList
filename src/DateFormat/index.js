/**
 * @module DateFormat 
 * @author Alan Chen
 * @version 0.0.1
 * @description 将Date日期转换为指定格式的字符串的模块，通过多种占位符可以组合出各种各样的日期字符串
 * 
 * @param {String} format 可选，占位符组合的字符串，不传默认返回toLocaleString()
 * @param {Date} Date 可选，Date日期对象，不传默认为 new Date()
 * @returns {String}  替换占位符指定格式的字符串
 * @argument 占位符如下: 
 *  例当前时间为: 2018年8月8日 13:22:30
 *      yyyy => 2018 (年)
 *      yy => 18 (年两位数)
 *      MM => 08 (月)
 *      M => 8 (月一位数)
 *      dd => 08 (天)
 *      d => 8 (天一位数)
 *      HH => 13 (24小时制)
 *      hh => 01 (12小时制)
 *      mm => 22 (分)
 *      ss => 30 (秒)
 *      A => AM 上午 (AM/PM)
 *      a => am 上午 (am/pm)
 *      
 */

const DateFormat = (format='', date = new Date()) => {
    const startWith = item => item<10 ? '0' + item : item
    const year = date.getFullYear()
    const month = startWith(date.getMonth()+1)
    const day = startWith(date.getDate())
    const hour = startWith(date.getHours())
    const fixedHour = startWith(hour*1 > 12? hour - 12: hour*1)
    const minute = startWith(date.getMinutes())
    const second = startWith(date.getSeconds())
    
    const yearEnd = year.toString().substring(2, 4)
    const monthEnd = date.getMonth()+1
    const dayEnd = date.getDate()
    const A = hour*1 >= 0 && hour* 1 < 12? 'AM': 'PM'
    const a = A.toLocaleLowerCase()

    const map = {
        yyyy: year,
        yy: yearEnd,
        MM: month,
        M: monthEnd,
        dd: day,
        d: dayEnd,
        HH: hour,
        hh: fixedHour,
        mm: minute,
        ss: second,
        A,
        a
    }
    const isMapFit = Object.keys(map).some(item => format.includes(item))
    
    if(isMapFit) {
        return Object.entries(map).reduce((total, item) => {
            const rule = new RegExp(`(${item[0]})`)
            return total.replace(rule, item[1])
        }, format)
    }
    else {
        return date.toLocaleString()    
    }
}

export default DateFormat
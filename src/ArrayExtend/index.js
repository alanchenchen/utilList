/**
 * @module ArrayExtend
 * @author Alan Chen
 * @version 0.0.1
 * @description 二次封装Array的splice方法，以及判断变量是否严格相等的模块
 * 
 * @method Equal
 *  @param {any} left 除funtion以外的任意数据类型 
 *  @param {any} right 除funtion以外的任意数据类型
 *  @returns {Boolean} ture or false
 * 
 * @method ArrayDel
 *  @param {Array} source 源数组
 *  @param {Array} target 需要删除的元素组成的数组，可以是除function以外的任意数据类型。如果source没有其中某项，不会报错，会直接跳过
 *  @returns {Array} 删除之后的数组，会改变源数组。 
 */

export const Equal = (left, right) => {
    const isSimpleEqual = Object.is(left, right)

    const isArrayEqual = Array.isArray(left) &&
                         Array.isArray(right) &&
                         Object.entries(left).every(item => Object.is(right[item[0]], item[1]))

    const isObjectEqual = Object.prototype.toString.call(left) == '[object Object]' &&
                          Object.prototype.toString.call(right) == '[object Object]' &&
                          Object.entries(left).every(item => Object.is(right[item[0]], item[1]))

    // const isNaNEqual = Number.isNaN(left) &&
    //                    Number.isNaN(right)

    // const isNullEqual = Object.prototype.toString.call(left) == '[object Null]' &&
    //                     Object.prototype.toString.call(right) == '[object Null]' 
                        
    // const isUndefinedEqual = typeof left == 'undefined' &&
    //                          typeof right == 'undefined'

    // const isBoolEqual = typeof left == 'boolean' &&
    //                     typeof right == 'boolean' &&
    //                     left === right
    // return isSimpleEqual || isNaNEqual || isNullEqual || isUndefinedEqual || isBoolEqual || isArrayEqual || isObjectEqual

    return isSimpleEqual || isArrayEqual || isObjectEqual
}

export const ArrayDel = function (source, target = []) {
    target.forEach(a => {
        const index = source.findIndex(b => {
            return equal(b, a)
        })
        
        if (index >= 0) {
            source.splice(index, 1)
        }
    })
    return source
}
/**
 * 转换器工具类
 */
export default {
    /**
     * @param {string} url
     * @returns {Object}
     */
    param2Obj (url) {
        const search = url.split('?')[1]
        if (!search) {
            return {}
        }
        return JSON.parse(
        '{"' +
            decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
            .replace(/\+/g, ' ') +
            '"}'
        )
    },
    /**
     * @param {string} val
     * @returns {string}
     */
    html2Text (val) {
        const div = document.createElement('div')
        div.innerHTML = val
        return div.textContent || div.innerText
    }
}

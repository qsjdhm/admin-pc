/**
 * 文件工具类
 */
export default {
    // 下载文件
    downloadFile (content, filename) {
        let objectUrl = URL.createObjectURL(new Blob([content]))
        const link = document.createElement('a')
        link.download = decodeURI(filename)
        link.href = objectUrl
        link.click()
        window.URL.revokeObjectURL(objectUrl)
    }
}

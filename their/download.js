/**
 * @description 下载插件，传入Promise后，符合数据格式自动打开页面下载，数据格式{data:{url}}
 */
import http from '@/config/http'
import regexp from '@/utils/_regexp'
import {Loading, Notification} from 'cut-ui'

export default {
  install: (Vue, options) => {
    Vue.prototype.$dw = async (promise) => {
      let loading = Loading.service({fullscreen: true, text: '拼命下载中...'})
      let form = ''
      form = document.getElementById('download-private-id')
      if (!form) {
        form = document.createElement('form')
        form.setAttribute('id', 'download-private-id')
        document.body.appendChild(form)
      }
      let {error_code: errorCode, message, data: {url}} = await promise
      setTimeout(() => { loading.close() }, 1000)
      if (errorCode === undefined || errorCode === 200) {
        if (url && !(new RegExp(regexp.url)).test(url)) {
          url = url.substr(0, 1) === '/' ? url.substr(1, url.length - 1) : url
          url = http.baseURL + url
        }
        form.setAttribute('action', url)
        form.setAttribute('method', 'post')
        form.submit()
        return true
      }
      Notification.error({title: '错误', message: message, duration: 5000})
    }
  }
}

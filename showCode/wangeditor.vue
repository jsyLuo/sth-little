/*
 * @Author: Went
 * @Date: 2021-11-22 14:09:49
 * @Description: 充值文案配置弹窗
 * @Last Modified by: Went
 * @Last Modified time: 2021-11-24 20:08:59
 */
<template>
  <a-modal
    destroyOnClose
    centered
    :visible="visible"
    :title="`充值页文案配置`"
    :width="720"
    @ok="handleSubmit"
    @cancel="handleClose"
  >
    <a-spin :spinning="confirmLoading">
      <h2>安卓文案</h2>
      <div id="div1"></div>
      <h2>ios文案</h2>
      <div id="div2"></div>
    </a-spin>
  </a-modal>
</template>
<script>
const htmlMenuKey = 'htmlMenuKey'
const colorMenuKey = 'colorMenuKey'
const E = window.wangEditor
const { BtnMenu } = E

function replaceSpecialSymbol (value) {
  return value
    .replace(/&lt;/gm, '<')
    .replace(/&gt;/gm, '>')
    .replace(/&quot;/gm, '"')
}
class htmlMenu extends BtnMenu {
  constructor (editor) {
    // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
    const $elem = E.$(
      `<div class="w-e-menu" data-title="html">
                <i style="font-style: normal;">html</i>
            </div>`
    )
    editor.htmlStatus = false
    super($elem, editor)
  }
  // 菜单点击事件
  clickHandler () {
    const editor = this.editor
    editor.htmlStatus = !editor.htmlStatus
    if (editor.htmlStatus) {
      const html = editor.txt.html()
      editor.txt.clear()
      editor.cmd.do('insertText', html)
      this.active()
    } else {
      const text = editor.txt.text()
      editor.txt.clear()
      editor.txt.html(replaceSpecialSymbol(text))
      this.unActive()
    }
  }

  tryChangeActive () {

  }
}

class colorMenu extends BtnMenu {
  constructor (editor) {
    const $elem = E.$(
      `<div class="w-e-menu" data-title="color">
                <input type="color" value="#ffffff" >
            </div>`
    )
    super($elem, editor)
  }
  clickHandler (event) {
    const editor = this.editor
    event.target.onchange = function (events) {
      if (events.type === 'change') {
        const color = events.target.value
        editor.cmd.do('foreColor', color)
      }
    }
  }
  tryChangeActive () {

  }
}

E.registerMenu(htmlMenuKey, htmlMenu)
E.registerMenu(colorMenuKey, colorMenu)
/* eslint-disable camelcase */
export default {
  name: 'AddActivityDitor',
  props: {
    visible: {
      required: true,
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    sourceData: {
      type: [Object, Array],
      default: () => {
        return {}
      }
    }
  },

  data () {
    return {
      changeStatus: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      isShowTimes: false,
      currentRecord: {},
      imageList: [],
      userGroupOptions: [] // 指定用户群选项
    }
  },
  watch: {
    async  visible (newVal) {
      newVal && this.getUserGroupInfo()
      if (newVal && this.isEdit) {

      }

      if (newVal) {
        const o = await this.getDivDom()

        this.editor1 = new E(o.div1)
        window.editor1 = this.editor1
        this.editor2 = new E(o.div2)
        this.editor1.create()
        this.editor2.create()
        this.getDetail()
      }
    }

  },
  mounted () {

  },

  methods: {
    getDivDom () {
      return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
          const div1 = document.getElementById('div1')
          const div2 = document.getElementById('div2')
          if (div1 && div2) {
            clearInterval(timer)
            resolve({ div1, div2 })
          }
        }, 300)
      })
    },
    async getDetail () {
      const { data } = await this.$api.activity.rechargeDescriptionInfo({ id: 1 })
      console.log(data)
      this.$nextTick(() => {
        this.editor1.txt.html(data.android_content)
        this.editor2.txt.html(data.ios_content)
      })
      if (data.activity_image) {
        this.imageList = [{
          uid: data.activity_image,
          name: data.activity_image,
          status: 'done',
          response: { key: data.activity_image },
          url: `${this.constv.QINIU_IMAGE_CDN_URL}${data.activity_image}`
        }]
      }
    },
    // 获取指定用户群体信息
    getUserGroupInfo () {
      // @todo
      this.$api.activity.getUserGroups()
        .then(res => {
          const { data: { list } } = res
          this.userGroupOptions = (list || []).map(item => {
            return ({
              label: item.title,
              value: item.id
            })
          })
        })
      this.userGroupOptions = []
    },
    handleReset () {
      this.currentRecord = {}
      this.imageList = []
      this.form.resetFields()
    },
    handleClose () {
      this.handleReset()
      this.$emit('close')
    },
    handleSubmit () {
      const android_content = this.editor1.htmlStatus ? replaceSpecialSymbol(this.editor1.txt.text()) : this.editor1.txt.html()
      const ios_content = this.editor2.htmlStatus ? replaceSpecialSymbol(this.editor2.txt.text()) : this.editor2.txt.html()
      const params = { android_content, ios_content, id: 1 }
      this.$api.activity.rechargeDescriptionEdit(params)
        .then((res) => {
          console.log(res)
          const { message } = res.message
          this.$message.success(message)
          this.handleClose()
        })
        .finally(() => {
          this.confirmLoading = false
        })
      // this.confirmLoading = true
    },
    htmlToText () {
      this.changeStatus = !this.changeStatus
      if (this.changeStatus) {
        this.editor1.txt.html(this.editor1.txt.text())
      } else {
        // this.editor1.txt.html(this.editor1.txt.text())
      }
      console.log(this.editor1.txt.text())
    }
  }
}
</script>
<style>
</style>

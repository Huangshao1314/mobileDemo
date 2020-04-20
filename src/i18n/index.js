import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import commonZH from './zh-CN/common'
import commonEN from './en-US/common'
import dictionaryZH from './zh-CN/dictionary'
import dictionaryEN from './en-US/dictionary'
import enumZH from './zh-CN/enum'
import enumEN from './en-US/enum'
import viewZH from './zh-CN/view'
import viewEN from './en-US/view'

import elementUIen from 'element-ui/lib/locale/lang/en'
import elementUIzh from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

const messages = {
  'zh-CH': Object.assign(
    elementUIzh,
    commonZH,
    dictionaryZH,
    enumZH,
    viewZH
  ),
  'en-US': Object.assign(
    elementUIen,
    commonEN,
    dictionaryEN,
    enumEN,
    viewEN
  )
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'zh-CH',
  fallbackLocaleL: 'zh-CH',
  messages
})

export default i18n

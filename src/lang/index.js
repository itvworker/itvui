import Vue from "vue";
import VueI18n from "vue-i18n"; // 国际化语言
import lang_en from './lang_en.js'
import lang_cn from './lang_cn.js'
Vue.use(VueI18n); // 国际化语言、
const messages = {
    en: lang_en,
    cn: lang_cn,
};

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'se',
  messages
});

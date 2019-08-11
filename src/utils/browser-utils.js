let BrowserUtils = {}

// Browser environment sniffing
BrowserUtils.inBrowser = typeof window !== 'undefined'
// eslint-disable-next-line
BrowserUtils.inWeex = typeof WXEnvironment !== "undefined" && WXEnvironment.platform
// eslint-disable-next-line
BrowserUtils.weexPlatform = BrowserUtils.inWeex && WXEnvironment.platform.toLowerCase()
BrowserUtils.UA = BrowserUtils.inBrowser && window.navigator.userAgent.toLowerCase()
BrowserUtils.isIE = BrowserUtils.UA && /msie|trident/.test(BrowserUtils.UA)
BrowserUtils.isIE9 = BrowserUtils.UA && BrowserUtils.UA.indexOf('msie 9.0') > 0
BrowserUtils.isEdge = BrowserUtils.UA && BrowserUtils.UA.indexOf('edge/') > 0
BrowserUtils.isAndroid = (BrowserUtils.UA && BrowserUtils.UA.indexOf('android') > 0) || BrowserUtils.weexPlatform === 'android'
BrowserUtils.isIOS = (BrowserUtils.UA && /iphone|ipad|ipod|ios/.test(BrowserUtils.UA) > 0) || BrowserUtils.weexPlatform === 'ios'
BrowserUtils.isChrome = BrowserUtils.UA && /chrome\/\d+/.test(BrowserUtils.UA) && !BrowserUtils.isEdge;
BrowserUtils.isFireFox = BrowserUtils.UA && BrowserUtils.UA.match(/firefox\/(\d+)/);
BrowserUtils.isPhantomJS = BrowserUtils.UA && /phantomjs/.test(BrowserUtils.UA)
BrowserUtils.isSafari = BrowserUtils.UA && BrowserUtils.UA.match(/safari\/([\d.]+)/) && !BrowserUtils.isChrome

/**
 * @returns {String} 浏览器版本号
 */
BrowserUtils.getBrowserVersion = () => {
  if (!BrowserUtils.inBrowser) {
    return null
  }
  if (BrowserUtils.isIE) {
    let ie = BrowserUtils.UA.match(/msie\s([\d]+)\./i) || BrowserUtils.UA.match(/trident.*rv\s*([\d]+)\./i)
    return ie[1]
  }
  if (BrowserUtils.isChrome) {
    let chrome = BrowserUtils.UA.match(/chrome\/([\d]+)/)
    return chrome[1]
  }
  if (BrowserUtils.isFireFox) {
    let firefox = BrowserUtils.UA.match(/firefox\/([\d]+)/)
    return firefox[1]
  }
  if (BrowserUtils.isSafari) {
    let safari = /version\/([\d.]+)/i.exec(BrowserUtils.UA)
    return safari[1]
  }
  if (BrowserUtils.isEdge) {
    let edge = /edge\/([\d.]+)/i.exec(BrowserUtils.UA)
    return edge[1]
  }
}

/**
 * @returns{String} 获取浏览器名称
 */
BrowserUtils.getBrowserName = () => {
  if (!BrowserUtils.inBrowser) {
    return null
  }
  if (BrowserUtils.isIE) {
    return 'Internet Explorer'
  }
  if (BrowserUtils.isChrome) {
    return 'Chrome'
  }
  if (BrowserUtils.isFireFox) {
    return 'Firefox'
  }
  if (BrowserUtils.isSafari) {
    return 'Safari'
  }
  if (BrowserUtils.isEdge) {
    return 'Edge'
  }
}

/**
 * @returns {Number} 浏览器滚动条宽度
 */
BrowserUtils.getScrollbarWidth = () => {
  let div = document.createElement('div');
  let scrollbarWidth;
  div.style = "width:100px;height:100px;overflow:scroll;";
  document.body.appendChild(div);
  scrollbarWidth = div.offsetWidth - div.clientWidth;
  let parentElement = div.parentNode;
  if (parentElement) {
    parentElement.removeChild(div);
  }
  return scrollbarWidth;
}
export default BrowserUtils

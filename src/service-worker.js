/* eslint-disable */
importScripts(`/mobileDemo/js/workbox/workbox-sw.js`)
workbox.setConfig({
  modulePathPrefix: `/mobileDemo/js/workbox/`
})

workbox.core.setCacheNameDetails({
  prefix: '',
  suffix: 'v1.0.0'
})

workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

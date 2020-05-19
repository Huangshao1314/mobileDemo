/**
 * 发送请求
 *
 */
export function postRequest(method, header, params, options, id) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    IGTBNative.postRequest(method, header, params, options,
      success => {
        resolve(success)
      },
      error => {
        reject(error)
      },
      id
    )
  })
}

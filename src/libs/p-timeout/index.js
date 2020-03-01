'use strict'

const pFinally = require('../p-finally')

class TimeoutError extends Error {
  constructor(message) {
    super(message)
    this.name = 'TimeoutError'
  }
}

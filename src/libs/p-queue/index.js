"use strict";
var __extends = (this && this.__extends) || (function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
    ({__proto__: []} instanceof Array && function(d, b) {
      d.__proto__ = b;
    }) ||
    function(d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) {
          d[p] = b[p]
        }
      }
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var __assign = (this && this.__assign) || function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length;i < n;i++) {
      s = arguments[i];
      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) {
          t[p] = s[p]
        }
      }
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function(resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = (this && this.__generator) || function(thisArg, body) {
  var _ = {
    label: 0,
    sent: function() {
      if (t[0] & 1) {
        throw t[1];
      } return t[1];
    },
    trys: [],
    ops: []}; var f; var y; var t; var g;
  return g = {next: verb(0), "throw": verb(1), "return": verb(2)}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v])
    }
  }
  function step(op) {
    if (f) {
      throw new TypeError("Generator is already executing.");
    }
    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) {
          return t;
        }
        if (y = 0, t) {
          op = [op[0] & 2, t.value];
        }
        switch (op[0]) {
        case 0: case 1: t = op;break;
        case 4: _.label++;return {value: op[1], done: false};
        case 5:_.label++; y = op[1];op = [0];continue;
        case 7: op = _.ops.pop();_.trys.pop();continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;continue;
          }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
            _.label = op[1];break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];t = op;break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];_.ops.push(op);break;
          }
          if (t[2]) {
            _.ops.pop();
          }
          _.trys.pop();continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];y = 0;
      } finally {
        f = t = 0;
      }
    }
    if (op[0] & 5) {
      throw op[1];
    } return {value: op[0] ? op[1] : void 0, done: true};
  }
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = require("eventemitter3");
var p_timeout_1 = require("../p-timeout");
var priority_queue_1 = require("./priority-queue");
var empty = function() {};
var timeoutError = new p_timeout_1.default.TimeoutError();
/**
 * Promise queue with concurrency control.
 */
var PQueue = /** @class */ (function(_super) {
  __extends(PQueue, _super);
  function PQueue(options) {
    var _this = _super.call(this) || this;
    _this._intervalCount = 0;
    _this._intervalEnd = 0;
    _this._pendingCount = 0;
    _this._resolveEmpty = empty;
    _this._resolveIdle = empty;
    // eslint-disable-next-line
    options = __assign({carryoverConcurrencyCount: false, intervalCap: Infinity, interval: 0, concurrency: Infinity, autoStart: true, queueClass: priority_queue_1.default}, options);
    if (!(typeof options.intervalCap === 'number' && options.intervalCap >= 1)) {
      throw new TypeError("Expected `intervalCap` to be a number from 1 and up, got `" + options.intervalCap + "`(" + typeof options.intervalCap + ")");
    }
    if (options.interval === undefined || !(Number.isFinite(options.interval) && options.interval >= 0)) {
      throw new TypeError("Expected `interval` to be a finite number >= 0, got `" + options.interval + "`(" + typeof options.interval + ")");
    }
    _this._carryoverConcurrencyCount = options.carryoverConcurrencyCount;
    _this._isIntervalIgnored = options.intervalCap === Infinity || options.interval === 0;
    _this._intervalCap = options.intervalCap;
    _this._interval = options.interval;
    _this._queue = new options.queueClass();
    _this._queueClass = options.queueClass;
    _this.concurrency = options.concurrency;
    _this._timeout = options.timeout;
    _this._throwOnTimeout = options.throwOnTimeout === true;
    _this._isPaused = options.autoStart === false;
    return _this;
  }
  Object.defineProperty(PQueue.prototype, "_doesIntervalAllowAnother", {
    get: function() {
      return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(PQueue.prototype, "_doesConcurrentAllowAnother", {
    get: function() {
      return this._pendingCount < this._concurrency;
    },
    enumerable: true,
    configurable: true
  });
  PQueue.prototype._next = function() {
    this._pendingCount--;
    this._tryToStartAnother();
  };
  PQueue.prototype._resolvePromises = function() {
    this._resolveEmpty();
    this._resolveEmpty = empty;
    if (this._pendingCount === 0) {
      this._resolveIdle();
      this._resolveIdle = empty;
    }
  };
  PQueue.prototype._onResumeInterval = function() {
    this._onInterval();
    this._initializeIntervalIfNeeded();
    this._timeoutId = undefined;
  };
  PQueue.prototype._isIntervalPaused = function() {
    var _this = this;
    var now = Date.now();
    if (this._intervalId === undefined) {
      var delay = this._intervalEnd - now;
      if (delay < 0) {
        // Act as the interval was done
        // We don't need to resume it here because it will be resumed on line 160
        this._intervalCount = (this._carryoverConcurrencyCount) ? this._pendingCount : 0;
      } else {
        // Act as the interval is pending
        if (this._timeoutId === undefined) {
          this._timeoutId = setTimeout(function() {
            _this._onResumeInterval();
          }, delay);
        }
        return true;
      }
    }
    return false;
  };
  PQueue.prototype._tryToStartAnother = function() {
    if (this._queue.size === 0) {
      // We can clear the interval ("pause")
      // Because we can redo it later ("resume")
      if (this._intervalId) {
        clearInterval(this._intervalId)
      }
      this._intervalId = undefined;
      this._resolvePromises();
      return false;
    }
    if (!this._isPaused) {
      var canInitializeInterval = !this._isIntervalPaused();
      if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
        this.emit('active');
        this._queue.dequeue()();
        if (canInitializeInterval) {
          this._initializeIntervalIfNeeded();
        }
        return true;
      }
    }
    return false;
  };
  PQueue.prototype._initializeIntervalIfNeeded = function() {
    var _this = this;
    if (this._isIntervalIgnored || this._intervalId !== undefined) {
      return;
    }
    this._intervalId = setInterval(function() {
      _this._onInterval();
    }, this._interval)
    this._intervalEnd = Date.now() + this._interval;
  };
  PQueue.prototype._onInterval = function() {
    if (this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId) {
      clearInterval(this._intervalId)
      this._intervalId = undefined
    }
    this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0
    this._proceeQueue()
  };
  /**
   * Executes all queued functions until it reaches the limit.
   */
  PQueue.prototype._proceeQueue = function() {
    // eslint-disable-next-line no-empty
    while (this._tryToStartAnother()) {}
  };
  Object.defineProperty(PQueue.prototype, "concurrency", {
    get: function() {
      return this._concurrency;
    },
    set: function(newConcurrency) {
      if (!(typeof newConcurrency === 'number' && newConcurrency >= 1)) {
        throw new TypeError("Expected `concurrency` to be a number from 1 and up, got`" + newConcurrency + "` (" + typeof newConcurrency + ")")
      }
      this._concurrency = newConcurrency
      this._proceeQueue();
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Adds a sync or async task to the queue. Always return a promise.
   */
  PQueue.prototype.add = function(fn, options) {
    if (options === void 0) {
      options = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var _this = this;
      return __generator(this, function(_a) {
        return [2 /* return */, new Promise(function(resolve, reject) {
          var run = function() {
            return __awaiter(_this, void 0, void 0, function() {
              var operation, _a, error_1;
              var _this = this
              return __generator(this, function(_b) {
                switch (_b.label) {
                case 0:
                  this._pendingCount++;
                  this._intervalCount++;
                  _b.label = 1;
                case 1:
                  _b.trys.push([1, 3, , 4]);
                  operation = (this._timeout === undefined && options.timeout === undefined) ? fn() : p_timeout_1.default(Promise.resolve(fn()), (options.timeout === undefined ? this._timeout : options.timeout), function() {
                    if (options.throwOnTimeout === undefined ? _this._throwOnTimeout : options.throwOnTimeout) {
                      reject(timeoutError)
                    }
                    return undefined
                  })
                  _a = resolve
                  return [4 /* yield */, operation]
                case 2:
                  _a.apply(void 0, [_b.sent()])
                  return [3 /* break */, 4]
                case 3:
                  error_1 = _b.sent()
                  reject(error_1)
                  return [3 /* break */, 4]
                case 4:
                  this._next()
                  return [2]
                }
              })
            })
          }
          _this._queue.enqueue(run, options)
          _this._tryToStartAnother();
        })]
      })
    })
  }
  /**
   * Same as `.add()`, but accepts an array of sync or async functions.
   * @returns A promise that resolves when all functions are resolved.
   */
  PQueue.prototype.addAll = function(functions, options) {
    return __awaiter(this, void 0, void 0, function() {
      var _this = this
      return __generator(this, function(_a) {
        return [2 /* return */, Promise.all(functions.map(function(function_) {
          return __awaiter(_this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              return [2 /* return */, this.add(function_, options)];
            })
          })
        }))]
      })
    })
  }
  /**
   * Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
   */
  PQueue.prototype.start = function() {
    if (!this._isPaused) {
      return this
    }
    this._isPaused = false
    this._proceeQueue()
    return this
  }
  /**
   * Put queue execution on hold.
   */
  PQueue.prototype.pause = function() {
    this._isPaused = true
  }
  /**
   * Clear the queue
   */
  PQueue.prototype.clear = function() {
    this._queue = new this._queueClass()
  }
  /**
   * Can be called multiple times. Useful if you for example add additional items at a later time.
   * @return A Promise that settles when the queue becomes empty.
   */
  PQueue.prototype.onEmpty = function() {
    return __awaiter(this, void 0, void 0, function() {
      var _this = this
      return __generator(this, function(_a) {
        // Instantly resolve if the queue is empty
        if (this._queue.size === 0) {
          return [2]
        }
        return [2 /* return */, new Promise(function(resolve) {
          var existingResolve = _this._resolveEmpty;
          _this._resolveEmpty = function() {
            existingResolve()
            resolve()
          }
        })]
      })
    })
  }
  /**
   * The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promise haven't completed yet.
   * @returns A promise that settles when the queue becomes empty, and all promise have completed; `queue.size === 0 && queue.pending === 0`.
   */
  PQueue.prototype.onIdle = function() {
    return __awaiter(this, void 0, void 0, function() {
      var _this = this
      return __generator(this, function(_a) {
        // Instantly resolve if none pending and if nothing else is queued
        if (this._pendingCount === 0 && this._queue.size === 0) {
          return [2]
        }
        return [2 /* return */, new Promise(function(resolve) {
          var existingResolve = _this._resolveIdle;
          _this._resolveIdle = function() {
            existingResolve()
            resolve()
          }
        })]
      })
    })
  }
  Object.defineProperty(PQueue.prototype, "size", {
    /**
     * Size of the queue
     */
    get: function() {
      return this._queue.size
    },
    enumerable: true,
    configurable: true
  })
  Object.defineProperty(PQueue.prototype, "isPaused", {
    /**
     * Whether the queue is currently paused.
     */
    get: function() {
      return this._isPaused
    },
    enumerable: true,
    configurable: true
  })
  Object.defineProperty(PQueue.prototype, "timeout", {
    get: function() {
      return this._timeout
    },
    /**
     * Set the timeout for future operations.
     */
    set: function(milliseconds) {
      this._timeout = milliseconds
    },
    enumerable: true,
    configurable: true
  })
  return PQueue
})(EventEmitter);
exports.default = PQueue
// # sourceMappingURL=index.js.map

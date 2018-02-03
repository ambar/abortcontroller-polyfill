'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (self) {
  'use strict';

  if (self.AbortController) {
    return;
  }

  var Emitter = function () {
    function Emitter() {
      _classCallCheck(this, Emitter);

      this.listeners = {};
    }

    _createClass(Emitter, [{
      key: 'addEventListener',
      value: function addEventListener(type, callback) {
        if (!(type in this.listeners)) {
          this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
      }
    }, {
      key: 'removeEventListener',
      value: function removeEventListener(type, callback) {
        if (!(type in this.listeners)) {
          return;
        }
        var stack = this.listeners[type];
        for (var i = 0, l = stack.length; i < l; i++) {
          if (stack[i] === callback) {
            stack.splice(i, 1);
            return;
          }
        }
      }
    }, {
      key: 'dispatchEvent',
      value: function dispatchEvent(event) {
        var _this = this;

        if (!(event.type in this.listeners)) {
          return;
        }
        var debounce = function debounce(callback) {
          setTimeout(function () {
            return callback.call(_this, event);
          });
        };
        var stack = this.listeners[event.type];
        for (var i = 0, l = stack.length; i < l; i++) {
          debounce(stack[i]);
        }
        return !event.defaultPrevented;
      }
    }]);

    return Emitter;
  }();

  var AbortSignal = function (_Emitter) {
    _inherits(AbortSignal, _Emitter);

    function AbortSignal() {
      _classCallCheck(this, AbortSignal);

      var _this2 = _possibleConstructorReturn(this, (AbortSignal.__proto__ || Object.getPrototypeOf(AbortSignal)).call(this));

      _this2.aborted = false;
      return _this2;
    }

    _createClass(AbortSignal, [{
      key: 'toString',
      value: function toString() {
        return '[object AbortSignal]';
      }
    }]);

    return AbortSignal;
  }(Emitter);

  var AbortController = function () {
    function AbortController() {
      _classCallCheck(this, AbortController);

      this.signal = new AbortSignal();
    }

    _createClass(AbortController, [{
      key: 'abort',
      value: function abort() {
        this.signal.aborted = true;
        try {
          this.signal.dispatchEvent(new Event('abort'));
        } catch (e) {
          // For Internet Explorer 11:
          var event = document.createEvent('Event');
          event.initEvent('abort', false, true);
          this.signal.dispatchEvent(event);
        }
      }
    }, {
      key: 'toString',
      value: function toString() {
        return '[object AbortController]';
      }
    }]);

    return AbortController;
  }();

  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    // These are necessary to make sure that we get correct output for:
    // Object.prototype.toString.call(new AbortController())
    AbortController.prototype[Symbol.toStringTag] = 'AbortController';
    AbortSignal.prototype[Symbol.toStringTag] = 'AbortSignal';
  }

  self.AbortController = AbortController;
  self.AbortSignal = AbortSignal;
})(typeof self !== 'undefined' ? self : undefined);
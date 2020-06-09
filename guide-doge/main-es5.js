function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/
  "./$$_lazy_route_resource lazy recursive":
  /*!******************************************************!*\
    !*** ./$$_lazy_route_resource lazy namespace object ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function $$_lazy_route_resourceLazyRecursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };

    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
    /***/
  },

  /***/
  "./src/app-routing.module.ts":
  /*!***********************************!*\
    !*** ./src/app-routing.module.ts ***!
    \***********************************/

  /*! exports provided: AppRoutingModule */

  /***/
  function srcAppRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
      return AppRoutingModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var routes = [];

    var AppRoutingModule = function AppRoutingModule() {
      _classCallCheck(this, AppRoutingModule);
    };

    AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: AppRoutingModule
    });
    AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function AppRoutingModule_Factory(t) {
        return new (t || AppRoutingModule)();
      },
      imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, {
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app.component.ts":
  /*!******************************!*\
    !*** ./src/app.component.ts ***!
    \******************************/

  /*! exports provided: AppComponent */

  /***/
  function srcAppComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _assets_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./assets/i18n */
    "./src/assets/i18n/index.ts");
    /* harmony import */


    var _components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./components/line-chart/line-chart.component */
    "./src/components/line-chart/line-chart.component.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var AppComponent = /*#__PURE__*/function () {
      function AppComponent() {
        _classCallCheck(this, AppComponent);
      }

      _createClass(AppComponent, [{
        key: "TITLE",
        get: function get() {
          return Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_1__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_1__["GUIDE_DOGE"].TITLE);
        }
      }]);

      return AppComponent;
    }();

    AppComponent.ɵfac = function AppComponent_Factory(t) {
      return new (t || AppComponent)();
    };

    AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      decls: 5,
      vars: 1,
      consts: [[1, "container"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-line-chart");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "router-outlet");
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.TITLE);
        }
      },
      directives: [_components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_2__["LineChartComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]],
      styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwLmNvbXBvbmVudC5zY3NzIn0= */"]
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-root',
          templateUrl: './app.component.html',
          styleUrls: ['./app.component.scss']
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app.module.ts":
  /*!***************************!*\
    !*** ./src/app.module.ts ***!
    \***************************/

  /*! exports provided: AppModule */

  /***/
  function srcAppModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./app-routing.module */
    "./src/app-routing.module.ts");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./app.component */
    "./src/app.component.ts");
    /* harmony import */


    var _components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./components/line-chart/line-chart.module */
    "./src/components/line-chart/line-chart.module.ts");

    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
    });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      factory: function AppModule_Factory(t) {
        return new (t || AppModule)();
      },
      imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_4__["LineChartModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, {
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_4__["LineChartModule"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_4__["LineChartModule"]],
          bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/assets/i18n/en.ts":
  /*!*******************************!*\
    !*** ./src/assets/i18n/en.ts ***!
    \*******************************/

  /*! exports provided: default */

  /***/
  function srcAssetsI18nEnTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    var _en;

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./types */
    "./src/assets/i18n/types.ts");

    var en = (_en = {}, _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["GUIDE_DOGE"].TITLE, 'Guide-Doge'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["GUIDE_DOGE"].VISUALIZATION, 'Data visualization'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["GUIDE_DOGE"].AUDIFICATION, 'Data audification'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["VISUALIZATION"].ACTIVE_DATUM, '%(y)s on %(x)s'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].INSTRUCTIONS, 'Hold down <kbd>SPACE</kbd> to play audification and <kbd>SHIFT</kbd> + <kbd>SPACE</kbd> to play it backward. <br/>Press <kbd>X</kbd> or <kbd>Y</kbd> to read the domain and range. <br/>Press <kbd>0</kbd> ... <kbd>9</kbd> to move playhead.'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].DOMAIN, 'Domain from %(min)s to %(max)s'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].RANGE, 'Range from %(min)s to %(max)s'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].ACTIVE_DATUM, '%(y)s on %(x)s'), _en);
    /* harmony default export */

    __webpack_exports__["default"] = en;
    /***/
  },

  /***/
  "./src/assets/i18n/index.ts":
  /*!**********************************!*\
    !*** ./src/assets/i18n/index.ts ***!
    \**********************************/

  /*! exports provided: GUIDE_DOGE, VISUALIZATION, AUDIFICATION, setLanguage, getLanguage, t, tA11y */

  /***/
  function srcAssetsI18nIndexTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./types */
    "./src/assets/i18n/types.ts");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "GUIDE_DOGE", function () {
      return _types__WEBPACK_IMPORTED_MODULE_0__["GUIDE_DOGE"];
    });
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "VISUALIZATION", function () {
      return _types__WEBPACK_IMPORTED_MODULE_0__["VISUALIZATION"];
    });
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "AUDIFICATION", function () {
      return _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"];
    });
    /* harmony import */


    var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./utils */
    "./src/assets/i18n/utils.ts");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "setLanguage", function () {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["setLanguage"];
    });
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "getLanguage", function () {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["getLanguage"];
    });
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "t", function () {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["t"];
    });
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "tA11y", function () {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["tA11y"];
    });
    /***/

  },

  /***/
  "./src/assets/i18n/types.ts":
  /*!**********************************!*\
    !*** ./src/assets/i18n/types.ts ***!
    \**********************************/

  /*! exports provided: GUIDE_DOGE, VISUALIZATION, AUDIFICATION */

  /***/
  function srcAssetsI18nTypesTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "GUIDE_DOGE", function () {
      return GUIDE_DOGE;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "VISUALIZATION", function () {
      return VISUALIZATION;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AUDIFICATION", function () {
      return AUDIFICATION;
    });

    var GUIDE_DOGE;

    (function (GUIDE_DOGE) {
      GUIDE_DOGE[GUIDE_DOGE["TITLE"] = 0] = "TITLE";
      GUIDE_DOGE[GUIDE_DOGE["VISUALIZATION"] = 1] = "VISUALIZATION";
      GUIDE_DOGE[GUIDE_DOGE["AUDIFICATION"] = 2] = "AUDIFICATION";
    })(GUIDE_DOGE || (GUIDE_DOGE = {}));

    var VISUALIZATION;

    (function (VISUALIZATION) {
      VISUALIZATION[VISUALIZATION["ACTIVE_DATUM"] = 256] = "ACTIVE_DATUM";
    })(VISUALIZATION || (VISUALIZATION = {}));

    var AUDIFICATION;

    (function (AUDIFICATION) {
      AUDIFICATION[AUDIFICATION["INSTRUCTIONS"] = 512] = "INSTRUCTIONS";
      AUDIFICATION[AUDIFICATION["DOMAIN"] = 513] = "DOMAIN";
      AUDIFICATION[AUDIFICATION["RANGE"] = 514] = "RANGE";
      AUDIFICATION[AUDIFICATION["ACTIVE_DATUM"] = 515] = "ACTIVE_DATUM";
    })(AUDIFICATION || (AUDIFICATION = {}));
    /***/

  },

  /***/
  "./src/assets/i18n/utils.ts":
  /*!**********************************!*\
    !*** ./src/assets/i18n/utils.ts ***!
    \**********************************/

  /*! exports provided: setLanguage, getLanguage, t, tA11y */

  /***/
  function srcAssetsI18nUtilsTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "setLanguage", function () {
      return setLanguage;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getLanguage", function () {
      return getLanguage;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "t", function () {
      return t;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "tA11y", function () {
      return tA11y;
    });
    /* harmony import */


    var sprintf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! sprintf-js */
    "./node_modules/sprintf-js/src/sprintf.js");
    /* harmony import */


    var sprintf_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sprintf_js__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */


    var _en__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./en */
    "./src/assets/i18n/en.ts");
    /* harmony import */


    var striptags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! striptags */
    "./node_modules/striptags/src/striptags.js");
    /* harmony import */


    var striptags__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(striptags__WEBPACK_IMPORTED_MODULE_2__);

    var dictionary = {
      en: _en__WEBPACK_IMPORTED_MODULE_1__["default"]
    };
    var language = 'en';

    function setLanguage(lang) {
      language = lang;
    }

    function getLanguage() {
      return language;
    }

    function t(key) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return Object(sprintf_js__WEBPACK_IMPORTED_MODULE_0__["sprintf"]).apply(void 0, [dictionary[language][key]].concat(args));
    }

    function tA11y(key) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return striptags__WEBPACK_IMPORTED_MODULE_2__(t.apply(void 0, [key].concat(args)));
    }
    /***/

  },

  /***/
  "./src/components/line-chart-audification/line-chart-audification.component.ts":
  /*!*************************************************************************************!*\
    !*** ./src/components/line-chart-audification/line-chart-audification.component.ts ***!
    \*************************************************************************************/

  /*! exports provided: LineChartAudificationComponent */

  /***/
  function srcComponentsLineChartAudificationLineChartAudificationComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LineChartAudificationComponent", function () {
      return LineChartAudificationComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _models_melody_melody_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../models/melody/melody.model */
    "./src/models/melody/melody.model.ts");
    /* harmony import */


    var _assets_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../assets/i18n */
    "./src/assets/i18n/index.ts");
    /* harmony import */


    var _utils_formatters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../utils/formatters */
    "./src/utils/formatters.ts");

    var LineChartAudificationComponent = /*#__PURE__*/function () {
      function LineChartAudificationComponent(zone) {
        _classCallCheck(this, LineChartAudificationComponent);

        this.zone = zone;
        this.activeDatumChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.frequencyRange = [256, 2048];
        this.duration = 5;
        this.liveText = null;
        this.handleSeek = this.handleSeek.bind(this);
      }

      _createClass(LineChartAudificationComponent, [{
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          var _a;

          (_a = this.melody) === null || _a === void 0 ? void 0 : _a.dispose();
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          var _a;

          if ('data' in changes) {
            var values = this.data.map(function (datum) {
              return datum.value;
            });
            this.domain = this.data.map(function (d) {
              return d.date;
            }).sort(function (a, b) {
              return a.getTime() - b.getTime();
            });
            this.range = this.data.map(function (d) {
              return d.value;
            }).sort();
            (_a = this.melody) === null || _a === void 0 ? void 0 : _a.dispose();
            this.melody = new _models_melody_melody_model__WEBPACK_IMPORTED_MODULE_2__["Melody"](values, this.frequencyRange, this.duration, this.handleSeek);
          }
        }
      }, {
        key: "handleSeek",
        value: function handleSeek(index, playing) {
          var _this = this;

          var datum = this.data[index];
          var date = datum.date,
              value = datum.value;
          this.zone.run(function () {
            _this.activeDatumChange.emit(datum);

            if (!playing) {
              _this.readOut(Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["AUDIFICATION"].ACTIVE_DATUM, {
                x: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatX"])(date),
                y: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatY"])(value)
              }));
            }
          });
        }
      }, {
        key: "handleKeyDown",
        value: function handleKeyDown($event) {
          var _a, _b;

          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var key, shiftKey, repeat;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    key = $event.key, shiftKey = $event.shiftKey, repeat = $event.repeat;

                    if (!repeat) {
                      _context.next = 3;
                      break;
                    }

                    return _context.abrupt("return");

                  case 3:
                    if (!(key === ' ')) {
                      _context.next = 8;
                      break;
                    }

                    _context.next = 6;
                    return (_a = this.melody) === null || _a === void 0 ? void 0 : _a.resume(shiftKey);

                  case 6:
                    _context.next = 21;
                    break;

                  case 8:
                    if (!(key === 'x')) {
                      _context.next = 12;
                      break;
                    }

                    this.readOut(Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["AUDIFICATION"].DOMAIN, {
                      min: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatX"])(this.domain[0]),
                      max: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatX"])(this.domain[this.domain.length - 1])
                    }));
                    _context.next = 21;
                    break;

                  case 12:
                    if (!(key === 'y')) {
                      _context.next = 16;
                      break;
                    }

                    this.readOut(Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["AUDIFICATION"].RANGE, {
                      min: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatY"])(this.range[0]),
                      max: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatY"])(this.range[this.range.length - 1])
                    }));
                    _context.next = 21;
                    break;

                  case 16:
                    if (!('0' <= key && key <= '9')) {
                      _context.next = 20;
                      break;
                    }

                    (_b = this.melody) === null || _b === void 0 ? void 0 : _b.seekTo(this.duration * (+key / 10), true);
                    _context.next = 21;
                    break;

                  case 20:
                    return _context.abrupt("return");

                  case 21:
                    $event.preventDefault();
                    $event.stopPropagation();

                  case 23:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "handleKeyUp",
        value: function handleKeyUp($event) {
          var _a;

          var key = $event.key;

          if (key === ' ') {
            (_a = this.melody) === null || _a === void 0 ? void 0 : _a.pause();
          } else {
            return;
          }

          $event.preventDefault();
          $event.stopPropagation();
        }
      }, {
        key: "readOut",
        value: function readOut(text) {
          var _this2 = this;

          if (this.liveText === text) {
            this.liveText = null;
            window.setTimeout(function () {
              _this2.readOut(text);
            }, 500);
          } else {
            this.liveText = text;
          }
        }
      }, {
        key: "INSTRUCTIONS",
        get: function get() {
          return Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["AUDIFICATION"].INSTRUCTIONS);
        }
      }, {
        key: "INSTRUCTIONS_A11Y",
        get: function get() {
          return Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["tA11y"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["AUDIFICATION"].INSTRUCTIONS);
        }
      }]);

      return LineChartAudificationComponent;
    }();

    LineChartAudificationComponent.ɵfac = function LineChartAudificationComponent_Factory(t) {
      return new (t || LineChartAudificationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]));
    };

    LineChartAudificationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: LineChartAudificationComponent,
      selectors: [["app-line-chart-audification"]],
      hostBindings: function LineChartAudificationComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keydown", function LineChartAudificationComponent_keydown_HostBindingHandler($event) {
            return ctx.handleKeyDown($event);
          })("keyup", function LineChartAudificationComponent_keyup_HostBindingHandler($event) {
            return ctx.handleKeyUp($event);
          });
        }
      },
      inputs: {
        data: "data",
        activeDatum: "activeDatum",
        frequencyRange: "frequencyRange",
        duration: "duration"
      },
      outputs: {
        activeDatumChange: "activeDatumChange"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]],
      decls: 3,
      vars: 3,
      consts: [["role", "img", 3, "innerHTML"], ["aria-live", "assertive", 1, "live-text"]],
      template: function LineChartAudificationComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHTML", ctx.INSTRUCTIONS, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("aria-label", ctx.INSTRUCTIONS_A11Y);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.liveText, "\n");
        }
      },
      styles: ["@charset \"UTF-8\";\n[_nghost-%COMP%]     kbd {\n  background-color: #eee;\n  border-radius: 3px;\n  border: 1px solid #b4b4b4;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 2px 0 0 rgba(255, 255, 255, 0.7) inset;\n  color: #333;\n  display: inline-block;\n  font-size: 0.85em;\n  font-weight: 700;\n  line-height: 1;\n  padding: 2px 4px;\n  white-space: nowrap;\n}\n[_nghost-%COMP%]   .live-text[_ngcontent-%COMP%]:before {\n  content: \"\uD83D\uDD0A\";\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvcnVubmVyL3dvcmsvZ3VpZGUtZG9nZS9ndWlkZS1kb2dlL3NyYy9jb21wb25lbnRzL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQ0VaO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0ZBQUE7RUFDQSxXQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QURBTjtBQ0tJO0VBQ0UsYUFBQTtBREhOIiwiZmlsZSI6InNyYy9jb21wb25lbnRzL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGNoYXJzZXQgXCJVVEYtOFwiO1xuOmhvc3QgOjpuZy1kZWVwIGtiZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2I0YjRiNDtcbiAgYm94LXNoYWRvdzogMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAycHggMCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KSBpbnNldDtcbiAgY29sb3I6ICMzMzM7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1zaXplOiAwLjg1ZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBwYWRkaW5nOiAycHggNHB4O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuOmhvc3QgLmxpdmUtdGV4dDpiZWZvcmUge1xuICBjb250ZW50OiBcIvCflIpcIjtcbn0iLCI6aG9zdCB7XG4gIDo6bmctZGVlcCB7XG4gICAga2JkIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjYjRiNGI0O1xuICAgICAgYm94LXNoYWRvdzogMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgLjIpLCAwIDJweCAwIDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAuNykgaW5zZXQ7XG4gICAgICBjb2xvcjogIzMzMztcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIGZvbnQtc2l6ZTogLjg1ZW07XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgICBwYWRkaW5nOiAycHggNHB4O1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB9XG4gIH1cblxuICAubGl2ZS10ZXh0IHtcbiAgICAmOmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAn8J+UiidcbiAgICB9XG4gIH1cbn1cbiJdfQ== */"]
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](LineChartAudificationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
          selector: 'app-line-chart-audification',
          templateUrl: './line-chart-audification.component.html',
          styleUrls: ['./line-chart-audification.component.scss']
        }]
      }], function () {
        return [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]
        }];
      }, {
        data: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }],
        activeDatum: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }],
        activeDatumChange: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"]
        }],
        frequencyRange: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }],
        duration: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }],
        handleKeyDown: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"],
          args: ['keydown', ['$event']]
        }],
        handleKeyUp: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"],
          args: ['keyup', ['$event']]
        }]
      });
    })();
    /***/

  },

  /***/
  "./src/components/line-chart-audification/line-chart-audification.module.ts":
  /*!**********************************************************************************!*\
    !*** ./src/components/line-chart-audification/line-chart-audification.module.ts ***!
    \**********************************************************************************/

  /*! exports provided: LineChartAudificationModule */

  /***/
  function srcComponentsLineChartAudificationLineChartAudificationModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LineChartAudificationModule", function () {
      return LineChartAudificationModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./line-chart-audification.component */
    "./src/components/line-chart-audification/line-chart-audification.component.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");

    var LineChartAudificationModule = function LineChartAudificationModule() {
      _classCallCheck(this, LineChartAudificationModule);
    };

    LineChartAudificationModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: LineChartAudificationModule
    });
    LineChartAudificationModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function LineChartAudificationModule_Factory(t) {
        return new (t || LineChartAudificationModule)();
      },
      imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LineChartAudificationModule, {
        declarations: [_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
        exports: [_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartAudificationModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"]],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
          exports: [_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/components/line-chart-visualization/line-chart-visualization.component.ts":
  /*!***************************************************************************************!*\
    !*** ./src/components/line-chart-visualization/line-chart-visualization.component.ts ***!
    \***************************************************************************************/

  /*! exports provided: LineChartVisualizationComponent */

  /***/
  function srcComponentsLineChartVisualizationLineChartVisualizationComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LineChartVisualizationComponent", function () {
      return LineChartVisualizationComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _d3_line_chart_d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../../d3/line-chart.d3 */
    "./src/d3/line-chart.d3.ts");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");

    var LineChartVisualizationComponent = /*#__PURE__*/function () {
      function LineChartVisualizationComponent(elementRef) {
        _classCallCheck(this, LineChartVisualizationComponent);

        this.elementRef = elementRef;
        this.height = 500;
        this.width = 800;
        this.marginTop = 20;
        this.marginRight = 30;
        this.marginBottom = 30;
        this.marginLeft = 40;
        this.activeDatumChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.dataSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this.dataObservable = this.dataSubject.asObservable();
        this.activeDatumSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.activeDatumObservable = this.activeDatumSubject.asObservable();
        this.lineChartD3 = new _d3_line_chart_d3__WEBPACK_IMPORTED_MODULE_1__["LineChartD3"](this);
      }

      _createClass(LineChartVisualizationComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.lineChartD3.render();
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.lineChartD3.clear();
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          if ('data' in changes) {
            this.dataSubject.next(this.data);
          }

          if ('activeDatum' in changes) {
            this.activeDatumSubject.next(this.activeDatum);
          }
        }
      }]);

      return LineChartVisualizationComponent;
    }();

    LineChartVisualizationComponent.ɵfac = function LineChartVisualizationComponent_Factory(t) {
      return new (t || LineChartVisualizationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]));
    };

    LineChartVisualizationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: LineChartVisualizationComponent,
      selectors: [["app-line-chart-visualization"]],
      inputs: {
        height: "height",
        width: "width",
        marginTop: "marginTop",
        marginRight: "marginRight",
        marginBottom: "marginBottom",
        marginLeft: "marginLeft",
        data: "data",
        activeDatum: "activeDatum"
      },
      outputs: {
        activeDatumChange: "activeDatumChange"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
      decls: 0,
      vars: 0,
      template: function LineChartVisualizationComponent_Template(rf, ctx) {},
      styles: ["[_nghost-%COMP%]     svg {\n  max-width: 1280px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvY29tcG9uZW50cy9saW5lLWNoYXJ0LXZpc3VhbGl6YXRpb24vbGluZS1jaGFydC12aXN1YWxpemF0aW9uLmNvbXBvbmVudC5zY3NzIiwic3JjL2NvbXBvbmVudHMvbGluZS1jaGFydC12aXN1YWxpemF0aW9uL2xpbmUtY2hhcnQtdmlzdWFsaXphdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFSTtFQUNFLGlCQUFBO0FDRE4iLCJmaWxlIjoic3JjL2NvbXBvbmVudHMvbGluZS1jaGFydC12aXN1YWxpemF0aW9uL2xpbmUtY2hhcnQtdmlzdWFsaXphdGlvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgOjpuZy1kZWVwIHtcbiAgICBzdmcge1xuICAgICAgbWF4LXdpZHRoOiAxMjgwcHg7XG4gICAgfVxuICB9XG59XG4iLCI6aG9zdCA6Om5nLWRlZXAgc3ZnIHtcbiAgbWF4LXdpZHRoOiAxMjgwcHg7XG59Il19 */"]
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartVisualizationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-line-chart-visualization',
          template: '',
          styleUrls: ['./line-chart-visualization.component.scss']
        }]
      }], function () {
        return [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
        }];
      }, {
        height: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        width: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        marginTop: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        marginRight: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        marginBottom: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        marginLeft: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        data: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        activeDatum: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        activeDatumChange: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }]
      });
    })();
    /***/

  },

  /***/
  "./src/components/line-chart-visualization/line-chart-visualization.module.ts":
  /*!************************************************************************************!*\
    !*** ./src/components/line-chart-visualization/line-chart-visualization.module.ts ***!
    \************************************************************************************/

  /*! exports provided: LineChartVisualizationModule */

  /***/
  function srcComponentsLineChartVisualizationLineChartVisualizationModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LineChartVisualizationModule", function () {
      return LineChartVisualizationModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _line_chart_visualization_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./line-chart-visualization.component */
    "./src/components/line-chart-visualization/line-chart-visualization.component.ts");
    /* harmony import */


    var _services_data_data_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../services/data/data.module */
    "./src/services/data/data.module.ts");

    var LineChartVisualizationModule = function LineChartVisualizationModule() {
      _classCallCheck(this, LineChartVisualizationModule);
    };

    LineChartVisualizationModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: LineChartVisualizationModule
    });
    LineChartVisualizationModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function LineChartVisualizationModule_Factory(t) {
        return new (t || LineChartVisualizationModule)();
      },
      imports: [[_services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LineChartVisualizationModule, {
        declarations: [_line_chart_visualization_component__WEBPACK_IMPORTED_MODULE_1__["LineChartVisualizationComponent"]],
        imports: [_services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"]],
        exports: [_line_chart_visualization_component__WEBPACK_IMPORTED_MODULE_1__["LineChartVisualizationComponent"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartVisualizationModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_line_chart_visualization_component__WEBPACK_IMPORTED_MODULE_1__["LineChartVisualizationComponent"]],
          imports: [_services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"]],
          exports: [_line_chart_visualization_component__WEBPACK_IMPORTED_MODULE_1__["LineChartVisualizationComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/components/line-chart/line-chart.component.ts":
  /*!***********************************************************!*\
    !*** ./src/components/line-chart/line-chart.component.ts ***!
    \***********************************************************/

  /*! exports provided: LineChartComponent */

  /***/
  function srcComponentsLineChartLineChartComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LineChartComponent", function () {
      return LineChartComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../../models/data-cube/presets */
    "./src/models/data-cube/presets.ts");
    /* harmony import */


    var _assets_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../assets/i18n */
    "./src/assets/i18n/index.ts");
    /* harmony import */


    var _services_data_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../services/data/data.service */
    "./src/services/data/data.service.ts");
    /* harmony import */


    var _line_chart_visualization_line_chart_visualization_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../line-chart-visualization/line-chart-visualization.component */
    "./src/components/line-chart-visualization/line-chart-visualization.component.ts");
    /* harmony import */


    var _line_chart_audification_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../line-chart-audification/line-chart-audification.component */
    "./src/components/line-chart-audification/line-chart-audification.component.ts");

    var LineChartComponent = /*#__PURE__*/function () {
      function LineChartComponent(dataService) {
        _classCallCheck(this, LineChartComponent);

        this.dataService = dataService;
        this.measureNames = [_models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["activeUserMeasure"], _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["revenueMeasure"], _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["eventCountMeasure"]].map(function (measure) {
          return measure.name;
        });
        this.setMeasureIndex(0);
      }

      _createClass(LineChartComponent, [{
        key: "toggleMeasure",
        value: function toggleMeasure() {
          var index = this.measureNames.indexOf(this.measureName);
          var nextIndex = (index + 1) % this.measureNames.length;
          this.setMeasureIndex(nextIndex);
        }
      }, {
        key: "setMeasureIndex",
        value: function setMeasureIndex(index) {
          this.measureName = this.measureNames[index];
          this.data = this.dataService.getMeasureOverDays(this.measureName);
          this.activeDatum = null;
        }
      }, {
        key: "VISUALIZATION",
        get: function get() {
          return Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_2__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_2__["GUIDE_DOGE"].VISUALIZATION);
        }
      }]);

      return LineChartComponent;
    }();

    LineChartComponent.ɵfac = function LineChartComponent_Factory(t) {
      return new (t || LineChartComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_data_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"]));
    };

    LineChartComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: LineChartComponent,
      selectors: [["app-line-chart"]],
      decls: 4,
      vars: 5,
      consts: [[3, "click"], ["role", "img", 3, "data", "activeDatum", "activeDatumChange"], ["tabindex", "0", 3, "data", "activeDatum", "activeDatumChange"]],
      template: function LineChartComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LineChartComponent_Template_button_click_0_listener() {
            return ctx.toggleMeasure();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Toggle Measure");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "app-line-chart-visualization", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("activeDatumChange", function LineChartComponent_Template_app_line_chart_visualization_activeDatumChange_2_listener($event) {
            return ctx.activeDatum = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "app-line-chart-audification", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("activeDatumChange", function LineChartComponent_Template_app_line_chart_audification_activeDatumChange_3_listener($event) {
            return ctx.activeDatum = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", ctx.data)("activeDatum", ctx.activeDatum);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", ctx.VISUALIZATION);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", ctx.data)("activeDatum", ctx.activeDatum);
        }
      },
      directives: [_line_chart_visualization_line_chart_visualization_component__WEBPACK_IMPORTED_MODULE_4__["LineChartVisualizationComponent"], _line_chart_audification_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_5__["LineChartAudificationComponent"]],
      encapsulation: 2
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-line-chart',
          templateUrl: './line-chart.component.html'
        }]
      }], function () {
        return [{
          type: _services_data_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/components/line-chart/line-chart.module.ts":
  /*!********************************************************!*\
    !*** ./src/components/line-chart/line-chart.module.ts ***!
    \********************************************************/

  /*! exports provided: LineChartModule */

  /***/
  function srcComponentsLineChartLineChartModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LineChartModule", function () {
      return LineChartModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _line_chart_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./line-chart.component */
    "./src/components/line-chart/line-chart.component.ts");
    /* harmony import */


    var _components_line_chart_visualization_line_chart_visualization_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../components/line-chart-visualization/line-chart-visualization.module */
    "./src/components/line-chart-visualization/line-chart-visualization.module.ts");
    /* harmony import */


    var _components_line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../components/line-chart-audification/line-chart-audification.module */
    "./src/components/line-chart-audification/line-chart-audification.module.ts");

    var LineChartModule = function LineChartModule() {
      _classCallCheck(this, LineChartModule);
    };

    LineChartModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: LineChartModule
    });
    LineChartModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function LineChartModule_Factory(t) {
        return new (t || LineChartModule)();
      },
      imports: [[_components_line_chart_visualization_line_chart_visualization_module__WEBPACK_IMPORTED_MODULE_2__["LineChartVisualizationModule"], _components_line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__["LineChartAudificationModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LineChartModule, {
        declarations: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]],
        imports: [_components_line_chart_visualization_line_chart_visualization_module__WEBPACK_IMPORTED_MODULE_2__["LineChartVisualizationModule"], _components_line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__["LineChartAudificationModule"]],
        exports: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]],
          imports: [_components_line_chart_visualization_line_chart_visualization_module__WEBPACK_IMPORTED_MODULE_2__["LineChartVisualizationModule"], _components_line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__["LineChartAudificationModule"]],
          exports: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/d3/base.d3.ts":
  /*!***************************!*\
    !*** ./src/d3/base.d3.ts ***!
    \***************************/

  /*! exports provided: BaseD3 */

  /***/
  function srcD3BaseD3Ts(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "BaseD3", function () {
      return BaseD3;
    });
    /* harmony import */


    var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! d3 */
    "./node_modules/d3/index.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");

    var BaseD3 = /*#__PURE__*/function () {
      function BaseD3(renderOptions) {
        _classCallCheck(this, BaseD3);

        this.renderOptions = renderOptions;
      }

      _createClass(BaseD3, [{
        key: "config",
        value: function config(renderOptions) {
          this.renderOptions = renderOptions;
          return this;
        }
      }, {
        key: "render",
        value: function render() {
          var _this$renderOptions = this.renderOptions,
              width = _this$renderOptions.width,
              height = _this$renderOptions.height;
          this.clear();
          this.clear$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
          this.svg = this.container.append('svg').attr('viewBox', [0, 0, width, height].join(' '));
        }
      }, {
        key: "clear",
        value: function clear() {
          if (!this.clear$) {
            return;
          }

          this.clear$.next();
          this.clear$.complete();
          this.clear$ = undefined;
          this.svg.remove();
        }
      }, {
        key: "takeUntilCleared",
        value: function takeUntilCleared() {
          if (!this.clear$) {
            throw new Error("Subject 'clear$' is not defined.");
          }

          return Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.clear$);
        }
      }, {
        key: "createTransition",
        value: function createTransition(duration) {
          return d3__WEBPACK_IMPORTED_MODULE_0__["transition"]().duration(duration).ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeLinear"]);
        }
      }, {
        key: "transition",
        get: function get() {
          return this.createTransition(300);
        }
      }, {
        key: "container",
        get: function get() {
          return d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.renderOptions.elementRef.nativeElement);
        }
      }]);

      return BaseD3;
    }();
    /***/

  },

  /***/
  "./src/d3/line-chart.d3.ts":
  /*!*********************************!*\
    !*** ./src/d3/line-chart.d3.ts ***!
    \*********************************/

  /*! exports provided: LineChartD3 */

  /***/
  function srcD3LineChartD3Ts(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LineChartD3", function () {
      return LineChartD3;
    });
    /* harmony import */


    var _xy_chart_d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./xy-chart.d3 */
    "./src/d3/xy-chart.d3.ts");
    /* harmony import */


    var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! d3 */
    "./node_modules/d3/index.js");
    /* harmony import */


    var _assets_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../assets/i18n */
    "./src/assets/i18n/index.ts");
    /* harmony import */


    var _utils_formatters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../utils/formatters */
    "./src/utils/formatters.ts");

    var LineChartD3 = /*#__PURE__*/function (_xy_chart_d3__WEBPACK) {
      _inherits(LineChartD3, _xy_chart_d3__WEBPACK);

      var _super = _createSuper(LineChartD3);

      function LineChartD3() {
        _classCallCheck(this, LineChartD3);

        return _super.apply(this, arguments);
      }

      _createClass(LineChartD3, [{
        key: "renderData",
        value: function renderData() {
          var _this3 = this;

          this.line = d3__WEBPACK_IMPORTED_MODULE_1__["line"]().defined(function (d) {
            return !isNaN(d.value);
          }).x(function (d) {
            return _this3.scaleX(d.date);
          }).y(function (d) {
            return _this3.scaleY(d.value);
          });
          this.path = this.svg.append('path').attr('fill', 'none').attr('stroke', 'steelblue').attr('stroke-width', 1.5).attr('stroke-linejoin', 'round').attr('stroke-linecap', 'round');
        }
      }, {
        key: "updateData",
        value: function updateData(data) {
          this.path.datum(data).transition(this.transition).attr('d', this.line);
        }
      }, {
        key: "renderActiveDatum",
        value: function renderActiveDatum() {
          this.activeDatumG = this.svg.append('g');
          this.activeDatumG.append('circle').attr('r', 4).attr('fill', 'steelblue');
          this.activeDatumText = this.activeDatumG.append('text').attr('y', 20).attr('text-anchor', 'middle').attr('font-family', 'sans-serif').attr('font-size', 10);
        }
      }, {
        key: "updateActiveDatum",
        value: function updateActiveDatum(activeDatum) {
          if (!activeDatum) {
            this.activeDatumG.attr('display', 'none');
            return;
          }

          var date = activeDatum.date,
              value = activeDatum.value;
          this.activeDatumG.transition(this.createTransition(50)).attr('display', 'inherit').attr('transform', "translate(".concat(this.scaleX(date), ",").concat(this.scaleY(value), ")"));
          this.activeDatumText.text(Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_2__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_2__["AUDIFICATION"].ACTIVE_DATUM, {
            x: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_3__["formatX"])(date),
            y: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_3__["formatY"])(value)
          }));
        }
      }]);

      return LineChartD3;
    }(_xy_chart_d3__WEBPACK_IMPORTED_MODULE_0__["XYChartD3"]);
    /***/

  },

  /***/
  "./src/d3/xy-chart.d3.ts":
  /*!*******************************!*\
    !*** ./src/d3/xy-chart.d3.ts ***!
    \*******************************/

  /*! exports provided: XYChartD3 */

  /***/
  function srcD3XyChartD3Ts(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "XYChartD3", function () {
      return XYChartD3;
    });
    /* harmony import */


    var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! d3 */
    "./node_modules/d3/index.js");
    /* harmony import */


    var _base_d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./base.d3 */
    "./src/d3/base.d3.ts");
    /* harmony import */


    var _utils_formatters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../utils/formatters */
    "./src/utils/formatters.ts");

    var XYChartD3 = /*#__PURE__*/function (_base_d3__WEBPACK_IMP) {
      _inherits(XYChartD3, _base_d3__WEBPACK_IMP);

      var _super2 = _createSuper(XYChartD3);

      function XYChartD3() {
        _classCallCheck(this, XYChartD3);

        return _super2.apply(this, arguments);
      }

      _createClass(XYChartD3, [{
        key: "render",
        value: function render() {
          var _this4 = this;

          _get(_getPrototypeOf(XYChartD3.prototype), "render", this).call(this);

          var _this$renderOptions2 = this.renderOptions,
              dataObservable = _this$renderOptions2.dataObservable,
              activeDatumObservable = _this$renderOptions2.activeDatumObservable;
          this.renderAxis();
          this.renderData();
          this.renderActiveDatum();
          dataObservable.pipe(this.takeUntilCleared()).subscribe(function (data) {
            _this4.updateAxis(data);

            _this4.updateData(data);
          });
          activeDatumObservable.pipe(this.takeUntilCleared()).subscribe(function (activeDatum) {
            _this4.updateActiveDatum(activeDatum);
          });
        }
      }, {
        key: "renderAxis",
        value: function renderAxis() {
          var _this$renderOptions3 = this.renderOptions,
              height = _this$renderOptions3.height,
              width = _this$renderOptions3.width,
              marginTop = _this$renderOptions3.marginTop,
              marginRight = _this$renderOptions3.marginRight,
              marginBottom = _this$renderOptions3.marginBottom,
              marginLeft = _this$renderOptions3.marginLeft;
          this.scaleX = d3__WEBPACK_IMPORTED_MODULE_0__["scaleUtc"]().range([marginLeft, width - marginRight]);
          this.scaleY = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().nice().range([height - marginBottom, marginTop]);
          this.xAxis = d3__WEBPACK_IMPORTED_MODULE_0__["axisBottom"](this.scaleX).ticks(width / 80).tickFormat(_utils_formatters__WEBPACK_IMPORTED_MODULE_2__["formatX"]).tickSizeOuter(0);
          this.yAxis = d3__WEBPACK_IMPORTED_MODULE_0__["axisLeft"](this.scaleY);
          this.xAxisG = this.svg.append('g').attr('transform', "translate(0,".concat(height - marginBottom, ")"));
          this.yAxisG = this.svg.append('g').attr('transform', "translate(".concat(marginLeft, ",0)"));
        }
      }, {
        key: "updateAxis",
        value: function updateAxis(data) {
          this.scaleX.domain(d3__WEBPACK_IMPORTED_MODULE_0__["extent"](data, function (d) {
            return d.date;
          }));
          this.scaleY.domain([0, d3__WEBPACK_IMPORTED_MODULE_0__["max"](data, function (d) {
            return d.value;
          })]);
          this.xAxisG.transition(this.transition).call(this.xAxis);
          this.yAxisG.transition(this.transition).call(this.yAxis);
        }
      }]);

      return XYChartD3;
    }(_base_d3__WEBPACK_IMPORTED_MODULE_1__["BaseD3"]);
    /***/

  },

  /***/
  "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    });

    var environment = {
      production: false
    };
    /***/
  },

  /***/
  "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/

  /*! no exports provided */

  /***/
  function srcMainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./app.module */
    "./src/app.module.ts");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");

    if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
    }

    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
      return console.error(err);
    });
    /***/

  },

  /***/
  "./src/models/data-cube/data-cube.model.ts":
  /*!*************************************************!*\
    !*** ./src/models/data-cube/data-cube.model.ts ***!
    \*************************************************/

  /*! exports provided: DataCube */

  /***/
  function srcModelsDataCubeDataCubeModelTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DataCube", function () {
      return DataCube;
    });

    var DataCube = /*#__PURE__*/function () {
      function DataCube(rows, measures, categories) {
        _classCallCheck(this, DataCube);

        this.rows = rows;
        this.measures = measures;
        this.categories = categories;
      }

      _createClass(DataCube, [{
        key: "getDataFor",
        value: function getDataFor(categoryNames, measureNames) {
          var _this5 = this;

          var filters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
          var sortBy = arguments.length > 3 ? arguments[3] : undefined;
          var measureIndices = measureNames.map(function (name) {
            return _this5.measures.findIndex(function (measure) {
              return measure.name === name;
            });
          });
          var categoryIndices = categoryNames.map(function (name) {
            return _this5.categories.findIndex(function (category) {
              return category.name === name;
            });
          });
          var categoryTrie = {
            children: {}
          };
          var filterFuncs = filters.map(function (filter) {
            return filter(_this5.categories, _this5.measures);
          });
          this.rows.filter(function (row) {
            return filterFuncs.every(function (filter) {
              return filter(row);
            });
          }).forEach(function (row) {
            var trieNode = categoryTrie;

            var _iterator = _createForOfIteratorHelper(categoryIndices),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var categoryIndex = _step.value;

                if (!trieNode.children[row.header[categoryIndex]]) {
                  trieNode.children[row.header[categoryIndex]] = {
                    children: {}
                  };
                }

                trieNode = trieNode.children[row.header[categoryIndex]];
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            if (!trieNode.values) {
              trieNode.values = measureNames.map(function () {
                return 0;
              });
            }

            var _iterator2 = _createForOfIteratorHelper(measureIndices.entries()),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var _step2$value = _slicedToArray(_step2.value, 2),
                    index = _step2$value[0],
                    measureIndex = _step2$value[1];

                trieNode.values[index] += row.values[measureIndex];
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          });
          var result = [];
          var labelList = [];

          var traverseNode = function traverseNode(node) {
            if (node.values) {
              result.push({
                categories: new Map(labelList.map(function (label, index) {
                  return [categoryNames[index], label];
                })),
                values: new Map(node.values.map(function (value, index) {
                  return [measureNames[index], value];
                }))
              });
            } else {
              for (var _i2 = 0, _Object$entries = Object.entries(node.children); _i2 < _Object$entries.length; _i2++) {
                var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
                    label = _Object$entries$_i[0],
                    child = _Object$entries$_i[1];

                labelList.push(label);
                traverseNode(child);
                labelList.pop();
              }
            }
          };

          traverseNode(categoryTrie);
          this.normalizeNthDay(result, categoryNames);
          this.sortResults(result, categoryNames, measureNames, sortBy !== null && sortBy !== void 0 ? sortBy : [].concat(_toConsumableArray(categoryNames), _toConsumableArray(measureNames)));
          return result;
        }
      }, {
        key: "normalizeNthDay",
        value: function normalizeNthDay(rows, categoryNames) {
          if (!categoryNames.includes('nthDay')) {
            return;
          }

          var largestNthDay = Math.max.apply(Math, _toConsumableArray(rows.map(function (row) {
            return row.categories.get('nthDay');
          })));

          var _iterator3 = _createForOfIteratorHelper(rows),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var row = _step3.value;
              var nthDay = row.categories.get('nthDay');
              row.categories.set('nthDay', largestNthDay - nthDay);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      }, {
        key: "sortResults",
        value: function sortResults(results, categoryNames, measureNames, sortBy) {
          function getComparator(sortConcept) {
            if (categoryNames.includes(sortConcept)) {
              return function (a, b) {
                var aCategory = a.categories.get(sortConcept);
                var bCategory = b.categories.get(sortConcept);

                if (aCategory < bCategory) {
                  return -1;
                }

                if (aCategory > bCategory) {
                  return 1;
                }

                return 0;
              };
            }

            if (measureNames.includes(sortConcept)) {
              return function (a, b) {
                return a.values.get(sortConcept) - b.values.get(sortConcept);
              };
            }

            return function () {
              return 0;
            };
          }

          var comparators = sortBy.map(getComparator);

          var combinedComparator = function combinedComparator(a, b) {
            var _iterator4 = _createForOfIteratorHelper(comparators),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var comparator = _step4.value;
                var result = comparator(a, b);

                if (result !== 0) {
                  return result;
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }

            return 0;
          };

          results.sort(combinedComparator);
        }
      }]);

      return DataCube;
    }();
    /***/

  },

  /***/
  "./src/models/data-cube/filters.ts":
  /*!*****************************************!*\
    !*** ./src/models/data-cube/filters.ts ***!
    \*****************************************/

  /*! exports provided: betweenDates */

  /***/
  function srcModelsDataCubeFiltersTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "betweenDates", function () {
      return betweenDates;
    });

    var millisecondsPerDay = 24 * 60 * 60 * 1000;

    function betweenDates(startDate, endDate) {
      return function (categories) {
        var nThDayIndex = categories.findIndex(function (category) {
          return category.name === 'nthDay';
        });
        var startIndex = Math.round((Date.now() - startDate.getTime()) / millisecondsPerDay);
        var endIndex = Math.round((Date.now() - endDate.getTime()) / millisecondsPerDay);
        return function (row) {
          return row.header[nThDayIndex] <= startIndex && row.header[nThDayIndex] >= endIndex;
        };
      };
    }
    /***/

  },

  /***/
  "./src/models/data-cube/generation.ts":
  /*!********************************************!*\
    !*** ./src/models/data-cube/generation.ts ***!
    \********************************************/

  /*! exports provided: generateCube */

  /***/
  function srcModelsDataCubeGenerationTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "generateCube", function () {
      return generateCube;
    });
    /* harmony import */


    var random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! random */
    "./node_modules/random/index.js");
    /* harmony import */


    var random__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(random__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */


    var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./types */
    "./src/models/data-cube/types.ts");
    /* harmony import */


    var _data_cube_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./data-cube.model */
    "./src/models/data-cube/data-cube.model.ts");

    function generateCube(categories, measures) {
      var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var completeSettings = Object.assign(Object.assign({}, defaultSettings), settings);

      var actualCategories = _toConsumableArray(categories);

      if (completeSettings.nthDay) {
        var nthDayCategory = generateNthDay(completeSettings.days, completeSettings.dailyStdDev);
        actualCategories.push(nthDayCategory);
      }

      var rows = generateEmptyRows(actualCategories, measures);
      var cumulativeWeights = generateCumulativeWeights(rows, actualCategories);
      generateHits(rows, measures, cumulativeWeights, generateUsersAndSessions(completeSettings), completeSettings);
      return new _data_cube_model__WEBPACK_IMPORTED_MODULE_2__["DataCube"](rows, measures, actualCategories);
    }

    var defaultSettings = {
      avgHits: 1000000,
      hitStdDev: 10000,
      avgUsers: 10000,
      userStdDev: 100,
      avgSessionsPerUser: 5,
      sessionsPerUserStdDev: 3,
      nthDay: true,
      days: 60,
      dailyStdDev: 0.1
    };

    function generateUsersAndSessions(_ref) {
      var avgUsers = _ref.avgUsers,
          userStdDev = _ref.userStdDev,
          avgSessionsPerUser = _ref.avgSessionsPerUser,
          sessionsPerUserStdDev = _ref.sessionsPerUserStdDev;
      var userCount = Math.round(random__WEBPACK_IMPORTED_MODULE_0__["normal"](avgUsers, userStdDev)());
      var sessionThunk = random__WEBPACK_IMPORTED_MODULE_0__["normal"](avgSessionsPerUser, sessionsPerUserStdDev);
      var sessions = [];

      for (var i = 0; i < userCount; i++) {
        var user = {
          rowsSeen: new Set()
        };
        var userSessions = Math.round(sessionThunk());

        for (var j = 0; j < userSessions; j++) {
          sessions.push({
            user: user,
            rowsSeen: new Set()
          });
        }
      }

      return sessions;
    }

    function getNormalizedWeights(categories) {
      return categories.map(function (category) {
        var total = category.values.reduce(function (accumulator, value) {
          return value.weight + accumulator;
        }, 0);
        return category.values.map(function (value) {
          return value.weight / total;
        });
      });
    }

    function binarySearch(arr, probe) {
      var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var end = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : arr.length;
      var len = end - start;

      if (len < 2) {
        return start;
      }

      var index = len % 2 === 0 ? (start + end) / 2 : (start + end - 1) / 2;

      if (arr[index] <= probe) {
        return binarySearch(arr, probe, index, end);
      } else {
        return binarySearch(arr, probe, start, index);
      }
    }

    function generateMeasureIncrement(measure) {
      if (measure.type === _types__WEBPACK_IMPORTED_MODULE_1__["MeasureType"].COUNT || !measure.range) {
        return 1;
      }

      return random__WEBPACK_IMPORTED_MODULE_0__["float"](measure.range[0], measure.range[1]);
    }

    function generateHits(rows, measures, cumulativeWeights, sessions, _ref2) {
      var avgHits = _ref2.avgHits,
          hitStdDev = _ref2.hitStdDev;
      var hitTotal = Math.round(random__WEBPACK_IMPORTED_MODULE_0__["normal"](avgHits, hitStdDev)());
      var placementThunk = random__WEBPACK_IMPORTED_MODULE_0__["uniform"]();
      var sessionThunk = random__WEBPACK_IMPORTED_MODULE_0__["uniformInt"](0, sessions.length - 1);

      for (var i = 0; i < hitTotal; i++) {
        var placement = placementThunk();
        var session = sessionThunk();
        var rowIndex = binarySearch(cumulativeWeights, placement);

        var _iterator5 = _createForOfIteratorHelper(measures.entries()),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _step5$value = _slicedToArray(_step5.value, 2),
                index = _step5$value[0],
                measure = _step5$value[1];

            var newSession = !sessions[session].rowsSeen.has(rowIndex);
            var newUser = !sessions[session].user.rowsSeen.has(rowIndex);

            if (newSession) {
              sessions[session].rowsSeen.add(rowIndex);

              if (newUser) {
                sessions[session].user.rowsSeen.add(rowIndex);
              }
            }

            switch (measure.scope) {
              case _types__WEBPACK_IMPORTED_MODULE_1__["Scope"].EVENT:
                rows[rowIndex].values[index] += generateMeasureIncrement(measure);
                break;

              case _types__WEBPACK_IMPORTED_MODULE_1__["Scope"].SESSION:
                if (newSession) {
                  rows[rowIndex].values[index] += generateMeasureIncrement(measure);
                }

                break;

              case _types__WEBPACK_IMPORTED_MODULE_1__["Scope"].USER:
                if (newUser) {
                  rows[rowIndex].values[index] += generateMeasureIncrement(measure);
                }

                break;
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
    }

    function generateEmptyRows(categories, measures) {
      var rows = [];
      var categoryValueIndices = categories.map(function () {
        return 0;
      });
      var categoryIndex = 0;

      do {
        var header = categories.map(function (category, index) {
          return category.values[categoryValueIndices[index]].name;
        });
        var values = measures.map(function () {
          return 0;
        });
        rows.push({
          header: header,
          values: values
        });
        categoryIndex = 0;

        do {
          categoryValueIndices[categoryIndex] = (categoryValueIndices[categoryIndex] + 1) % categories[categoryIndex].values.length;
          categoryIndex += 1;
        } while (categoryValueIndices[categoryIndex - 1] === 0 && categoryIndex < categories.length);
      } while (categoryValueIndices[categoryIndex - 1] !== 0);

      return rows;
    }

    function generateCumulativeWeights(rows, categories) {
      var weights = getNormalizedWeights(categories);
      var nameToWeightMapping = categories.map(function (category, categoryIndex) {
        return new Map(category.values.map(function (value, index) {
          return [value.name, weights[categoryIndex][index]];
        }));
      });
      return rows.reduce(function (cumulativeWeights, row) {
        var rowWeights = row.header.map(function (label, categoryIndex) {
          var _a;

          return (_a = nameToWeightMapping[categoryIndex].get(label)) !== null && _a !== void 0 ? _a : 0;
        });
        var weightDelta = rowWeights.reduce(function (accumulator, weight) {
          return accumulator * weight;
        }, 1);
        cumulativeWeights.push(weightDelta + cumulativeWeights[cumulativeWeights.length - 1]);
        return cumulativeWeights;
      }, [0]);
    }

    function generateNthDay(days, dailyVariance) {
      var dailyThunk = random__WEBPACK_IMPORTED_MODULE_0__["normal"](1, dailyVariance);
      var values = [];

      for (var day = 0; day < days; day++) {
        values.push({
          name: day,
          weight: dailyThunk()
        });
      }

      return {
        name: 'nthDay',
        values: values
      };
    }
    /***/

  },

  /***/
  "./src/models/data-cube/presets.ts":
  /*!*****************************************!*\
    !*** ./src/models/data-cube/presets.ts ***!
    \*****************************************/

  /*! exports provided: countryCategory, browserCategory, sourceCategory, activeUserMeasure, revenueMeasure, eventCountMeasure */

  /***/
  function srcModelsDataCubePresetsTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "countryCategory", function () {
      return countryCategory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "browserCategory", function () {
      return browserCategory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "sourceCategory", function () {
      return sourceCategory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "activeUserMeasure", function () {
      return activeUserMeasure;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "revenueMeasure", function () {
      return revenueMeasure;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "eventCountMeasure", function () {
      return eventCountMeasure;
    });
    /* harmony import */


    var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./types */
    "./src/models/data-cube/types.ts");

    var countryCategory = {
      name: 'country',
      values: [{
        name: 'Canada',
        weight: 2
      }, {
        name: 'USA',
        weight: 16
      }, {
        name: 'Mexico',
        weight: 15
      }]
    };
    var browserCategory = {
      name: 'browser',
      values: [{
        name: 'Chrome',
        weight: 50
      }, {
        name: 'Firefox',
        weight: 19
      }, {
        name: 'Safari',
        weight: 20
      }, {
        name: 'Edge',
        weight: 10
      }]
    };
    var sourceCategory = {
      name: 'source',
      values: [{
        name: 'Direct',
        weight: 5
      }, {
        name: 'Email',
        weight: 5
      }]
    };
    var activeUserMeasure = {
      name: 'activeUsers',
      scope: _types__WEBPACK_IMPORTED_MODULE_0__["Scope"].USER,
      type: _types__WEBPACK_IMPORTED_MODULE_0__["MeasureType"].COUNT
    };
    var revenueMeasure = {
      name: 'revenue',
      scope: _types__WEBPACK_IMPORTED_MODULE_0__["Scope"].EVENT,
      type: _types__WEBPACK_IMPORTED_MODULE_0__["MeasureType"].SUM,
      range: [0, 10]
    };
    var eventCountMeasure = {
      name: 'eventCount',
      scope: _types__WEBPACK_IMPORTED_MODULE_0__["Scope"].EVENT,
      type: _types__WEBPACK_IMPORTED_MODULE_0__["MeasureType"].SUM
    };
    /***/
  },

  /***/
  "./src/models/data-cube/types.ts":
  /*!***************************************!*\
    !*** ./src/models/data-cube/types.ts ***!
    \***************************************/

  /*! exports provided: MeasureType, Scope */

  /***/
  function srcModelsDataCubeTypesTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MeasureType", function () {
      return MeasureType;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Scope", function () {
      return Scope;
    });

    var MeasureType;

    (function (MeasureType) {
      MeasureType[MeasureType["COUNT"] = 0] = "COUNT";
      MeasureType[MeasureType["SUM"] = 1] = "SUM";
    })(MeasureType || (MeasureType = {}));

    var Scope;

    (function (Scope) {
      Scope[Scope["EVENT"] = 0] = "EVENT";
      Scope[Scope["SESSION"] = 1] = "SESSION";
      Scope[Scope["USER"] = 2] = "USER";
    })(Scope || (Scope = {}));
    /***/

  },

  /***/
  "./src/models/melody/melody.model.ts":
  /*!*******************************************!*\
    !*** ./src/models/melody/melody.model.ts ***!
    \*******************************************/

  /*! exports provided: Melody */

  /***/
  function srcModelsMelodyMelodyModelTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Melody", function () {
      return Melody;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var tone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! tone */
    "./node_modules/tone/build/esm/index.js");

    var Melody = /*#__PURE__*/function () {
      function Melody(values, frequencyRange, duration, onSeek) {
        _classCallCheck(this, Melody);

        this.values = values;
        this.frequencyRange = frequencyRange;
        this.duration = duration;
        this.onSeek = onSeek;
        this.synth = new tone__WEBPACK_IMPORTED_MODULE_1__["Synth"]().toDestination();
        this.currentDatumIndex = 0;
        this.inclusive = true;
        this.reversed = false;

        var reversedValues = _toConsumableArray(values).reverse();

        this.forwardSequence = this.createSequence(values);
        this.backwardSequence = this.createSequence(reversedValues);
      }

      _createClass(Melody, [{
        key: "resume",
        value: function resume(reversed) {
          var _a, _b, _c, _d;

          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var nextSeconds;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(tone__WEBPACK_IMPORTED_MODULE_1__["getContext"]().state === 'suspended')) {
                      _context2.next = 3;
                      break;
                    }

                    _context2.next = 3;
                    return tone__WEBPACK_IMPORTED_MODULE_1__["start"]();

                  case 3:
                    if (!this.isPlaying) {
                      this.reversed = reversed;
                      this.currentDatumIndex = this.nextIndex;
                      nextSeconds = this.getSeconds(this.currentDatumIndex);

                      if (this.reversed) {
                        (_a = this.backwardSequence) === null || _a === void 0 ? void 0 : _a.start(0);
                        (_b = this.forwardSequence) === null || _b === void 0 ? void 0 : _b.stop(0);
                        nextSeconds += this.noteDuration / 2;
                        tone__WEBPACK_IMPORTED_MODULE_1__["Transport"].start(undefined, this.duration - nextSeconds);
                      } else {
                        (_c = this.backwardSequence) === null || _c === void 0 ? void 0 : _c.stop(0);
                        (_d = this.forwardSequence) === null || _d === void 0 ? void 0 : _d.start(0);
                        nextSeconds -= this.noteDuration / 2;
                        tone__WEBPACK_IMPORTED_MODULE_1__["Transport"].start(undefined, nextSeconds);
                      }
                    }

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));
        }
      }, {
        key: "pause",
        value: function pause() {
          if (this.isPlaying) {
            tone__WEBPACK_IMPORTED_MODULE_1__["Transport"].pause();
            this.seekTo(this.currentSeconds);
          }
        }
      }, {
        key: "getCurrentDatumIndex",
        value: function getCurrentDatumIndex() {
          return this.currentDatumIndex;
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          var inclusive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          var _a;

          this.currentDatumIndex = this.getDatumIndex(seconds);
          this.inclusive = this.isEnded || inclusive;
          (_a = this.onSeek) === null || _a === void 0 ? void 0 : _a.call(this, this.currentDatumIndex, this.isPlaying);
        }
      }, {
        key: "dispose",
        value: function dispose() {
          this.forwardSequence.dispose();
          this.backwardSequence.dispose();
          this.synth.dispose();
        }
      }, {
        key: "createSequence",
        value: function createSequence(values) {
          var _this6 = this;

          var minValue = Math.min.apply(Math, _toConsumableArray(values));
          var maxValue = Math.max.apply(Math, _toConsumableArray(values));

          var _this$frequencyRange = _slicedToArray(this.frequencyRange, 2),
              minFrequency = _this$frequencyRange[0],
              maxFrequency = _this$frequencyRange[1];

          var minKeyNumber = Melody.getKeyNumber(minFrequency);
          var maxKeyNumber = Melody.getKeyNumber(maxFrequency);
          var sequence = new tone__WEBPACK_IMPORTED_MODULE_1__["Sequence"](function (time, value) {
            _this6.seekTo(_this6.currentSeconds);

            var keyNumber = (value - minValue) / (maxValue - minValue) * (maxKeyNumber - minKeyNumber) + minKeyNumber;
            var frequency = Melody.getFrequency(keyNumber);

            _this6.synth.triggerAttackRelease(frequency, _this6.noteDuration, time);
          }, values, this.noteDuration);
          sequence.loop = 1;
          return sequence;
        }
      }, {
        key: "getSeconds",
        value: function getSeconds(index) {
          return (index + .5) * this.noteDuration;
        }
      }, {
        key: "getDatumIndex",
        value: function getDatumIndex(seconds) {
          var index = Math.round(seconds / this.noteDuration - .5);
          return Math.min(Math.max(index, 0), this.values.length - 1);
        }
      }, {
        key: "noteDuration",
        get: function get() {
          return this.duration / this.values.length;
        }
      }, {
        key: "currentSeconds",
        get: function get() {
          return this.reversed ? this.duration - tone__WEBPACK_IMPORTED_MODULE_1__["Transport"].seconds : tone__WEBPACK_IMPORTED_MODULE_1__["Transport"].seconds;
        }
      }, {
        key: "isPlaying",
        get: function get() {
          return tone__WEBPACK_IMPORTED_MODULE_1__["Transport"].state === 'started';
        }
      }, {
        key: "isEnded",
        get: function get() {
          return this.reversed && this.currentDatumIndex === 0 || !this.reversed && this.currentDatumIndex === this.values.length - 1;
        }
      }, {
        key: "nextIndex",
        get: function get() {
          if (this.isEnded) {
            return this.values.length - 1 - this.currentDatumIndex;
          }

          var offset = this.inclusive ? 0 : this.reversed ? -1 : +1;
          return this.currentDatumIndex + offset;
        }
      }], [{
        key: "getKeyNumber",
        value: function getKeyNumber(frequency) {
          return Math.log2(frequency / 440) * 12 + 49;
        }
      }, {
        key: "getFrequency",
        value: function getFrequency(keyNumber) {
          return Math.pow(2, (keyNumber - 49) / 12) * 440;
        }
      }]);

      return Melody;
    }();
    /***/

  },

  /***/
  "./src/services/data/data.module.ts":
  /*!******************************************!*\
    !*** ./src/services/data/data.module.ts ***!
    \******************************************/

  /*! exports provided: DataModule */

  /***/
  function srcServicesDataDataModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DataModule", function () {
      return DataModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./data.service */
    "./src/services/data/data.service.ts");

    var DataModule = function DataModule() {
      _classCallCheck(this, DataModule);
    };

    DataModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: DataModule
    });
    DataModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function DataModule_Factory(t) {
        return new (t || DataModule)();
      },
      providers: [_data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]]
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DataModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          providers: [_data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/services/data/data.service.ts":
  /*!*******************************************!*\
    !*** ./src/services/data/data.service.ts ***!
    \*******************************************/

  /*! exports provided: DataService */

  /***/
  function srcServicesDataDataServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DataService", function () {
      return DataService;
    });
    /* harmony import */


    var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! luxon */
    "./node_modules/luxon/build/cjs-browser/luxon.js");
    /* harmony import */


    var luxon__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */


    var _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../../models/data-cube/presets */
    "./src/models/data-cube/presets.ts");
    /* harmony import */


    var _models_data_cube_filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../models/data-cube/filters */
    "./src/models/data-cube/filters.ts");
    /* harmony import */


    var src_models_data_cube_generation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/models/data-cube/generation */
    "./src/models/data-cube/generation.ts");

    var DataService = /*#__PURE__*/function () {
      function DataService() {
        _classCallCheck(this, DataService);

        this.dataCube = Object(src_models_data_cube_generation__WEBPACK_IMPORTED_MODULE_3__["generateCube"])([_models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["countryCategory"], _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["browserCategory"], _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["sourceCategory"]], [_models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["activeUserMeasure"], _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["revenueMeasure"], _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["eventCountMeasure"]], {
          avgHits: 10000,
          hitStdDev: 100,
          avgUsers: 100,
          userStdDev: 1,
          avgSessionsPerUser: 5,
          sessionsPerUserStdDev: 3
        });
      }

      _createClass(DataService, [{
        key: "getMeasureOverDays",
        value: function getMeasureOverDays(measureName) {
          var days = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
          var categoryName = 'nthDay';
          var endDate = luxon__WEBPACK_IMPORTED_MODULE_0__["DateTime"].local();
          var startDate = endDate.minus({
            day: days
          });
          return this.dataCube.getDataFor([categoryName], [measureName], [Object(_models_data_cube_filters__WEBPACK_IMPORTED_MODULE_2__["betweenDates"])(startDate.toJSDate(), endDate.toJSDate())]).map(function (row) {
            return {
              date: startDate.plus({
                days: row.categories.get(categoryName)
              }).toJSDate(),
              value: row.values.get(measureName)
            };
          });
        }
      }]);

      return DataService;
    }();
    /***/

  },

  /***/
  "./src/utils/formatters.ts":
  /*!*********************************!*\
    !*** ./src/utils/formatters.ts ***!
    \*********************************/

  /*! exports provided: formatX, formatY */

  /***/
  function srcUtilsFormattersTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "formatX", function () {
      return formatX;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "formatY", function () {
      return formatY;
    });
    /* harmony import */


    var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! d3 */
    "./node_modules/d3/index.js");

    var formatX = d3__WEBPACK_IMPORTED_MODULE_0__["timeFormat"]('%B %d');

    var formatY = function formatY(value) {
      return Number.isInteger(value) ? value : value.toFixed(1);
    };
    /***/

  },

  /***/
  0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! /home/runner/work/guide-doge/guide-doge/src/main.ts */
    "./src/main.ts");
    /***/
  },

  /***/
  1:
  /*!************************!*\
    !*** crypto (ignored) ***!
    \************************/

  /*! no static exports found */

  /***/
  function _(module, exports) {
    /* (ignored) */

    /***/
  }
}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es5.js.map
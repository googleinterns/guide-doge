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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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


    var _pages_audification_experiment_audification_experiment_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./pages/audification-experiment/audification-experiment.component */
    "./src/pages/audification-experiment/audification-experiment.component.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var AppComponent = function AppComponent() {
      _classCallCheck(this, AppComponent);

      this.title = 'guide-doge';
    };

    AppComponent.ɵfac = function AppComponent_Factory(t) {
      return new (t || AppComponent)();
    };

    AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      decls: 9,
      vars: 0,
      consts: [[1, "container"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Guide-Doge");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "top");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "app-audification-experiment");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "bottom");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "router-outlet");
        }
      },
      directives: [_pages_audification_experiment_audification_experiment_component__WEBPACK_IMPORTED_MODULE_1__["AudificationExperimentComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]],
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


    var _pages_audification_experiment_audification_experiment_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./pages/audification-experiment/audification-experiment.module */
    "./src/pages/audification-experiment/audification-experiment.module.ts");

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
      imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _pages_audification_experiment_audification_experiment_module__WEBPACK_IMPORTED_MODULE_4__["AudificationExperimentModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, {
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _pages_audification_experiment_audification_experiment_module__WEBPACK_IMPORTED_MODULE_4__["AudificationExperimentModule"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _pages_audification_experiment_audification_experiment_module__WEBPACK_IMPORTED_MODULE_4__["AudificationExperimentModule"]],
          bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        }]
      }], null, null);
    })();
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


    var tone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! tone */
    "./node_modules/tone/build/esm/index.js");
    /* harmony import */


    var _line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../line-chart/line-chart.component */
    "./src/components/line-chart/line-chart.component.ts");
    /* harmony import */


    var _services_audification_audification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../services/audification/audification.service */
    "./src/services/audification/audification.service.ts");

    var LineChartAudificationComponent = /*#__PURE__*/function () {
      function LineChartAudificationComponent(component, audificationService) {
        _classCallCheck(this, LineChartAudificationComponent);

        this.component = component;
        this.audificationService = audificationService;
      }

      _createClass(LineChartAudificationComponent, [{
        key: "playMelody",
        value: function playMelody() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(tone__WEBPACK_IMPORTED_MODULE_2__["getContext"]().state === 'suspended')) {
                      _context.next = 3;
                      break;
                    }

                    _context.next = 3;
                    return tone__WEBPACK_IMPORTED_MODULE_2__["start"]();

                  case 3:
                    this.disposeMelody = this.audificationService.audify([], [0, 0], 0);

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }]);

      return LineChartAudificationComponent;
    }();

    LineChartAudificationComponent.ɵfac = function LineChartAudificationComponent_Factory(t) {
      return new (t || LineChartAudificationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_3__["LineChartComponent"], 1), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_audification_audification_service__WEBPACK_IMPORTED_MODULE_4__["AudificationService"]));
    };

    LineChartAudificationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: LineChartAudificationComponent,
      selectors: [["app-line-chart-audification"]],
      decls: 2,
      vars: 0,
      consts: [["role", "button", 3, "focus", "blur"]],
      template: function LineChartAudificationComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("focus", function LineChartAudificationComponent_Template_div_focus_0_listener() {
            return ctx.playMelody();
          })("blur", function LineChartAudificationComponent_Template_div_blur_0_listener() {
            return ctx.disposeMelody && ctx.disposeMelody();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Melody\n");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      },
      encapsulation: 2
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](LineChartAudificationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
          selector: 'app-line-chart-audification',
          templateUrl: './line-chart-audification.component.html'
        }]
      }], function () {
        return [{
          type: _line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_3__["LineChartComponent"],
          decorators: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Host"]
          }]
        }, {
          type: _services_audification_audification_service__WEBPACK_IMPORTED_MODULE_4__["AudificationService"]
        }];
      }, null);
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


    var _services_audification_audification_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../services/audification/audification.module */
    "./src/services/audification/audification.module.ts");

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
      imports: [[_services_audification_audification_module__WEBPACK_IMPORTED_MODULE_2__["AudificationModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LineChartAudificationModule, {
        declarations: [_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"]],
        imports: [_services_audification_audification_module__WEBPACK_IMPORTED_MODULE_2__["AudificationModule"]],
        exports: [_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartAudificationModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"]],
          imports: [_services_audification_audification_module__WEBPACK_IMPORTED_MODULE_2__["AudificationModule"]],
          exports: [_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"]]
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


    var _d3_line_chart_d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../../d3/line-chart.d3 */
    "./src/d3/line-chart.d3.ts");
    /* harmony import */


    var _services_data_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../services/data/data.service */
    "./src/services/data/data.service.ts");

    var LineChartComponent = /*#__PURE__*/function () {
      function LineChartComponent(dataService, element) {
        _classCallCheck(this, LineChartComponent);

        this.dataService = dataService;
        this.height = 500;
        this.width = 800;
        this.marginTop = 20;
        this.marginRight = 30;
        this.marginBottom = 30;
        this.marginLeft = 40;
        this.lineChartD3 = new _d3_line_chart_d3__WEBPACK_IMPORTED_MODULE_1__["LineChartD3"](element);
      }

      _createClass(LineChartComponent, [{
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          this.lineChartD3.apply(this);
        }
      }, {
        key: "data",
        get: function get() {
          return this.dataService.getMeasureOverDays(this.measureName);
        }
      }]);

      return LineChartComponent;
    }();

    LineChartComponent.ɵfac = function LineChartComponent_Factory(t) {
      return new (t || LineChartComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_data_data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]));
    };

    LineChartComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: LineChartComponent,
      selectors: [["app-line-chart"]],
      inputs: {
        height: "height",
        width: "width",
        marginTop: "marginTop",
        marginRight: "marginRight",
        marginBottom: "marginBottom",
        marginLeft: "marginLeft",
        measureName: "measureName"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
      decls: 1,
      vars: 0,
      template: function LineChartComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-line-chart-audification");
        }
      },
      encapsulation: 2
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-line-chart',
          template: "\n    <app-line-chart-audification></app-line-chart-audification>\n  "
        }]
      }], function () {
        return [{
          type: _services_data_data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"]
        }, {
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
        measureName: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }]
      });
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


    var _services_data_data_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../services/data/data.module */
    "./src/services/data/data.module.ts");
    /* harmony import */


    var _line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../line-chart-audification/line-chart-audification.module */
    "./src/components/line-chart-audification/line-chart-audification.module.ts");
    /* harmony import */


    var _line_chart_audification_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../line-chart-audification/line-chart-audification.component */
    "./src/components/line-chart-audification/line-chart-audification.component.ts");

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
      imports: [[_services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"], _line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__["LineChartAudificationModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LineChartModule, {
        declarations: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]],
        imports: [_services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"], _line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__["LineChartAudificationModule"]],
        exports: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]],
          imports: [_services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"], _line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__["LineChartAudificationModule"]],
          exports: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]]
        }]
      }], null, null);
    })();

    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetComponentScope"](_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"], [_line_chart_audification_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_4__["LineChartAudificationComponent"], _line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]], []);
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

    var BaseD3 = /*#__PURE__*/function () {
      function BaseD3(elementRef) {
        _classCallCheck(this, BaseD3);

        this.elementRef = elementRef;
        this.container = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.elementRef.nativeElement);
      }

      _createClass(BaseD3, [{
        key: "apply",
        value: function apply(renderOptions) {
          this.unapply();
          this.teardown = this.render(renderOptions);
        }
      }, {
        key: "unapply",
        value: function unapply() {
          if (this.teardown) {
            this.teardown();
            this.teardown = undefined;
          }
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

    var LineChartD3 = /*#__PURE__*/function (_xy_chart_d3__WEBPACK) {
      _inherits(LineChartD3, _xy_chart_d3__WEBPACK);

      var _super = _createSuper(LineChartD3);

      function LineChartD3() {
        _classCallCheck(this, LineChartD3);

        return _super.apply(this, arguments);
      }

      _createClass(LineChartD3, [{
        key: "appendChart",
        value: function appendChart(svg, data, scaleX, scaleY) {
          var line = d3__WEBPACK_IMPORTED_MODULE_1__["line"]().defined(function (d) {
            return !isNaN(d.value);
          }).x(function (d) {
            return scaleX(d.date);
          }).y(function (d) {
            return scaleY(d.value);
          });
          svg.append('path').datum(data).attr('fill', 'none').attr('stroke', 'steelblue').attr('stroke-width', 1.5).attr('stroke-linejoin', 'round').attr('stroke-linecap', 'round').attr('d', line);
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

    var XYChartD3 = /*#__PURE__*/function (_base_d3__WEBPACK_IMP) {
      _inherits(XYChartD3, _base_d3__WEBPACK_IMP);

      var _super2 = _createSuper(XYChartD3);

      function XYChartD3() {
        _classCallCheck(this, XYChartD3);

        return _super2.apply(this, arguments);
      }

      _createClass(XYChartD3, [{
        key: "render",
        value: function render(_ref) {
          var data = _ref.data,
              height = _ref.height,
              width = _ref.width,
              marginTop = _ref.marginTop,
              marginRight = _ref.marginRight,
              marginBottom = _ref.marginBottom,
              marginLeft = _ref.marginLeft;
          var svg = this.container.append('svg').attr('viewBox', [0, 0, width, height].join(' '));
          var scaleX = d3__WEBPACK_IMPORTED_MODULE_0__["scaleUtc"]().domain(d3__WEBPACK_IMPORTED_MODULE_0__["extent"](data, function (d) {
            return d.date;
          })).range([marginLeft, width - marginRight]);
          var scaleY = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().domain([0, d3__WEBPACK_IMPORTED_MODULE_0__["max"](data, function (d) {
            return d.value;
          })]).nice().range([height - marginBottom, marginTop]);
          svg.append('g').attr('transform', "translate(0,".concat(height - marginBottom, ")")).call(d3__WEBPACK_IMPORTED_MODULE_0__["axisBottom"](scaleX).ticks(width / 80).tickSizeOuter(0));
          svg.append('g').attr('transform', "translate(".concat(marginLeft, ",0)")).call(d3__WEBPACK_IMPORTED_MODULE_0__["axisLeft"](scaleY)).call(function (g) {
            return g.select('.tick:last-of-type text').clone().attr('x', 3).attr('text-anchor', 'start').attr('font-weight', 'bold').text('Active Users');
          });
          this.appendChart(svg, data, scaleX, scaleY);
          return function () {
            svg.remove();
          };
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
          var _this = this;

          var filters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
          var sortBy = arguments.length > 3 ? arguments[3] : undefined;
          var measureIndices = measureNames.map(function (name) {
            return _this.measures.findIndex(function (measure) {
              return measure.name === name;
            });
          });
          var categoryIndices = categoryNames.map(function (name) {
            return _this.categories.findIndex(function (category) {
              return category.name === name;
            });
          });
          var categoryTrie = {
            children: {}
          };
          var filterFuncs = filters.map(function (filter) {
            return filter(_this.categories, _this.measures);
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

    function generateUsersAndSessions(_ref2) {
      var avgUsers = _ref2.avgUsers,
          userStdDev = _ref2.userStdDev,
          avgSessionsPerUser = _ref2.avgSessionsPerUser,
          sessionsPerUserStdDev = _ref2.sessionsPerUserStdDev;
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

    function generateHits(rows, measures, cumulativeWeights, sessions, _ref3) {
      var avgHits = _ref3.avgHits,
          hitStdDev = _ref3.hitStdDev;
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
  "./src/pages/audification-experiment/audification-experiment.component.ts":
  /*!********************************************************************************!*\
    !*** ./src/pages/audification-experiment/audification-experiment.component.ts ***!
    \********************************************************************************/

  /*! exports provided: AudificationExperimentComponent */

  /***/
  function srcPagesAudificationExperimentAudificationExperimentComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AudificationExperimentComponent", function () {
      return AudificationExperimentComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../../components/line-chart/line-chart.component */
    "./src/components/line-chart/line-chart.component.ts");

    var AudificationExperimentComponent = function AudificationExperimentComponent() {
      _classCallCheck(this, AudificationExperimentComponent);
    };

    AudificationExperimentComponent.ɵfac = function AudificationExperimentComponent_Factory(t) {
      return new (t || AudificationExperimentComponent)();
    };

    AudificationExperimentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AudificationExperimentComponent,
      selectors: [["app-audification-experiment"]],
      decls: 1,
      vars: 0,
      consts: [["measureName", "activeUsers"]],
      template: function AudificationExperimentComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-line-chart", 0);
        }
      },
      directives: [_components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]],
      encapsulation: 2
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AudificationExperimentComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-audification-experiment',
          templateUrl: './audification-experiment.component.html'
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/pages/audification-experiment/audification-experiment.module.ts":
  /*!*****************************************************************************!*\
    !*** ./src/pages/audification-experiment/audification-experiment.module.ts ***!
    \*****************************************************************************/

  /*! exports provided: AudificationExperimentModule */

  /***/
  function srcPagesAudificationExperimentAudificationExperimentModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AudificationExperimentModule", function () {
      return AudificationExperimentModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _audification_experiment_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./audification-experiment.component */
    "./src/pages/audification-experiment/audification-experiment.component.ts");
    /* harmony import */


    var _components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../components/line-chart/line-chart.module */
    "./src/components/line-chart/line-chart.module.ts");

    var AudificationExperimentModule = function AudificationExperimentModule() {
      _classCallCheck(this, AudificationExperimentModule);
    };

    AudificationExperimentModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: AudificationExperimentModule
    });
    AudificationExperimentModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function AudificationExperimentModule_Factory(t) {
        return new (t || AudificationExperimentModule)();
      },
      imports: [[_components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__["LineChartModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AudificationExperimentModule, {
        declarations: [_audification_experiment_component__WEBPACK_IMPORTED_MODULE_1__["AudificationExperimentComponent"]],
        imports: [_components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__["LineChartModule"]],
        exports: [_audification_experiment_component__WEBPACK_IMPORTED_MODULE_1__["AudificationExperimentComponent"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AudificationExperimentModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_audification_experiment_component__WEBPACK_IMPORTED_MODULE_1__["AudificationExperimentComponent"]],
          imports: [_components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__["LineChartModule"]],
          exports: [_audification_experiment_component__WEBPACK_IMPORTED_MODULE_1__["AudificationExperimentComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/services/audification/audification.module.ts":
  /*!**********************************************************!*\
    !*** ./src/services/audification/audification.module.ts ***!
    \**********************************************************/

  /*! exports provided: AudificationModule */

  /***/
  function srcServicesAudificationAudificationModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AudificationModule", function () {
      return AudificationModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _audification_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./audification.service */
    "./src/services/audification/audification.service.ts");

    var AudificationModule = function AudificationModule() {
      _classCallCheck(this, AudificationModule);
    };

    AudificationModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: AudificationModule
    });
    AudificationModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function AudificationModule_Factory(t) {
        return new (t || AudificationModule)();
      },
      providers: [_audification_service__WEBPACK_IMPORTED_MODULE_1__["AudificationService"]]
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AudificationModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          providers: [_audification_service__WEBPACK_IMPORTED_MODULE_1__["AudificationService"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/services/audification/audification.service.ts":
  /*!***********************************************************!*\
    !*** ./src/services/audification/audification.service.ts ***!
    \***********************************************************/

  /*! exports provided: AudificationService */

  /***/
  function srcServicesAudificationAudificationServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AudificationService", function () {
      return AudificationService;
    });
    /* harmony import */


    var tone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tone */
    "./node_modules/tone/build/esm/index.js");

    var AudificationService = /*#__PURE__*/function () {
      function AudificationService() {
        _classCallCheck(this, AudificationService);

        this.synth = new tone__WEBPACK_IMPORTED_MODULE_0__["Synth"]().toDestination();
      }

      _createClass(AudificationService, [{
        key: "audify",
        value: function audify(values, pitchRange, duration) {
          var _this2 = this;

          var part = new tone__WEBPACK_IMPORTED_MODULE_0__["Part"](function (time, event) {
            _this2.synth.triggerAttackRelease(event.note, event.dur, time);
          }, [{
            time: 0,
            note: 'C4',
            dur: '4n'
          }, {
            time: {
              '4n': 1,
              '8n': 1
            },
            note: 'E4',
            dur: '8n'
          }, {
            time: '2n',
            note: 'G4',
            dur: '16n'
          }, {
            time: {
              '2n': 1,
              '8t': 1
            },
            note: 'B4',
            dur: '4n'
          }]);
          part.start(0);
          tone__WEBPACK_IMPORTED_MODULE_0__["Transport"].start();
          return function () {
            part.dispose();
            tone__WEBPACK_IMPORTED_MODULE_0__["Transport"].stop();
          };
        }
      }]);

      return AudificationService;
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
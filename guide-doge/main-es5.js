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
    /* harmony import */


    var _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./components/dashboard/dashboard.component */
    "./src/components/dashboard/dashboard.component.ts");
    /* harmony import */


    var _components_dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./components/dashboard/dashboard.module */
    "./src/components/dashboard/dashboard.module.ts");

    var routes = [{
      path: '',
      component: _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__["DashboardComponent"],
      pathMatch: 'full'
    }];

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
      imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes), _components_dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_3__["DashboardModule"]], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, {
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"], _components_dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_3__["DashboardModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes), _components_dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_3__["DashboardModule"]],
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


    var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./i18n */
    "./src/i18n/index.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var AppComponent = /*#__PURE__*/function () {
      function AppComponent() {
        _classCallCheck(this, AppComponent);
      }

      _createClass(AppComponent, [{
        key: "TITLE",
        get: function get() {
          return Object(_i18n__WEBPACK_IMPORTED_MODULE_1__["t"])(_i18n__WEBPACK_IMPORTED_MODULE_1__["GUIDE_DOGE"].TITLE);
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
      decls: 10,
      vars: 1,
      consts: [[1, "header"], ["role", "banner", 1, "logo"], ["role", "navigation", 1, "links"], ["routerLink", "/", 1, "link", "active"], ["href", "#", 1, "link"], [1, "container"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Dashboard ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " WebVR ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "main", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "router-outlet");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.TITLE);
        }
      },
      directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]],
      styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  height: 100vh;\n  background-color: #f8f9fa;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  justify-content: space-between;\n  background-color: white;\n  border-bottom: 1px solid #dadce0;\n  padding: 0 2rem;\n  height: 4rem;\n  flex-shrink: 0;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]:hover {\n  background: linear-gradient(135deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3, #ff2400) repeat-x;\n  background-size: 800% 100%;\n  -webkit-animation: rainbow 30s linear infinite;\n          animation: rainbow 30s linear infinite;\n}\n@-webkit-keyframes rainbow {\n  0% {\n    background-position: 0 0;\n  }\n  100% {\n    background-position: 800% 0;\n  }\n}\n@keyframes rainbow {\n  0% {\n    background-position: 0 0;\n  }\n  100% {\n    background-position: 800% 0;\n  }\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]:hover   .logo[_ngcontent-%COMP%]:after {\n  content: \"\";\n  display: block;\n  margin-left: 0.5rem;\n  width: 3rem;\n  height: 3rem;\n  background-image: url('sunglass-doge.png');\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%] {\n  font-family: \"Quicksand\", sans-serif;\n  font-weight: 700;\n  font-size: 24px;\n  display: flex;\n  align-items: center;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .links[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  padding: 0 1rem;\n  display: flex;\n  align-items: center;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .links[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  font-weight: 500;\n  border-bottom: 4px solid #4285f4;\n}\n[_nghost-%COMP%]   .container[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvYXBwLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvcnVubmVyL3dvcmsvZ3VpZGUtZG9nZS9ndWlkZS1kb2dlL3NyYy91dGlscy9jb25zdGFudHMuc2NzcyIsInNyYy9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQkFBQTtFQUNBLGFBQUE7RUFDQSx5QkNQaUI7QUNNbkI7QUZHRTtFQUNFLGFBQUE7RUFDQSxvQkFBQTtFQUNBLDhCQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQ0FBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBRURKO0FGR0k7RUFDRSxzSUFBQTtFQUNBLDBCQUFBO0VBQ0EsOENBQUE7VUFBQSxzQ0FBQTtBRUROO0FGR007RUFDRTtJQUNFLHdCQUFBO0VFRFI7RUZHTTtJQUNFLDJCQUFBO0VFRFI7QUFDRjtBRkxNO0VBQ0U7SUFDRSx3QkFBQTtFRURSO0VGR007SUFDRSwyQkFBQTtFRURSO0FBQ0Y7QUZJTTtFQUNFLFdBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLDBDQUFBO0VBQ0Esd0JBQUE7RUFDQSwyQkFBQTtFQUNBLDRCQUFBO0FFRlI7QUZNSTtFQUNFLG9DQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQzFDWTtFRDJDWixhQUFBO0VBQ0EsbUJBQUE7QUVKTjtBRk9JO0VBQ0UsYUFBQTtFQUNBLG9CQUFBO0FFTE47QUZPTTtFQUNFLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUVMUjtBRk9RO0VBQ0UsZ0JBQUE7RUFDQSxnQ0FBQTtBRUxWO0FGV0U7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtBRVRKIiwiZmlsZSI6InNyYy9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi91dGlscy9jb25zdGFudHNcIjtcblxuOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWJhY2tncm91bmQ7XG5cbiAgLmhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRjb2xvci1ib3JkZXI7XG4gICAgcGFkZGluZzogMCAycmVtO1xuICAgIGhlaWdodDogNHJlbTtcbiAgICBmbGV4LXNocmluazogMDtcblxuICAgICY6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmMjQwMCwgI2U4MWQxZCwgI2U4YjcxZCwgI2UzZTgxZCwgIzFkZTg0MCwgIzFkZGRlOCwgIzJiMWRlOCwgI2RkMDBmMywgI2RkMDBmMywgI2ZmMjQwMCkgcmVwZWF0LXg7XG4gICAgICBiYWNrZ3JvdW5kLXNpemU6IDgwMCUgMTAwJTtcbiAgICAgIGFuaW1hdGlvbjogcmFpbmJvdyAzMHMgbGluZWFyIGluZmluaXRlO1xuXG4gICAgICBAa2V5ZnJhbWVzIHJhaW5ib3cge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwXG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogODAwJSAwXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLmxvZ286YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAuNXJlbTtcbiAgICAgICAgd2lkdGg6IDNyZW07XG4gICAgICAgIGhlaWdodDogM3JlbTtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vYXNzZXRzL3N1bmdsYXNzLWRvZ2UucG5nKTtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmxvZ28ge1xuICAgICAgZm9udC1mYW1pbHk6ICdRdWlja3NhbmQnLCBzYW5zLXNlcmlmO1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1sYXJnZTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cblxuICAgIC5saW5rcyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG5cbiAgICAgIGEge1xuICAgICAgICBwYWRkaW5nOiAwIDFyZW07XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgJi5hY3RpdmUge1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbTogNHB4IHNvbGlkICRjb2xvci1oaWdobGlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAuY29udGFpbmVyIHtcbiAgICBmbGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG59XG4iLCIkY29sb3ItYmFja2dyb3VuZDogcmdiKDI0OCwgMjQ5LCAyNTApO1xuJGNvbG9yLWJvcmRlcjogcmdiKDIxOCwgMjIwLCAyMjQpO1xuJGNvbG9yLWZvbnQ6IHJnYigzNCwgMzQsIDM0KTtcbiRjb2xvci1oaWdobGlnaHQ6IHJnYig2NiwgMTMzLCAyNDQpO1xuJGNvbG9yLXBvc2l0aXZlOiByZ2IoMTUsIDE1NywgODgpO1xuJGNvbG9yLW5lZ2F0aXZlOiByZ2IoMjE5LCA2OCwgNTUpO1xuXG4kZm9udC1zaXplLWxhcmdlOiAyNHB4O1xuJGZvbnQtc2l6ZS1tZWRpdW06IDE2cHg7XG4kZm9udC1zaXplLXNtYWxsOiAxMnB4O1xuXG5AbWl4aW4gY2FyZC1zaGFkb3cge1xuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMikgMCAxcHggM3B4IDAsIHJnYmEoMCwgMCwgMCwgMC4xNCkgMCAxcHggMXB4IDAsIHJnYmEoMCwgMCwgMCwgMC4xMikgMCAycHggMXB4IC0xcHg7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBoZWlnaHQ6IDEwMHZoO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOWZhO1xufVxuOmhvc3QgLmhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RhZGNlMDtcbiAgcGFkZGluZzogMCAycmVtO1xuICBoZWlnaHQ6IDRyZW07XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuOmhvc3QgLmhlYWRlcjpob3ZlciB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmZjI0MDAsICNlODFkMWQsICNlOGI3MWQsICNlM2U4MWQsICMxZGU4NDAsICMxZGRkZTgsICMyYjFkZTgsICNkZDAwZjMsICNkZDAwZjMsICNmZjI0MDApIHJlcGVhdC14O1xuICBiYWNrZ3JvdW5kLXNpemU6IDgwMCUgMTAwJTtcbiAgYW5pbWF0aW9uOiByYWluYm93IDMwcyBsaW5lYXIgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIHJhaW5ib3cge1xuICAwJSB7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xuICB9XG4gIDEwMCUge1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDgwMCUgMDtcbiAgfVxufVxuOmhvc3QgLmhlYWRlcjpob3ZlciAubG9nbzphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tbGVmdDogMC41cmVtO1xuICB3aWR0aDogM3JlbTtcbiAgaGVpZ2h0OiAzcmVtO1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9hc3NldHMvc3VuZ2xhc3MtZG9nZS5wbmcpO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbn1cbjpob3N0IC5oZWFkZXIgLmxvZ28ge1xuICBmb250LWZhbWlseTogXCJRdWlja3NhbmRcIiwgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuOmhvc3QgLmhlYWRlciAubGlua3Mge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbn1cbjpob3N0IC5oZWFkZXIgLmxpbmtzIGEge1xuICBwYWRkaW5nOiAwIDFyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG46aG9zdCAuaGVhZGVyIC5saW5rcyBhLmFjdGl2ZSB7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGJvcmRlci1ib3R0b206IDRweCBzb2xpZCAjNDI4NWY0O1xufVxuOmhvc3QgLmNvbnRhaW5lciB7XG4gIGZsZXg6IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"]
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
      imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, {
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]],
          bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/components/card/card.component.ts":
  /*!***********************************************!*\
    !*** ./src/components/card/card.component.ts ***!
    \***********************************************/

  /*! exports provided: CardComponent */

  /***/
  function srcComponentsCardCardComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CardComponent", function () {
      return CardComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _utils_formatters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../../utils/formatters */
    "./src/utils/formatters.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../line-chart/line-chart.component */
    "./src/components/line-chart/line-chart.component.ts");
    /* harmony import */


    var _directives_audification_audification_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../directives/audification/audification.directive */
    "./src/directives/audification/audification.directive.ts");

    function CardComponent_div_3_div_1_Template(rf, ctx) {
      if (rf & 1) {
        var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_div_3_div_1_Template_div_click_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5);

          var measureName_r3 = ctx.$implicit;

          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          return ctx_r4.setMeasureName(measureName_r3);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var measureName_r3 = ctx.$implicit;

        var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("active", measureName_r3 === ctx_r2.currentMeasureName);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r2.humanizeMeasureName(measureName_r3), " ");
      }
    }

    function CardComponent_div_3_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CardComponent_div_3_div_1_Template, 2, 3, "div", 6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.measureNames);
      }
    }

    function CardComponent_app_line_chart_5_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-line-chart", 8);
      }

      if (rf & 2) {
        var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("measureName", ctx_r1.currentMeasureName);
      }
    }

    var CardComponent = /*#__PURE__*/function () {
      function CardComponent() {
        _classCallCheck(this, CardComponent);

        this.tabbed = false;
        this.humanizeMeasureName = _utils_formatters__WEBPACK_IMPORTED_MODULE_1__["humanizeMeasureName"];
      }

      _createClass(CardComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.setMeasureName(this.measureNames[0]);
        }
      }, {
        key: "setMeasureName",
        value: function setMeasureName(measureName) {
          this.currentMeasureName = measureName;
        }
      }]);

      return CardComponent;
    }();

    CardComponent.ɵfac = function CardComponent_Factory(t) {
      return new (t || CardComponent)();
    };

    CardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: CardComponent,
      selectors: [["app-card"]],
      inputs: {
        title: "title",
        tabbed: "tabbed",
        type: "type",
        measureNames: "measureNames"
      },
      decls: 6,
      vars: 4,
      consts: [[1, "card-title"], [1, "card-content"], ["class", "tabs", 4, "ngIf"], [3, "ngSwitch"], ["appAudification", "", 3, "measureName", 4, "ngSwitchCase"], [1, "tabs"], ["class", "tab", "role", "button", 3, "active", "click", 4, "ngFor", "ngForOf"], ["role", "button", 1, "tab", 3, "click"], ["appAudification", "", 3, "measureName"]],
      template: function CardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, CardComponent_div_3_Template, 2, 1, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](4, 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, CardComponent_app_line_chart_5_Template, 1, 1, "app-line-chart", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.title);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.tabbed);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", ctx.type);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "line");
        }
      },
      directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitchCase"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_3__["LineChartComponent"], _directives_audification_audification_directive__WEBPACK_IMPORTED_MODULE_4__["AudificationDirective"]],
      styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n}\n[_nghost-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin: 1rem 0;\n}\n[_nghost-%COMP%]   .card-content[_ngcontent-%COMP%] {\n  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px 0, rgba(0, 0, 0, 0.14) 0 1px 1px 0, rgba(0, 0, 0, 0.12) 0 2px 1px -1px;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  border-radius: 2px;\n  background-color: white;\n}\n[_nghost-%COMP%]   .card-content[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  height: 4rem;\n}\n[_nghost-%COMP%]   .card-content[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n[_nghost-%COMP%]   .card-content[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   .tab.active[_ngcontent-%COMP%] {\n  border-top: 4px solid #4285f4;\n  font-weight: 500;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvY29tcG9uZW50cy9jYXJkL2NhcmQuY29tcG9uZW50LnNjc3MiLCJzcmMvY29tcG9uZW50cy9jYXJkL2NhcmQuY29tcG9uZW50LnNjc3MiLCIvaG9tZS9ydW5uZXIvd29yay9ndWlkZS1kb2dlL2d1aWRlLWRvZ2Uvc3JjL3V0aWxzL2NvbnN0YW50cy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esb0JBQUE7QUNERjtBREdFO0VBQ0UsZUVEYztFRkVkLGNBQUE7QUNESjtBRElFO0VFQUEsK0dBQUE7RUZFRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7QUNGSjtBRElJO0VBQ0UsYUFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtBQ0ZOO0FESU07RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0FDRlI7QURJUTtFQUNFLDZCQUFBO0VBQ0EsZ0JBQUE7QUNGViIsImZpbGUiOiJzcmMvY29tcG9uZW50cy9jYXJkL2NhcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5cbjpob3N0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG5cbiAgLmNhcmQtdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1sYXJnZTtcbiAgICBtYXJnaW46IDFyZW0gMDtcbiAgfVxuXG4gIC5jYXJkLWNvbnRlbnQge1xuICAgIEBpbmNsdWRlIGNhcmQtc2hhZG93O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG5cbiAgICAudGFicyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gICAgICBoZWlnaHQ6IDRyZW07XG5cbiAgICAgIC50YWIge1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICAgICAgICYuYWN0aXZlIHtcbiAgICAgICAgICBib3JkZXItdG9wOiA0cHggc29saWQgJGNvbG9yLWhpZ2hsaWdodDtcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xufVxuOmhvc3QgLmNhcmQtdGl0bGUge1xuICBmb250LXNpemU6IDI0cHg7XG4gIG1hcmdpbjogMXJlbSAwO1xufVxuOmhvc3QgLmNhcmQtY29udGVudCB7XG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4yKSAwIDFweCAzcHggMCwgcmdiYSgwLCAwLCAwLCAwLjE0KSAwIDFweCAxcHggMCwgcmdiYSgwLCAwLCAwLCAwLjEyKSAwIDJweCAxcHggLTFweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG46aG9zdCAuY2FyZC1jb250ZW50IC50YWJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGhlaWdodDogNHJlbTtcbn1cbjpob3N0IC5jYXJkLWNvbnRlbnQgLnRhYnMgLnRhYiB7XG4gIGZsZXg6IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG46aG9zdCAuY2FyZC1jb250ZW50IC50YWJzIC50YWIuYWN0aXZlIHtcbiAgYm9yZGVyLXRvcDogNHB4IHNvbGlkICM0Mjg1ZjQ7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59IiwiJGNvbG9yLWJhY2tncm91bmQ6IHJnYigyNDgsIDI0OSwgMjUwKTtcbiRjb2xvci1ib3JkZXI6IHJnYigyMTgsIDIyMCwgMjI0KTtcbiRjb2xvci1mb250OiByZ2IoMzQsIDM0LCAzNCk7XG4kY29sb3ItaGlnaGxpZ2h0OiByZ2IoNjYsIDEzMywgMjQ0KTtcbiRjb2xvci1wb3NpdGl2ZTogcmdiKDE1LCAxNTcsIDg4KTtcbiRjb2xvci1uZWdhdGl2ZTogcmdiKDIxOSwgNjgsIDU1KTtcblxuJGZvbnQtc2l6ZS1sYXJnZTogMjRweDtcbiRmb250LXNpemUtbWVkaXVtOiAxNnB4O1xuJGZvbnQtc2l6ZS1zbWFsbDogMTJweDtcblxuQG1peGluIGNhcmQtc2hhZG93IHtcbiAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjIpIDAgMXB4IDNweCAwLCByZ2JhKDAsIDAsIDAsIDAuMTQpIDAgMXB4IDFweCAwLCByZ2JhKDAsIDAsIDAsIDAuMTIpIDAgMnB4IDFweCAtMXB4O1xufVxuIl19 */"]
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-card',
          templateUrl: './card.component.html',
          styleUrls: ['./card.component.scss']
        }]
      }], null, {
        title: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        tabbed: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        type: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        measureNames: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }]
      });
    })();
    /***/

  },

  /***/
  "./src/components/card/card.module.ts":
  /*!********************************************!*\
    !*** ./src/components/card/card.module.ts ***!
    \********************************************/

  /*! exports provided: CardModule */

  /***/
  function srcComponentsCardCardModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CardModule", function () {
      return CardModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _card_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./card.component */
    "./src/components/card/card.component.ts");
    /* harmony import */


    var _line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../line-chart/line-chart.module */
    "./src/components/line-chart/line-chart.module.ts");
    /* harmony import */


    var _directives_audification_audification_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../directives/audification/audification.module */
    "./src/directives/audification/audification.module.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");

    var CardModule = function CardModule() {
      _classCallCheck(this, CardModule);
    };

    CardModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: CardModule
    });
    CardModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function CardModule_Factory(t) {
        return new (t || CardModule)();
      },
      imports: [[_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__["LineChartModule"], _directives_audification_audification_module__WEBPACK_IMPORTED_MODULE_3__["AudificationModule"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CardModule, {
        declarations: [_card_component__WEBPACK_IMPORTED_MODULE_1__["CardComponent"]],
        imports: [_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__["LineChartModule"], _directives_audification_audification_module__WEBPACK_IMPORTED_MODULE_3__["AudificationModule"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]],
        exports: [_card_component__WEBPACK_IMPORTED_MODULE_1__["CardComponent"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CardModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_card_component__WEBPACK_IMPORTED_MODULE_1__["CardComponent"]],
          imports: [_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__["LineChartModule"], _directives_audification_audification_module__WEBPACK_IMPORTED_MODULE_3__["AudificationModule"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]],
          exports: [_card_component__WEBPACK_IMPORTED_MODULE_1__["CardComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/components/dashboard/dashboard.component.ts":
  /*!*********************************************************!*\
    !*** ./src/components/dashboard/dashboard.component.ts ***!
    \*********************************************************/

  /*! exports provided: DashboardComponent */

  /***/
  function srcComponentsDashboardDashboardComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DashboardComponent", function () {
      return DashboardComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../../i18n */
    "./src/i18n/index.ts");
    /* harmony import */


    var _services_preference_preference_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../services/preference/preference.service */
    "./src/services/preference/preference.service.ts");
    /* harmony import */


    var _preference_group_preference_group_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../preference-group/preference-group.component */
    "./src/components/preference-group/preference-group.component.ts");
    /* harmony import */


    var _card_card_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../card/card.component */
    "./src/components/card/card.component.ts");

    var _c0 = function _c0() {
      return ["activeUsers", "revenue", "eventCount"];
    };

    var DashboardComponent = function DashboardComponent(preferenceService) {
      _classCallCheck(this, DashboardComponent);

      this.preferenceService = preferenceService;
      this.audification$ = this.preferenceService.audification$;
      this.dataTable$ = this.preferenceService.dataTable$;
      this.textSummary$ = this.preferenceService.textSummary$;
      this.AUDIFICATION_PREFERENCE = _i18n__WEBPACK_IMPORTED_MODULE_1__["AUDIFICATION_PREFERENCE"];
      this.DATA_TABLE_PREFERENCE = _i18n__WEBPACK_IMPORTED_MODULE_1__["DATA_TABLE_PREFERENCE"];
      this.TEXT_SUMMARY_PREFERENCE = _i18n__WEBPACK_IMPORTED_MODULE_1__["TEXT_SUMMARY_PREFERENCE"];
    };

    DashboardComponent.ɵfac = function DashboardComponent_Factory(t) {
      return new (t || DashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_preference_preference_service__WEBPACK_IMPORTED_MODULE_2__["PreferenceService"]));
    };

    DashboardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: DashboardComponent,
      selectors: [["app-dashboard"]],
      decls: 9,
      vars: 12,
      consts: [[1, "sidebar"], [1, "sidebar-title"], [3, "preference$", "i18n"], [1, "card-container"], ["title", "Tabbed Line Chart", "type", "line", 3, "tabbed", "measureNames"], ["title", "Line Chart", "type", "line", 3, "tabbed", "measureNames"]],
      template: function DashboardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "aside", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Customization");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-preference-group", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-preference-group", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "app-preference-group", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "app-card", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "app-card", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("preference$", ctx.audification$)("i18n", ctx.AUDIFICATION_PREFERENCE);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("preference$", ctx.dataTable$)("i18n", ctx.DATA_TABLE_PREFERENCE);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("preference$", ctx.textSummary$)("i18n", ctx.TEXT_SUMMARY_PREFERENCE);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("tabbed", true)("measureNames", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](10, _c0));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("tabbed", false)("measureNames", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](11, _c0));
        }
      },
      directives: [_preference_group_preference_group_component__WEBPACK_IMPORTED_MODULE_3__["PreferenceGroupComponent"], _card_card_component__WEBPACK_IMPORTED_MODULE_4__["CardComponent"]],
      styles: ["[_nghost-%COMP%] {\n  flex: 1;\n  display: flex;\n  overflow: hidden;\n}\n[_nghost-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n  padding: 1rem;\n  width: 20rem;\n  border-right: 1px solid #dadce0;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n[_nghost-%COMP%]   .sidebar[_ngcontent-%COMP%]   .sidebar-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin: 1rem 0;\n}\n[_nghost-%COMP%]   .sidebar[_ngcontent-%COMP%]   app-preference-group[_ngcontent-%COMP%] {\n  margin: 0 -1rem;\n  margin-bottom: 0.5rem;\n}\n[_nghost-%COMP%]   .card-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1 0;\n  align-items: flex-start;\n  justify-content: center;\n  flex-wrap: wrap;\n  padding-top: 1rem;\n  padding-left: 1rem;\n  overflow-y: auto;\n}\n[_nghost-%COMP%]   .card-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  margin-right: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIiwic3JjL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuc2NzcyIsIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvdXRpbHMvY29uc3RhbnRzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FDREY7QURHRTtFQUNFLGFBQUE7RUFDQSxZQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FDREo7QURHSTtFQUNFLGVFUlk7RUZTWixjQUFBO0FDRE47QURJSTtFQUNFLGVBQUE7RUFDQSxxQkFBQTtBQ0ZOO0FETUU7RUFDRSxhQUFBO0VBQ0EsU0FBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FDSko7QURNSTtFQUNFLG1CQUFBO0VBQ0Esa0JBQUE7QUNKTiIsImZpbGUiOiJzcmMvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uL3V0aWxzL2NvbnN0YW50c1wiO1xuXG46aG9zdCB7XG4gIGZsZXg6IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgLnNpZGViYXIge1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgd2lkdGg6IDIwcmVtO1xuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICRjb2xvci1ib3JkZXI7XG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG5cbiAgICAuc2lkZWJhci10aXRsZSB7XG4gICAgICBmb250LXNpemU6ICRmb250LXNpemUtbGFyZ2U7XG4gICAgICBtYXJnaW46IDFyZW0gMDtcbiAgICB9XG5cbiAgICBhcHAtcHJlZmVyZW5jZS1ncm91cCB7XG4gICAgICBtYXJnaW46IDAgLTFyZW07XG4gICAgICBtYXJnaW4tYm90dG9tOiAuNXJlbTtcbiAgICB9XG4gIH1cblxuICAuY2FyZC1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleDogMSAwO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XG4gICAgb3ZlcmZsb3cteTogYXV0bztcblxuICAgID4gKiB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgICAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xuICAgIH1cbiAgfVxufVxuIiwiOmhvc3Qge1xuICBmbGV4OiAxO1xuICBkaXNwbGF5OiBmbGV4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuOmhvc3QgLnNpZGViYXIge1xuICBwYWRkaW5nOiAxcmVtO1xuICB3aWR0aDogMjByZW07XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNkYWRjZTA7XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cbjpob3N0IC5zaWRlYmFyIC5zaWRlYmFyLXRpdGxlIHtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBtYXJnaW46IDFyZW0gMDtcbn1cbjpob3N0IC5zaWRlYmFyIGFwcC1wcmVmZXJlbmNlLWdyb3VwIHtcbiAgbWFyZ2luOiAwIC0xcmVtO1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG46aG9zdCAuY2FyZC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4OiAxIDA7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgcGFkZGluZy1sZWZ0OiAxcmVtO1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuOmhvc3QgLmNhcmQtY29udGFpbmVyID4gKiB7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIG1hcmdpbi1yaWdodDogMXJlbTtcbn0iLCIkY29sb3ItYmFja2dyb3VuZDogcmdiKDI0OCwgMjQ5LCAyNTApO1xuJGNvbG9yLWJvcmRlcjogcmdiKDIxOCwgMjIwLCAyMjQpO1xuJGNvbG9yLWZvbnQ6IHJnYigzNCwgMzQsIDM0KTtcbiRjb2xvci1oaWdobGlnaHQ6IHJnYig2NiwgMTMzLCAyNDQpO1xuJGNvbG9yLXBvc2l0aXZlOiByZ2IoMTUsIDE1NywgODgpO1xuJGNvbG9yLW5lZ2F0aXZlOiByZ2IoMjE5LCA2OCwgNTUpO1xuXG4kZm9udC1zaXplLWxhcmdlOiAyNHB4O1xuJGZvbnQtc2l6ZS1tZWRpdW06IDE2cHg7XG4kZm9udC1zaXplLXNtYWxsOiAxMnB4O1xuXG5AbWl4aW4gY2FyZC1zaGFkb3cge1xuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMikgMCAxcHggM3B4IDAsIHJnYmEoMCwgMCwgMCwgMC4xNCkgMCAxcHggMXB4IDAsIHJnYmEoMCwgMCwgMCwgMC4xMikgMCAycHggMXB4IC0xcHg7XG59XG4iXX0= */"]
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DashboardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-dashboard',
          templateUrl: './dashboard.component.html',
          styleUrls: ['./dashboard.component.scss']
        }]
      }], function () {
        return [{
          type: _services_preference_preference_service__WEBPACK_IMPORTED_MODULE_2__["PreferenceService"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/components/dashboard/dashboard.module.ts":
  /*!******************************************************!*\
    !*** ./src/components/dashboard/dashboard.module.ts ***!
    \******************************************************/

  /*! exports provided: DashboardModule */

  /***/
  function srcComponentsDashboardDashboardModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DashboardModule", function () {
      return DashboardModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _dashboard_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./dashboard.component */
    "./src/components/dashboard/dashboard.component.ts");
    /* harmony import */


    var _preference_group_preference_group_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../preference-group/preference-group.module */
    "./src/components/preference-group/preference-group.module.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _card_card_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../card/card.module */
    "./src/components/card/card.module.ts");
    /* harmony import */


    var _preference_item_preference_item_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../preference-item/preference-item.module */
    "./src/components/preference-item/preference-item.module.ts");
    /* harmony import */


    var _services_preference_preference_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../services/preference/preference.module */
    "./src/services/preference/preference.module.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");

    var DashboardModule = function DashboardModule() {
      _classCallCheck(this, DashboardModule);
    };

    DashboardModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: DashboardModule
    });
    DashboardModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function DashboardModule_Factory(t) {
        return new (t || DashboardModule)();
      },
      imports: [[_services_preference_preference_module__WEBPACK_IMPORTED_MODULE_6__["PreferenceModule"], _preference_group_preference_group_module__WEBPACK_IMPORTED_MODULE_2__["PreferenceGroupModule"], _preference_item_preference_item_module__WEBPACK_IMPORTED_MODULE_5__["PreferenceItemModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _card_card_module__WEBPACK_IMPORTED_MODULE_4__["CardModule"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["CommonModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](DashboardModule, {
        declarations: [_dashboard_component__WEBPACK_IMPORTED_MODULE_1__["DashboardComponent"]],
        imports: [_services_preference_preference_module__WEBPACK_IMPORTED_MODULE_6__["PreferenceModule"], _preference_group_preference_group_module__WEBPACK_IMPORTED_MODULE_2__["PreferenceGroupModule"], _preference_item_preference_item_module__WEBPACK_IMPORTED_MODULE_5__["PreferenceItemModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _card_card_module__WEBPACK_IMPORTED_MODULE_4__["CardModule"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["CommonModule"]],
        exports: [_dashboard_component__WEBPACK_IMPORTED_MODULE_1__["DashboardComponent"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DashboardModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_dashboard_component__WEBPACK_IMPORTED_MODULE_1__["DashboardComponent"]],
          imports: [_services_preference_preference_module__WEBPACK_IMPORTED_MODULE_6__["PreferenceModule"], _preference_group_preference_group_module__WEBPACK_IMPORTED_MODULE_2__["PreferenceGroupModule"], _preference_item_preference_item_module__WEBPACK_IMPORTED_MODULE_5__["PreferenceItemModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _card_card_module__WEBPACK_IMPORTED_MODULE_4__["CardModule"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["CommonModule"]],
          exports: [_dashboard_component__WEBPACK_IMPORTED_MODULE_1__["DashboardComponent"]]
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


    var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../i18n */
    "./src/i18n/index.ts");
    /* harmony import */


    var _utils_formatters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../utils/formatters */
    "./src/utils/formatters.ts");
    /* harmony import */


    var _directives_a11y_placeholder_a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../../directives/a11y-placeholder/a11y-placeholder.directive */
    "./src/directives/a11y-placeholder/a11y-placeholder.directive.ts");
    /* harmony import */


    var _services_data_data_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../services/data/data.service */
    "./src/services/data/data.service.ts");

    function LineChartComponent_ng_template_4_Template(rf, ctx) {}

    var LineChartComponent = /*#__PURE__*/function () {
      function LineChartComponent(dataService, elementRef) {
        _classCallCheck(this, LineChartComponent);

        this.dataService = dataService;
        this.elementRef = elementRef;
        this.height = 500;
        this.width = 800;
        this.marginTop = 20;
        this.marginRight = 30;
        this.marginBottom = 30;
        this.marginLeft = 40;
        this.data$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this.activeDatum$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.lineChartD3 = new _d3_line_chart_d3__WEBPACK_IMPORTED_MODULE_1__["LineChartD3"](this);
      }

      _createClass(LineChartComponent, [{
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
          if ('measureName' in changes) {
            this.data = this.dataService.getMeasureOverDays(this.measureName);
            this.activeDatum = null;
          }
        }
      }, {
        key: "data",
        get: function get() {
          return this.data$.value;
        },
        set: function set(data) {
          this.data$.next(data);
        }
      }, {
        key: "activeDatum",
        get: function get() {
          return this.activeDatum$.value;
        },
        set: function set(activeDatum) {
          this.activeDatum$.next(activeDatum);
        }
      }, {
        key: "ACTIVE_DATUM",
        get: function get() {
          if (!this.activeDatum) {
            return null;
          }

          var _this$activeDatum = this.activeDatum,
              date = _this$activeDatum.date,
              value = _this$activeDatum.value;
          return Object(_i18n__WEBPACK_IMPORTED_MODULE_3__["t"])(_i18n__WEBPACK_IMPORTED_MODULE_3__["AUDIFICATION"].ACTIVE_DATUM, {
            x: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatX"])(date),
            y: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatY"])(value)
          });
        }
      }, {
        key: "VISUALIZATION",
        get: function get() {
          return Object(_i18n__WEBPACK_IMPORTED_MODULE_3__["t"])(_i18n__WEBPACK_IMPORTED_MODULE_3__["GUIDE_DOGE"].VISUALIZATION);
        }
      }]);

      return LineChartComponent;
    }();

    LineChartComponent.ɵfac = function LineChartComponent_Factory(t) {
      return new (t || LineChartComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_data_data_service__WEBPACK_IMPORTED_MODULE_6__["DataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]));
    };

    LineChartComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: LineChartComponent,
      selectors: [["app-line-chart"]],
      viewQuery: function LineChartComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_directives_a11y_placeholder_a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_5__["A11yPlaceholderDirective"], true);
        }

        if (rf & 2) {
          var _t;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.a11yPlaceholder = _t.first);
        }
      },
      inputs: {
        measureName: "measureName",
        height: "height",
        width: "width",
        marginTop: "marginTop",
        marginRight: "marginRight",
        marginBottom: "marginBottom",
        marginLeft: "marginLeft"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
      decls: 5,
      vars: 2,
      consts: [["role", "img", 1, "svg-wrapper"], [1, "active-indicator"], ["appA11yPlaceholder", ""]],
      template: function LineChartComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "svg");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, LineChartComponent_ng_template_4_Template, 0, 0, "ng-template", 2);
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", ctx.VISUALIZATION);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.ACTIVE_DATUM, " ");
        }
      },
      directives: [_directives_a11y_placeholder_a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_5__["A11yPlaceholderDirective"]],
      styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n[_nghost-%COMP%]   .svg-wrapper[_ngcontent-%COMP%] {\n  box-sizing: content-box;\n  position: relative;\n  margin: 1.5rem;\n}\n[_nghost-%COMP%]   .svg-wrapper[_ngcontent-%COMP%]   .active-indicator[_ngcontent-%COMP%] {\n  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px 0, rgba(0, 0, 0, 0.14) 0 1px 1px 0, rgba(0, 0, 0, 0.12) 0 2px 1px -1px;\n  position: absolute;\n  font-weight: 500;\n  padding: 1rem;\n  background-color: white;\n  white-space: nowrap;\n  color: #4285f4;\n  opacity: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvY29tcG9uZW50cy9saW5lLWNoYXJ0L2xpbmUtY2hhcnQuY29tcG9uZW50LnNjc3MiLCJzcmMvY29tcG9uZW50cy9saW5lLWNoYXJ0L2xpbmUtY2hhcnQuY29tcG9uZW50LnNjc3MiLCIvaG9tZS9ydW5uZXIvd29yay9ndWlkZS1kb2dlL2d1aWRlLWRvZ2Uvc3JjL3V0aWxzL2NvbnN0YW50cy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FDREY7QURHRTtFQUNFLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FDREo7QURHSTtFRUNGLCtHQUFBO0VGQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0VmWTtFRmdCWixVQUFBO0FDRE4iLCJmaWxlIjoic3JjL2NvbXBvbmVudHMvbGluZS1jaGFydC9saW5lLWNoYXJ0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uL3V0aWxzL2NvbnN0YW50c1wiO1xuXG46aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cbiAgLnN2Zy13cmFwcGVyIHtcbiAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbWFyZ2luOiAxLjVyZW07XG5cbiAgICAuYWN0aXZlLWluZGljYXRvciB7XG4gICAgICBAaW5jbHVkZSBjYXJkLXNoYWRvdztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBwYWRkaW5nOiAxcmVtO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgY29sb3I6ICRjb2xvci1oaWdobGlnaHQ7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgfVxufVxuIiwiOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuOmhvc3QgLnN2Zy13cmFwcGVyIHtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luOiAxLjVyZW07XG59XG46aG9zdCAuc3ZnLXdyYXBwZXIgLmFjdGl2ZS1pbmRpY2F0b3Ige1xuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMikgMCAxcHggM3B4IDAsIHJnYmEoMCwgMCwgMCwgMC4xNCkgMCAxcHggMXB4IDAsIHJnYmEoMCwgMCwgMCwgMC4xMikgMCAycHggMXB4IC0xcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgcGFkZGluZzogMXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIGNvbG9yOiAjNDI4NWY0O1xuICBvcGFjaXR5OiAwO1xufSIsIiRjb2xvci1iYWNrZ3JvdW5kOiByZ2IoMjQ4LCAyNDksIDI1MCk7XG4kY29sb3ItYm9yZGVyOiByZ2IoMjE4LCAyMjAsIDIyNCk7XG4kY29sb3ItZm9udDogcmdiKDM0LCAzNCwgMzQpO1xuJGNvbG9yLWhpZ2hsaWdodDogcmdiKDY2LCAxMzMsIDI0NCk7XG4kY29sb3ItcG9zaXRpdmU6IHJnYigxNSwgMTU3LCA4OCk7XG4kY29sb3ItbmVnYXRpdmU6IHJnYigyMTksIDY4LCA1NSk7XG5cbiRmb250LXNpemUtbGFyZ2U6IDI0cHg7XG4kZm9udC1zaXplLW1lZGl1bTogMTZweDtcbiRmb250LXNpemUtc21hbGw6IDEycHg7XG5cbkBtaXhpbiBjYXJkLXNoYWRvdyB7XG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4yKSAwIDFweCAzcHggMCwgcmdiYSgwLCAwLCAwLCAwLjE0KSAwIDFweCAxcHggMCwgcmdiYSgwLCAwLCAwLCAwLjEyKSAwIDJweCAxcHggLTFweDtcbn1cbiJdfQ== */"]
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-line-chart',
          templateUrl: './line-chart.component.html',
          styleUrls: ['./line-chart.component.scss']
        }]
      }], function () {
        return [{
          type: _services_data_data_service__WEBPACK_IMPORTED_MODULE_6__["DataService"]
        }, {
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
        }];
      }, {
        a11yPlaceholder: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
          args: [_directives_a11y_placeholder_a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_5__["A11yPlaceholderDirective"], {
            "static": true
          }]
        }],
        measureName: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
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


    var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _directives_a11y_placeholder_a11y_placeholder_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../directives/a11y-placeholder/a11y-placeholder.module */
    "./src/directives/a11y-placeholder/a11y-placeholder.module.ts");

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
      imports: [[_services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _directives_a11y_placeholder_a11y_placeholder_module__WEBPACK_IMPORTED_MODULE_4__["A11yPlaceholderModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LineChartModule, {
        declarations: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]],
        imports: [_services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _directives_a11y_placeholder_a11y_placeholder_module__WEBPACK_IMPORTED_MODULE_4__["A11yPlaceholderModule"]],
        exports: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]],
          imports: [_services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _directives_a11y_placeholder_a11y_placeholder_module__WEBPACK_IMPORTED_MODULE_4__["A11yPlaceholderModule"]],
          exports: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/components/preference-group/preference-group.component.ts":
  /*!***********************************************************************!*\
    !*** ./src/components/preference-group/preference-group.component.ts ***!
    \***********************************************************************/

  /*! exports provided: PreferenceGroupComponent */

  /***/
  function srcComponentsPreferenceGroupPreferenceGroupComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PreferenceGroupComponent", function () {
      return PreferenceGroupComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../../i18n */
    "./src/i18n/index.ts");

    function PreferenceGroupComponent_ng_container_4_app_preference_item_1_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-preference-item", 5);
      }

      if (rf & 2) {
        var property_r2 = ctx.$implicit;

        var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("name", ctx_r1.getI18nValue(property_r2))("property", property_r2);
      }
    }

    function PreferenceGroupComponent_ng_container_4_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PreferenceGroupComponent_ng_container_4_app_preference_item_1_Template, 1, 2, "app-preference-item", 4);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
      }

      if (rf & 2) {
        var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.childProperties);
      }
    }

    var _c0 = ["*"];

    var PreferenceGroupComponent = /*#__PURE__*/function () {
      function PreferenceGroupComponent() {
        _classCallCheck(this, PreferenceGroupComponent);
      }

      _createClass(PreferenceGroupComponent, [{
        key: "getI18nValue",
        value: function getI18nValue(key) {
          return this.i18n && Object(_i18n__WEBPACK_IMPORTED_MODULE_1__["t"])(this.i18n[key]);
        }
      }, {
        key: "enabled",
        get: function get() {
          return this.preference$.value.enabled;
        },
        set: function set(value) {
          this.preference$.next(Object.assign(Object.assign({}, this.preference$.value), {
            enabled: value
          }));
        }
      }, {
        key: "childProperties",
        get: function get() {
          var properties = Object.keys(this.preference$.value);
          return properties.filter(function (property) {
            return property !== 'enabled';
          });
        }
      }]);

      return PreferenceGroupComponent;
    }();

    PreferenceGroupComponent.ɵfac = function PreferenceGroupComponent_Factory(t) {
      return new (t || PreferenceGroupComponent)();
    };

    PreferenceGroupComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: PreferenceGroupComponent,
      selectors: [["app-preference-group"]],
      inputs: {
        name: "name",
        i18n: "i18n",
        preference$: "preference$"
      },
      ngContentSelectors: _c0,
      decls: 5,
      vars: 5,
      consts: [[1, "header"], [1, "title"], [3, "value", "valueChange"], [4, "ngIf"], [3, "name", "property", 4, "ngFor", "ngForOf"], [3, "name", "property"]],
      template: function PreferenceGroupComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "app-switch", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function PreferenceGroupComponent_Template_app_switch_valueChange_3_listener($event) {
            return ctx.enabled = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, PreferenceGroupComponent_ng_container_4_Template, 3, 1, "ng-container", 3);
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("enabled", ctx.enabled);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.name || ctx.getI18nValue("enabled"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.enabled);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.enabled);
        }
      },
      styles: ["[_nghost-%COMP%] {\n  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px 0, rgba(0, 0, 0, 0.14) 0 1px 1px 0, rgba(0, 0, 0, 0.12) 0 2px 1px -1px;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  background-color: white;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%] {\n  background-color: white;\n  width: 2.8rem;\n  height: 1.5rem;\n  border-radius: 1.5rem;\n  border: 1px solid #dadce0;\n  box-sizing: content-box;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%], [_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%] {\n  transition: 0.2s;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%] {\n  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px 0, rgba(0, 0, 0, 0.14) 0 1px 1px 0, rgba(0, 0, 0, 0.12) 0 2px 1px -1px;\n  width: 1.5rem;\n  height: 1.5rem;\n  border-radius: 1.5rem;\n  border: 1px solid #dadce0;\n  background-color: white;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .switch.active[_ngcontent-%COMP%] {\n  background-color: #4285f4;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .switch.active[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%] {\n  margin-left: 1.3rem;\n  border-color: #4285f4;\n}\n[_nghost-%COMP%]   .header.enabled[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #dadce0;\n}\n[_nghost-%COMP%]   .header.enabled[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvY29tcG9uZW50cy9wcmVmZXJlbmNlLWdyb3VwL3ByZWZlcmVuY2UtZ3JvdXAuY29tcG9uZW50LnNjc3MiLCIvaG9tZS9ydW5uZXIvd29yay9ndWlkZS1kb2dlL2d1aWRlLWRvZ2Uvc3JjL3V0aWxzL2NvbnN0YW50cy5zY3NzIiwic3JjL2NvbXBvbmVudHMvcHJlZmVyZW5jZS1ncm91cC9wcmVmZXJlbmNlLWdyb3VwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VDVUUsK0dBQUE7RURSQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQkFBQTtFQUNBLHVCQUFBO0FFREY7QUZHRTtFQUNFLGVBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7QUVESjtBRkdJO0VBRUUsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsY0FITztFQUlQLHFCQUpPO0VBS1AseUJBQUE7RUFDQSx1QkFBQTtBRUZOO0FGSU07RUFDRSxnQkFBQTtBRUZSO0FGS007RUNqQkosK0dBQUE7RURtQk0sYUFkSztFQWVMLGNBZks7RUFnQkwscUJBaEJLO0VBaUJMLHlCQUFBO0VBQ0EsdUJBQUE7QUVIUjtBRk1NO0VBQ0UseUJDcENVO0FDZ0NsQjtBRk1RO0VBQ0UsbUJBQUE7RUFDQSxxQkN4Q1E7QUNvQ2xCO0FGU0k7RUFDRSxnQ0FBQTtBRVBOO0FGU007RUFDRSxnQkFBQTtBRVBSIiwiZmlsZSI6InNyYy9jb21wb25lbnRzL3ByZWZlcmVuY2UtZ3JvdXAvcHJlZmVyZW5jZS1ncm91cC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi8uLi91dGlscy9jb25zdGFudHNcIjtcblxuOmhvc3Qge1xuICBAaW5jbHVkZSBjYXJkLXNoYWRvdztcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuXG4gIC5oZWFkZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5cbiAgICAuc3dpdGNoIHtcbiAgICAgICRzaXplOiAxLjVyZW07XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgIHdpZHRoOiAyLjhyZW07XG4gICAgICBoZWlnaHQ6ICRzaXplO1xuICAgICAgYm9yZGVyLXJhZGl1czogJHNpemU7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAkY29sb3ItYm9yZGVyO1xuICAgICAgYm94LXNpemluZzogY29udGVudC1ib3g7XG5cbiAgICAgICYsICYgLmhhbmRsZSB7XG4gICAgICAgIHRyYW5zaXRpb246IC4ycztcbiAgICAgIH1cblxuICAgICAgLmhhbmRsZSB7XG4gICAgICAgIEBpbmNsdWRlIGNhcmQtc2hhZG93O1xuICAgICAgICB3aWR0aDogJHNpemU7XG4gICAgICAgIGhlaWdodDogJHNpemU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6ICRzaXplO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAkY29sb3ItYm9yZGVyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgIH1cblxuICAgICAgJi5hY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItaGlnaGxpZ2h0O1xuXG4gICAgICAgIC5oYW5kbGUge1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxLjNyZW07XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAkY29sb3ItaGlnaGxpZ2h0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi5lbmFibGVkIHtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkY29sb3ItYm9yZGVyO1xuXG4gICAgICAudGl0bGUge1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiJGNvbG9yLWJhY2tncm91bmQ6IHJnYigyNDgsIDI0OSwgMjUwKTtcbiRjb2xvci1ib3JkZXI6IHJnYigyMTgsIDIyMCwgMjI0KTtcbiRjb2xvci1mb250OiByZ2IoMzQsIDM0LCAzNCk7XG4kY29sb3ItaGlnaGxpZ2h0OiByZ2IoNjYsIDEzMywgMjQ0KTtcbiRjb2xvci1wb3NpdGl2ZTogcmdiKDE1LCAxNTcsIDg4KTtcbiRjb2xvci1uZWdhdGl2ZTogcmdiKDIxOSwgNjgsIDU1KTtcblxuJGZvbnQtc2l6ZS1sYXJnZTogMjRweDtcbiRmb250LXNpemUtbWVkaXVtOiAxNnB4O1xuJGZvbnQtc2l6ZS1zbWFsbDogMTJweDtcblxuQG1peGluIGNhcmQtc2hhZG93IHtcbiAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjIpIDAgMXB4IDNweCAwLCByZ2JhKDAsIDAsIDAsIDAuMTQpIDAgMXB4IDFweCAwLCByZ2JhKDAsIDAsIDAsIDAuMTIpIDAgMnB4IDFweCAtMXB4O1xufVxuIiwiOmhvc3Qge1xuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMikgMCAxcHggM3B4IDAsIHJnYmEoMCwgMCwgMCwgMC4xNCkgMCAxcHggMXB4IDAsIHJnYmEoMCwgMCwgMCwgMC4xMikgMCAycHggMXB4IC0xcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cbjpob3N0IC5oZWFkZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cbjpob3N0IC5oZWFkZXIgLnN3aXRjaCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB3aWR0aDogMi44cmVtO1xuICBoZWlnaHQ6IDEuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogMS41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGFkY2UwO1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbn1cbjpob3N0IC5oZWFkZXIgLnN3aXRjaCwgOmhvc3QgLmhlYWRlciAuc3dpdGNoIC5oYW5kbGUge1xuICB0cmFuc2l0aW9uOiAwLjJzO1xufVxuOmhvc3QgLmhlYWRlciAuc3dpdGNoIC5oYW5kbGUge1xuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMikgMCAxcHggM3B4IDAsIHJnYmEoMCwgMCwgMCwgMC4xNCkgMCAxcHggMXB4IDAsIHJnYmEoMCwgMCwgMCwgMC4xMikgMCAycHggMXB4IC0xcHg7XG4gIHdpZHRoOiAxLjVyZW07XG4gIGhlaWdodDogMS41cmVtO1xuICBib3JkZXItcmFkaXVzOiAxLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkYWRjZTA7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuOmhvc3QgLmhlYWRlciAuc3dpdGNoLmFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0Mjg1ZjQ7XG59XG46aG9zdCAuaGVhZGVyIC5zd2l0Y2guYWN0aXZlIC5oYW5kbGUge1xuICBtYXJnaW4tbGVmdDogMS4zcmVtO1xuICBib3JkZXItY29sb3I6ICM0Mjg1ZjQ7XG59XG46aG9zdCAuaGVhZGVyLmVuYWJsZWQge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RhZGNlMDtcbn1cbjpob3N0IC5oZWFkZXIuZW5hYmxlZCAudGl0bGUge1xuICBmb250LXdlaWdodDogNTAwO1xufSJdfQ== */"]
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PreferenceGroupComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-preference-group',
          templateUrl: './preference-group.component.html',
          styleUrls: ['./preference-group.component.scss']
        }]
      }], null, {
        name: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        i18n: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        preference$: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }]
      });
    })();
    /***/

  },

  /***/
  "./src/components/preference-group/preference-group.module.ts":
  /*!********************************************************************!*\
    !*** ./src/components/preference-group/preference-group.module.ts ***!
    \********************************************************************/

  /*! exports provided: PreferenceGroupModule */

  /***/
  function srcComponentsPreferenceGroupPreferenceGroupModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PreferenceGroupModule", function () {
      return PreferenceGroupModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _preference_group_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./preference-group.component */
    "./src/components/preference-group/preference-group.component.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../switch/switch.module */
    "./src/components/switch/switch.module.ts");
    /* harmony import */


    var _preference_item_preference_item_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../preference-item/preference-item.module */
    "./src/components/preference-item/preference-item.module.ts");
    /* harmony import */


    var _switch_switch_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../switch/switch.component */
    "./src/components/switch/switch.component.ts");
    /* harmony import */


    var _preference_item_preference_item_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../preference-item/preference-item.component */
    "./src/components/preference-item/preference-item.component.ts");

    var PreferenceGroupModule = function PreferenceGroupModule() {
      _classCallCheck(this, PreferenceGroupModule);
    };

    PreferenceGroupModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: PreferenceGroupModule
    });
    PreferenceGroupModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function PreferenceGroupModule_Factory(t) {
        return new (t || PreferenceGroupModule)();
      },
      imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__["SwitchModule"], _preference_item_preference_item_module__WEBPACK_IMPORTED_MODULE_4__["PreferenceItemModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PreferenceGroupModule, {
        declarations: [_preference_group_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceGroupComponent"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__["SwitchModule"], _preference_item_preference_item_module__WEBPACK_IMPORTED_MODULE_4__["PreferenceItemModule"]],
        exports: [_preference_group_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceGroupComponent"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PreferenceGroupModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_preference_group_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceGroupComponent"]],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__["SwitchModule"], _preference_item_preference_item_module__WEBPACK_IMPORTED_MODULE_4__["PreferenceItemModule"]],
          exports: [_preference_group_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceGroupComponent"]]
        }]
      }], null, null);
    })();

    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetComponentScope"](_preference_group_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceGroupComponent"], [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgComponentOutlet"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgTemplateOutlet"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgStyle"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitchCase"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitchDefault"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgPlural"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgPluralCase"], _switch_switch_component__WEBPACK_IMPORTED_MODULE_5__["SwitchComponent"], _preference_item_preference_item_component__WEBPACK_IMPORTED_MODULE_6__["PreferenceItemComponent"], _preference_group_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceGroupComponent"]], [_angular_common__WEBPACK_IMPORTED_MODULE_2__["AsyncPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["UpperCasePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["LowerCasePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["JsonPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["SlicePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["DecimalPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["PercentPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["TitleCasePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CurrencyPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["I18nPluralPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["I18nSelectPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["KeyValuePipe"]]);
    /***/

  },

  /***/
  "./src/components/preference-item/preference-item.component.ts":
  /*!*********************************************************************!*\
    !*** ./src/components/preference-item/preference-item.component.ts ***!
    \*********************************************************************/

  /*! exports provided: PreferenceItemComponent */

  /***/
  function srcComponentsPreferenceItemPreferenceItemComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PreferenceItemComponent", function () {
      return PreferenceItemComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _preference_group_preference_group_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../preference-group/preference-group.component */
    "./src/components/preference-group/preference-group.component.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _switch_switch_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../switch/switch.component */
    "./src/components/switch/switch.component.ts");

    function PreferenceItemComponent_input_4_Template(rf, ctx) {
      if (rf & 1) {
        var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function PreferenceItemComponent_input_4_Template_input_ngModelChange_0_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);

          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r2.value = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0.value);
      }
    }

    function PreferenceItemComponent_app_switch_5_Template(rf, ctx) {
      if (rf & 1) {
        var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-switch", 6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function PreferenceItemComponent_app_switch_5_Template_app_switch_valueChange_0_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5);

          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r4.value = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx_r1.value);
      }
    }

    var PreferenceItemComponent = /*#__PURE__*/function () {
      function PreferenceItemComponent(host) {
        _classCallCheck(this, PreferenceItemComponent);

        this.host = host;
      }

      _createClass(PreferenceItemComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          if (this.host && !this.preference$) {
            this.preference$ = this.host.preference$;
          }
        }
      }, {
        key: "type",
        get: function get() {
          return typeof this.value;
        }
      }, {
        key: "value",
        get: function get() {
          return this.preference$.value[this.property];
        },
        set: function set(value) {
          this.preference$.next(Object.assign(Object.assign({}, this.preference$.value), _defineProperty({}, this.property, value)));
        }
      }]);

      return PreferenceItemComponent;
    }();

    PreferenceItemComponent.ɵfac = function PreferenceItemComponent_Factory(t) {
      return new (t || PreferenceItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_preference_group_preference_group_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceGroupComponent"], 9));
    };

    PreferenceItemComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: PreferenceItemComponent,
      selectors: [["app-preference-item"]],
      inputs: {
        name: "name",
        preference$: "preference$",
        property: "property"
      },
      decls: 6,
      vars: 4,
      consts: [[1, "item"], [1, "title"], [3, "ngSwitch"], ["type", "number", 3, "ngModel", "ngModelChange", 4, "ngSwitchCase"], [3, "value", "valueChange", 4, "ngSwitchCase"], ["type", "number", 3, "ngModel", "ngModelChange"], [3, "value", "valueChange"]],
      template: function PreferenceItemComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](3, 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, PreferenceItemComponent_input_4_Template, 1, 1, "input", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, PreferenceItemComponent_app_switch_5_Template, 1, 1, "app-switch", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.name, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", ctx.type);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "boolean");
        }
      },
      directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitchCase"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"], _switch_switch_component__WEBPACK_IMPORTED_MODULE_4__["SwitchComponent"]],
      styles: ["[_nghost-%COMP%]   .item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  justify-content: space-between;\n  padding: 0 1rem;\n  cursor: pointer;\n}\n[_nghost-%COMP%]   .item[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  margin: 1rem 1rem 1rem 0;\n}\n[_nghost-%COMP%]   .item[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: right;\n}\n[_nghost-%COMP%]   .item[_ngcontent-%COMP%]   app-switch[_ngcontent-%COMP%] {\n  align-self: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvY29tcG9uZW50cy9wcmVmZXJlbmNlLWl0ZW0vcHJlZmVyZW5jZS1pdGVtLmNvbXBvbmVudC5zY3NzIiwic3JjL2NvbXBvbmVudHMvcHJlZmVyZW5jZS1pdGVtL3ByZWZlcmVuY2UtaXRlbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHRTtFQUNFLGFBQUE7RUFDQSxvQkFBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7QUNGSjtBRElJO0VBQ0Usd0JBQUE7QUNGTjtBREtJO0VBQ0UsT0FBQTtFQUNBLGlCQUFBO0FDSE47QURNSTtFQUNFLGtCQUFBO0FDSk4iLCJmaWxlIjoic3JjL2NvbXBvbmVudHMvcHJlZmVyZW5jZS1pdGVtL3ByZWZlcmVuY2UtaXRlbS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi8uLi91dGlscy9jb25zdGFudHNcIjtcblxuOmhvc3Qge1xuICAuaXRlbSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgcGFkZGluZzogMCAxcmVtO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgIC50aXRsZSB7XG4gICAgICBtYXJnaW46IDFyZW0gMXJlbSAxcmVtIDA7XG4gICAgfVxuXG4gICAgaW5wdXQge1xuICAgICAgZmxleDogMTtcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIH1cblxuICAgIGFwcC1zd2l0Y2gge1xuICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgIH1cbiAgfVxufVxuIiwiOmhvc3QgLml0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiAwIDFyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbjpob3N0IC5pdGVtIC50aXRsZSB7XG4gIG1hcmdpbjogMXJlbSAxcmVtIDFyZW0gMDtcbn1cbjpob3N0IC5pdGVtIGlucHV0IHtcbiAgZmxleDogMTtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG46aG9zdCAuaXRlbSBhcHAtc3dpdGNoIHtcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xufSJdfQ== */"]
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PreferenceItemComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-preference-item',
          templateUrl: './preference-item.component.html',
          styleUrls: ['./preference-item.component.scss']
        }]
      }], function () {
        return [{
          type: _preference_group_preference_group_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceGroupComponent"],
          decorators: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
          }, {
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Host"]
          }]
        }];
      }, {
        name: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        preference$: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        property: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }]
      });
    })();
    /***/

  },

  /***/
  "./src/components/preference-item/preference-item.module.ts":
  /*!******************************************************************!*\
    !*** ./src/components/preference-item/preference-item.module.ts ***!
    \******************************************************************/

  /*! exports provided: PreferenceItemModule */

  /***/
  function srcComponentsPreferenceItemPreferenceItemModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PreferenceItemModule", function () {
      return PreferenceItemModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _preference_item_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./preference-item.component */
    "./src/components/preference-item/preference-item.component.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../switch/switch.module */
    "./src/components/switch/switch.module.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");

    var PreferenceItemModule = function PreferenceItemModule() {
      _classCallCheck(this, PreferenceItemModule);
    };

    PreferenceItemModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: PreferenceItemModule
    });
    PreferenceItemModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function PreferenceItemModule_Factory(t) {
        return new (t || PreferenceItemModule)();
      },
      imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__["SwitchModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PreferenceItemModule, {
        declarations: [_preference_item_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceItemComponent"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__["SwitchModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"]],
        exports: [_preference_item_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceItemComponent"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PreferenceItemModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_preference_item_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceItemComponent"]],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__["SwitchModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"]],
          exports: [_preference_item_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceItemComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/components/switch/switch.component.ts":
  /*!***************************************************!*\
    !*** ./src/components/switch/switch.component.ts ***!
    \***************************************************/

  /*! exports provided: SwitchComponent */

  /***/
  function srcComponentsSwitchSwitchComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SwitchComponent", function () {
      return SwitchComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! uuid */
    "./node_modules/uuid/dist/esm-browser/index.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");

    var SwitchComponent = /*#__PURE__*/function () {
      function SwitchComponent() {
        _classCallCheck(this, SwitchComponent);

        this.id = "switch-".concat(uuid__WEBPACK_IMPORTED_MODULE_1__["v4"]());
        this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
      }

      _createClass(SwitchComponent, [{
        key: "setValue",
        value: function setValue(value) {
          this.valueChange.emit(value);
        }
      }]);

      return SwitchComponent;
    }();

    SwitchComponent.ɵfac = function SwitchComponent_Factory(t) {
      return new (t || SwitchComponent)();
    };

    SwitchComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: SwitchComponent,
      selectors: [["app-switch"]],
      inputs: {
        value: "value"
      },
      outputs: {
        valueChange: "valueChange"
      },
      decls: 2,
      vars: 5,
      consts: [["type", "checkbox", 3, "ngModel", "ngModelChange"], [1, "switch", 3, "htmlFor"]],
      template: function SwitchComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function SwitchComponent_Template_input_ngModelChange_0_listener($event) {
            return ctx.setValue($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "label", 1);
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.value);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("id", ctx.id);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("active", ctx.value);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("htmlFor", ctx.id);
        }
      },
      directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["CheckboxControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"]],
      styles: ["[_nghost-%COMP%]   input[_ngcontent-%COMP%] {\n  display: none;\n}\n[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked    + .switch[_ngcontent-%COMP%] {\n  background-color: #4285f4;\n}\n[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked    + .switch[_ngcontent-%COMP%]:after {\n  margin-left: 1.3rem;\n  border-color: #4285f4;\n}\n[_nghost-%COMP%]   .switch[_ngcontent-%COMP%] {\n  display: block;\n  background-color: white;\n  width: 2.8rem;\n  border-radius: 1.5rem;\n  border: 1px solid #dadce0;\n  cursor: pointer;\n}\n[_nghost-%COMP%]   .switch[_ngcontent-%COMP%], [_nghost-%COMP%]   .switch[_ngcontent-%COMP%]:after {\n  transition: 0.2s;\n}\n[_nghost-%COMP%]   .switch[_ngcontent-%COMP%]:after {\n  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px 0, rgba(0, 0, 0, 0.14) 0 1px 1px 0, rgba(0, 0, 0, 0.12) 0 2px 1px -1px;\n  content: \"\";\n  display: block;\n  width: 1.5rem;\n  height: 1.5rem;\n  border-radius: 1.5rem;\n  border: 1px solid #dadce0;\n  background-color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvY29tcG9uZW50cy9zd2l0Y2gvc3dpdGNoLmNvbXBvbmVudC5zY3NzIiwic3JjL2NvbXBvbmVudHMvc3dpdGNoL3N3aXRjaC5jb21wb25lbnQuc2NzcyIsIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvdXRpbHMvY29uc3RhbnRzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0U7RUFDRSxhQUFBO0FDRko7QURJSTtFQUNFLHlCRUpZO0FERWxCO0FESU07RUFDRSxtQkFBQTtFQUNBLHFCRVJVO0FETWxCO0FET0U7RUFFRSxjQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0VBQ0EscUJBSk87RUFLUCx5QkFBQTtFQUNBLGVBQUE7QUNOSjtBRFFJO0VBQ0UsZ0JBQUE7QUNOTjtBRFNJO0VFakJGLCtHQUFBO0VGbUJJLFdBQUE7RUFDQSxjQUFBO0VBQ0EsYUFoQks7RUFpQkwsY0FqQks7RUFrQkwscUJBbEJLO0VBbUJMLHlCQUFBO0VBQ0EsdUJBQUE7QUNQTiIsImZpbGUiOiJzcmMvY29tcG9uZW50cy9zd2l0Y2gvc3dpdGNoLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uL3V0aWxzL2NvbnN0YW50c1wiO1xuXG46aG9zdCB7XG4gIGlucHV0IHtcbiAgICBkaXNwbGF5OiBub25lO1xuXG4gICAgJjpjaGVja2VkICsgLnN3aXRjaCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItaGlnaGxpZ2h0O1xuXG4gICAgICAmOmFmdGVyIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEuM3JlbTtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAkY29sb3ItaGlnaGxpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC5zd2l0Y2gge1xuICAgICRzaXplOiAxLjVyZW07XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgd2lkdGg6IDIuOHJlbTtcbiAgICBib3JkZXItcmFkaXVzOiAkc2l6ZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkY29sb3ItYm9yZGVyO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICYsICY6YWZ0ZXIge1xuICAgICAgdHJhbnNpdGlvbjogLjJzO1xuICAgIH1cblxuICAgICY6YWZ0ZXIge1xuICAgICAgQGluY2x1ZGUgY2FyZC1zaGFkb3c7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgd2lkdGg6ICRzaXplO1xuICAgICAgaGVpZ2h0OiAkc2l6ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6ICRzaXplO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgJGNvbG9yLWJvcmRlcjtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIH1cbiAgfVxufVxuIiwiOmhvc3QgaW5wdXQge1xuICBkaXNwbGF5OiBub25lO1xufVxuOmhvc3QgaW5wdXQ6Y2hlY2tlZCArIC5zd2l0Y2gge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDI4NWY0O1xufVxuOmhvc3QgaW5wdXQ6Y2hlY2tlZCArIC5zd2l0Y2g6YWZ0ZXIge1xuICBtYXJnaW4tbGVmdDogMS4zcmVtO1xuICBib3JkZXItY29sb3I6ICM0Mjg1ZjQ7XG59XG46aG9zdCAuc3dpdGNoIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB3aWR0aDogMi44cmVtO1xuICBib3JkZXItcmFkaXVzOiAxLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkYWRjZTA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbjpob3N0IC5zd2l0Y2gsIDpob3N0IC5zd2l0Y2g6YWZ0ZXIge1xuICB0cmFuc2l0aW9uOiAwLjJzO1xufVxuOmhvc3QgLnN3aXRjaDphZnRlciB7XG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4yKSAwIDFweCAzcHggMCwgcmdiYSgwLCAwLCAwLCAwLjE0KSAwIDFweCAxcHggMCwgcmdiYSgwLCAwLCAwLCAwLjEyKSAwIDJweCAxcHggLTFweDtcbiAgY29udGVudDogXCJcIjtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxLjVyZW07XG4gIGhlaWdodDogMS41cmVtO1xuICBib3JkZXItcmFkaXVzOiAxLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkYWRjZTA7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufSIsIiRjb2xvci1iYWNrZ3JvdW5kOiByZ2IoMjQ4LCAyNDksIDI1MCk7XG4kY29sb3ItYm9yZGVyOiByZ2IoMjE4LCAyMjAsIDIyNCk7XG4kY29sb3ItZm9udDogcmdiKDM0LCAzNCwgMzQpO1xuJGNvbG9yLWhpZ2hsaWdodDogcmdiKDY2LCAxMzMsIDI0NCk7XG4kY29sb3ItcG9zaXRpdmU6IHJnYigxNSwgMTU3LCA4OCk7XG4kY29sb3ItbmVnYXRpdmU6IHJnYigyMTksIDY4LCA1NSk7XG5cbiRmb250LXNpemUtbGFyZ2U6IDI0cHg7XG4kZm9udC1zaXplLW1lZGl1bTogMTZweDtcbiRmb250LXNpemUtc21hbGw6IDEycHg7XG5cbkBtaXhpbiBjYXJkLXNoYWRvdyB7XG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4yKSAwIDFweCAzcHggMCwgcmdiYSgwLCAwLCAwLCAwLjE0KSAwIDFweCAxcHggMCwgcmdiYSgwLCAwLCAwLCAwLjEyKSAwIDJweCAxcHggLTFweDtcbn1cbiJdfQ== */"]
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SwitchComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-switch',
          templateUrl: './switch.component.html',
          styleUrls: ['./switch.component.scss']
        }]
      }], null, {
        value: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        valueChange: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }]
      });
    })();
    /***/

  },

  /***/
  "./src/components/switch/switch.module.ts":
  /*!************************************************!*\
    !*** ./src/components/switch/switch.module.ts ***!
    \************************************************/

  /*! exports provided: SwitchModule */

  /***/
  function srcComponentsSwitchSwitchModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SwitchModule", function () {
      return SwitchModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _switch_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./switch.component */
    "./src/components/switch/switch.component.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");

    var SwitchModule = function SwitchModule() {
      _classCallCheck(this, SwitchModule);
    };

    SwitchModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: SwitchModule
    });
    SwitchModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function SwitchModule_Factory(t) {
        return new (t || SwitchModule)();
      },
      imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SwitchModule, {
        declarations: [_switch_component__WEBPACK_IMPORTED_MODULE_1__["SwitchComponent"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"]],
        exports: [_switch_component__WEBPACK_IMPORTED_MODULE_1__["SwitchComponent"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SwitchModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_switch_component__WEBPACK_IMPORTED_MODULE_1__["SwitchComponent"]],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"]],
          exports: [_switch_component__WEBPACK_IMPORTED_MODULE_1__["SwitchComponent"]]
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
        this.colorHighlight = 'rgb(66, 133, 244)';
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
          this.svg.style('width', width).style('height', height).attr('viewBox', [0, 0, width, height].join(' '));
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
          this.svg.html('');
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
      }, {
        key: "svg",
        get: function get() {
          return this.container.select('svg');
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
        key: "renderData",
        value: function renderData() {
          var _this = this;

          this.line = d3__WEBPACK_IMPORTED_MODULE_1__["line"]().defined(function (d) {
            return !isNaN(d.value);
          }).x(function (d) {
            return _this.scaleX(d.date);
          }).y(function (d) {
            return _this.scaleY(d.value);
          });
          this.path = this.svg.append('path').attr('fill', 'none').attr('stroke', this.colorHighlight).attr('stroke-width', 2).attr('stroke-linejoin', 'round').attr('stroke-linecap', 'round');
        }
      }, {
        key: "updateData",
        value: function updateData(data) {
          this.path.datum(data).transition(this.transition).attr('d', this.line);
        }
      }, {
        key: "renderActiveDatum",
        value: function renderActiveDatum() {
          this.activeDatumCircle = this.svg.append('circle').attr('r', 4).attr('fill', this.colorHighlight);
          this.activeDatumToast = this.container.select('.active-indicator');
        }
      }, {
        key: "updateActiveDatum",
        value: function updateActiveDatum(activeDatum) {
          if (!activeDatum) {
            this.activeDatumCircle.attr('display', 'none');
            this.activeDatumToast.style('opacity', 0);
            return;
          }

          var date = activeDatum.date,
              value = activeDatum.value;
          this.activeDatumCircle.transition(this.createTransition(50)).attr('display', 'inherit').attr('transform', "translate(".concat(this.scaleX(date), ",").concat(this.scaleY(value), ")"));
          this.activeDatumToast.transition(this.createTransition(50)).style('opacity', .8).style('top', "".concat(this.scaleY(value) + 16, "px")).style('left', "".concat(this.scaleX(date) - 64, "px"));
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
          var _this2 = this;

          _get(_getPrototypeOf(XYChartD3.prototype), "render", this).call(this);

          var _this$renderOptions2 = this.renderOptions,
              data$ = _this$renderOptions2.data$,
              activeDatum$ = _this$renderOptions2.activeDatum$;
          this.renderAxis();
          this.renderData();
          this.renderActiveDatum();
          data$.pipe(this.takeUntilCleared()).subscribe(function (data) {
            _this2.updateAxis(data);

            _this2.updateData(data);
          });
          activeDatum$.pipe(this.takeUntilCleared()).subscribe(function (activeDatum) {
            _this2.updateActiveDatum(activeDatum);
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
          this.xAxis = d3__WEBPACK_IMPORTED_MODULE_0__["axisBottom"](this.scaleX).ticks(d3__WEBPACK_IMPORTED_MODULE_0__["timeWeek"].every(1)).tickFormat(_utils_formatters__WEBPACK_IMPORTED_MODULE_2__["formatX"]);
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
          this.xAxisG.transition(this.transition).call(this.xAxis).attr('font-size', 12);
          this.yAxisG.transition(this.transition).call(this.yAxis).attr('font-size', 12);
        }
      }]);

      return XYChartD3;
    }(_base_d3__WEBPACK_IMPORTED_MODULE_1__["BaseD3"]);
    /***/

  },

  /***/
  "./src/directives/a11y-placeholder/a11y-placeholder.directive.ts":
  /*!***********************************************************************!*\
    !*** ./src/directives/a11y-placeholder/a11y-placeholder.directive.ts ***!
    \***********************************************************************/

  /*! exports provided: A11yPlaceholderDirective */

  /***/
  function srcDirectivesA11yPlaceholderA11yPlaceholderDirectiveTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "A11yPlaceholderDirective", function () {
      return A11yPlaceholderDirective;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var A11yPlaceholderDirective = /*#__PURE__*/function () {
      function A11yPlaceholderDirective(componentFactoryResolver, viewContainerRef, compiler) {
        _classCallCheck(this, A11yPlaceholderDirective);

        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainerRef = viewContainerRef;
        this.compiler = compiler;
      }

      _createClass(A11yPlaceholderDirective, [{
        key: "addComponent",
        value: function addComponent(A11yModule, host, preference) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var moduleFactory, moduleRef, module, injector, componentFactory, componentRef, component;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    this.viewContainerRef.clear();
                    _context.next = 3;
                    return this.compiler.compileModuleAsync(A11yModule);

                  case 3:
                    moduleFactory = _context.sent;
                    moduleRef = moduleFactory.create(null);
                    module = moduleRef.instance;
                    injector = _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"].create({
                      providers: [{
                        provide: 'host',
                        useValue: host
                      }]
                    });
                    componentFactory = this.componentFactoryResolver.resolveComponentFactory(module.A11yComponent);
                    componentRef = this.viewContainerRef.createComponent(componentFactory, 0, injector);
                    component = componentRef.instance;
                    Object.assign(component, preference);
                    return _context.abrupt("return", componentRef);

                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "removeComponent",
        value: function removeComponent(componentRef) {
          var index = this.viewContainerRef.indexOf(componentRef.hostView);

          if (index >= 0) {
            this.viewContainerRef.remove(index);
          }

          componentRef.destroy();
        }
      }]);

      return A11yPlaceholderDirective;
    }();

    A11yPlaceholderDirective.ɵfac = function A11yPlaceholderDirective_Factory(t) {
      return new (t || A11yPlaceholderDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Compiler"]));
    };

    A11yPlaceholderDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: A11yPlaceholderDirective,
      selectors: [["", "appA11yPlaceholder", ""]]
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](A11yPlaceholderDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[appA11yPlaceholder]'
        }]
      }], function () {
        return [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"]
        }, {
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"]
        }, {
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Compiler"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/directives/a11y-placeholder/a11y-placeholder.module.ts":
  /*!********************************************************************!*\
    !*** ./src/directives/a11y-placeholder/a11y-placeholder.module.ts ***!
    \********************************************************************/

  /*! exports provided: A11yPlaceholderModule */

  /***/
  function srcDirectivesA11yPlaceholderA11yPlaceholderModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "A11yPlaceholderModule", function () {
      return A11yPlaceholderModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./a11y-placeholder.directive */
    "./src/directives/a11y-placeholder/a11y-placeholder.directive.ts");

    var A11yPlaceholderModule = function A11yPlaceholderModule() {
      _classCallCheck(this, A11yPlaceholderModule);
    };

    A11yPlaceholderModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: A11yPlaceholderModule
    });
    A11yPlaceholderModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function A11yPlaceholderModule_Factory(t) {
        return new (t || A11yPlaceholderModule)();
      }
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](A11yPlaceholderModule, {
        declarations: [_a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_1__["A11yPlaceholderDirective"]],
        exports: [_a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_1__["A11yPlaceholderDirective"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](A11yPlaceholderModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_1__["A11yPlaceholderDirective"]],
          exports: [_a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_1__["A11yPlaceholderDirective"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/directives/audification/audification.directive.ts":
  /*!***************************************************************!*\
    !*** ./src/directives/audification/audification.directive.ts ***!
    \***************************************************************/

  /*! exports provided: AudificationDirective */

  /***/
  function srcDirectivesAudificationAudificationDirectiveTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AudificationDirective", function () {
      return AudificationDirective;
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


    var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var _services_preference_preference_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../services/preference/preference.service */
    "./src/services/preference/preference.service.ts");
    /* harmony import */


    var _components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../../components/line-chart/line-chart.component */
    "./src/components/line-chart/line-chart.component.ts");

    var AudificationDirective = /*#__PURE__*/function () {
      function AudificationDirective(preferenceService, lineChartComponent) {
        _classCallCheck(this, AudificationDirective);

        this.preferenceService = preferenceService;
        this.lineChartComponent = lineChartComponent;
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
      }

      _createClass(AudificationDirective, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this3 = this;

          this.preferenceService.audification$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroy$)).subscribe(function (preference) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this3, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!preference.enabled) {
                        _context2.next = 5;
                        break;
                      }

                      _context2.next = 3;
                      return this.attach(preference);

                    case 3:
                      _context2.next = 6;
                      break;

                    case 5:
                      this.detach();

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          });
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.destroy$.next();
          this.destroy$.complete();
          this.detach();
        }
      }, {
        key: "attach",
        value: function attach(preference) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var host, _yield$__webpack_requ, LineChartAudificationModule;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    this.detach();
                    host = this.host;
                    _context3.next = 4;
                    return __webpack_require__.e(
                    /*! import() | components-line-chart-audification-line-chart-audification-module */
                    "components-line-chart-audification-line-chart-audification-module").then(__webpack_require__.bind(null,
                    /*! ../../components/line-chart-audification/line-chart-audification.module */
                    "./src/components/line-chart-audification/line-chart-audification.module.ts"));

                  case 4:
                    _yield$__webpack_requ = _context3.sent;
                    LineChartAudificationModule = _yield$__webpack_requ.LineChartAudificationModule;
                    _context3.next = 8;
                    return host.a11yPlaceholder.addComponent(LineChartAudificationModule, host, preference);

                  case 8:
                    this.audificationComponentRef = _context3.sent;

                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));
        }
      }, {
        key: "detach",
        value: function detach() {
          if (this.audificationComponentRef) {
            this.host.a11yPlaceholder.removeComponent(this.audificationComponentRef);
            this.audificationComponentRef = null;
          }
        }
      }, {
        key: "host",
        get: function get() {
          var component = this.lineChartComponent;

          if (!component) {
            throw new Error('The component does not support audification.');
          }

          return component;
        }
      }]);

      return AudificationDirective;
    }();

    AudificationDirective.ɵfac = function AudificationDirective_Factory(t) {
      return new (t || AudificationDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_preference_preference_service__WEBPACK_IMPORTED_MODULE_4__["PreferenceService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_5__["LineChartComponent"], 11));
    };

    AudificationDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: AudificationDirective,
      selectors: [["", "appAudification", ""]]
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AudificationDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[appAudification]'
        }]
      }], function () {
        return [{
          type: _services_preference_preference_service__WEBPACK_IMPORTED_MODULE_4__["PreferenceService"]
        }, {
          type: _components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_5__["LineChartComponent"],
          decorators: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Host"]
          }, {
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Self"]
          }, {
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
          }]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/directives/audification/audification.module.ts":
  /*!************************************************************!*\
    !*** ./src/directives/audification/audification.module.ts ***!
    \************************************************************/

  /*! exports provided: AudificationModule */

  /***/
  function srcDirectivesAudificationAudificationModuleTs(module, __webpack_exports__, __webpack_require__) {
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


    var _audification_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./audification.directive */
    "./src/directives/audification/audification.directive.ts");
    /* harmony import */


    var _services_preference_preference_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../services/preference/preference.module */
    "./src/services/preference/preference.module.ts");

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
      imports: [[_services_preference_preference_module__WEBPACK_IMPORTED_MODULE_2__["PreferenceModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AudificationModule, {
        declarations: [_audification_directive__WEBPACK_IMPORTED_MODULE_1__["AudificationDirective"]],
        imports: [_services_preference_preference_module__WEBPACK_IMPORTED_MODULE_2__["PreferenceModule"]],
        exports: [_audification_directive__WEBPACK_IMPORTED_MODULE_1__["AudificationDirective"]]
      });
    })();

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AudificationModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_audification_directive__WEBPACK_IMPORTED_MODULE_1__["AudificationDirective"]],
          imports: [_services_preference_preference_module__WEBPACK_IMPORTED_MODULE_2__["PreferenceModule"]],
          exports: [_audification_directive__WEBPACK_IMPORTED_MODULE_1__["AudificationDirective"]]
        }]
      }], null, null);
    })();
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
  "./src/i18n/index.ts":
  /*!***************************!*\
    !*** ./src/i18n/index.ts ***!
    \***************************/

  /*! exports provided: GUIDE_DOGE, VISUALIZATION, AUDIFICATION, AUDIFICATION_PREFERENCE, DATA_TABLE_PREFERENCE, TEXT_SUMMARY_PREFERENCE, setLanguage, getLanguage, t, tA11y */

  /***/
  function srcI18nIndexTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./types */
    "./src/i18n/types.ts");
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
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "AUDIFICATION_PREFERENCE", function () {
      return _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION_PREFERENCE"];
    });
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "DATA_TABLE_PREFERENCE", function () {
      return _types__WEBPACK_IMPORTED_MODULE_0__["DATA_TABLE_PREFERENCE"];
    });
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "TEXT_SUMMARY_PREFERENCE", function () {
      return _types__WEBPACK_IMPORTED_MODULE_0__["TEXT_SUMMARY_PREFERENCE"];
    });
    /* harmony import */


    var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./utils */
    "./src/i18n/utils.ts");
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
  "./src/i18n/languages/en.ts":
  /*!**********************************!*\
    !*** ./src/i18n/languages/en.ts ***!
    \**********************************/

  /*! exports provided: en */

  /***/
  function srcI18nLanguagesEnTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    var _en;

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "en", function () {
      return en;
    });
    /* harmony import */


    var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../types */
    "./src/i18n/types.ts");

    var en = (_en = {}, _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["GUIDE_DOGE"].TITLE, 'Guide-Doge'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["GUIDE_DOGE"].VISUALIZATION, 'Data visualization'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["GUIDE_DOGE"].AUDIFICATION, 'Data audification'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["VISUALIZATION"].ACTIVE_DATUM, '%(y)s on %(x)s'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].INSTRUCTIONS, ['Hold down <kbd>SPACE</kbd> to play the audified melody and <kbd>SHIFT</kbd> + <kbd>SPACE</kbd> to play it backward.', 'Press <kbd>X</kbd> or <kbd>Y</kbd> to read out the domain or range respectively.', 'Press <kbd>L</kbd> to read out the legend items.', 'Press <kbd>0</kbd> ... <kbd>9</kbd> to move playhead.'].join(' <br/>')), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].DOMAIN, 'Domain from %(min)s to %(max)s'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].RANGE, 'Range from %(min)s to %(max)s'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].ACTIVE_DATUM, '%(y)s on %(x)s'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION_PREFERENCE"].enabled, 'Audification'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION_PREFERENCE"].lowestPitch, 'Lowest note (Hz)'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION_PREFERENCE"].highestPitch, 'Highest note (Hz)'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION_PREFERENCE"].noteDuration, 'Note duration (ms)'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION_PREFERENCE"].readAfter, 'Read out before playing'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION_PREFERENCE"].readBefore, 'Read out after playing'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["DATA_TABLE_PREFERENCE"].enabled, 'Data Table'), _defineProperty(_en, _types__WEBPACK_IMPORTED_MODULE_0__["TEXT_SUMMARY_PREFERENCE"].enabled, 'Text Summary'), _en);
    /***/
  },

  /***/
  "./src/i18n/languages/index.ts":
  /*!*************************************!*\
    !*** ./src/i18n/languages/index.ts ***!
    \*************************************/

  /*! exports provided: en, ko */

  /***/
  function srcI18nLanguagesIndexTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _en__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./en */
    "./src/i18n/languages/en.ts");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "en", function () {
      return _en__WEBPACK_IMPORTED_MODULE_0__["en"];
    });
    /* harmony import */


    var _ko__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./ko */
    "./src/i18n/languages/ko.ts");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "ko", function () {
      return _ko__WEBPACK_IMPORTED_MODULE_1__["ko"];
    });
    /***/

  },

  /***/
  "./src/i18n/languages/ko.ts":
  /*!**********************************!*\
    !*** ./src/i18n/languages/ko.ts ***!
    \**********************************/

  /*! exports provided: ko */

  /***/
  function srcI18nLanguagesKoTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    var _Object$assign2;

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ko", function () {
      return ko;
    });
    /* harmony import */


    var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../types */
    "./src/i18n/types.ts");
    /* harmony import */


    var _en__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./en */
    "./src/i18n/languages/en.ts");

    var ko = Object.assign(Object.assign({}, _en__WEBPACK_IMPORTED_MODULE_1__["en"]), (_Object$assign2 = {}, _defineProperty(_Object$assign2, _types__WEBPACK_IMPORTED_MODULE_0__["GUIDE_DOGE"].TITLE, 'Guide-Doge'), _defineProperty(_Object$assign2, _types__WEBPACK_IMPORTED_MODULE_0__["GUIDE_DOGE"].VISUALIZATION, '데이터 시각화'), _defineProperty(_Object$assign2, _types__WEBPACK_IMPORTED_MODULE_0__["GUIDE_DOGE"].AUDIFICATION, '데이터 청각화'), _defineProperty(_Object$assign2, _types__WEBPACK_IMPORTED_MODULE_0__["VISUALIZATION"].ACTIVE_DATUM, '%(y)s, %(x)s'), _defineProperty(_Object$assign2, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].INSTRUCTIONS, ['<kbd>SPACE</kbd>를 눌러 청각화된 음향을 재생하고 <kbd>SHIFT</kbd> + <kbd>SPACE</kbd>를 눌러 거꾸로 재생합니다.', '<kbd>X</kbd> 또는 <kbd>Y</kbd>를 눌러 정의역 또는 치역을 읽습니다.', '<kbd>L</kbd>을 눌러 범례 항목들을 읽습니다.', '<kbd>0</kbd> ... <kbd>9</kbd>를 눌러 재생 위치를 이동합니다.'].join(' <br/>')), _defineProperty(_Object$assign2, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].DOMAIN, '정의역 %(min)s 부터 %(max)s 까지'), _defineProperty(_Object$assign2, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].RANGE, '치역 %(min)s 부터 %(max)s 까지'), _defineProperty(_Object$assign2, _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].ACTIVE_DATUM, '%(y)s, %(x)s'), _Object$assign2));
    /***/
  },

  /***/
  "./src/i18n/types.ts":
  /*!***************************!*\
    !*** ./src/i18n/types.ts ***!
    \***************************/

  /*! exports provided: GUIDE_DOGE, VISUALIZATION, AUDIFICATION, AUDIFICATION_PREFERENCE, DATA_TABLE_PREFERENCE, TEXT_SUMMARY_PREFERENCE */

  /***/
  function srcI18nTypesTs(module, __webpack_exports__, __webpack_require__) {
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
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AUDIFICATION_PREFERENCE", function () {
      return AUDIFICATION_PREFERENCE;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DATA_TABLE_PREFERENCE", function () {
      return DATA_TABLE_PREFERENCE;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TEXT_SUMMARY_PREFERENCE", function () {
      return TEXT_SUMMARY_PREFERENCE;
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

    var AUDIFICATION_PREFERENCE;

    (function (AUDIFICATION_PREFERENCE) {
      AUDIFICATION_PREFERENCE[AUDIFICATION_PREFERENCE["enabled"] = 768] = "enabled";
      AUDIFICATION_PREFERENCE[AUDIFICATION_PREFERENCE["lowestPitch"] = 769] = "lowestPitch";
      AUDIFICATION_PREFERENCE[AUDIFICATION_PREFERENCE["highestPitch"] = 770] = "highestPitch";
      AUDIFICATION_PREFERENCE[AUDIFICATION_PREFERENCE["noteDuration"] = 771] = "noteDuration";
      AUDIFICATION_PREFERENCE[AUDIFICATION_PREFERENCE["readBefore"] = 772] = "readBefore";
      AUDIFICATION_PREFERENCE[AUDIFICATION_PREFERENCE["readAfter"] = 773] = "readAfter";
    })(AUDIFICATION_PREFERENCE || (AUDIFICATION_PREFERENCE = {}));

    var DATA_TABLE_PREFERENCE;

    (function (DATA_TABLE_PREFERENCE) {
      DATA_TABLE_PREFERENCE[DATA_TABLE_PREFERENCE["enabled"] = 1024] = "enabled";
    })(DATA_TABLE_PREFERENCE || (DATA_TABLE_PREFERENCE = {}));

    var TEXT_SUMMARY_PREFERENCE;

    (function (TEXT_SUMMARY_PREFERENCE) {
      TEXT_SUMMARY_PREFERENCE[TEXT_SUMMARY_PREFERENCE["enabled"] = 1280] = "enabled";
    })(TEXT_SUMMARY_PREFERENCE || (TEXT_SUMMARY_PREFERENCE = {}));
    /***/

  },

  /***/
  "./src/i18n/utils.ts":
  /*!***************************!*\
    !*** ./src/i18n/utils.ts ***!
    \***************************/

  /*! exports provided: setLanguage, getLanguage, t, tA11y */

  /***/
  function srcI18nUtilsTs(module, __webpack_exports__, __webpack_require__) {
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


    var striptags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! striptags */
    "./node_modules/striptags/src/striptags.js");
    /* harmony import */


    var striptags__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(striptags__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */


    var _languages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./languages */
    "./src/i18n/languages/index.ts");

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

      return Object(sprintf_js__WEBPACK_IMPORTED_MODULE_0__["sprintf"]).apply(void 0, [_languages__WEBPACK_IMPORTED_MODULE_2__[language][key]].concat(args));
    }

    function tA11y(key) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return striptags__WEBPACK_IMPORTED_MODULE_1__(t.apply(void 0, [key].concat(args)));
    }
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
          var _this4 = this;

          var filters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
          var sortBy = arguments.length > 3 ? arguments[3] : undefined;
          var measureIndices = measureNames.map(function (name) {
            return _this4.measures.findIndex(function (measure) {
              return measure.name === name;
            });
          });
          var categoryIndices = categoryNames.map(function (name) {
            return _this4.categories.findIndex(function (category) {
              return category.name === name;
            });
          });
          var categoryTrie = {
            children: {}
          };
          var filterFuncs = filters.map(function (filter) {
            return filter(_this4.categories, _this4.measures);
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
    var defaultOptions = {
      excludeStartDate: false,
      excludeEndDate: false
    };

    function betweenDates(startDate, endDate) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _Object$assign3 = Object.assign(Object.assign({}, defaultOptions), options),
          excludeStartDate = _Object$assign3.excludeStartDate,
          excludeEndDate = _Object$assign3.excludeEndDate;

      return function (categories) {
        var nThDayIndex = categories.findIndex(function (category) {
          return category.name === 'nthDay';
        });
        var startIndex = Math.round((Date.now() - startDate.getTime()) / millisecondsPerDay);

        if (excludeStartDate) {
          startIndex--;
        }

        var endIndex = Math.round((Date.now() - endDate.getTime()) / millisecondsPerDay);

        if (excludeEndDate) {
          endIndex++;
        }

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
          return this.dataCube.getDataFor([categoryName], [measureName], [Object(_models_data_cube_filters__WEBPACK_IMPORTED_MODULE_2__["betweenDates"])(startDate.toJSDate(), endDate.toJSDate(), {
            excludeStartDate: true
          })]).map(function (row) {
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
  "./src/services/preference/preference.module.ts":
  /*!******************************************************!*\
    !*** ./src/services/preference/preference.module.ts ***!
    \******************************************************/

  /*! exports provided: PreferenceModule */

  /***/
  function srcServicesPreferencePreferenceModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PreferenceModule", function () {
      return PreferenceModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _preference_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./preference.service */
    "./src/services/preference/preference.service.ts");

    var PreferenceModule = function PreferenceModule() {
      _classCallCheck(this, PreferenceModule);
    };

    PreferenceModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: PreferenceModule
    });
    PreferenceModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function PreferenceModule_Factory(t) {
        return new (t || PreferenceModule)();
      },
      providers: [_preference_service__WEBPACK_IMPORTED_MODULE_1__["PreferenceService"]]
    });

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PreferenceModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          providers: [_preference_service__WEBPACK_IMPORTED_MODULE_1__["PreferenceService"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/services/preference/preference.service.ts":
  /*!*******************************************************!*\
    !*** ./src/services/preference/preference.service.ts ***!
    \*******************************************************/

  /*! exports provided: PreferenceService */

  /***/
  function srcServicesPreferencePreferenceServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PreferenceService", function () {
      return PreferenceService;
    });
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! js-cookie */
    "./node_modules/js-cookie/src/js.cookie.js");
    /* harmony import */


    var js_cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_1__);

    var PreferenceService = /*#__PURE__*/function () {
      function PreferenceService() {
        _classCallCheck(this, PreferenceService);

        this.audification$ = this.createPreference({
          enabled: true,
          lowestPitch: 256,
          highestPitch: 1024,
          noteDuration: 167,
          readBefore: false,
          readAfter: true
        }, 'audification');
        this.dataTable$ = this.createPreference({
          enabled: true
        }, 'data_table');
        this.textSummary$ = this.createPreference({
          enabled: true
        }, 'text_summary');
      }

      _createClass(PreferenceService, [{
        key: "createPreference",
        value: function createPreference(defaultPreference, cookieKeySuffix) {
          var _this5 = this;

          var cookieKey = "a11y-preference-".concat(cookieKeySuffix);
          var loadedPreference = Object.assign(Object.assign({}, defaultPreference), this.loadPreference(cookieKey));
          var keys = Object.keys(loadedPreference);

          for (var _i3 = 0, _keys = keys; _i3 < _keys.length; _i3++) {
            var key = _keys[_i3];

            if (!(key in defaultPreference)) {
              delete loadedPreference[key];
              continue;
            }

            var expectedType = typeof defaultPreference[key];
            var actualType = typeof loadedPreference[key];

            if (actualType !== expectedType) {
              loadedPreference[key] = defaultPreference[key];
            }
          }

          var preference$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](loadedPreference);
          preference$.subscribe(function (preference) {
            _this5.savePreference(cookieKey, preference);
          });
          return preference$;
        }
      }, {
        key: "loadPreference",
        value: function loadPreference(cookieKey) {
          var cookie = js_cookie__WEBPACK_IMPORTED_MODULE_1__["get"](cookieKey);

          if (!cookie) {
            return {};
          }

          try {
            return JSON.parse(cookie);
          } catch (e) {
            console.error('Error occurred while parsing the cookie:', e);
          }

          return {};
        }
      }, {
        key: "savePreference",
        value: function savePreference(cookieKey, preference) {
          js_cookie__WEBPACK_IMPORTED_MODULE_1__["set"](cookieKey, preference);
        }
      }]);

      return PreferenceService;
    }();
    /***/

  },

  /***/
  "./src/utils/formatters.ts":
  /*!*********************************!*\
    !*** ./src/utils/formatters.ts ***!
    \*********************************/

  /*! exports provided: formatX, formatY, humanizeMeasureName */

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
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "humanizeMeasureName", function () {
      return humanizeMeasureName;
    });
    /* harmony import */


    var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! d3 */
    "./node_modules/d3/index.js");

    var formatX = d3__WEBPACK_IMPORTED_MODULE_0__["timeFormat"]('%B %d');

    var formatY = function formatY(value) {
      return Number.isInteger(value) ? "".concat(value) : value.toFixed(1);
    };

    var humanizeMeasureName = function humanizeMeasureName(str) {
      return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (firstCharacter) {
        return firstCharacter.toUpperCase();
      });
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
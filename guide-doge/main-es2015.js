(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app-routing.module.ts":
/*!***********************************!*\
  !*** ./src/app-routing.module.ts ***!
  \***********************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app.component.ts":
/*!******************************!*\
  !*** ./src/app.component.ts ***!
  \******************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _assets_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/i18n */ "./src/assets/i18n/index.ts");
/* harmony import */ var _components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/line-chart/line-chart.component */ "./src/components/line-chart/line-chart.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");





class AppComponent {
    get TITLE() {
        return Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_1__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_1__["GUIDE_DOGE"].TITLE);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 5, vars: 1, consts: [[1, "container"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-line-chart");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "router-outlet");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.TITLE);
    } }, directives: [_components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_2__["LineChartComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwLmNvbXBvbmVudC5zY3NzIn0= */"] });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss'],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app.component.ts");
/* harmony import */ var _components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/line-chart/line-chart.module */ "./src/components/line-chart/line-chart.module.ts");






class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_4__["LineChartModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_4__["LineChartModule"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_4__["LineChartModule"],
                ],
                bootstrap: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/assets/i18n/en.ts":
/*!*******************************!*\
  !*** ./src/assets/i18n/en.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/assets/i18n/types.ts");

const en = {
    [_types__WEBPACK_IMPORTED_MODULE_0__["GUIDE_DOGE"].TITLE]: 'Guide-Doge',
    [_types__WEBPACK_IMPORTED_MODULE_0__["GUIDE_DOGE"].VISUALIZATION]: 'Data visualization',
    [_types__WEBPACK_IMPORTED_MODULE_0__["GUIDE_DOGE"].AUDIFICATION]: 'Data audification',
    [_types__WEBPACK_IMPORTED_MODULE_0__["VISUALIZATION"].ACTIVE_DATUM]: '%(y)s on %(x)s',
    [_types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].INSTRUCTIONS]: 'Hold down <kbd>SPACE</kbd> to play audification and <kbd>SHIFT</kbd> + <kbd>SPACE</kbd> to play it backward. <br/>Press <kbd>X</kbd> or <kbd>Y</kbd> to read the domain and range. <br/>Press <kbd>0</kbd> ... <kbd>9</kbd> to move playhead.',
    [_types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].DOMAIN]: 'Domain from %(min)s to %(max)s',
    [_types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].RANGE]: 'Range from %(min)s to %(max)s',
    [_types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].ACTIVE_DATUM]: '%(y)s on %(x)s',
};
/* harmony default export */ __webpack_exports__["default"] = (en);


/***/ }),

/***/ "./src/assets/i18n/index.ts":
/*!**********************************!*\
  !*** ./src/assets/i18n/index.ts ***!
  \**********************************/
/*! exports provided: GUIDE_DOGE, VISUALIZATION, AUDIFICATION, setLanguage, getLanguage, t, tA11y */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/assets/i18n/types.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GUIDE_DOGE", function() { return _types__WEBPACK_IMPORTED_MODULE_0__["GUIDE_DOGE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VISUALIZATION", function() { return _types__WEBPACK_IMPORTED_MODULE_0__["VISUALIZATION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AUDIFICATION", function() { return _types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"]; });

/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/assets/i18n/utils.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setLanguage", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["setLanguage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLanguage", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getLanguage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "t", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["t"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tA11y", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["tA11y"]; });





/***/ }),

/***/ "./src/assets/i18n/types.ts":
/*!**********************************!*\
  !*** ./src/assets/i18n/types.ts ***!
  \**********************************/
/*! exports provided: GUIDE_DOGE, VISUALIZATION, AUDIFICATION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GUIDE_DOGE", function() { return GUIDE_DOGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VISUALIZATION", function() { return VISUALIZATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUDIFICATION", function() { return AUDIFICATION; });
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


/***/ }),

/***/ "./src/assets/i18n/utils.ts":
/*!**********************************!*\
  !*** ./src/assets/i18n/utils.ts ***!
  \**********************************/
/*! exports provided: setLanguage, getLanguage, t, tA11y */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLanguage", function() { return setLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLanguage", function() { return getLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return t; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tA11y", function() { return tA11y; });
/* harmony import */ var sprintf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sprintf-js */ "./node_modules/sprintf-js/src/sprintf.js");
/* harmony import */ var sprintf_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sprintf_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _en__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./en */ "./src/assets/i18n/en.ts");
/* harmony import */ var striptags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! striptags */ "./node_modules/striptags/src/striptags.js");
/* harmony import */ var striptags__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(striptags__WEBPACK_IMPORTED_MODULE_2__);



const dictionary = { en: _en__WEBPACK_IMPORTED_MODULE_1__["default"] };
let language = 'en';
function setLanguage(lang) {
    language = lang;
}
function getLanguage() {
    return language;
}
function t(key, ...args) {
    return Object(sprintf_js__WEBPACK_IMPORTED_MODULE_0__["sprintf"])(dictionary[language][key], ...args);
}
function tA11y(key, ...args) {
    return striptags__WEBPACK_IMPORTED_MODULE_2__(t(key, ...args));
}


/***/ }),

/***/ "./src/components/line-chart-audification/line-chart-audification.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/components/line-chart-audification/line-chart-audification.component.ts ***!
  \*************************************************************************************/
/*! exports provided: LineChartAudificationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineChartAudificationComponent", function() { return LineChartAudificationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _models_melody_melody_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/melody/melody.model */ "./src/models/melody/melody.model.ts");
/* harmony import */ var _assets_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/i18n */ "./src/assets/i18n/index.ts");
/* harmony import */ var _utils_formatters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/formatters */ "./src/utils/formatters.ts");






class LineChartAudificationComponent {
    constructor(zone) {
        this.zone = zone;
        this.activeDatumChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.frequencyRange = [256, 2048];
        this.duration = 5;
        this.liveText = null;
        this.handleSeek = this.handleSeek.bind(this);
    }
    get INSTRUCTIONS() {
        return Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["AUDIFICATION"].INSTRUCTIONS);
    }
    get INSTRUCTIONS_A11Y() {
        return Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["tA11y"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["AUDIFICATION"].INSTRUCTIONS);
    }
    ngOnDestroy() {
        var _a;
        (_a = this.melody) === null || _a === void 0 ? void 0 : _a.dispose();
    }
    ngOnChanges(changes) {
        var _a;
        if ('data' in changes) {
            const values = this.data.map(datum => datum.value);
            this.domain = this.data.map(d => d.date).sort((a, b) => a.getTime() - b.getTime());
            this.range = this.data.map(d => d.value).sort();
            (_a = this.melody) === null || _a === void 0 ? void 0 : _a.dispose();
            this.melody = new _models_melody_melody_model__WEBPACK_IMPORTED_MODULE_2__["Melody"](values, this.frequencyRange, this.duration, this.handleSeek);
        }
    }
    handleSeek(index, playing) {
        const datum = this.data[index];
        const { date, value } = datum;
        this.zone.run((() => {
            this.activeDatumChange.emit(datum);
            if (!playing) {
                this.readOut(Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["AUDIFICATION"].ACTIVE_DATUM, {
                    x: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatX"])(date),
                    y: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatY"])(value),
                }));
            }
        }));
    }
    handleKeyDown($event) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const { key, shiftKey, repeat } = $event;
            if (repeat) {
                return;
            }
            if (key === ' ') {
                yield ((_a = this.melody) === null || _a === void 0 ? void 0 : _a.resume(shiftKey));
            }
            else if (key === 'x') {
                this.readOut(Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["AUDIFICATION"].DOMAIN, {
                    min: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatX"])(this.domain[0]),
                    max: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatX"])(this.domain[this.domain.length - 1]),
                }));
            }
            else if (key === 'y') {
                this.readOut(Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["AUDIFICATION"].RANGE, {
                    min: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatY"])(this.range[0]),
                    max: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatY"])(this.range[this.range.length - 1]),
                }));
            }
            else if ('0' <= key && key <= '9') {
                (_b = this.melody) === null || _b === void 0 ? void 0 : _b.seekTo(this.duration * (+key / 10), true);
            }
            else {
                return;
            }
            $event.preventDefault();
            $event.stopPropagation();
        });
    }
    handleKeyUp($event) {
        var _a;
        const { key } = $event;
        if (key === ' ') {
            (_a = this.melody) === null || _a === void 0 ? void 0 : _a.pause();
        }
        else {
            return;
        }
        $event.preventDefault();
        $event.stopPropagation();
    }
    readOut(text) {
        if (this.liveText === text) {
            this.liveText = null;
            window.setTimeout(() => {
                this.readOut(text);
            }, 500);
        }
        else {
            this.liveText = text;
        }
    }
}
LineChartAudificationComponent.ɵfac = function LineChartAudificationComponent_Factory(t) { return new (t || LineChartAudificationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"])); };
LineChartAudificationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LineChartAudificationComponent, selectors: [["app-line-chart-audification"]], hostBindings: function LineChartAudificationComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keydown", function LineChartAudificationComponent_keydown_HostBindingHandler($event) { return ctx.handleKeyDown($event); })("keyup", function LineChartAudificationComponent_keyup_HostBindingHandler($event) { return ctx.handleKeyUp($event); });
    } }, inputs: { data: "data", activeDatum: "activeDatum", frequencyRange: "frequencyRange", duration: "duration" }, outputs: { activeDatumChange: "activeDatumChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]], decls: 3, vars: 3, consts: [["role", "img", 3, "innerHTML"], ["aria-live", "assertive", 1, "live-text"]], template: function LineChartAudificationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHTML", ctx.INSTRUCTIONS, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("aria-label", ctx.INSTRUCTIONS_A11Y);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.liveText, "\n");
    } }, styles: ["@charset \"UTF-8\";\n[_nghost-%COMP%]     kbd {\n  background-color: #eee;\n  border-radius: 3px;\n  border: 1px solid #b4b4b4;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 2px 0 0 rgba(255, 255, 255, 0.7) inset;\n  color: #333;\n  display: inline-block;\n  font-size: 0.85em;\n  font-weight: 700;\n  line-height: 1;\n  padding: 2px 4px;\n  white-space: nowrap;\n}\n[_nghost-%COMP%]   .live-text[_ngcontent-%COMP%]:before {\n  content: \"\uD83D\uDD0A\";\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvcnVubmVyL3dvcmsvZ3VpZGUtZG9nZS9ndWlkZS1kb2dlL3NyYy9jb21wb25lbnRzL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQ0VaO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0ZBQUE7RUFDQSxXQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QURBTjtBQ0tJO0VBQ0UsYUFBQTtBREhOIiwiZmlsZSI6InNyYy9jb21wb25lbnRzL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGNoYXJzZXQgXCJVVEYtOFwiO1xuOmhvc3QgOjpuZy1kZWVwIGtiZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2I0YjRiNDtcbiAgYm94LXNoYWRvdzogMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAycHggMCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KSBpbnNldDtcbiAgY29sb3I6ICMzMzM7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1zaXplOiAwLjg1ZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBwYWRkaW5nOiAycHggNHB4O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuOmhvc3QgLmxpdmUtdGV4dDpiZWZvcmUge1xuICBjb250ZW50OiBcIvCflIpcIjtcbn0iLCI6aG9zdCB7XG4gIDo6bmctZGVlcCB7XG4gICAga2JkIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjYjRiNGI0O1xuICAgICAgYm94LXNoYWRvdzogMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgLjIpLCAwIDJweCAwIDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAuNykgaW5zZXQ7XG4gICAgICBjb2xvcjogIzMzMztcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIGZvbnQtc2l6ZTogLjg1ZW07XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgICBwYWRkaW5nOiAycHggNHB4O1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB9XG4gIH1cblxuICAubGl2ZS10ZXh0IHtcbiAgICAmOmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAn8J+UiidcbiAgICB9XG4gIH1cbn1cbiJdfQ== */"] });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](LineChartAudificationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-line-chart-audification',
                templateUrl: './line-chart-audification.component.html',
                styleUrls: ['./line-chart-audification.component.scss'],
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }]; }, { data: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], activeDatum: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], activeDatumChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"]
        }], frequencyRange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], duration: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], handleKeyDown: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"],
            args: ['keydown', ['$event']]
        }], handleKeyUp: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"],
            args: ['keyup', ['$event']]
        }] }); })();


/***/ }),

/***/ "./src/components/line-chart-audification/line-chart-audification.module.ts":
/*!**********************************************************************************!*\
  !*** ./src/components/line-chart-audification/line-chart-audification.module.ts ***!
  \**********************************************************************************/
/*! exports provided: LineChartAudificationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineChartAudificationModule", function() { return LineChartAudificationModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./line-chart-audification.component */ "./src/components/line-chart-audification/line-chart-audification.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




class LineChartAudificationModule {
}
LineChartAudificationModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: LineChartAudificationModule });
LineChartAudificationModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function LineChartAudificationModule_Factory(t) { return new (t || LineChartAudificationModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LineChartAudificationModule, { declarations: [_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]], exports: [_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartAudificationModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"],
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                ],
                exports: [
                    _line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/components/line-chart-visualization/line-chart-visualization.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/components/line-chart-visualization/line-chart-visualization.component.ts ***!
  \***************************************************************************************/
/*! exports provided: LineChartVisualizationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineChartVisualizationComponent", function() { return LineChartVisualizationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _d3_line_chart_d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../d3/line-chart.d3 */ "./src/d3/line-chart.d3.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");




class LineChartVisualizationComponent {
    constructor(elementRef) {
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
    ngOnInit() {
        this.lineChartD3.render();
    }
    ngOnDestroy() {
        this.lineChartD3.clear();
    }
    ngOnChanges(changes) {
        if ('data' in changes) {
            this.dataSubject.next(this.data);
        }
        if ('activeDatum' in changes) {
            this.activeDatumSubject.next(this.activeDatum);
        }
    }
}
LineChartVisualizationComponent.ɵfac = function LineChartVisualizationComponent_Factory(t) { return new (t || LineChartVisualizationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
LineChartVisualizationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LineChartVisualizationComponent, selectors: [["app-line-chart-visualization"]], inputs: { height: "height", width: "width", marginTop: "marginTop", marginRight: "marginRight", marginBottom: "marginBottom", marginLeft: "marginLeft", data: "data", activeDatum: "activeDatum" }, outputs: { activeDatumChange: "activeDatumChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 0, vars: 0, template: function LineChartVisualizationComponent_Template(rf, ctx) { }, styles: ["[_nghost-%COMP%]     svg {\n  max-width: 1280px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvY29tcG9uZW50cy9saW5lLWNoYXJ0LXZpc3VhbGl6YXRpb24vbGluZS1jaGFydC12aXN1YWxpemF0aW9uLmNvbXBvbmVudC5zY3NzIiwic3JjL2NvbXBvbmVudHMvbGluZS1jaGFydC12aXN1YWxpemF0aW9uL2xpbmUtY2hhcnQtdmlzdWFsaXphdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFSTtFQUNFLGlCQUFBO0FDRE4iLCJmaWxlIjoic3JjL2NvbXBvbmVudHMvbGluZS1jaGFydC12aXN1YWxpemF0aW9uL2xpbmUtY2hhcnQtdmlzdWFsaXphdGlvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgOjpuZy1kZWVwIHtcbiAgICBzdmcge1xuICAgICAgbWF4LXdpZHRoOiAxMjgwcHg7XG4gICAgfVxuICB9XG59XG4iLCI6aG9zdCA6Om5nLWRlZXAgc3ZnIHtcbiAgbWF4LXdpZHRoOiAxMjgwcHg7XG59Il19 */"] });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartVisualizationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-line-chart-visualization',
                template: '',
                styleUrls: ['./line-chart-visualization.component.scss'],
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]; }, { height: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], width: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], marginTop: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], marginRight: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], marginBottom: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], marginLeft: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], data: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], activeDatum: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], activeDatumChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/components/line-chart-visualization/line-chart-visualization.module.ts":
/*!************************************************************************************!*\
  !*** ./src/components/line-chart-visualization/line-chart-visualization.module.ts ***!
  \************************************************************************************/
/*! exports provided: LineChartVisualizationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineChartVisualizationModule", function() { return LineChartVisualizationModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _line_chart_visualization_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./line-chart-visualization.component */ "./src/components/line-chart-visualization/line-chart-visualization.component.ts");
/* harmony import */ var _services_data_data_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/data/data.module */ "./src/services/data/data.module.ts");




class LineChartVisualizationModule {
}
LineChartVisualizationModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: LineChartVisualizationModule });
LineChartVisualizationModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function LineChartVisualizationModule_Factory(t) { return new (t || LineChartVisualizationModule)(); }, imports: [[
            _services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LineChartVisualizationModule, { declarations: [_line_chart_visualization_component__WEBPACK_IMPORTED_MODULE_1__["LineChartVisualizationComponent"]], imports: [_services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"]], exports: [_line_chart_visualization_component__WEBPACK_IMPORTED_MODULE_1__["LineChartVisualizationComponent"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartVisualizationModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _line_chart_visualization_component__WEBPACK_IMPORTED_MODULE_1__["LineChartVisualizationComponent"],
                ],
                imports: [
                    _services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"],
                ],
                exports: [
                    _line_chart_visualization_component__WEBPACK_IMPORTED_MODULE_1__["LineChartVisualizationComponent"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/components/line-chart/line-chart.component.ts":
/*!***********************************************************!*\
  !*** ./src/components/line-chart/line-chart.component.ts ***!
  \***********************************************************/
/*! exports provided: LineChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineChartComponent", function() { return LineChartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/data-cube/presets */ "./src/models/data-cube/presets.ts");
/* harmony import */ var _assets_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/i18n */ "./src/assets/i18n/index.ts");
/* harmony import */ var _services_data_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/data/data.service */ "./src/services/data/data.service.ts");
/* harmony import */ var _line_chart_visualization_line_chart_visualization_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../line-chart-visualization/line-chart-visualization.component */ "./src/components/line-chart-visualization/line-chart-visualization.component.ts");
/* harmony import */ var _line_chart_audification_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../line-chart-audification/line-chart-audification.component */ "./src/components/line-chart-audification/line-chart-audification.component.ts");







class LineChartComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.measureNames = [_models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["activeUserMeasure"], _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["revenueMeasure"], _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["eventCountMeasure"]].map(measure => measure.name);
        this.setMeasureIndex(0);
    }
    get VISUALIZATION() {
        return Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_2__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_2__["GUIDE_DOGE"].VISUALIZATION);
    }
    toggleMeasure() {
        const index = this.measureNames.indexOf(this.measureName);
        const nextIndex = (index + 1) % this.measureNames.length;
        this.setMeasureIndex(nextIndex);
    }
    setMeasureIndex(index) {
        this.measureName = this.measureNames[index];
        this.data = this.dataService.getMeasureOverDays(this.measureName);
        this.activeDatum = null;
    }
}
LineChartComponent.ɵfac = function LineChartComponent_Factory(t) { return new (t || LineChartComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_data_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"])); };
LineChartComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LineChartComponent, selectors: [["app-line-chart"]], decls: 4, vars: 5, consts: [[3, "click"], ["role", "img", 3, "data", "activeDatum", "activeDatumChange"], ["tabindex", "0", 3, "data", "activeDatum", "activeDatumChange"]], template: function LineChartComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LineChartComponent_Template_button_click_0_listener() { return ctx.toggleMeasure(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Toggle Measure");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "app-line-chart-visualization", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("activeDatumChange", function LineChartComponent_Template_app_line_chart_visualization_activeDatumChange_2_listener($event) { return ctx.activeDatum = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "app-line-chart-audification", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("activeDatumChange", function LineChartComponent_Template_app_line_chart_audification_activeDatumChange_3_listener($event) { return ctx.activeDatum = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", ctx.data)("activeDatum", ctx.activeDatum);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", ctx.VISUALIZATION);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", ctx.data)("activeDatum", ctx.activeDatum);
    } }, directives: [_line_chart_visualization_line_chart_visualization_component__WEBPACK_IMPORTED_MODULE_4__["LineChartVisualizationComponent"], _line_chart_audification_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_5__["LineChartAudificationComponent"]], encapsulation: 2 });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-line-chart',
                templateUrl: './line-chart.component.html',
            }]
    }], function () { return [{ type: _services_data_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"] }]; }, null); })();


/***/ }),

/***/ "./src/components/line-chart/line-chart.module.ts":
/*!********************************************************!*\
  !*** ./src/components/line-chart/line-chart.module.ts ***!
  \********************************************************/
/*! exports provided: LineChartModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineChartModule", function() { return LineChartModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _line_chart_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./line-chart.component */ "./src/components/line-chart/line-chart.component.ts");
/* harmony import */ var _components_line_chart_visualization_line_chart_visualization_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/line-chart-visualization/line-chart-visualization.module */ "./src/components/line-chart-visualization/line-chart-visualization.module.ts");
/* harmony import */ var _components_line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/line-chart-audification/line-chart-audification.module */ "./src/components/line-chart-audification/line-chart-audification.module.ts");





class LineChartModule {
}
LineChartModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: LineChartModule });
LineChartModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function LineChartModule_Factory(t) { return new (t || LineChartModule)(); }, imports: [[
            _components_line_chart_visualization_line_chart_visualization_module__WEBPACK_IMPORTED_MODULE_2__["LineChartVisualizationModule"],
            _components_line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__["LineChartAudificationModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LineChartModule, { declarations: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]], imports: [_components_line_chart_visualization_line_chart_visualization_module__WEBPACK_IMPORTED_MODULE_2__["LineChartVisualizationModule"],
        _components_line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__["LineChartAudificationModule"]], exports: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"],
                ],
                imports: [
                    _components_line_chart_visualization_line_chart_visualization_module__WEBPACK_IMPORTED_MODULE_2__["LineChartVisualizationModule"],
                    _components_line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__["LineChartAudificationModule"],
                ],
                exports: [
                    _line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/d3/base.d3.ts":
/*!***************************!*\
  !*** ./src/d3/base.d3.ts ***!
  \***************************/
/*! exports provided: BaseD3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseD3", function() { return BaseD3; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");



class BaseD3 {
    constructor(renderOptions) {
        this.renderOptions = renderOptions;
    }
    get transition() {
        return this.createTransition(300);
    }
    get container() {
        return d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.renderOptions.elementRef.nativeElement);
    }
    config(renderOptions) {
        this.renderOptions = renderOptions;
        return this;
    }
    render() {
        const { width, height } = this.renderOptions;
        this.clear();
        this.clear$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.svg = this.container
            .append('svg')
            .attr('viewBox', [0, 0, width, height].join(' '));
    }
    clear() {
        if (!this.clear$) {
            return;
        }
        this.clear$.next();
        this.clear$.complete();
        this.clear$ = undefined;
        this.svg.remove();
    }
    takeUntilCleared() {
        if (!this.clear$) {
            throw new Error(`Subject 'clear$' is not defined.`);
        }
        return Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.clear$);
    }
    createTransition(duration) {
        return d3__WEBPACK_IMPORTED_MODULE_0__["transition"]()
            .duration(duration)
            .ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeLinear"]);
    }
}


/***/ }),

/***/ "./src/d3/line-chart.d3.ts":
/*!*********************************!*\
  !*** ./src/d3/line-chart.d3.ts ***!
  \*********************************/
/*! exports provided: LineChartD3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineChartD3", function() { return LineChartD3; });
/* harmony import */ var _xy_chart_d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./xy-chart.d3 */ "./src/d3/xy-chart.d3.ts");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
/* harmony import */ var _assets_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/i18n */ "./src/assets/i18n/index.ts");
/* harmony import */ var _utils_formatters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/formatters */ "./src/utils/formatters.ts");




class LineChartD3 extends _xy_chart_d3__WEBPACK_IMPORTED_MODULE_0__["XYChartD3"] {
    renderData() {
        this.line = d3__WEBPACK_IMPORTED_MODULE_1__["line"]()
            .defined(d => !isNaN(d.value))
            .x(d => this.scaleX(d.date))
            .y(d => this.scaleY(d.value));
        this.path = this.svg
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round');
    }
    updateData(data) {
        this.path
            .datum(data)
            .transition(this.transition)
            .attr('d', this.line);
    }
    renderActiveDatum() {
        this.activeDatumG = this.svg
            .append('g');
        this.activeDatumG
            .append('circle')
            .attr('r', 4)
            .attr('fill', 'steelblue');
        this.activeDatumText = this.activeDatumG
            .append('text')
            .attr('y', 20)
            .attr('text-anchor', 'middle')
            .attr('font-family', 'sans-serif')
            .attr('font-size', 10);
    }
    updateActiveDatum(activeDatum) {
        if (!activeDatum) {
            this.activeDatumG.attr('display', 'none');
            return;
        }
        const { date, value } = activeDatum;
        this.activeDatumG
            .transition(this.createTransition(50))
            .attr('display', 'inherit')
            .attr('transform', `translate(${this.scaleX(date)},${this.scaleY(value)})`);
        this.activeDatumText.text(Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_2__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_2__["AUDIFICATION"].ACTIVE_DATUM, {
            x: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_3__["formatX"])(date),
            y: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_3__["formatY"])(value),
        }));
    }
}


/***/ }),

/***/ "./src/d3/xy-chart.d3.ts":
/*!*******************************!*\
  !*** ./src/d3/xy-chart.d3.ts ***!
  \*******************************/
/*! exports provided: XYChartD3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XYChartD3", function() { return XYChartD3; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
/* harmony import */ var _base_d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base.d3 */ "./src/d3/base.d3.ts");
/* harmony import */ var _utils_formatters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/formatters */ "./src/utils/formatters.ts");



class XYChartD3 extends _base_d3__WEBPACK_IMPORTED_MODULE_1__["BaseD3"] {
    render() {
        super.render();
        const { dataObservable, activeDatumObservable, } = this.renderOptions;
        this.renderAxis();
        this.renderData();
        this.renderActiveDatum();
        dataObservable
            .pipe(this.takeUntilCleared())
            .subscribe(data => {
            this.updateAxis(data);
            this.updateData(data);
        });
        activeDatumObservable
            .pipe(this.takeUntilCleared())
            .subscribe(activeDatum => {
            this.updateActiveDatum(activeDatum);
        });
    }
    renderAxis() {
        const { height, width, marginTop, marginRight, marginBottom, marginLeft, } = this.renderOptions;
        this.scaleX = d3__WEBPACK_IMPORTED_MODULE_0__["scaleUtc"]()
            .range([marginLeft, width - marginRight]);
        this.scaleY = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]()
            .nice()
            .range([height - marginBottom, marginTop]);
        this.xAxis = d3__WEBPACK_IMPORTED_MODULE_0__["axisBottom"](this.scaleX)
            .ticks(width / 80)
            .tickFormat(_utils_formatters__WEBPACK_IMPORTED_MODULE_2__["formatX"])
            .tickSizeOuter(0);
        this.yAxis = d3__WEBPACK_IMPORTED_MODULE_0__["axisLeft"](this.scaleY);
        this.xAxisG = this.svg
            .append('g')
            .attr('transform', `translate(0,${height - marginBottom})`);
        this.yAxisG = this.svg
            .append('g')
            .attr('transform', `translate(${marginLeft},0)`);
    }
    updateAxis(data) {
        this.scaleX.domain(d3__WEBPACK_IMPORTED_MODULE_0__["extent"](data, d => d.date));
        this.scaleY.domain([0, d3__WEBPACK_IMPORTED_MODULE_0__["max"](data, d => d.value)]);
        this.xAxisG
            .transition(this.transition)
            .call(this.xAxis);
        this.yAxisG
            .transition(this.transition)
            .call(this.yAxis);
    }
}


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
const environment = {
    production: false,
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "./src/models/data-cube/data-cube.model.ts":
/*!*************************************************!*\
  !*** ./src/models/data-cube/data-cube.model.ts ***!
  \*************************************************/
/*! exports provided: DataCube */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataCube", function() { return DataCube; });
class DataCube {
    constructor(rows, measures, categories) {
        this.rows = rows;
        this.measures = measures;
        this.categories = categories;
    }
    getDataFor(categoryNames, measureNames, filters = [], sortBy) {
        const measureIndices = measureNames.map(name => this.measures.findIndex(measure => measure.name === name));
        const categoryIndices = categoryNames.map(name => this.categories.findIndex(category => category.name === name));
        const categoryTrie = { children: {} };
        const filterFuncs = filters.map(filter => filter(this.categories, this.measures));
        this.rows
            .filter(row => filterFuncs.every(filter => filter(row)))
            .forEach(row => {
            let trieNode = categoryTrie;
            for (const categoryIndex of categoryIndices) {
                if (!trieNode.children[row.header[categoryIndex]]) {
                    trieNode.children[row.header[categoryIndex]] = { children: {} };
                }
                trieNode = trieNode.children[row.header[categoryIndex]];
            }
            if (!trieNode.values) {
                trieNode.values = measureNames.map(() => 0);
            }
            for (const [index, measureIndex] of measureIndices.entries()) {
                trieNode.values[index] += row.values[measureIndex];
            }
        });
        const result = [];
        const labelList = [];
        const traverseNode = (node) => {
            if (node.values) {
                result.push({
                    categories: new Map(labelList.map((label, index) => [categoryNames[index], label])),
                    values: new Map(node.values.map((value, index) => [measureNames[index], value])),
                });
            }
            else {
                for (const [label, child] of Object.entries(node.children)) {
                    labelList.push(label);
                    traverseNode(child);
                    labelList.pop();
                }
            }
        };
        traverseNode(categoryTrie);
        this.normalizeNthDay(result, categoryNames);
        this.sortResults(result, categoryNames, measureNames, sortBy !== null && sortBy !== void 0 ? sortBy : [...categoryNames, ...measureNames]);
        return result;
    }
    normalizeNthDay(rows, categoryNames) {
        if (!categoryNames.includes('nthDay')) {
            return;
        }
        const largestNthDay = Math.max(...rows.map(row => row.categories.get('nthDay')));
        for (const row of rows) {
            const nthDay = row.categories.get('nthDay');
            row.categories.set('nthDay', largestNthDay - nthDay);
        }
    }
    sortResults(results, categoryNames, measureNames, sortBy) {
        function getComparator(sortConcept) {
            if (categoryNames.includes(sortConcept)) {
                return (a, b) => {
                    const aCategory = a.categories.get(sortConcept);
                    const bCategory = b.categories.get(sortConcept);
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
                return (a, b) => a.values.get(sortConcept) - b.values.get(sortConcept);
            }
            return () => 0;
        }
        const comparators = sortBy.map(getComparator);
        const combinedComparator = (a, b) => {
            for (const comparator of comparators) {
                const result = comparator(a, b);
                if (result !== 0) {
                    return result;
                }
            }
            return 0;
        };
        results.sort(combinedComparator);
    }
}


/***/ }),

/***/ "./src/models/data-cube/filters.ts":
/*!*****************************************!*\
  !*** ./src/models/data-cube/filters.ts ***!
  \*****************************************/
/*! exports provided: betweenDates */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "betweenDates", function() { return betweenDates; });
const millisecondsPerDay = 24 * 60 * 60 * 1000;
function betweenDates(startDate, endDate) {
    return (categories) => {
        const nThDayIndex = categories.findIndex(category => category.name === 'nthDay');
        const startIndex = Math.round((Date.now() - startDate.getTime()) / millisecondsPerDay);
        const endIndex = Math.round((Date.now() - endDate.getTime()) / millisecondsPerDay);
        return (row) => row.header[nThDayIndex] <= startIndex &&
            row.header[nThDayIndex] >= endIndex;
    };
}


/***/ }),

/***/ "./src/models/data-cube/generation.ts":
/*!********************************************!*\
  !*** ./src/models/data-cube/generation.ts ***!
  \********************************************/
/*! exports provided: generateCube */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateCube", function() { return generateCube; });
/* harmony import */ var random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! random */ "./node_modules/random/index.js");
/* harmony import */ var random__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(random__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/models/data-cube/types.ts");
/* harmony import */ var _data_cube_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data-cube.model */ "./src/models/data-cube/data-cube.model.ts");



function generateCube(categories, measures, settings = {}) {
    const completeSettings = Object.assign(Object.assign({}, defaultSettings), settings);
    const actualCategories = [...categories];
    if (completeSettings.nthDay) {
        const nthDayCategory = generateNthDay(completeSettings.days, completeSettings.dailyStdDev);
        actualCategories.push(nthDayCategory);
    }
    const rows = generateEmptyRows(actualCategories, measures);
    const cumulativeWeights = generateCumulativeWeights(rows, actualCategories);
    generateHits(rows, measures, cumulativeWeights, generateUsersAndSessions(completeSettings), completeSettings);
    return new _data_cube_model__WEBPACK_IMPORTED_MODULE_2__["DataCube"](rows, measures, actualCategories);
}
const defaultSettings = {
    avgHits: 1000000,
    hitStdDev: 10000,
    avgUsers: 10000,
    userStdDev: 100,
    avgSessionsPerUser: 5,
    sessionsPerUserStdDev: 3,
    nthDay: true,
    days: 60,
    dailyStdDev: 0.1,
};
function generateUsersAndSessions({ avgUsers, userStdDev, avgSessionsPerUser, sessionsPerUserStdDev, }) {
    const userCount = Math.round(random__WEBPACK_IMPORTED_MODULE_0__["normal"](avgUsers, userStdDev)());
    const sessionThunk = random__WEBPACK_IMPORTED_MODULE_0__["normal"](avgSessionsPerUser, sessionsPerUserStdDev);
    const sessions = [];
    for (let i = 0; i < userCount; i++) {
        const user = { rowsSeen: new Set() };
        const userSessions = Math.round(sessionThunk());
        for (let j = 0; j < userSessions; j++) {
            sessions.push({ user, rowsSeen: new Set() });
        }
    }
    return sessions;
}
function getNormalizedWeights(categories) {
    return categories.map(category => {
        const total = category.values.reduce((accumulator, value) => value.weight + accumulator, 0);
        return category.values.map(value => value.weight / total);
    });
}
function binarySearch(arr, probe, start = 0, end = arr.length) {
    const len = end - start;
    if (len < 2) {
        return start;
    }
    const index = len % 2 === 0 ? (start + end) / 2 : (start + end - 1) / 2;
    if (arr[index] <= probe) {
        return binarySearch(arr, probe, index, end);
    }
    else {
        return binarySearch(arr, probe, start, index);
    }
}
function generateMeasureIncrement(measure) {
    if (measure.type === _types__WEBPACK_IMPORTED_MODULE_1__["MeasureType"].COUNT || !measure.range) {
        return 1;
    }
    return random__WEBPACK_IMPORTED_MODULE_0__["float"](measure.range[0], measure.range[1]);
}
function generateHits(rows, measures, cumulativeWeights, sessions, { avgHits, hitStdDev }) {
    const hitTotal = Math.round(random__WEBPACK_IMPORTED_MODULE_0__["normal"](avgHits, hitStdDev)());
    const placementThunk = random__WEBPACK_IMPORTED_MODULE_0__["uniform"]();
    const sessionThunk = random__WEBPACK_IMPORTED_MODULE_0__["uniformInt"](0, sessions.length - 1);
    for (let i = 0; i < hitTotal; i++) {
        const placement = placementThunk();
        const session = sessionThunk();
        const rowIndex = binarySearch(cumulativeWeights, placement);
        for (const [index, measure] of measures.entries()) {
            const newSession = !sessions[session].rowsSeen.has(rowIndex);
            const newUser = !sessions[session].user.rowsSeen.has(rowIndex);
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
    }
}
function generateEmptyRows(categories, measures) {
    const rows = [];
    const categoryValueIndices = categories.map(() => 0);
    let categoryIndex = 0;
    do {
        const header = categories.map((category, index) => category.values[categoryValueIndices[index]].name);
        const values = measures.map(() => 0);
        rows.push({ header, values });
        categoryIndex = 0;
        do {
            categoryValueIndices[categoryIndex] =
                (categoryValueIndices[categoryIndex] + 1) %
                    categories[categoryIndex].values.length;
            categoryIndex += 1;
        } while (categoryValueIndices[categoryIndex - 1] === 0 &&
            categoryIndex < categories.length);
    } while (categoryValueIndices[categoryIndex - 1] !== 0);
    return rows;
}
function generateCumulativeWeights(rows, categories) {
    const weights = getNormalizedWeights(categories);
    const nameToWeightMapping = categories.map((category, categoryIndex) => new Map(category.values.map((value, index) => [
        value.name,
        weights[categoryIndex][index],
    ])));
    return rows.reduce((cumulativeWeights, row) => {
        const rowWeights = row.header.map((label, categoryIndex) => { var _a; return (_a = nameToWeightMapping[categoryIndex].get(label)) !== null && _a !== void 0 ? _a : 0; });
        const weightDelta = rowWeights.reduce((accumulator, weight) => accumulator * weight, 1);
        cumulativeWeights.push(weightDelta + cumulativeWeights[cumulativeWeights.length - 1]);
        return cumulativeWeights;
    }, [0]);
}
function generateNthDay(days, dailyVariance) {
    const dailyThunk = random__WEBPACK_IMPORTED_MODULE_0__["normal"](1, dailyVariance);
    const values = [];
    for (let day = 0; day < days; day++) {
        values.push({
            name: day,
            weight: dailyThunk(),
        });
    }
    return {
        name: 'nthDay',
        values,
    };
}


/***/ }),

/***/ "./src/models/data-cube/presets.ts":
/*!*****************************************!*\
  !*** ./src/models/data-cube/presets.ts ***!
  \*****************************************/
/*! exports provided: countryCategory, browserCategory, sourceCategory, activeUserMeasure, revenueMeasure, eventCountMeasure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "countryCategory", function() { return countryCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "browserCategory", function() { return browserCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sourceCategory", function() { return sourceCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activeUserMeasure", function() { return activeUserMeasure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "revenueMeasure", function() { return revenueMeasure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventCountMeasure", function() { return eventCountMeasure; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/models/data-cube/types.ts");

const countryCategory = {
    name: 'country',
    values: [
        {
            name: 'Canada',
            weight: 2,
        },
        {
            name: 'USA',
            weight: 16,
        },
        {
            name: 'Mexico',
            weight: 15,
        },
    ],
};
const browserCategory = {
    name: 'browser',
    values: [
        {
            name: 'Chrome',
            weight: 50,
        },
        {
            name: 'Firefox',
            weight: 19,
        },
        {
            name: 'Safari',
            weight: 20,
        },
        {
            name: 'Edge',
            weight: 10,
        },
    ],
};
const sourceCategory = {
    name: 'source',
    values: [
        {
            name: 'Direct',
            weight: 5,
        },
        {
            name: 'Email',
            weight: 5,
        },
    ],
};
const activeUserMeasure = {
    name: 'activeUsers',
    scope: _types__WEBPACK_IMPORTED_MODULE_0__["Scope"].USER,
    type: _types__WEBPACK_IMPORTED_MODULE_0__["MeasureType"].COUNT,
};
const revenueMeasure = {
    name: 'revenue',
    scope: _types__WEBPACK_IMPORTED_MODULE_0__["Scope"].EVENT,
    type: _types__WEBPACK_IMPORTED_MODULE_0__["MeasureType"].SUM,
    range: [0, 10],
};
const eventCountMeasure = {
    name: 'eventCount',
    scope: _types__WEBPACK_IMPORTED_MODULE_0__["Scope"].EVENT,
    type: _types__WEBPACK_IMPORTED_MODULE_0__["MeasureType"].SUM,
};


/***/ }),

/***/ "./src/models/data-cube/types.ts":
/*!***************************************!*\
  !*** ./src/models/data-cube/types.ts ***!
  \***************************************/
/*! exports provided: MeasureType, Scope */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeasureType", function() { return MeasureType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scope", function() { return Scope; });
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


/***/ }),

/***/ "./src/models/melody/melody.model.ts":
/*!*******************************************!*\
  !*** ./src/models/melody/melody.model.ts ***!
  \*******************************************/
/*! exports provided: Melody */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Melody", function() { return Melody; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var tone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tone */ "./node_modules/tone/build/esm/index.js");


class Melody {
    constructor(values, frequencyRange, duration, onSeek) {
        this.values = values;
        this.frequencyRange = frequencyRange;
        this.duration = duration;
        this.onSeek = onSeek;
        this.synth = new tone__WEBPACK_IMPORTED_MODULE_1__["Synth"]().toDestination();
        this.currentDatumIndex = 0;
        this.inclusive = true;
        this.reversed = false;
        const reversedValues = [...values].reverse();
        this.forwardSequence = this.createSequence(values);
        this.backwardSequence = this.createSequence(reversedValues);
    }
    get noteDuration() {
        return this.duration / this.values.length;
    }
    get currentSeconds() {
        return this.reversed
            ? this.duration - tone__WEBPACK_IMPORTED_MODULE_1__["Transport"].seconds
            : tone__WEBPACK_IMPORTED_MODULE_1__["Transport"].seconds;
    }
    get isPlaying() {
        return tone__WEBPACK_IMPORTED_MODULE_1__["Transport"].state === 'started';
    }
    get isEnded() {
        return (this.reversed && this.currentDatumIndex === 0 ||
            !this.reversed && this.currentDatumIndex === this.values.length - 1);
    }
    get nextIndex() {
        if (this.isEnded) {
            return (this.values.length - 1) - this.currentDatumIndex;
        }
        const offset = this.inclusive ? 0 : (this.reversed ? -1 : +1);
        return this.currentDatumIndex + offset;
    }
    static getKeyNumber(frequency) {
        return Math.log2(frequency / 440) * 12 + 49;
    }
    static getFrequency(keyNumber) {
        return Math.pow(2, (keyNumber - 49) / 12) * 440;
    }
    resume(reversed) {
        var _a, _b, _c, _d;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (tone__WEBPACK_IMPORTED_MODULE_1__["getContext"]().state === 'suspended') {
                yield tone__WEBPACK_IMPORTED_MODULE_1__["start"]();
            }
            if (!this.isPlaying) {
                this.reversed = reversed;
                this.currentDatumIndex = this.nextIndex;
                let nextSeconds = this.getSeconds(this.currentDatumIndex);
                if (this.reversed) {
                    (_a = this.backwardSequence) === null || _a === void 0 ? void 0 : _a.start(0);
                    (_b = this.forwardSequence) === null || _b === void 0 ? void 0 : _b.stop(0);
                    nextSeconds += this.noteDuration / 2;
                    tone__WEBPACK_IMPORTED_MODULE_1__["Transport"].start(undefined, this.duration - nextSeconds);
                }
                else {
                    (_c = this.backwardSequence) === null || _c === void 0 ? void 0 : _c.stop(0);
                    (_d = this.forwardSequence) === null || _d === void 0 ? void 0 : _d.start(0);
                    nextSeconds -= this.noteDuration / 2;
                    tone__WEBPACK_IMPORTED_MODULE_1__["Transport"].start(undefined, nextSeconds);
                }
            }
        });
    }
    pause() {
        if (this.isPlaying) {
            tone__WEBPACK_IMPORTED_MODULE_1__["Transport"].pause();
            this.seekTo(this.currentSeconds);
        }
    }
    getCurrentDatumIndex() {
        return this.currentDatumIndex;
    }
    seekTo(seconds, inclusive = false) {
        var _a;
        this.currentDatumIndex = this.getDatumIndex(seconds);
        this.inclusive = this.isEnded || inclusive;
        (_a = this.onSeek) === null || _a === void 0 ? void 0 : _a.call(this, this.currentDatumIndex, this.isPlaying);
    }
    dispose() {
        this.forwardSequence.dispose();
        this.backwardSequence.dispose();
        this.synth.dispose();
    }
    createSequence(values) {
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const [minFrequency, maxFrequency] = this.frequencyRange;
        const minKeyNumber = Melody.getKeyNumber(minFrequency);
        const maxKeyNumber = Melody.getKeyNumber(maxFrequency);
        const sequence = new tone__WEBPACK_IMPORTED_MODULE_1__["Sequence"]((time, value) => {
            this.seekTo(this.currentSeconds);
            const keyNumber = (value - minValue) / (maxValue - minValue) * (maxKeyNumber - minKeyNumber) + minKeyNumber;
            const frequency = Melody.getFrequency(keyNumber);
            this.synth.triggerAttackRelease(frequency, this.noteDuration, time);
        }, values, this.noteDuration);
        sequence.loop = 1;
        return sequence;
    }
    getSeconds(index) {
        return (index + .5) * this.noteDuration;
    }
    getDatumIndex(seconds) {
        const index = Math.round(seconds / this.noteDuration - .5);
        return Math.min(Math.max(index, 0), this.values.length - 1);
    }
}


/***/ }),

/***/ "./src/services/data/data.module.ts":
/*!******************************************!*\
  !*** ./src/services/data/data.module.ts ***!
  \******************************************/
/*! exports provided: DataModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataModule", function() { return DataModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data.service */ "./src/services/data/data.service.ts");



class DataModule {
}
DataModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: DataModule });
DataModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function DataModule_Factory(t) { return new (t || DataModule)(); }, providers: [
        _data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"],
    ] });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DataModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                providers: [
                    _data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/services/data/data.service.ts":
/*!*******************************************!*\
  !*** ./src/services/data/data.service.ts ***!
  \*******************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! luxon */ "./node_modules/luxon/build/cjs-browser/luxon.js");
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/data-cube/presets */ "./src/models/data-cube/presets.ts");
/* harmony import */ var _models_data_cube_filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/data-cube/filters */ "./src/models/data-cube/filters.ts");
/* harmony import */ var src_models_data_cube_generation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/models/data-cube/generation */ "./src/models/data-cube/generation.ts");




class DataService {
    constructor() {
        this.dataCube = Object(src_models_data_cube_generation__WEBPACK_IMPORTED_MODULE_3__["generateCube"])([_models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["countryCategory"], _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["browserCategory"], _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["sourceCategory"]], [_models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["activeUserMeasure"], _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["revenueMeasure"], _models_data_cube_presets__WEBPACK_IMPORTED_MODULE_1__["eventCountMeasure"]], {
            avgHits: 10000,
            hitStdDev: 100,
            avgUsers: 100,
            userStdDev: 1,
            avgSessionsPerUser: 5,
            sessionsPerUserStdDev: 3,
        });
    }
    getMeasureOverDays(measureName, days = 30) {
        const categoryName = 'nthDay';
        const endDate = luxon__WEBPACK_IMPORTED_MODULE_0__["DateTime"].local();
        const startDate = endDate.minus({ day: days });
        return this.dataCube
            .getDataFor([categoryName], [measureName], [Object(_models_data_cube_filters__WEBPACK_IMPORTED_MODULE_2__["betweenDates"])(startDate.toJSDate(), endDate.toJSDate())])
            .map(row => ({
            date: startDate
                .plus({ days: row.categories.get(categoryName) })
                .toJSDate(),
            value: row.values.get(measureName),
        }));
    }
}


/***/ }),

/***/ "./src/utils/formatters.ts":
/*!*********************************!*\
  !*** ./src/utils/formatters.ts ***!
  \*********************************/
/*! exports provided: formatX, formatY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatX", function() { return formatX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatY", function() { return formatY; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");

const formatX = d3__WEBPACK_IMPORTED_MODULE_0__["timeFormat"]('%B %d');
const formatY = (value) => Number.isInteger(value) ? value : value.toFixed(1);


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/runner/work/guide-doge/guide-doge/src/main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map
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
/* harmony import */ var _pages_audification_experiment_audification_experiment_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/audification-experiment/audification-experiment.component */ "./src/pages/audification-experiment/audification-experiment.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




class AppComponent {
    constructor() {
        this.title = 'guide-doge';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 9, vars: 0, consts: [[1, "container"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
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
    } }, directives: [_pages_audification_experiment_audification_experiment_component__WEBPACK_IMPORTED_MODULE_1__["AudificationExperimentComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwLmNvbXBvbmVudC5zY3NzIn0= */"] });
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
/* harmony import */ var _pages_audification_experiment_audification_experiment_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/audification-experiment/audification-experiment.module */ "./src/pages/audification-experiment/audification-experiment.module.ts");






class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _pages_audification_experiment_audification_experiment_module__WEBPACK_IMPORTED_MODULE_4__["AudificationExperimentModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _pages_audification_experiment_audification_experiment_module__WEBPACK_IMPORTED_MODULE_4__["AudificationExperimentModule"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _pages_audification_experiment_audification_experiment_module__WEBPACK_IMPORTED_MODULE_4__["AudificationExperimentModule"],
                ],
                bootstrap: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                ],
            }]
    }], null, null); })();


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
/* harmony import */ var tone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tone */ "./node_modules/tone/build/esm/index.js");
/* harmony import */ var _line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../line-chart/line-chart.component */ "./src/components/line-chart/line-chart.component.ts");
/* harmony import */ var _services_audification_audification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/audification/audification.service */ "./src/services/audification/audification.service.ts");






class LineChartAudificationComponent {
    constructor(component, audificationService) {
        this.component = component;
        this.audificationService = audificationService;
    }
    playMelody() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (tone__WEBPACK_IMPORTED_MODULE_2__["getContext"]().state === 'suspended') {
                yield tone__WEBPACK_IMPORTED_MODULE_2__["start"]();
            }
            this.disposeMelody = this.audificationService.audify([], [0, 0], 0);
        });
    }
}
LineChartAudificationComponent.ɵfac = function LineChartAudificationComponent_Factory(t) { return new (t || LineChartAudificationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_3__["LineChartComponent"], 1), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_audification_audification_service__WEBPACK_IMPORTED_MODULE_4__["AudificationService"])); };
LineChartAudificationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LineChartAudificationComponent, selectors: [["app-line-chart-audification"]], decls: 2, vars: 0, consts: [["role", "button", 3, "focus", "blur"]], template: function LineChartAudificationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("focus", function LineChartAudificationComponent_Template_div_focus_0_listener() { return ctx.playMelody(); })("blur", function LineChartAudificationComponent_Template_div_blur_0_listener() { return ctx.disposeMelody && ctx.disposeMelody(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Melody\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, encapsulation: 2 });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](LineChartAudificationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-line-chart-audification',
                templateUrl: './line-chart-audification.component.html',
            }]
    }], function () { return [{ type: _line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_3__["LineChartComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Host"]
            }] }, { type: _services_audification_audification_service__WEBPACK_IMPORTED_MODULE_4__["AudificationService"] }]; }, null); })();


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
/* harmony import */ var _services_audification_audification_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/audification/audification.module */ "./src/services/audification/audification.module.ts");




class LineChartAudificationModule {
}
LineChartAudificationModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: LineChartAudificationModule });
LineChartAudificationModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function LineChartAudificationModule_Factory(t) { return new (t || LineChartAudificationModule)(); }, imports: [[
            _services_audification_audification_module__WEBPACK_IMPORTED_MODULE_2__["AudificationModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LineChartAudificationModule, { declarations: [_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"]], imports: [_services_audification_audification_module__WEBPACK_IMPORTED_MODULE_2__["AudificationModule"]], exports: [_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartAudificationModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"],
                ],
                imports: [
                    _services_audification_audification_module__WEBPACK_IMPORTED_MODULE_2__["AudificationModule"],
                ],
                exports: [
                    _line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"],
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
/* harmony import */ var _d3_line_chart_d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../d3/line-chart.d3 */ "./src/d3/line-chart.d3.ts");
/* harmony import */ var _services_data_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/data/data.service */ "./src/services/data/data.service.ts");




class LineChartComponent {
    constructor(dataService, element) {
        this.dataService = dataService;
        this.height = 500;
        this.width = 800;
        this.marginTop = 20;
        this.marginRight = 30;
        this.marginBottom = 30;
        this.marginLeft = 40;
        this.lineChartD3 = new _d3_line_chart_d3__WEBPACK_IMPORTED_MODULE_1__["LineChartD3"](element);
    }
    get data() {
        return this.dataService.getMeasureOverDays(this.measureName);
    }
    ngOnChanges(changes) {
        this.lineChartD3.apply(this);
    }
}
LineChartComponent.ɵfac = function LineChartComponent_Factory(t) { return new (t || LineChartComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_data_data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
LineChartComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LineChartComponent, selectors: [["app-line-chart"]], inputs: { height: "height", width: "width", marginTop: "marginTop", marginRight: "marginRight", marginBottom: "marginBottom", marginLeft: "marginLeft", measureName: "measureName" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 1, vars: 0, template: function LineChartComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-line-chart-audification");
    } }, encapsulation: 2 });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-line-chart',
                template: `
    <app-line-chart-audification></app-line-chart-audification>
  `,
            }]
    }], function () { return [{ type: _services_data_data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]; }, { height: [{
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
        }], measureName: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


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
/* harmony import */ var _services_data_data_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/data/data.module */ "./src/services/data/data.module.ts");
/* harmony import */ var _line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../line-chart-audification/line-chart-audification.module */ "./src/components/line-chart-audification/line-chart-audification.module.ts");
/* harmony import */ var _line_chart_audification_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../line-chart-audification/line-chart-audification.component */ "./src/components/line-chart-audification/line-chart-audification.component.ts");






class LineChartModule {
}
LineChartModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: LineChartModule });
LineChartModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function LineChartModule_Factory(t) { return new (t || LineChartModule)(); }, imports: [[
            _services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"],
            _line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__["LineChartAudificationModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LineChartModule, { declarations: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]], imports: [_services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"],
        _line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__["LineChartAudificationModule"]], exports: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"],
                ],
                imports: [
                    _services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"],
                    _line_chart_audification_line_chart_audification_module__WEBPACK_IMPORTED_MODULE_3__["LineChartAudificationModule"],
                ],
                exports: [
                    _line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"],
                ]
            }]
    }], null, null); })();
_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetComponentScope"](_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"], [_line_chart_audification_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_4__["LineChartAudificationComponent"], _line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]], []);


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

class BaseD3 {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.container = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.elementRef.nativeElement);
    }
    apply(renderOptions) {
        this.unapply();
        this.teardown = this.render(renderOptions);
    }
    unapply() {
        if (this.teardown) {
            this.teardown();
            this.teardown = undefined;
        }
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


class LineChartD3 extends _xy_chart_d3__WEBPACK_IMPORTED_MODULE_0__["XYChartD3"] {
    appendChart(svg, data, scaleX, scaleY) {
        const line = d3__WEBPACK_IMPORTED_MODULE_1__["line"]()
            .defined(d => !isNaN(d.value))
            .x(d => scaleX(d.date))
            .y(d => scaleY(d.value));
        svg
            .append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('d', line);
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


class XYChartD3 extends _base_d3__WEBPACK_IMPORTED_MODULE_1__["BaseD3"] {
    render({ data, height, width, marginTop, marginRight, marginBottom, marginLeft, }) {
        const svg = this.container
            .append('svg')
            .attr('viewBox', [0, 0, width, height].join(' '));
        const scaleX = d3__WEBPACK_IMPORTED_MODULE_0__["scaleUtc"]()
            .domain(d3__WEBPACK_IMPORTED_MODULE_0__["extent"](data, d => d.date))
            .range([marginLeft, width - marginRight]);
        const scaleY = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]()
            .domain([0, d3__WEBPACK_IMPORTED_MODULE_0__["max"](data, d => d.value)])
            .nice()
            .range([height - marginBottom, marginTop]);
        svg
            .append('g')
            .attr('transform', `translate(0,${height - marginBottom})`)
            .call(d3__WEBPACK_IMPORTED_MODULE_0__["axisBottom"](scaleX)
            .ticks(width / 80)
            .tickSizeOuter(0));
        svg
            .append('g')
            .attr('transform', `translate(${marginLeft},0)`)
            .call(d3__WEBPACK_IMPORTED_MODULE_0__["axisLeft"](scaleY))
            .call(g => g
            .select('.tick:last-of-type text')
            .clone()
            .attr('x', 3)
            .attr('text-anchor', 'start')
            .attr('font-weight', 'bold')
            .text('Active Users'));
        this.appendChart(svg, data, scaleX, scaleY);
        return () => {
            svg.remove();
        };
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

/***/ "./src/pages/audification-experiment/audification-experiment.component.ts":
/*!********************************************************************************!*\
  !*** ./src/pages/audification-experiment/audification-experiment.component.ts ***!
  \********************************************************************************/
/*! exports provided: AudificationExperimentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudificationExperimentComponent", function() { return AudificationExperimentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/line-chart/line-chart.component */ "./src/components/line-chart/line-chart.component.ts");



class AudificationExperimentComponent {
}
AudificationExperimentComponent.ɵfac = function AudificationExperimentComponent_Factory(t) { return new (t || AudificationExperimentComponent)(); };
AudificationExperimentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AudificationExperimentComponent, selectors: [["app-audification-experiment"]], decls: 1, vars: 0, consts: [["measureName", "activeUsers"]], template: function AudificationExperimentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-line-chart", 0);
    } }, directives: [_components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]], encapsulation: 2 });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AudificationExperimentComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-audification-experiment',
                templateUrl: './audification-experiment.component.html',
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/pages/audification-experiment/audification-experiment.module.ts":
/*!*****************************************************************************!*\
  !*** ./src/pages/audification-experiment/audification-experiment.module.ts ***!
  \*****************************************************************************/
/*! exports provided: AudificationExperimentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudificationExperimentModule", function() { return AudificationExperimentModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _audification_experiment_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audification-experiment.component */ "./src/pages/audification-experiment/audification-experiment.component.ts");
/* harmony import */ var _components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/line-chart/line-chart.module */ "./src/components/line-chart/line-chart.module.ts");




class AudificationExperimentModule {
}
AudificationExperimentModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AudificationExperimentModule });
AudificationExperimentModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AudificationExperimentModule_Factory(t) { return new (t || AudificationExperimentModule)(); }, imports: [[
            _components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__["LineChartModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AudificationExperimentModule, { declarations: [_audification_experiment_component__WEBPACK_IMPORTED_MODULE_1__["AudificationExperimentComponent"]], imports: [_components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__["LineChartModule"]], exports: [_audification_experiment_component__WEBPACK_IMPORTED_MODULE_1__["AudificationExperimentComponent"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AudificationExperimentModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _audification_experiment_component__WEBPACK_IMPORTED_MODULE_1__["AudificationExperimentComponent"],
                ],
                imports: [
                    _components_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__["LineChartModule"],
                ],
                exports: [
                    _audification_experiment_component__WEBPACK_IMPORTED_MODULE_1__["AudificationExperimentComponent"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/services/audification/audification.module.ts":
/*!**********************************************************!*\
  !*** ./src/services/audification/audification.module.ts ***!
  \**********************************************************/
/*! exports provided: AudificationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudificationModule", function() { return AudificationModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _audification_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audification.service */ "./src/services/audification/audification.service.ts");



class AudificationModule {
}
AudificationModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AudificationModule });
AudificationModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AudificationModule_Factory(t) { return new (t || AudificationModule)(); }, providers: [
        _audification_service__WEBPACK_IMPORTED_MODULE_1__["AudificationService"],
    ] });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AudificationModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                providers: [
                    _audification_service__WEBPACK_IMPORTED_MODULE_1__["AudificationService"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/services/audification/audification.service.ts":
/*!***********************************************************!*\
  !*** ./src/services/audification/audification.service.ts ***!
  \***********************************************************/
/*! exports provided: AudificationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudificationService", function() { return AudificationService; });
/* harmony import */ var tone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tone */ "./node_modules/tone/build/esm/index.js");

class AudificationService {
    constructor() {
        this.synth = new tone__WEBPACK_IMPORTED_MODULE_0__["Synth"]().toDestination();
    }
    audify(values, pitchRange, duration) {
        const part = new tone__WEBPACK_IMPORTED_MODULE_0__["Part"]((time, event) => {
            this.synth.triggerAttackRelease(event.note, event.dur, time);
        }, [
            { time: 0, note: 'C4', dur: '4n' },
            { time: { '4n': 1, '8n': 1 }, note: 'E4', dur: '8n' },
            { time: '2n', note: 'G4', dur: '16n' },
            { time: { '2n': 1, '8t': 1 }, note: 'B4', dur: '4n' },
        ]);
        part.start(0);
        tone__WEBPACK_IMPORTED_MODULE_0__["Transport"].start();
        return () => {
            part.dispose();
            tone__WEBPACK_IMPORTED_MODULE_0__["Transport"].stop();
        };
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
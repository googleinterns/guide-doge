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
/* harmony import */ var _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/dashboard/dashboard.component */ "./src/components/dashboard/dashboard.component.ts");
/* harmony import */ var _components_dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/dashboard/dashboard.module */ "./src/components/dashboard/dashboard.module.ts");






const routes = [
    { path: '', component: _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__["DashboardComponent"], pathMatch: 'full' },
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes),
            _components_dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_3__["DashboardModule"],
        ],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"], _components_dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_3__["DashboardModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes),
                    _components_dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_3__["DashboardModule"],
                ],
                exports: [
                    _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"],
                ],
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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




class AppComponent {
    get TITLE() {
        return Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_1__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_1__["GUIDE_DOGE"].TITLE);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 10, vars: 1, consts: [[1, "header"], ["role", "banner", 1, "logo"], ["role", "navigation", 1, "links"], ["routerLink", "/", 1, "link", "active"], ["href", "#", 1, "link"], [1, "container"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
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
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.TITLE);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  height: 100vh;\n  background-color: #f8f9fa;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  justify-content: space-between;\n  background-color: white;\n  border-bottom: 1px solid #dadce0;\n  padding: 0 2rem;\n  height: 4rem;\n  flex-shrink: 0;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]:hover {\n  background: linear-gradient(135deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3, #ff2400) repeat-x;\n  background-size: 800% 100%;\n  -webkit-animation: rainbow 30s linear infinite;\n          animation: rainbow 30s linear infinite;\n}\n@-webkit-keyframes rainbow {\n  0% {\n    background-position: 0 0;\n  }\n  100% {\n    background-position: 800% 0;\n  }\n}\n@keyframes rainbow {\n  0% {\n    background-position: 0 0;\n  }\n  100% {\n    background-position: 800% 0;\n  }\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]:hover   .logo[_ngcontent-%COMP%]:after {\n  content: \"\";\n  display: block;\n  margin-left: 0.5rem;\n  width: 3rem;\n  height: 3rem;\n  background-image: url('sunglass-doge.png');\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%] {\n  font-family: \"Quicksand\", sans-serif;\n  font-weight: 700;\n  font-size: 24px;\n  display: flex;\n  align-items: center;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .links[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  padding: 0 1rem;\n  display: flex;\n  align-items: center;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .links[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  font-weight: 500;\n  border-bottom: 4px solid #4285f4;\n}\n[_nghost-%COMP%]   .container[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvYXBwLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvcnVubmVyL3dvcmsvZ3VpZGUtZG9nZS9ndWlkZS1kb2dlL3NyYy91dGlscy9jb25zdGFudHMuc2NzcyIsInNyYy9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQkFBQTtFQUNBLGFBQUE7RUFDQSx5QkNQaUI7QUNNbkI7QUZHRTtFQUNFLGFBQUE7RUFDQSxvQkFBQTtFQUNBLDhCQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQ0FBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBRURKO0FGR0k7RUFDRSxzSUFBQTtFQUNBLDBCQUFBO0VBQ0EsOENBQUE7VUFBQSxzQ0FBQTtBRUROO0FGR007RUFDRTtJQUNFLHdCQUFBO0VFRFI7RUZHTTtJQUNFLDJCQUFBO0VFRFI7QUFDRjtBRkxNO0VBQ0U7SUFDRSx3QkFBQTtFRURSO0VGR007SUFDRSwyQkFBQTtFRURSO0FBQ0Y7QUZJTTtFQUNFLFdBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLDBDQUFBO0VBQ0Esd0JBQUE7RUFDQSwyQkFBQTtFQUNBLDRCQUFBO0FFRlI7QUZNSTtFQUNFLG9DQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQzFDWTtFRDJDWixhQUFBO0VBQ0EsbUJBQUE7QUVKTjtBRk9JO0VBQ0UsYUFBQTtFQUNBLG9CQUFBO0FFTE47QUZPTTtFQUNFLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUVMUjtBRk9RO0VBQ0UsZ0JBQUE7RUFDQSxnQ0FBQTtBRUxWO0FGV0U7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtBRVRKIiwiZmlsZSI6InNyYy9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi91dGlscy9jb25zdGFudHNcIjtcblxuOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWJhY2tncm91bmQ7XG5cbiAgLmhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRjb2xvci1ib3JkZXI7XG4gICAgcGFkZGluZzogMCAycmVtO1xuICAgIGhlaWdodDogNHJlbTtcbiAgICBmbGV4LXNocmluazogMDtcblxuICAgICY6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmMjQwMCwgI2U4MWQxZCwgI2U4YjcxZCwgI2UzZTgxZCwgIzFkZTg0MCwgIzFkZGRlOCwgIzJiMWRlOCwgI2RkMDBmMywgI2RkMDBmMywgI2ZmMjQwMCkgcmVwZWF0LXg7XG4gICAgICBiYWNrZ3JvdW5kLXNpemU6IDgwMCUgMTAwJTtcbiAgICAgIGFuaW1hdGlvbjogcmFpbmJvdyAzMHMgbGluZWFyIGluZmluaXRlO1xuXG4gICAgICBAa2V5ZnJhbWVzIHJhaW5ib3cge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwXG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogODAwJSAwXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLmxvZ286YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAuNXJlbTtcbiAgICAgICAgd2lkdGg6IDNyZW07XG4gICAgICAgIGhlaWdodDogM3JlbTtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vYXNzZXRzL3N1bmdsYXNzLWRvZ2UucG5nKTtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmxvZ28ge1xuICAgICAgZm9udC1mYW1pbHk6ICdRdWlja3NhbmQnLCBzYW5zLXNlcmlmO1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1sYXJnZTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cblxuICAgIC5saW5rcyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG5cbiAgICAgIGEge1xuICAgICAgICBwYWRkaW5nOiAwIDFyZW07XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgJi5hY3RpdmUge1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbTogNHB4IHNvbGlkICRjb2xvci1oaWdobGlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAuY29udGFpbmVyIHtcbiAgICBmbGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG59XG4iLCIkY29sb3ItYmFja2dyb3VuZDogcmdiKDI0OCwgMjQ5LCAyNTApO1xuJGNvbG9yLWJvcmRlcjogcmdiKDIxOCwgMjIwLCAyMjQpO1xuJGNvbG9yLWZvbnQ6IHJnYigzNCwgMzQsIDM0KTtcbiRjb2xvci1oaWdobGlnaHQ6IHJnYig2NiwgMTMzLCAyNDQpO1xuJGNvbG9yLXBvc2l0aXZlOiByZ2IoMTUsIDE1NywgODgpO1xuJGNvbG9yLW5lZ2F0aXZlOiByZ2IoMjE5LCA2OCwgNTUpO1xuXG4kZm9udC1zaXplLWxhcmdlOiAyNHB4O1xuJGZvbnQtc2l6ZS1tZWRpdW06IDE2cHg7XG4kZm9udC1zaXplLXNtYWxsOiAxMnB4O1xuXG5AbWl4aW4gY2FyZC1zaGFkb3cge1xuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMikgMCAxcHggM3B4IDAsIHJnYmEoMCwgMCwgMCwgMC4xNCkgMCAxcHggMXB4IDAsIHJnYmEoMCwgMCwgMCwgMC4xMikgMCAycHggMXB4IC0xcHg7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBoZWlnaHQ6IDEwMHZoO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOWZhO1xufVxuOmhvc3QgLmhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RhZGNlMDtcbiAgcGFkZGluZzogMCAycmVtO1xuICBoZWlnaHQ6IDRyZW07XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuOmhvc3QgLmhlYWRlcjpob3ZlciB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmZjI0MDAsICNlODFkMWQsICNlOGI3MWQsICNlM2U4MWQsICMxZGU4NDAsICMxZGRkZTgsICMyYjFkZTgsICNkZDAwZjMsICNkZDAwZjMsICNmZjI0MDApIHJlcGVhdC14O1xuICBiYWNrZ3JvdW5kLXNpemU6IDgwMCUgMTAwJTtcbiAgYW5pbWF0aW9uOiByYWluYm93IDMwcyBsaW5lYXIgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIHJhaW5ib3cge1xuICAwJSB7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xuICB9XG4gIDEwMCUge1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDgwMCUgMDtcbiAgfVxufVxuOmhvc3QgLmhlYWRlcjpob3ZlciAubG9nbzphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tbGVmdDogMC41cmVtO1xuICB3aWR0aDogM3JlbTtcbiAgaGVpZ2h0OiAzcmVtO1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9hc3NldHMvc3VuZ2xhc3MtZG9nZS5wbmcpO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbn1cbjpob3N0IC5oZWFkZXIgLmxvZ28ge1xuICBmb250LWZhbWlseTogXCJRdWlja3NhbmRcIiwgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuOmhvc3QgLmhlYWRlciAubGlua3Mge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbn1cbjpob3N0IC5oZWFkZXIgLmxpbmtzIGEge1xuICBwYWRkaW5nOiAwIDFyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG46aG9zdCAuaGVhZGVyIC5saW5rcyBhLmFjdGl2ZSB7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGJvcmRlci1ib3R0b206IDRweCBzb2xpZCAjNDI4NWY0O1xufVxuOmhvc3QgLmNvbnRhaW5lciB7XG4gIGZsZXg6IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"] });
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





class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
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
    [_types__WEBPACK_IMPORTED_MODULE_0__["AUDIFICATION"].INSTRUCTIONS]: [
        'Hold down <kbd>SPACE</kbd> to play audification and <kbd>SHIFT</kbd> + <kbd>SPACE</kbd> to play it backward.',
        'Press <kbd>X</kbd> or <kbd>Y</kbd> to read out the domain and range.',
        'Press <kbd>L</kbd> to read out the legend items.',
        'Press <kbd>0</kbd> ... <kbd>9</kbd> to move playhead.',
    ].join(' <br/>'),
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

/***/ "./src/components/card/card.component.ts":
/*!***********************************************!*\
  !*** ./src/components/card/card.component.ts ***!
  \***********************************************/
/*! exports provided: CardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardComponent", function() { return CardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _assets_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/i18n */ "./src/assets/i18n/index.ts");
/* harmony import */ var _utils_formatters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/formatters */ "./src/utils/formatters.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../line-chart/line-chart.component */ "./src/components/line-chart/line-chart.component.ts");
/* harmony import */ var _directives_audification_audification_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../directives/audification/audification.directive */ "./src/directives/audification/audification.directive.ts");







function CardComponent_div_3_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_div_3_div_1_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const measureName_r3 = ctx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r4.setMeasureName(measureName_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const measureName_r3 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("active", measureName_r3 === ctx_r2.currentMeasureName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r2.humanizeMeasureName(measureName_r3), " ");
} }
function CardComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CardComponent_div_3_div_1_Template, 2, 3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.measureNames);
} }
function CardComponent_app_line_chart_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-line-chart", 8);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("measureName", ctx_r1.currentMeasureName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", ctx_r1.VISUALIZATION);
} }
class CardComponent {
    constructor() {
        this.tabbed = false;
        this.humanizeMeasureName = _utils_formatters__WEBPACK_IMPORTED_MODULE_2__["humanizeMeasureName"];
    }
    get VISUALIZATION() {
        return Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_1__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_1__["GUIDE_DOGE"].VISUALIZATION);
    }
    ngOnInit() {
        this.setMeasureName(this.measureNames[0]);
    }
    setMeasureName(measureName) {
        this.currentMeasureName = measureName;
    }
}
CardComponent.ɵfac = function CardComponent_Factory(t) { return new (t || CardComponent)(); };
CardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CardComponent, selectors: [["app-card"]], inputs: { title: "title", tabbed: "tabbed", type: "type", measureNames: "measureNames" }, decls: 6, vars: 4, consts: [[1, "card-title"], [1, "card-content"], ["class", "tabs", 4, "ngIf"], [3, "ngSwitch"], ["role", "img", "appAudification", "", 3, "measureName", 4, "ngSwitchCase"], [1, "tabs"], ["class", "tab", "role", "button", 3, "active", "click", 4, "ngFor", "ngForOf"], ["role", "button", 1, "tab", 3, "click"], ["role", "img", "appAudification", "", 3, "measureName"]], template: function CardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, CardComponent_div_3_Template, 2, 1, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](4, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, CardComponent_app_line_chart_5_Template, 1, 2, "app-line-chart", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.tabbed);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", ctx.type);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "line");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitchCase"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_4__["LineChartComponent"], _directives_audification_audification_directive__WEBPACK_IMPORTED_MODULE_5__["AudificationDirective"]], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n}\n[_nghost-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin: 1rem 0;\n}\n[_nghost-%COMP%]   .card-content[_ngcontent-%COMP%] {\n  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px 0, rgba(0, 0, 0, 0.14) 0 1px 1px 0, rgba(0, 0, 0, 0.12) 0 2px 1px -1px;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  border-radius: 2px;\n  background-color: white;\n}\n[_nghost-%COMP%]   .card-content[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  height: 4rem;\n}\n[_nghost-%COMP%]   .card-content[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n[_nghost-%COMP%]   .card-content[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   .tab.active[_ngcontent-%COMP%] {\n  border-top: 4px solid #4285f4;\n  font-weight: 500;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvY29tcG9uZW50cy9jYXJkL2NhcmQuY29tcG9uZW50LnNjc3MiLCJzcmMvY29tcG9uZW50cy9jYXJkL2NhcmQuY29tcG9uZW50LnNjc3MiLCIvaG9tZS9ydW5uZXIvd29yay9ndWlkZS1kb2dlL2d1aWRlLWRvZ2Uvc3JjL3V0aWxzL2NvbnN0YW50cy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esb0JBQUE7QUNERjtBREdFO0VBQ0UsZUVEYztFRkVkLGNBQUE7QUNESjtBRElFO0VFQUEsK0dBQUE7RUZFRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7QUNGSjtBRElJO0VBQ0UsYUFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtBQ0ZOO0FESU07RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0FDRlI7QURJUTtFQUNFLDZCQUFBO0VBQ0EsZ0JBQUE7QUNGViIsImZpbGUiOiJzcmMvY29tcG9uZW50cy9jYXJkL2NhcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5cbjpob3N0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG5cbiAgLmNhcmQtdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1sYXJnZTtcbiAgICBtYXJnaW46IDFyZW0gMDtcbiAgfVxuXG4gIC5jYXJkLWNvbnRlbnQge1xuICAgIEBpbmNsdWRlIGNhcmQtc2hhZG93O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG5cbiAgICAudGFicyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gICAgICBoZWlnaHQ6IDRyZW07XG5cbiAgICAgIC50YWIge1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICAgICAgICYuYWN0aXZlIHtcbiAgICAgICAgICBib3JkZXItdG9wOiA0cHggc29saWQgJGNvbG9yLWhpZ2hsaWdodDtcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xufVxuOmhvc3QgLmNhcmQtdGl0bGUge1xuICBmb250LXNpemU6IDI0cHg7XG4gIG1hcmdpbjogMXJlbSAwO1xufVxuOmhvc3QgLmNhcmQtY29udGVudCB7XG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4yKSAwIDFweCAzcHggMCwgcmdiYSgwLCAwLCAwLCAwLjE0KSAwIDFweCAxcHggMCwgcmdiYSgwLCAwLCAwLCAwLjEyKSAwIDJweCAxcHggLTFweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG46aG9zdCAuY2FyZC1jb250ZW50IC50YWJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGhlaWdodDogNHJlbTtcbn1cbjpob3N0IC5jYXJkLWNvbnRlbnQgLnRhYnMgLnRhYiB7XG4gIGZsZXg6IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG46aG9zdCAuY2FyZC1jb250ZW50IC50YWJzIC50YWIuYWN0aXZlIHtcbiAgYm9yZGVyLXRvcDogNHB4IHNvbGlkICM0Mjg1ZjQ7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59IiwiJGNvbG9yLWJhY2tncm91bmQ6IHJnYigyNDgsIDI0OSwgMjUwKTtcbiRjb2xvci1ib3JkZXI6IHJnYigyMTgsIDIyMCwgMjI0KTtcbiRjb2xvci1mb250OiByZ2IoMzQsIDM0LCAzNCk7XG4kY29sb3ItaGlnaGxpZ2h0OiByZ2IoNjYsIDEzMywgMjQ0KTtcbiRjb2xvci1wb3NpdGl2ZTogcmdiKDE1LCAxNTcsIDg4KTtcbiRjb2xvci1uZWdhdGl2ZTogcmdiKDIxOSwgNjgsIDU1KTtcblxuJGZvbnQtc2l6ZS1sYXJnZTogMjRweDtcbiRmb250LXNpemUtbWVkaXVtOiAxNnB4O1xuJGZvbnQtc2l6ZS1zbWFsbDogMTJweDtcblxuQG1peGluIGNhcmQtc2hhZG93IHtcbiAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjIpIDAgMXB4IDNweCAwLCByZ2JhKDAsIDAsIDAsIDAuMTQpIDAgMXB4IDFweCAwLCByZ2JhKDAsIDAsIDAsIDAuMTIpIDAgMnB4IDFweCAtMXB4O1xufVxuIl19 */"] });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-card',
                templateUrl: './card.component.html',
                styleUrls: ['./card.component.scss'],
            }]
    }], null, { title: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], tabbed: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], type: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], measureNames: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/components/card/card.module.ts":
/*!********************************************!*\
  !*** ./src/components/card/card.module.ts ***!
  \********************************************/
/*! exports provided: CardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardModule", function() { return CardModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _card_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card.component */ "./src/components/card/card.component.ts");
/* harmony import */ var _line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../line-chart/line-chart.module */ "./src/components/line-chart/line-chart.module.ts");
/* harmony import */ var _directives_audification_audification_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../directives/audification/audification.module */ "./src/directives/audification/audification.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");






class CardModule {
}
CardModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: CardModule });
CardModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function CardModule_Factory(t) { return new (t || CardModule)(); }, imports: [[
            _line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__["LineChartModule"],
            _directives_audification_audification_module__WEBPACK_IMPORTED_MODULE_3__["AudificationModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CardModule, { declarations: [_card_component__WEBPACK_IMPORTED_MODULE_1__["CardComponent"]], imports: [_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__["LineChartModule"],
        _directives_audification_audification_module__WEBPACK_IMPORTED_MODULE_3__["AudificationModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]], exports: [_card_component__WEBPACK_IMPORTED_MODULE_1__["CardComponent"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CardModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _card_component__WEBPACK_IMPORTED_MODULE_1__["CardComponent"],
                ],
                imports: [
                    _line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_2__["LineChartModule"],
                    _directives_audification_audification_module__WEBPACK_IMPORTED_MODULE_3__["AudificationModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                ],
                exports: [
                    _card_component__WEBPACK_IMPORTED_MODULE_1__["CardComponent"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/components/dashboard/dashboard.component.ts":
/*!*********************************************************!*\
  !*** ./src/components/dashboard/dashboard.component.ts ***!
  \*********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _services_preference_preference_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/preference/preference.service */ "./src/services/preference/preference.service.ts");
/* harmony import */ var _preference_group_preference_group_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../preference-group/preference-group.component */ "./src/components/preference-group/preference-group.component.ts");
/* harmony import */ var _preference_item_preference_item_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../preference-item/preference-item.component */ "./src/components/preference-item/preference-item.component.ts");
/* harmony import */ var _card_card_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../card/card.component */ "./src/components/card/card.component.ts");






const _c0 = function () { return ["activeUsers", "revenue", "eventCount"]; };
class DashboardComponent {
    constructor(preferenceService) {
        this.preferenceService = preferenceService;
        this.audification = this.preferenceService.audification;
        this.dataTable = this.preferenceService.dataTable;
        this.textSummary = this.preferenceService.textSummary;
    }
}
DashboardComponent.ɵfac = function DashboardComponent_Factory(t) { return new (t || DashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_preference_preference_service__WEBPACK_IMPORTED_MODULE_1__["PreferenceService"])); };
DashboardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DashboardComponent, selectors: [["app-dashboard"]], decls: 14, vars: 14, consts: [[1, "sidebar"], [1, "sidebar-title"], ["title", "Audification", 3, "subject"], ["name", "Lowest note (Hz)", 3, "subject"], ["name", "Highest note (Hz)", 3, "subject"], ["name", "Note duration (sec)", 3, "subject"], ["name", "Read out before playing", 3, "subject"], ["name", "Read out after playing", 3, "subject"], ["title", "Data Table", 3, "subject"], ["title", "Text Summary", 3, "subject"], [1, "card-container"], ["title", "Tabbed Line Chart", "type", "line", 3, "tabbed", "measureNames"], ["title", "Line Chart", "type", "line", 3, "tabbed", "measureNames"]], template: function DashboardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "aside", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Customization");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "app-preference-group", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-preference-item", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "app-preference-item", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "app-preference-item", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "app-preference-item", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "app-preference-item", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "app-preference-group", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "app-preference-group", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "app-card", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "app-card", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("subject", ctx.audification.enabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("subject", ctx.audification.lowestPitch);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("subject", ctx.audification.highestPitch);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("subject", ctx.audification.noteDuration);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("subject", ctx.audification.readBefore);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("subject", ctx.audification.readAfter);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("subject", ctx.dataTable.enabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("subject", ctx.textSummary.enabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("tabbed", true)("measureNames", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](12, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("tabbed", false)("measureNames", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](13, _c0));
    } }, directives: [_preference_group_preference_group_component__WEBPACK_IMPORTED_MODULE_2__["PreferenceGroupComponent"], _preference_item_preference_item_component__WEBPACK_IMPORTED_MODULE_3__["PreferenceItemComponent"], _card_card_component__WEBPACK_IMPORTED_MODULE_4__["CardComponent"]], styles: ["[_nghost-%COMP%] {\n  flex: 1;\n  display: flex;\n  overflow: hidden;\n}\n[_nghost-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n  padding: 1rem;\n  width: 20rem;\n  border-right: 1px solid #dadce0;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n[_nghost-%COMP%]   .sidebar[_ngcontent-%COMP%]   .sidebar-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin: 1rem 0;\n}\n[_nghost-%COMP%]   .sidebar[_ngcontent-%COMP%]   app-preference-group[_ngcontent-%COMP%] {\n  margin: 0 -1rem;\n  margin-bottom: 0.5rem;\n}\n[_nghost-%COMP%]   .card-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1 0;\n  align-items: flex-start;\n  justify-content: center;\n  flex-wrap: wrap;\n  padding-top: 1rem;\n  padding-left: 1rem;\n  overflow-y: auto;\n}\n[_nghost-%COMP%]   .card-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  margin-right: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIiwic3JjL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuc2NzcyIsIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvdXRpbHMvY29uc3RhbnRzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FDREY7QURHRTtFQUNFLGFBQUE7RUFDQSxZQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FDREo7QURHSTtFQUNFLGVFUlk7RUZTWixjQUFBO0FDRE47QURJSTtFQUNFLGVBQUE7RUFDQSxxQkFBQTtBQ0ZOO0FETUU7RUFDRSxhQUFBO0VBQ0EsU0FBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FDSko7QURNSTtFQUNFLG1CQUFBO0VBQ0Esa0JBQUE7QUNKTiIsImZpbGUiOiJzcmMvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uL3V0aWxzL2NvbnN0YW50c1wiO1xuXG46aG9zdCB7XG4gIGZsZXg6IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgLnNpZGViYXIge1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgd2lkdGg6IDIwcmVtO1xuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICRjb2xvci1ib3JkZXI7XG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG5cbiAgICAuc2lkZWJhci10aXRsZSB7XG4gICAgICBmb250LXNpemU6ICRmb250LXNpemUtbGFyZ2U7XG4gICAgICBtYXJnaW46IDFyZW0gMDtcbiAgICB9XG5cbiAgICBhcHAtcHJlZmVyZW5jZS1ncm91cCB7XG4gICAgICBtYXJnaW46IDAgLTFyZW07XG4gICAgICBtYXJnaW4tYm90dG9tOiAuNXJlbTtcbiAgICB9XG4gIH1cblxuICAuY2FyZC1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleDogMSAwO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XG4gICAgb3ZlcmZsb3cteTogYXV0bztcblxuICAgID4gKiB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgICAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xuICAgIH1cbiAgfVxufVxuIiwiOmhvc3Qge1xuICBmbGV4OiAxO1xuICBkaXNwbGF5OiBmbGV4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuOmhvc3QgLnNpZGViYXIge1xuICBwYWRkaW5nOiAxcmVtO1xuICB3aWR0aDogMjByZW07XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNkYWRjZTA7XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cbjpob3N0IC5zaWRlYmFyIC5zaWRlYmFyLXRpdGxlIHtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBtYXJnaW46IDFyZW0gMDtcbn1cbjpob3N0IC5zaWRlYmFyIGFwcC1wcmVmZXJlbmNlLWdyb3VwIHtcbiAgbWFyZ2luOiAwIC0xcmVtO1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG46aG9zdCAuY2FyZC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4OiAxIDA7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgcGFkZGluZy1sZWZ0OiAxcmVtO1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuOmhvc3QgLmNhcmQtY29udGFpbmVyID4gKiB7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIG1hcmdpbi1yaWdodDogMXJlbTtcbn0iLCIkY29sb3ItYmFja2dyb3VuZDogcmdiKDI0OCwgMjQ5LCAyNTApO1xuJGNvbG9yLWJvcmRlcjogcmdiKDIxOCwgMjIwLCAyMjQpO1xuJGNvbG9yLWZvbnQ6IHJnYigzNCwgMzQsIDM0KTtcbiRjb2xvci1oaWdobGlnaHQ6IHJnYig2NiwgMTMzLCAyNDQpO1xuJGNvbG9yLXBvc2l0aXZlOiByZ2IoMTUsIDE1NywgODgpO1xuJGNvbG9yLW5lZ2F0aXZlOiByZ2IoMjE5LCA2OCwgNTUpO1xuXG4kZm9udC1zaXplLWxhcmdlOiAyNHB4O1xuJGZvbnQtc2l6ZS1tZWRpdW06IDE2cHg7XG4kZm9udC1zaXplLXNtYWxsOiAxMnB4O1xuXG5AbWl4aW4gY2FyZC1zaGFkb3cge1xuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMikgMCAxcHggM3B4IDAsIHJnYmEoMCwgMCwgMCwgMC4xNCkgMCAxcHggMXB4IDAsIHJnYmEoMCwgMCwgMCwgMC4xMikgMCAycHggMXB4IC0xcHg7XG59XG4iXX0= */"] });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DashboardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-dashboard',
                templateUrl: './dashboard.component.html',
                styleUrls: ['./dashboard.component.scss'],
            }]
    }], function () { return [{ type: _services_preference_preference_service__WEBPACK_IMPORTED_MODULE_1__["PreferenceService"] }]; }, null); })();


/***/ }),

/***/ "./src/components/dashboard/dashboard.module.ts":
/*!******************************************************!*\
  !*** ./src/components/dashboard/dashboard.module.ts ***!
  \******************************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard.component */ "./src/components/dashboard/dashboard.component.ts");
/* harmony import */ var _preference_group_preference_group_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../preference-group/preference-group.module */ "./src/components/preference-group/preference-group.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _card_card_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../card/card.module */ "./src/components/card/card.module.ts");
/* harmony import */ var _preference_item_preference_item_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../preference-item/preference-item.module */ "./src/components/preference-item/preference-item.module.ts");
/* harmony import */ var _services_preference_preference_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/preference/preference.module */ "./src/services/preference/preference.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");









class DashboardModule {
}
DashboardModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: DashboardModule });
DashboardModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function DashboardModule_Factory(t) { return new (t || DashboardModule)(); }, imports: [[
            _services_preference_preference_module__WEBPACK_IMPORTED_MODULE_6__["PreferenceModule"],
            _preference_group_preference_group_module__WEBPACK_IMPORTED_MODULE_2__["PreferenceGroupModule"],
            _preference_item_preference_item_module__WEBPACK_IMPORTED_MODULE_5__["PreferenceItemModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _card_card_module__WEBPACK_IMPORTED_MODULE_4__["CardModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_7__["CommonModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](DashboardModule, { declarations: [_dashboard_component__WEBPACK_IMPORTED_MODULE_1__["DashboardComponent"]], imports: [_services_preference_preference_module__WEBPACK_IMPORTED_MODULE_6__["PreferenceModule"],
        _preference_group_preference_group_module__WEBPACK_IMPORTED_MODULE_2__["PreferenceGroupModule"],
        _preference_item_preference_item_module__WEBPACK_IMPORTED_MODULE_5__["PreferenceItemModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
        _card_card_module__WEBPACK_IMPORTED_MODULE_4__["CardModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_7__["CommonModule"]], exports: [_dashboard_component__WEBPACK_IMPORTED_MODULE_1__["DashboardComponent"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DashboardModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _dashboard_component__WEBPACK_IMPORTED_MODULE_1__["DashboardComponent"],
                ],
                imports: [
                    _services_preference_preference_module__WEBPACK_IMPORTED_MODULE_6__["PreferenceModule"],
                    _preference_group_preference_group_module__WEBPACK_IMPORTED_MODULE_2__["PreferenceGroupModule"],
                    _preference_item_preference_item_module__WEBPACK_IMPORTED_MODULE_5__["PreferenceItemModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                    _card_card_module__WEBPACK_IMPORTED_MODULE_4__["CardModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_7__["CommonModule"],
                ],
                exports: [
                    _dashboard_component__WEBPACK_IMPORTED_MODULE_1__["DashboardComponent"],
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
/* harmony import */ var _models_melody_melody_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/melody/melody.model */ "./src/models/melody/melody.model.ts");
/* harmony import */ var _assets_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/i18n */ "./src/assets/i18n/index.ts");
/* harmony import */ var _utils_formatters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/formatters */ "./src/utils/formatters.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _utils_comparators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/comparators */ "./src/utils/comparators.ts");
/* harmony import */ var _line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../line-chart/line-chart.component */ "./src/components/line-chart/line-chart.component.ts");










class LineChartAudificationComponent {
    constructor(host, zone) {
        this.host = host;
        this.zone = zone;
        this.liveText = null;
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subject"]();
        this.tabindex = 0;
        this.handleSeek = this.handleSeek.bind(this);
    }
    get INSTRUCTIONS() {
        return Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["AUDIFICATION"].INSTRUCTIONS);
    }
    get INSTRUCTIONS_A11Y() {
        return Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["tA11y"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["AUDIFICATION"].INSTRUCTIONS);
    }
    get data() {
        return this.host.data;
    }
    get measureName() {
        return this.host.measureName;
    }
    set activeDatum(activeDatum) {
        this.host.activeDatum = activeDatum;
    }
    ngOnInit() {
        this.host.data$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroy$))
            .subscribe(data => {
            var _a;
            const values = data.map(datum => datum.value);
            this.domain = data.map(d => d.date).sort(_utils_comparators__WEBPACK_IMPORTED_MODULE_7__["ascendingDate"]);
            this.range = data.map(d => d.value).sort(_utils_comparators__WEBPACK_IMPORTED_MODULE_7__["ascendingNumber"]);
            (_a = this.melody) === null || _a === void 0 ? void 0 : _a.dispose();
            this.melody = new _models_melody_melody_model__WEBPACK_IMPORTED_MODULE_2__["Melody"](values, [this.lowestPitch, this.highestPitch], this.noteDuration, this.handleSeek);
        });
    }
    ngOnDestroy() {
        var _a;
        this.destroy$.next();
        this.destroy$.complete();
        (_a = this.melody) === null || _a === void 0 ? void 0 : _a.dispose();
    }
    handleSeek(index, playing) {
        const datum = this.data[index];
        const { date, value } = datum;
        this.zone.run((() => {
            this.activeDatum = datum;
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
            $event.preventDefault();
            $event.stopPropagation();
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
            else if (key === 'l') {
                this.readOut(Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["humanizeMeasureName"])(this.measureName));
            }
            else if ('0' <= key && key <= '9') {
                (_b = this.melody) === null || _b === void 0 ? void 0 : _b.seekTo(this.melody.duration * (+key / 10), true);
            }
        });
    }
    handleKeyUp($event) {
        var _a;
        $event.preventDefault();
        $event.stopPropagation();
        const { key } = $event;
        if (key === ' ') {
            (_a = this.melody) === null || _a === void 0 ? void 0 : _a.pause();
        }
    }
    handleBlur() {
        var _a;
        (_a = this.melody) === null || _a === void 0 ? void 0 : _a.pause();
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
LineChartAudificationComponent.ɵfac = function LineChartAudificationComponent_Factory(t) { return new (t || LineChartAudificationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"]('host'), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"])); };
LineChartAudificationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LineChartAudificationComponent, selectors: [["app-line-chart-audification"]], hostVars: 1, hostBindings: function LineChartAudificationComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keydown", function LineChartAudificationComponent_keydown_HostBindingHandler($event) { return ctx.handleKeyDown($event); })("keyup", function LineChartAudificationComponent_keyup_HostBindingHandler($event) { return ctx.handleKeyUp($event); })("blur", function LineChartAudificationComponent_blur_HostBindingHandler($event) { return ctx.handleBlur($event); });
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("tabindex", ctx.tabindex);
    } }, inputs: { enabled: "enabled", lowestPitch: "lowestPitch", highestPitch: "highestPitch", noteDuration: "noteDuration", readBefore: "readBefore", readAfter: "readAfter" }, decls: 2, vars: 3, consts: [["role", "img", 1, "instructions", 3, "innerHTML"], ["aria-live", "assertive", 1, "live-text", 3, "innerText"]], template: function LineChartAudificationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "div", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHTML", ctx.INSTRUCTIONS, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("aria-label", ctx.INSTRUCTIONS_A11Y);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerText", ctx.liveText);
    } }, styles: ["@charset \"UTF-8\";\n[_nghost-%COMP%] {\n  display: block;\n  padding: 1.5rem;\n  border-top: 1px solid #dadce0;\n}\n[_nghost-%COMP%]   .instructions[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 2em;\n  margin-bottom: 0.5rem;\n}\n[_nghost-%COMP%]   .live-text[_ngcontent-%COMP%] {\n  color: #4285f4;\n  font-weight: 500;\n}\n[_nghost-%COMP%]   .live-text[_ngcontent-%COMP%]:before {\n  content: \"\uD83D\uDD0A \";\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvcnVubmVyL3dvcmsvZ3VpZGUtZG9nZS9ndWlkZS1kb2dlL3NyYy9jb21wb25lbnRzL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uL2xpbmUtY2hhcnQtYXVkaWZpY2F0aW9uLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvcnVubmVyL3dvcmsvZ3VpZGUtZG9nZS9ndWlkZS1kb2dlL3NyYy91dGlscy9jb25zdGFudHMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUNFaEI7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLDZCQUFBO0FEQUY7QUNFRTtFQUNFLGVDQ2M7RURBZCxnQkFBQTtFQUNBLHFCQUFBO0FEQUo7QUNHRTtFQUNFLGNDWGM7RURZZCxnQkFBQTtBRERKO0FDR0k7RUFDRSxjQUFBO0FERE4iLCJmaWxlIjoic3JjL2NvbXBvbmVudHMvbGluZS1jaGFydC1hdWRpZmljYXRpb24vbGluZS1jaGFydC1hdWRpZmljYXRpb24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG46aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGFkY2UwO1xufVxuOmhvc3QgLmluc3RydWN0aW9ucyB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgbGluZS1oZWlnaHQ6IDJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuOmhvc3QgLmxpdmUtdGV4dCB7XG4gIGNvbG9yOiAjNDI4NWY0O1xuICBmb250LXdlaWdodDogNTAwO1xufVxuOmhvc3QgLmxpdmUtdGV4dDpiZWZvcmUge1xuICBjb250ZW50OiBcIvCflIogXCI7XG59IiwiQGltcG9ydCBcIi4uLy4uL3V0aWxzL2NvbnN0YW50c1wiO1xuXG46aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAkY29sb3ItYm9yZGVyO1xuXG4gIC5pbnN0cnVjdGlvbnMge1xuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1zbWFsbDtcbiAgICBsaW5lLWhlaWdodDogMmVtO1xuICAgIG1hcmdpbi1ib3R0b206IC41cmVtO1xuICB9XG5cbiAgLmxpdmUtdGV4dCB7XG4gICAgY29sb3I6ICRjb2xvci1oaWdobGlnaHQ7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcblxuICAgICY6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICfwn5SKICc7XG4gICAgfVxuICB9XG59XG4iLCIkY29sb3ItYmFja2dyb3VuZDogcmdiKDI0OCwgMjQ5LCAyNTApO1xuJGNvbG9yLWJvcmRlcjogcmdiKDIxOCwgMjIwLCAyMjQpO1xuJGNvbG9yLWZvbnQ6IHJnYigzNCwgMzQsIDM0KTtcbiRjb2xvci1oaWdobGlnaHQ6IHJnYig2NiwgMTMzLCAyNDQpO1xuJGNvbG9yLXBvc2l0aXZlOiByZ2IoMTUsIDE1NywgODgpO1xuJGNvbG9yLW5lZ2F0aXZlOiByZ2IoMjE5LCA2OCwgNTUpO1xuXG4kZm9udC1zaXplLWxhcmdlOiAyNHB4O1xuJGZvbnQtc2l6ZS1tZWRpdW06IDE2cHg7XG4kZm9udC1zaXplLXNtYWxsOiAxMnB4O1xuXG5AbWl4aW4gY2FyZC1zaGFkb3cge1xuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMikgMCAxcHggM3B4IDAsIHJnYmEoMCwgMCwgMCwgMC4xNCkgMCAxcHggMXB4IDAsIHJnYmEoMCwgMCwgMCwgMC4xMikgMCAycHggMXB4IC0xcHg7XG59XG4iXX0= */"] });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](LineChartAudificationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-line-chart-audification',
                templateUrl: './line-chart-audification.component.html',
                styleUrls: ['./line-chart-audification.component.scss'],
            }]
    }], function () { return [{ type: _line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_8__["LineChartComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: ['host']
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }]; }, { enabled: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], lowestPitch: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], highestPitch: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], noteDuration: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], readBefore: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], readAfter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], tabindex: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"],
            args: ['attr.tabindex']
        }], handleKeyDown: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"],
            args: ['keydown', ['$event']]
        }], handleKeyUp: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"],
            args: ['keyup', ['$event']]
        }], handleBlur: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"],
            args: ['blur', ['$event']]
        }] }); })();


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
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _assets_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/i18n */ "./src/assets/i18n/index.ts");
/* harmony import */ var _utils_formatters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/formatters */ "./src/utils/formatters.ts");
/* harmony import */ var _directives_a11y_placeholder_a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../directives/a11y-placeholder/a11y-placeholder.directive */ "./src/directives/a11y-placeholder/a11y-placeholder.directive.ts");
/* harmony import */ var _services_data_data_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/data/data.service */ "./src/services/data/data.service.ts");









function LineChartComponent_ng_template_4_Template(rf, ctx) { }
class LineChartComponent {
    constructor(dataService, elementRef) {
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
    get data() {
        return this.data$.value;
    }
    set data(data) {
        this.data$.next(data);
    }
    get activeDatum() {
        return this.activeDatum$.value;
    }
    set activeDatum(activeDatum) {
        this.activeDatum$.next(activeDatum);
    }
    get formattedActiveDatum() {
        if (!this.activeDatum) {
            return null;
        }
        const { date, value } = this.activeDatum;
        return Object(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["t"])(_assets_i18n__WEBPACK_IMPORTED_MODULE_3__["AUDIFICATION"].ACTIVE_DATUM, {
            x: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatX"])(date),
            y: Object(_utils_formatters__WEBPACK_IMPORTED_MODULE_4__["formatY"])(value),
        });
    }
    ngOnInit() {
        this.lineChartD3.render();
    }
    ngOnDestroy() {
        this.lineChartD3.clear();
    }
    ngOnChanges(changes) {
        if ('measureName' in changes) {
            this.data = this.dataService.getMeasureOverDays(this.measureName);
            this.activeDatum = null;
        }
    }
}
LineChartComponent.ɵfac = function LineChartComponent_Factory(t) { return new (t || LineChartComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_data_data_service__WEBPACK_IMPORTED_MODULE_6__["DataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
LineChartComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LineChartComponent, selectors: [["app-line-chart"]], viewQuery: function LineChartComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_directives_a11y_placeholder_a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_5__["A11yPlaceholderDirective"], true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.a11yPlaceholder = _t.first);
    } }, inputs: { measureName: "measureName", height: "height", width: "width", marginTop: "marginTop", marginRight: "marginRight", marginBottom: "marginBottom", marginLeft: "marginLeft" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 5, vars: 1, consts: [[1, "svg-wrapper"], [1, "active-indicator"], ["appA11yPlaceholder", ""]], template: function LineChartComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "svg");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, LineChartComponent_ng_template_4_Template, 0, 0, "ng-template", 2);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.formattedActiveDatum, " ");
    } }, directives: [_directives_a11y_placeholder_a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_5__["A11yPlaceholderDirective"]], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n[_nghost-%COMP%]   .svg-wrapper[_ngcontent-%COMP%] {\n  box-sizing: content-box;\n  position: relative;\n  margin: 1.5rem;\n}\n[_nghost-%COMP%]   .svg-wrapper[_ngcontent-%COMP%]   .active-indicator[_ngcontent-%COMP%] {\n  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px 0, rgba(0, 0, 0, 0.14) 0 1px 1px 0, rgba(0, 0, 0, 0.12) 0 2px 1px -1px;\n  position: absolute;\n  font-weight: 500;\n  padding: 1rem;\n  background-color: white;\n  white-space: nowrap;\n  color: #4285f4;\n  opacity: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvY29tcG9uZW50cy9saW5lLWNoYXJ0L2xpbmUtY2hhcnQuY29tcG9uZW50LnNjc3MiLCJzcmMvY29tcG9uZW50cy9saW5lLWNoYXJ0L2xpbmUtY2hhcnQuY29tcG9uZW50LnNjc3MiLCIvaG9tZS9ydW5uZXIvd29yay9ndWlkZS1kb2dlL2d1aWRlLWRvZ2Uvc3JjL3V0aWxzL2NvbnN0YW50cy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FDREY7QURHRTtFQUNFLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FDREo7QURHSTtFRUNGLCtHQUFBO0VGQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0VmWTtFRmdCWixVQUFBO0FDRE4iLCJmaWxlIjoic3JjL2NvbXBvbmVudHMvbGluZS1jaGFydC9saW5lLWNoYXJ0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uL3V0aWxzL2NvbnN0YW50c1wiO1xuXG46aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cbiAgLnN2Zy13cmFwcGVyIHtcbiAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbWFyZ2luOiAxLjVyZW07XG5cbiAgICAuYWN0aXZlLWluZGljYXRvciB7XG4gICAgICBAaW5jbHVkZSBjYXJkLXNoYWRvdztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBwYWRkaW5nOiAxcmVtO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgY29sb3I6ICRjb2xvci1oaWdobGlnaHQ7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgfVxufVxuIiwiOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuOmhvc3QgLnN2Zy13cmFwcGVyIHtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luOiAxLjVyZW07XG59XG46aG9zdCAuc3ZnLXdyYXBwZXIgLmFjdGl2ZS1pbmRpY2F0b3Ige1xuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMikgMCAxcHggM3B4IDAsIHJnYmEoMCwgMCwgMCwgMC4xNCkgMCAxcHggMXB4IDAsIHJnYmEoMCwgMCwgMCwgMC4xMikgMCAycHggMXB4IC0xcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgcGFkZGluZzogMXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIGNvbG9yOiAjNDI4NWY0O1xuICBvcGFjaXR5OiAwO1xufSIsIiRjb2xvci1iYWNrZ3JvdW5kOiByZ2IoMjQ4LCAyNDksIDI1MCk7XG4kY29sb3ItYm9yZGVyOiByZ2IoMjE4LCAyMjAsIDIyNCk7XG4kY29sb3ItZm9udDogcmdiKDM0LCAzNCwgMzQpO1xuJGNvbG9yLWhpZ2hsaWdodDogcmdiKDY2LCAxMzMsIDI0NCk7XG4kY29sb3ItcG9zaXRpdmU6IHJnYigxNSwgMTU3LCA4OCk7XG4kY29sb3ItbmVnYXRpdmU6IHJnYigyMTksIDY4LCA1NSk7XG5cbiRmb250LXNpemUtbGFyZ2U6IDI0cHg7XG4kZm9udC1zaXplLW1lZGl1bTogMTZweDtcbiRmb250LXNpemUtc21hbGw6IDEycHg7XG5cbkBtaXhpbiBjYXJkLXNoYWRvdyB7XG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4yKSAwIDFweCAzcHggMCwgcmdiYSgwLCAwLCAwLCAwLjE0KSAwIDFweCAxcHggMCwgcmdiYSgwLCAwLCAwLCAwLjEyKSAwIDJweCAxcHggLTFweDtcbn1cbiJdfQ== */"] });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-line-chart',
                templateUrl: './line-chart.component.html',
                styleUrls: ['./line-chart.component.scss'],
            }]
    }], function () { return [{ type: _services_data_data_service__WEBPACK_IMPORTED_MODULE_6__["DataService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]; }, { a11yPlaceholder: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [_directives_a11y_placeholder_a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_5__["A11yPlaceholderDirective"], { static: true }]
        }], measureName: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], height: [{
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
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _directives_a11y_placeholder_a11y_placeholder_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../directives/a11y-placeholder/a11y-placeholder.module */ "./src/directives/a11y-placeholder/a11y-placeholder.module.ts");






class LineChartModule {
}
LineChartModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: LineChartModule });
LineChartModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function LineChartModule_Factory(t) { return new (t || LineChartModule)(); }, imports: [[
            _services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
            _directives_a11y_placeholder_a11y_placeholder_module__WEBPACK_IMPORTED_MODULE_4__["A11yPlaceholderModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LineChartModule, { declarations: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]], imports: [_services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
        _directives_a11y_placeholder_a11y_placeholder_module__WEBPACK_IMPORTED_MODULE_4__["A11yPlaceholderModule"]], exports: [_line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LineChartModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"],
                ],
                imports: [
                    _services_data_data_module__WEBPACK_IMPORTED_MODULE_2__["DataModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                    _directives_a11y_placeholder_a11y_placeholder_module__WEBPACK_IMPORTED_MODULE_4__["A11yPlaceholderModule"],
                ],
                exports: [
                    _line_chart_component__WEBPACK_IMPORTED_MODULE_1__["LineChartComponent"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/components/preference-group/preference-group.component.ts":
/*!***********************************************************************!*\
  !*** ./src/components/preference-group/preference-group.component.ts ***!
  \***********************************************************************/
/*! exports provided: PreferenceGroupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferenceGroupComponent", function() { return PreferenceGroupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _switch_switch_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../switch/switch.component */ "./src/components/switch/switch.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




function PreferenceGroupComponent_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0, 0, ["*ngIf", "enabled"]);
} }
const _c0 = ["*"];
class PreferenceGroupComponent {
    get enabled() {
        return this.subject.value;
    }
    set enabled(value) {
        this.subject.next(value);
    }
}
PreferenceGroupComponent.ɵfac = function PreferenceGroupComponent_Factory(t) { return new (t || PreferenceGroupComponent)(); };
PreferenceGroupComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PreferenceGroupComponent, selectors: [["app-preference-group"]], inputs: { title: "title", subject: "subject" }, ngContentSelectors: _c0, decls: 5, vars: 5, consts: [[1, "header"], [1, "title"], [3, "value", "valueChange"], [4, "ngIf"]], template: function PreferenceGroupComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "app-switch", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function PreferenceGroupComponent_Template_app_switch_valueChange_3_listener($event) { return ctx.enabled = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, PreferenceGroupComponent_4_Template, 1, 0, undefined, 3);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("enabled", ctx.enabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.title, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.enabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.enabled);
    } }, directives: [_switch_switch_component__WEBPACK_IMPORTED_MODULE_1__["SwitchComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]], styles: ["[_nghost-%COMP%] {\n  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px 0, rgba(0, 0, 0, 0.14) 0 1px 1px 0, rgba(0, 0, 0, 0.12) 0 2px 1px -1px;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  background-color: white;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%] {\n  background-color: white;\n  width: 2.8rem;\n  height: 1.5rem;\n  border-radius: 1.5rem;\n  border: 1px solid #dadce0;\n  box-sizing: content-box;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%], [_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%] {\n  transition: 0.2s;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%] {\n  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px 0, rgba(0, 0, 0, 0.14) 0 1px 1px 0, rgba(0, 0, 0, 0.12) 0 2px 1px -1px;\n  width: 1.5rem;\n  height: 1.5rem;\n  border-radius: 1.5rem;\n  border: 1px solid #dadce0;\n  background-color: white;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .switch.active[_ngcontent-%COMP%] {\n  background-color: #4285f4;\n}\n[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .switch.active[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%] {\n  margin-left: 1.3rem;\n  border-color: #4285f4;\n}\n[_nghost-%COMP%]   .header.enabled[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #dadce0;\n}\n[_nghost-%COMP%]   .header.enabled[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvY29tcG9uZW50cy9wcmVmZXJlbmNlLWdyb3VwL3ByZWZlcmVuY2UtZ3JvdXAuY29tcG9uZW50LnNjc3MiLCIvaG9tZS9ydW5uZXIvd29yay9ndWlkZS1kb2dlL2d1aWRlLWRvZ2Uvc3JjL3V0aWxzL2NvbnN0YW50cy5zY3NzIiwic3JjL2NvbXBvbmVudHMvcHJlZmVyZW5jZS1ncm91cC9wcmVmZXJlbmNlLWdyb3VwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VDVUUsK0dBQUE7RURSQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQkFBQTtFQUNBLHVCQUFBO0FFREY7QUZHRTtFQUNFLGVBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7QUVESjtBRkdJO0VBRUUsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsY0FITztFQUlQLHFCQUpPO0VBS1AseUJBQUE7RUFDQSx1QkFBQTtBRUZOO0FGSU07RUFDRSxnQkFBQTtBRUZSO0FGS007RUNqQkosK0dBQUE7RURtQk0sYUFkSztFQWVMLGNBZks7RUFnQkwscUJBaEJLO0VBaUJMLHlCQUFBO0VBQ0EsdUJBQUE7QUVIUjtBRk1NO0VBQ0UseUJDcENVO0FDZ0NsQjtBRk1RO0VBQ0UsbUJBQUE7RUFDQSxxQkN4Q1E7QUNvQ2xCO0FGU0k7RUFDRSxnQ0FBQTtBRVBOO0FGU007RUFDRSxnQkFBQTtBRVBSIiwiZmlsZSI6InNyYy9jb21wb25lbnRzL3ByZWZlcmVuY2UtZ3JvdXAvcHJlZmVyZW5jZS1ncm91cC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi8uLi91dGlscy9jb25zdGFudHNcIjtcblxuOmhvc3Qge1xuICBAaW5jbHVkZSBjYXJkLXNoYWRvdztcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuXG4gIC5oZWFkZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5cbiAgICAuc3dpdGNoIHtcbiAgICAgICRzaXplOiAxLjVyZW07XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgIHdpZHRoOiAyLjhyZW07XG4gICAgICBoZWlnaHQ6ICRzaXplO1xuICAgICAgYm9yZGVyLXJhZGl1czogJHNpemU7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAkY29sb3ItYm9yZGVyO1xuICAgICAgYm94LXNpemluZzogY29udGVudC1ib3g7XG5cbiAgICAgICYsICYgLmhhbmRsZSB7XG4gICAgICAgIHRyYW5zaXRpb246IC4ycztcbiAgICAgIH1cblxuICAgICAgLmhhbmRsZSB7XG4gICAgICAgIEBpbmNsdWRlIGNhcmQtc2hhZG93O1xuICAgICAgICB3aWR0aDogJHNpemU7XG4gICAgICAgIGhlaWdodDogJHNpemU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6ICRzaXplO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAkY29sb3ItYm9yZGVyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgIH1cblxuICAgICAgJi5hY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItaGlnaGxpZ2h0O1xuXG4gICAgICAgIC5oYW5kbGUge1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxLjNyZW07XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAkY29sb3ItaGlnaGxpZ2h0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi5lbmFibGVkIHtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkY29sb3ItYm9yZGVyO1xuXG4gICAgICAudGl0bGUge1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiJGNvbG9yLWJhY2tncm91bmQ6IHJnYigyNDgsIDI0OSwgMjUwKTtcbiRjb2xvci1ib3JkZXI6IHJnYigyMTgsIDIyMCwgMjI0KTtcbiRjb2xvci1mb250OiByZ2IoMzQsIDM0LCAzNCk7XG4kY29sb3ItaGlnaGxpZ2h0OiByZ2IoNjYsIDEzMywgMjQ0KTtcbiRjb2xvci1wb3NpdGl2ZTogcmdiKDE1LCAxNTcsIDg4KTtcbiRjb2xvci1uZWdhdGl2ZTogcmdiKDIxOSwgNjgsIDU1KTtcblxuJGZvbnQtc2l6ZS1sYXJnZTogMjRweDtcbiRmb250LXNpemUtbWVkaXVtOiAxNnB4O1xuJGZvbnQtc2l6ZS1zbWFsbDogMTJweDtcblxuQG1peGluIGNhcmQtc2hhZG93IHtcbiAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjIpIDAgMXB4IDNweCAwLCByZ2JhKDAsIDAsIDAsIDAuMTQpIDAgMXB4IDFweCAwLCByZ2JhKDAsIDAsIDAsIDAuMTIpIDAgMnB4IDFweCAtMXB4O1xufVxuIiwiOmhvc3Qge1xuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMikgMCAxcHggM3B4IDAsIHJnYmEoMCwgMCwgMCwgMC4xNCkgMCAxcHggMXB4IDAsIHJnYmEoMCwgMCwgMCwgMC4xMikgMCAycHggMXB4IC0xcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cbjpob3N0IC5oZWFkZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cbjpob3N0IC5oZWFkZXIgLnN3aXRjaCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB3aWR0aDogMi44cmVtO1xuICBoZWlnaHQ6IDEuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogMS41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGFkY2UwO1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbn1cbjpob3N0IC5oZWFkZXIgLnN3aXRjaCwgOmhvc3QgLmhlYWRlciAuc3dpdGNoIC5oYW5kbGUge1xuICB0cmFuc2l0aW9uOiAwLjJzO1xufVxuOmhvc3QgLmhlYWRlciAuc3dpdGNoIC5oYW5kbGUge1xuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMikgMCAxcHggM3B4IDAsIHJnYmEoMCwgMCwgMCwgMC4xNCkgMCAxcHggMXB4IDAsIHJnYmEoMCwgMCwgMCwgMC4xMikgMCAycHggMXB4IC0xcHg7XG4gIHdpZHRoOiAxLjVyZW07XG4gIGhlaWdodDogMS41cmVtO1xuICBib3JkZXItcmFkaXVzOiAxLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkYWRjZTA7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuOmhvc3QgLmhlYWRlciAuc3dpdGNoLmFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0Mjg1ZjQ7XG59XG46aG9zdCAuaGVhZGVyIC5zd2l0Y2guYWN0aXZlIC5oYW5kbGUge1xuICBtYXJnaW4tbGVmdDogMS4zcmVtO1xuICBib3JkZXItY29sb3I6ICM0Mjg1ZjQ7XG59XG46aG9zdCAuaGVhZGVyLmVuYWJsZWQge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RhZGNlMDtcbn1cbjpob3N0IC5oZWFkZXIuZW5hYmxlZCAudGl0bGUge1xuICBmb250LXdlaWdodDogNTAwO1xufSJdfQ== */"] });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PreferenceGroupComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-preference-group',
                templateUrl: './preference-group.component.html',
                styleUrls: ['./preference-group.component.scss'],
            }]
    }], null, { title: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], subject: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/components/preference-group/preference-group.module.ts":
/*!********************************************************************!*\
  !*** ./src/components/preference-group/preference-group.module.ts ***!
  \********************************************************************/
/*! exports provided: PreferenceGroupModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferenceGroupModule", function() { return PreferenceGroupModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _preference_group_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./preference-group.component */ "./src/components/preference-group/preference-group.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../switch/switch.module */ "./src/components/switch/switch.module.ts");





class PreferenceGroupModule {
}
PreferenceGroupModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: PreferenceGroupModule });
PreferenceGroupModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function PreferenceGroupModule_Factory(t) { return new (t || PreferenceGroupModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__["SwitchModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PreferenceGroupModule, { declarations: [_preference_group_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceGroupComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
        _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__["SwitchModule"]], exports: [_preference_group_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceGroupComponent"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PreferenceGroupModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _preference_group_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceGroupComponent"],
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                    _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__["SwitchModule"],
                ],
                exports: [
                    _preference_group_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceGroupComponent"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/components/preference-item/preference-item.component.ts":
/*!*********************************************************************!*\
  !*** ./src/components/preference-item/preference-item.component.ts ***!
  \*********************************************************************/
/*! exports provided: PreferenceItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferenceItemComponent", function() { return PreferenceItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _switch_switch_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../switch/switch.component */ "./src/components/switch/switch.component.ts");





function PreferenceItemComponent_input_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function PreferenceItemComponent_input_4_Template_input_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.value = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0.value);
} }
function PreferenceItemComponent_app_switch_5_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-switch", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function PreferenceItemComponent_app_switch_5_Template_app_switch_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.value = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx_r1.value);
} }
class PreferenceItemComponent {
    get type() {
        return typeof this.value;
    }
    get value() {
        return this.subject.value;
    }
    set value(value) {
        this.subject.next(value);
    }
}
PreferenceItemComponent.ɵfac = function PreferenceItemComponent_Factory(t) { return new (t || PreferenceItemComponent)(); };
PreferenceItemComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PreferenceItemComponent, selectors: [["app-preference-item"]], inputs: { name: "name", subject: "subject" }, decls: 6, vars: 4, consts: [[1, "item"], [1, "title"], [3, "ngSwitch"], ["type", "number", 3, "ngModel", "ngModelChange", 4, "ngSwitchCase"], [3, "value", "valueChange", 4, "ngSwitchCase"], ["type", "number", 3, "ngModel", "ngModelChange"], [3, "value", "valueChange"]], template: function PreferenceItemComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](3, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, PreferenceItemComponent_input_4_Template, 1, 1, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, PreferenceItemComponent_app_switch_5_Template, 1, 1, "app-switch", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.name, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", ctx.type);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "number");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "boolean");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgSwitchCase"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _switch_switch_component__WEBPACK_IMPORTED_MODULE_3__["SwitchComponent"]], styles: ["[_nghost-%COMP%]   .item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  justify-content: space-between;\n  padding: 0 1rem;\n  cursor: pointer;\n}\n[_nghost-%COMP%]   .item[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  margin: 1rem 1rem 1rem 0;\n}\n[_nghost-%COMP%]   .item[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: right;\n}\n[_nghost-%COMP%]   .item[_ngcontent-%COMP%]   app-switch[_ngcontent-%COMP%] {\n  align-self: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvY29tcG9uZW50cy9wcmVmZXJlbmNlLWl0ZW0vcHJlZmVyZW5jZS1pdGVtLmNvbXBvbmVudC5zY3NzIiwic3JjL2NvbXBvbmVudHMvcHJlZmVyZW5jZS1pdGVtL3ByZWZlcmVuY2UtaXRlbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHRTtFQUNFLGFBQUE7RUFDQSxvQkFBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7QUNGSjtBRElJO0VBQ0Usd0JBQUE7QUNGTjtBREtJO0VBQ0UsT0FBQTtFQUNBLGlCQUFBO0FDSE47QURNSTtFQUNFLGtCQUFBO0FDSk4iLCJmaWxlIjoic3JjL2NvbXBvbmVudHMvcHJlZmVyZW5jZS1pdGVtL3ByZWZlcmVuY2UtaXRlbS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi8uLi91dGlscy9jb25zdGFudHNcIjtcblxuOmhvc3Qge1xuICAuaXRlbSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgcGFkZGluZzogMCAxcmVtO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgIC50aXRsZSB7XG4gICAgICBtYXJnaW46IDFyZW0gMXJlbSAxcmVtIDA7XG4gICAgfVxuXG4gICAgaW5wdXQge1xuICAgICAgZmxleDogMTtcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIH1cblxuICAgIGFwcC1zd2l0Y2gge1xuICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgIH1cbiAgfVxufVxuIiwiOmhvc3QgLml0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiAwIDFyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbjpob3N0IC5pdGVtIC50aXRsZSB7XG4gIG1hcmdpbjogMXJlbSAxcmVtIDFyZW0gMDtcbn1cbjpob3N0IC5pdGVtIGlucHV0IHtcbiAgZmxleDogMTtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG46aG9zdCAuaXRlbSBhcHAtc3dpdGNoIHtcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xufSJdfQ== */"] });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PreferenceItemComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-preference-item',
                templateUrl: './preference-item.component.html',
                styleUrls: ['./preference-item.component.scss'],
            }]
    }], null, { name: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], subject: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/components/preference-item/preference-item.module.ts":
/*!******************************************************************!*\
  !*** ./src/components/preference-item/preference-item.module.ts ***!
  \******************************************************************/
/*! exports provided: PreferenceItemModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferenceItemModule", function() { return PreferenceItemModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _preference_item_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./preference-item.component */ "./src/components/preference-item/preference-item.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../switch/switch.module */ "./src/components/switch/switch.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");






class PreferenceItemModule {
}
PreferenceItemModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: PreferenceItemModule });
PreferenceItemModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function PreferenceItemModule_Factory(t) { return new (t || PreferenceItemModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__["SwitchModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PreferenceItemModule, { declarations: [_preference_item_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceItemComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
        _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__["SwitchModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"]], exports: [_preference_item_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceItemComponent"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PreferenceItemModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _preference_item_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceItemComponent"],
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                    _switch_switch_module__WEBPACK_IMPORTED_MODULE_3__["SwitchModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                ],
                exports: [
                    _preference_item_component__WEBPACK_IMPORTED_MODULE_1__["PreferenceItemComponent"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/components/switch/switch.component.ts":
/*!***************************************************!*\
  !*** ./src/components/switch/switch.component.ts ***!
  \***************************************************/
/*! exports provided: SwitchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwitchComponent", function() { return SwitchComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");




class SwitchComponent {
    constructor() {
        this.id = `switch-${uuid__WEBPACK_IMPORTED_MODULE_1__["v4"]()}`;
        this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    setValue(value) {
        this.valueChange.emit(value);
    }
}
SwitchComponent.ɵfac = function SwitchComponent_Factory(t) { return new (t || SwitchComponent)(); };
SwitchComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SwitchComponent, selectors: [["app-switch"]], inputs: { value: "value" }, outputs: { valueChange: "valueChange" }, decls: 2, vars: 5, consts: [["type", "checkbox", 3, "ngModel", "ngModelChange"], [1, "switch", 3, "htmlFor"]], template: function SwitchComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function SwitchComponent_Template_input_ngModelChange_0_listener($event) { return ctx.setValue($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "label", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("id", ctx.id);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("active", ctx.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("htmlFor", ctx.id);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["CheckboxControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"]], styles: ["[_nghost-%COMP%]   input[_ngcontent-%COMP%] {\n  display: none;\n}\n[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked    + .switch[_ngcontent-%COMP%] {\n  background-color: #4285f4;\n}\n[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked    + .switch[_ngcontent-%COMP%]:after {\n  margin-left: 1.3rem;\n  border-color: #4285f4;\n}\n[_nghost-%COMP%]   .switch[_ngcontent-%COMP%] {\n  display: block;\n  background-color: white;\n  width: 2.8rem;\n  border-radius: 1.5rem;\n  border: 1px solid #dadce0;\n  cursor: pointer;\n}\n[_nghost-%COMP%]   .switch[_ngcontent-%COMP%], [_nghost-%COMP%]   .switch[_ngcontent-%COMP%]:after {\n  transition: 0.2s;\n}\n[_nghost-%COMP%]   .switch[_ngcontent-%COMP%]:after {\n  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px 0, rgba(0, 0, 0, 0.14) 0 1px 1px 0, rgba(0, 0, 0, 0.12) 0 2px 1px -1px;\n  content: \"\";\n  display: block;\n  width: 1.5rem;\n  height: 1.5rem;\n  border-radius: 1.5rem;\n  border: 1px solid #dadce0;\n  background-color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvY29tcG9uZW50cy9zd2l0Y2gvc3dpdGNoLmNvbXBvbmVudC5zY3NzIiwic3JjL2NvbXBvbmVudHMvc3dpdGNoL3N3aXRjaC5jb21wb25lbnQuc2NzcyIsIi9ob21lL3J1bm5lci93b3JrL2d1aWRlLWRvZ2UvZ3VpZGUtZG9nZS9zcmMvdXRpbHMvY29uc3RhbnRzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0U7RUFDRSxhQUFBO0FDRko7QURJSTtFQUNFLHlCRUpZO0FERWxCO0FESU07RUFDRSxtQkFBQTtFQUNBLHFCRVJVO0FETWxCO0FET0U7RUFFRSxjQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0VBQ0EscUJBSk87RUFLUCx5QkFBQTtFQUNBLGVBQUE7QUNOSjtBRFFJO0VBQ0UsZ0JBQUE7QUNOTjtBRFNJO0VFakJGLCtHQUFBO0VGbUJJLFdBQUE7RUFDQSxjQUFBO0VBQ0EsYUFoQks7RUFpQkwsY0FqQks7RUFrQkwscUJBbEJLO0VBbUJMLHlCQUFBO0VBQ0EsdUJBQUE7QUNQTiIsImZpbGUiOiJzcmMvY29tcG9uZW50cy9zd2l0Y2gvc3dpdGNoLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uL3V0aWxzL2NvbnN0YW50c1wiO1xuXG46aG9zdCB7XG4gIGlucHV0IHtcbiAgICBkaXNwbGF5OiBub25lO1xuXG4gICAgJjpjaGVja2VkICsgLnN3aXRjaCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItaGlnaGxpZ2h0O1xuXG4gICAgICAmOmFmdGVyIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEuM3JlbTtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAkY29sb3ItaGlnaGxpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC5zd2l0Y2gge1xuICAgICRzaXplOiAxLjVyZW07XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgd2lkdGg6IDIuOHJlbTtcbiAgICBib3JkZXItcmFkaXVzOiAkc2l6ZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkY29sb3ItYm9yZGVyO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICYsICY6YWZ0ZXIge1xuICAgICAgdHJhbnNpdGlvbjogLjJzO1xuICAgIH1cblxuICAgICY6YWZ0ZXIge1xuICAgICAgQGluY2x1ZGUgY2FyZC1zaGFkb3c7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgd2lkdGg6ICRzaXplO1xuICAgICAgaGVpZ2h0OiAkc2l6ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6ICRzaXplO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgJGNvbG9yLWJvcmRlcjtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIH1cbiAgfVxufVxuIiwiOmhvc3QgaW5wdXQge1xuICBkaXNwbGF5OiBub25lO1xufVxuOmhvc3QgaW5wdXQ6Y2hlY2tlZCArIC5zd2l0Y2gge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDI4NWY0O1xufVxuOmhvc3QgaW5wdXQ6Y2hlY2tlZCArIC5zd2l0Y2g6YWZ0ZXIge1xuICBtYXJnaW4tbGVmdDogMS4zcmVtO1xuICBib3JkZXItY29sb3I6ICM0Mjg1ZjQ7XG59XG46aG9zdCAuc3dpdGNoIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB3aWR0aDogMi44cmVtO1xuICBib3JkZXItcmFkaXVzOiAxLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkYWRjZTA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbjpob3N0IC5zd2l0Y2gsIDpob3N0IC5zd2l0Y2g6YWZ0ZXIge1xuICB0cmFuc2l0aW9uOiAwLjJzO1xufVxuOmhvc3QgLnN3aXRjaDphZnRlciB7XG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4yKSAwIDFweCAzcHggMCwgcmdiYSgwLCAwLCAwLCAwLjE0KSAwIDFweCAxcHggMCwgcmdiYSgwLCAwLCAwLCAwLjEyKSAwIDJweCAxcHggLTFweDtcbiAgY29udGVudDogXCJcIjtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxLjVyZW07XG4gIGhlaWdodDogMS41cmVtO1xuICBib3JkZXItcmFkaXVzOiAxLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkYWRjZTA7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufSIsIiRjb2xvci1iYWNrZ3JvdW5kOiByZ2IoMjQ4LCAyNDksIDI1MCk7XG4kY29sb3ItYm9yZGVyOiByZ2IoMjE4LCAyMjAsIDIyNCk7XG4kY29sb3ItZm9udDogcmdiKDM0LCAzNCwgMzQpO1xuJGNvbG9yLWhpZ2hsaWdodDogcmdiKDY2LCAxMzMsIDI0NCk7XG4kY29sb3ItcG9zaXRpdmU6IHJnYigxNSwgMTU3LCA4OCk7XG4kY29sb3ItbmVnYXRpdmU6IHJnYigyMTksIDY4LCA1NSk7XG5cbiRmb250LXNpemUtbGFyZ2U6IDI0cHg7XG4kZm9udC1zaXplLW1lZGl1bTogMTZweDtcbiRmb250LXNpemUtc21hbGw6IDEycHg7XG5cbkBtaXhpbiBjYXJkLXNoYWRvdyB7XG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4yKSAwIDFweCAzcHggMCwgcmdiYSgwLCAwLCAwLCAwLjE0KSAwIDFweCAxcHggMCwgcmdiYSgwLCAwLCAwLCAwLjEyKSAwIDJweCAxcHggLTFweDtcbn1cbiJdfQ== */"] });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SwitchComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-switch',
                templateUrl: './switch.component.html',
                styleUrls: ['./switch.component.scss'],
            }]
    }], null, { value: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], valueChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/components/switch/switch.module.ts":
/*!************************************************!*\
  !*** ./src/components/switch/switch.module.ts ***!
  \************************************************/
/*! exports provided: SwitchModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwitchModule", function() { return SwitchModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _switch_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./switch.component */ "./src/components/switch/switch.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");





class SwitchModule {
}
SwitchModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: SwitchModule });
SwitchModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function SwitchModule_Factory(t) { return new (t || SwitchModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SwitchModule, { declarations: [_switch_component__WEBPACK_IMPORTED_MODULE_1__["SwitchComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"]], exports: [_switch_component__WEBPACK_IMPORTED_MODULE_1__["SwitchComponent"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SwitchModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _switch_component__WEBPACK_IMPORTED_MODULE_1__["SwitchComponent"],
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                ],
                exports: [
                    _switch_component__WEBPACK_IMPORTED_MODULE_1__["SwitchComponent"],
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
        this.colorHighlight = 'rgb(66, 133, 244)';
    }
    get transition() {
        return this.createTransition(300);
    }
    get container() {
        return d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.renderOptions.elementRef.nativeElement);
    }
    get svg() {
        return this.container.select('svg');
    }
    config(renderOptions) {
        this.renderOptions = renderOptions;
        return this;
    }
    render() {
        const { width, height } = this.renderOptions;
        this.clear();
        this.clear$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.svg
            .style('width', width)
            .style('height', height)
            .attr('viewBox', [0, 0, width, height].join(' '));
    }
    clear() {
        if (!this.clear$) {
            return;
        }
        this.clear$.next();
        this.clear$.complete();
        this.clear$ = undefined;
        this.svg.html('');
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


class LineChartD3 extends _xy_chart_d3__WEBPACK_IMPORTED_MODULE_0__["XYChartD3"] {
    renderData() {
        this.line = d3__WEBPACK_IMPORTED_MODULE_1__["line"]()
            .defined(d => !isNaN(d.value))
            .x(d => this.scaleX(d.date))
            .y(d => this.scaleY(d.value));
        this.path = this.svg
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', this.colorHighlight)
            .attr('stroke-width', 2)
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
        this.activeDatumCircle = this.svg
            .append('circle')
            .attr('r', 4)
            .attr('fill', this.colorHighlight);
        this.activeDatumToast = this.container.select('.active-indicator');
    }
    updateActiveDatum(activeDatum) {
        if (!activeDatum) {
            this.activeDatumCircle.attr('display', 'none');
            this.activeDatumToast.style('opacity', 0);
            return;
        }
        const { date, value } = activeDatum;
        this.activeDatumCircle
            .transition(this.createTransition(50))
            .attr('display', 'inherit')
            .attr('transform', `translate(${this.scaleX(date)},${this.scaleY(value)})`);
        this.activeDatumToast
            .transition(this.createTransition(50))
            .style('opacity', .8)
            .style('top', `${this.scaleY(value) + 16}px`)
            .style('left', `${this.scaleX(date) - 64}px`);
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
        const { data$, activeDatum$ } = this.renderOptions;
        this.renderAxis();
        this.renderData();
        this.renderActiveDatum();
        data$
            .pipe(this.takeUntilCleared())
            .subscribe(data => {
            this.updateAxis(data);
            this.updateData(data);
        });
        activeDatum$
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
            .ticks(d3__WEBPACK_IMPORTED_MODULE_0__["timeWeek"].every(1))
            .tickFormat(_utils_formatters__WEBPACK_IMPORTED_MODULE_2__["formatX"]);
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
            .call(this.xAxis)
            .attr('font-size', 12);
        this.yAxisG
            .transition(this.transition)
            .call(this.yAxis)
            .attr('font-size', 12);
    }
}


/***/ }),

/***/ "./src/directives/a11y-placeholder/a11y-placeholder.directive.ts":
/*!***********************************************************************!*\
  !*** ./src/directives/a11y-placeholder/a11y-placeholder.directive.ts ***!
  \***********************************************************************/
/*! exports provided: A11yPlaceholderDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A11yPlaceholderDirective", function() { return A11yPlaceholderDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class A11yPlaceholderDirective {
    constructor(componentFactoryResolver, viewContainerRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainerRef = viewContainerRef;
    }
    addComponent(A11yComponent, host, preference) {
        this.viewContainerRef.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(A11yComponent);
        const injector = _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"].create({
            providers: [{
                    provide: 'host',
                    useValue: host,
                }],
        });
        const componentRef = this.viewContainerRef.createComponent(componentFactory, 0, injector);
        Object.assign(componentRef.instance, preference);
        return componentRef;
    }
    removeComponent(componentRef) {
        const index = this.viewContainerRef.indexOf(componentRef.hostView);
        if (index >= 0) {
            this.viewContainerRef.remove(index);
        }
        componentRef.destroy();
    }
}
A11yPlaceholderDirective.ɵfac = function A11yPlaceholderDirective_Factory(t) { return new (t || A11yPlaceholderDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"])); };
A11yPlaceholderDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: A11yPlaceholderDirective, selectors: [["", "appA11yPlaceholder", ""]] });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](A11yPlaceholderDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[appA11yPlaceholder]',
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"] }]; }, null); })();


/***/ }),

/***/ "./src/directives/a11y-placeholder/a11y-placeholder.module.ts":
/*!********************************************************************!*\
  !*** ./src/directives/a11y-placeholder/a11y-placeholder.module.ts ***!
  \********************************************************************/
/*! exports provided: A11yPlaceholderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A11yPlaceholderModule", function() { return A11yPlaceholderModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./a11y-placeholder.directive */ "./src/directives/a11y-placeholder/a11y-placeholder.directive.ts");



class A11yPlaceholderModule {
}
A11yPlaceholderModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: A11yPlaceholderModule });
A11yPlaceholderModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function A11yPlaceholderModule_Factory(t) { return new (t || A11yPlaceholderModule)(); } });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](A11yPlaceholderModule, { declarations: [_a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_1__["A11yPlaceholderDirective"]], exports: [_a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_1__["A11yPlaceholderDirective"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](A11yPlaceholderModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_1__["A11yPlaceholderDirective"],
                ],
                exports: [
                    _a11y_placeholder_directive__WEBPACK_IMPORTED_MODULE_1__["A11yPlaceholderDirective"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/directives/audification/audification.directive.ts":
/*!***************************************************************!*\
  !*** ./src/directives/audification/audification.directive.ts ***!
  \***************************************************************/
/*! exports provided: AudificationDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudificationDirective", function() { return AudificationDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _components_line_chart_audification_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/line-chart-audification/line-chart-audification.component */ "./src/components/line-chart-audification/line-chart-audification.component.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _services_preference_preference_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/preference/preference.service */ "./src/services/preference/preference.service.ts");
/* harmony import */ var _components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/line-chart/line-chart.component */ "./src/components/line-chart/line-chart.component.ts");







class AudificationDirective {
    constructor(preferenceService, lineChartComponent) {
        this.preferenceService = preferenceService;
        this.lineChartComponent = lineChartComponent;
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    get host() {
        const component = this.lineChartComponent;
        if (!component) {
            throw new Error('The component does not support audification.');
        }
        return component;
    }
    ngOnInit() {
        this.preferenceService.audification$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroy$))
            .subscribe(preference => {
            if (preference.enabled) {
                this.attach(preference);
            }
            else {
                this.detach();
            }
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.detach();
    }
    attach(preference) {
        this.detach();
        const { host } = this;
        this.audificationComponentRef = host.a11yPlaceholder.addComponent(_components_line_chart_audification_line_chart_audification_component__WEBPACK_IMPORTED_MODULE_1__["LineChartAudificationComponent"], host, preference);
    }
    detach() {
        if (this.audificationComponentRef) {
            this.host.a11yPlaceholder.removeComponent(this.audificationComponentRef);
            this.audificationComponentRef = null;
        }
    }
}
AudificationDirective.ɵfac = function AudificationDirective_Factory(t) { return new (t || AudificationDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_preference_preference_service__WEBPACK_IMPORTED_MODULE_4__["PreferenceService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_5__["LineChartComponent"], 11)); };
AudificationDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: AudificationDirective, selectors: [["", "appAudification", ""]] });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AudificationDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[appAudification]',
            }]
    }], function () { return [{ type: _services_preference_preference_service__WEBPACK_IMPORTED_MODULE_4__["PreferenceService"] }, { type: _components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_5__["LineChartComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Host"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }]; }, null); })();


/***/ }),

/***/ "./src/directives/audification/audification.module.ts":
/*!************************************************************!*\
  !*** ./src/directives/audification/audification.module.ts ***!
  \************************************************************/
/*! exports provided: AudificationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudificationModule", function() { return AudificationModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _audification_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audification.directive */ "./src/directives/audification/audification.directive.ts");
/* harmony import */ var _services_preference_preference_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/preference/preference.module */ "./src/services/preference/preference.module.ts");




class AudificationModule {
}
AudificationModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AudificationModule });
AudificationModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AudificationModule_Factory(t) { return new (t || AudificationModule)(); }, imports: [[
            _services_preference_preference_module__WEBPACK_IMPORTED_MODULE_2__["PreferenceModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AudificationModule, { declarations: [_audification_directive__WEBPACK_IMPORTED_MODULE_1__["AudificationDirective"]], imports: [_services_preference_preference_module__WEBPACK_IMPORTED_MODULE_2__["PreferenceModule"]], exports: [_audification_directive__WEBPACK_IMPORTED_MODULE_1__["AudificationDirective"]] }); })();
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AudificationModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _audification_directive__WEBPACK_IMPORTED_MODULE_1__["AudificationDirective"],
                ],
                imports: [
                    _services_preference_preference_module__WEBPACK_IMPORTED_MODULE_2__["PreferenceModule"],
                ],
                exports: [
                    _audification_directive__WEBPACK_IMPORTED_MODULE_1__["AudificationDirective"],
                ],
            }]
    }], null, null); })();


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
    constructor(values, frequencyRange, noteDuration, onSeek) {
        this.values = values;
        this.frequencyRange = frequencyRange;
        this.noteDuration = noteDuration;
        this.onSeek = onSeek;
        this.synth = new tone__WEBPACK_IMPORTED_MODULE_1__["Synth"]().toDestination();
        this.currentDatumIndex = 0;
        this.inclusive = true;
        this.reversed = false;
        const reversedValues = [...values].reverse();
        this.forwardSequence = this.createSequence(values);
        this.backwardSequence = this.createSequence(reversedValues);
    }
    get duration() {
        return this.noteDuration * this.values.length;
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
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (tone__WEBPACK_IMPORTED_MODULE_1__["getContext"]().state === 'suspended') {
                yield tone__WEBPACK_IMPORTED_MODULE_1__["start"]();
            }
            if (!this.isPlaying) {
                this.reversed = reversed;
                this.currentDatumIndex = this.nextIndex;
                let nextSeconds = this.getSeconds(this.currentDatumIndex);
                if (this.reversed) {
                    this.backwardSequence.start(0);
                    this.forwardSequence.stop(0);
                    nextSeconds += this.noteDuration / 2;
                    tone__WEBPACK_IMPORTED_MODULE_1__["Transport"].start(undefined, this.duration - nextSeconds);
                }
                else {
                    this.backwardSequence.stop(0);
                    this.forwardSequence.start(0);
                    nextSeconds -= this.noteDuration / 2;
                    tone__WEBPACK_IMPORTED_MODULE_1__["Transport"].start(undefined, nextSeconds);
                }
            }
        });
    }
    pause() {
        if (this.isPlaying) {
            tone__WEBPACK_IMPORTED_MODULE_1__["Transport"].pause();
            this.backwardSequence.stop(0);
            this.forwardSequence.stop(0);
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

/***/ "./src/services/preference/preference.module.ts":
/*!******************************************************!*\
  !*** ./src/services/preference/preference.module.ts ***!
  \******************************************************/
/*! exports provided: PreferenceModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferenceModule", function() { return PreferenceModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _preference_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./preference.service */ "./src/services/preference/preference.service.ts");



class PreferenceModule {
}
PreferenceModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: PreferenceModule });
PreferenceModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function PreferenceModule_Factory(t) { return new (t || PreferenceModule)(); }, providers: [
        _preference_service__WEBPACK_IMPORTED_MODULE_1__["PreferenceService"],
    ] });
(function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PreferenceModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                providers: [
                    _preference_service__WEBPACK_IMPORTED_MODULE_1__["PreferenceService"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/services/preference/preference.service.ts":
/*!*******************************************************!*\
  !*** ./src/services/preference/preference.service.ts ***!
  \*******************************************************/
/*! exports provided: PreferenceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferenceService", function() { return PreferenceService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");


class PreferenceService {
    constructor() {
        this.audification = {
            enabled: new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](true),
            lowestPitch: new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](256),
            highestPitch: new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](1024),
            noteDuration: new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](.167),
            readBefore: new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](false),
            readAfter: new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](true),
        };
        this.audification$ = this.combineObservableDictionary(this.audification);
        this.dataTable = {
            enabled: new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](false),
            placeholder: new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](null),
        };
        this.datatable$ = this.combineObservableDictionary(this.dataTable);
        this.textSummary = {
            enabled: new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](false),
            placeholder: new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](null),
        };
        this.textSummary$ = this.combineObservableDictionary(this.textSummary);
    }
    combineObservableDictionary(observableDictionary) {
        const keys = Object.keys(observableDictionary);
        const subjects = Object.values(observableDictionary);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["combineLatest"])(subjects)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(values => {
            const observedDictionary = {};
            values.forEach((value, i) => {
                const key = keys[i];
                observedDictionary[key] = value;
            });
            return observedDictionary;
        }));
    }
}


/***/ }),

/***/ "./src/utils/comparators.ts":
/*!**********************************!*\
  !*** ./src/utils/comparators.ts ***!
  \**********************************/
/*! exports provided: ascendingNumber, descendingNumber, ascendingDate, descendingDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ascendingNumber", function() { return ascendingNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "descendingNumber", function() { return descendingNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ascendingDate", function() { return ascendingDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "descendingDate", function() { return descendingDate; });
function ascendingNumber(a, b) {
    return a - b;
}
function descendingNumber(a, b) {
    return -ascendingNumber(a, b);
}
function ascendingDate(a, b) {
    return ascendingNumber(a.getTime(), b.getTime());
}
function descendingDate(a, b) {
    return -ascendingDate(a, b);
}


/***/ }),

/***/ "./src/utils/formatters.ts":
/*!*********************************!*\
  !*** ./src/utils/formatters.ts ***!
  \*********************************/
/*! exports provided: formatX, formatY, humanizeMeasureName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatX", function() { return formatX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatY", function() { return formatY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "humanizeMeasureName", function() { return humanizeMeasureName; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");

const formatX = d3__WEBPACK_IMPORTED_MODULE_0__["timeFormat"]('%B %d');
const formatY = (value) => Number.isInteger(value) ? value : value.toFixed(1);
const humanizeMeasureName = (str) => str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, firstCharacter => firstCharacter.toUpperCase());


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
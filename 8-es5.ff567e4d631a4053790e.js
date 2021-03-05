function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"cbu+":function(e,t,r){"use strict";r.r(t),r.d(t,"GeoMapNavigationModule",(function(){return O}));var n=r("mrSG"),i=r("Vbab"),a=r("qsmv"),u=r("tgCk"),s=r("XNiG"),o=r("VRyK"),c=r("xgIS"),h=r("1G5W"),d=r("pLZG"),l=r("ZIGy"),f=r("fXoL");r("DWdG");var v,m,p=u.a.CITY,b=((v=function(){function e(t,r){_classCallCheck(this,e),this.host=t,this.elementRef=r,this.tabindex=0,this.destroy$=new s.a}return _createClass(e,[{key:"INSTRUCTIONS",get:function(){return Object(i.i)(i.d.INSTRUCTIONS)}},{key:"data",get:function(){return this.host.data}},{key:"unit",get:function(){return this.host.unit},set:function(e){this.host.unit=e}},{key:"filteringTerritory",get:function(){return this.host.filteringTerritory},set:function(e){this.host.filteringTerritory=e}},{key:"keywordElement",get:function(){return this.host.keywordRef.nativeElement}},{key:"activeDatumIndex",get:function(){return this.host.activeDatumIndex},set:function(e){this.host.activeDatumIndex=e}},{key:"activeMeasureIndex",get:function(){return this.host.activeMeasureIndex},set:function(e){this.host.activeMeasureIndex=e}},{key:"measureNames",get:function(){return this.host.measureNames}},{key:"i18nActiveDatumArgs",get:function(){var e=this.data[this.activeDatumIndex];if(!e)return null;var t=this.measureNames[this.activeMeasureIndex];return{territory:e.territory.name,value:Object(l.b)(e.values[t]),measure:Object(l.c)(t)}}},{key:"focus",value:function(){this.elementRef.nativeElement.focus()}},{key:"handleKeyDown",value:function(e){var t,r,i,a;return Object(n.a)(this,void 0,void 0,regeneratorRuntime.mark((function n(){var u,s,o,c,h;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(u=e.key,s=e.shiftKey,o=e.altKey,c=e.ctrlKey,h=e.metaKey,!(o||c||h||"Tab"===u)){n.next=3;break}return n.abrupt("return",!1);case 3:n.t0=(e.preventDefault(),e.stopPropagation(),u),n.next="-"===n.t0||"_"===n.t0?6:"+"===n.t0||"="===n.t0?7:"Enter"===n.t0?8:"/"===n.t0?16:"ArrowDown"===n.t0?17:"ArrowUp"===n.t0?18:"ArrowRight"===n.t0?19:"ArrowLeft"===n.t0?20:"?"===n.t0?21:22;break;case 6:return n.abrupt("return",(this.unit=Math.max(this.unit-1,null!==(r=null===(t=this.filteringTerritory)||void 0===t?void 0:t.level)&&void 0!==r?r:0),this.readOutUnitAndFilteringTerritory()));case 7:return n.abrupt("return",(this.unit=Math.min(this.unit+1,p),this.readOutUnitAndFilteringTerritory()));case 8:if(!s){n.next=12;break}this.filteringTerritory=null!==(a=null===(i=this.filteringTerritory)||void 0===i?void 0:i.parent)&&void 0!==a?a:null,n.next=15;break;case 12:if(this.activeDatumIndex>=0){n.next=14;break}return n.abrupt("return",this.readOutNothingSelected());case 14:this.filteringTerritory=this.data[this.activeDatumIndex].territory;case 15:return n.abrupt("return",this.readOutUnitAndFilteringTerritory());case 16:return n.abrupt("return",(this.keywordElement.focus(),!0));case 17:return n.abrupt("return",(this.activeDatumIndex=Math.min(this.activeDatumIndex+1,this.data.length-1),this.readOutActiveDatum()));case 18:return n.abrupt("return",(this.activeDatumIndex=Math.max(this.activeDatumIndex-1,0),this.readOutActiveDatum()));case 19:return n.abrupt("return",(this.activeMeasureIndex=Math.min(this.activeMeasureIndex+1,this.measureNames.length-1),this.readOutActiveMeasure()));case 20:return n.abrupt("return",(this.activeMeasureIndex=Math.max(this.activeMeasureIndex-1,0),this.readOutActiveMeasure()));case 21:return n.abrupt("return",this.readOutInstructions());case 22:return n.abrupt("return",!1);case 23:case"end":return n.stop()}}),n,this)})))}},{key:"handleFocus",value:function(){return this.readOutUnitAndFilteringTerritory()}},{key:"handleBlur",value:function(){this.activeDatumIndex=-1,this.activeMeasureIndex=-1}},{key:"ngOnInit",value:function(){var e=this;this.screenReaderComponent.breakSilence(Object(i.j)(i.a.BREAK_SILENCE)),Object(o.a)(this.host.filteringTerritory$.pipe(Object(h.a)(this.destroy$)),Object(c.a)(this.keywordElement,"keydown").pipe(Object(h.a)(this.destroy$)).pipe(Object(d.a)((function(e){return"Escape"===e.key})))).subscribe((function(){e.focus()}))}},{key:"ngOnDestroy",value:function(){this.destroy$.next(),this.destroy$.complete()}},{key:"readOutNothingSelected",value:function(){return this.screenReaderComponent.readOut(Object(i.i)(i.d.NOTHING_SELECTED))}},{key:"readOutUnitAndFilteringTerritory",value:function(){var e=this.host.hierarchicalTerritories;return this.screenReaderComponent.readOut(Object(i.i)(i.d.UNIT_AND_FILTERING_TERRITORY,{unit:Object(l.d)(this.unit,!0),hierarchical_territories:e.length>0?e.reverse().map((function(e){return e.name})).join(", "):"the world"}))}},{key:"readOutActiveDatum",value:function(){return Object(n.a)(this,void 0,void 0,regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.i18nActiveDatumArgs,e.abrupt("return",null!==t&&this.screenReaderComponent.readOut(Object(i.i)(i.d.ACTIVE_DATUM,t)));case 2:case"end":return e.stop()}}),e,this)})))}},{key:"readOutActiveMeasure",value:function(){return Object(n.a)(this,void 0,void 0,regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==(t=this.i18nActiveDatumArgs)){e.next=4;break}return r=this.measureNames[this.activeMeasureIndex],e.abrupt("return",this.screenReaderComponent.readOut(Object(l.c)(r)));case 4:return e.abrupt("return",this.screenReaderComponent.readOut(Object(i.i)(i.d.ACTIVE_MEASURE,t)));case 5:case"end":return e.stop()}}),e,this)})))}},{key:"readOutInstructions",value:function(){return this.screenReaderComponent.readOut(Object(i.j)(i.d.INSTRUCTIONS))}}]),e}()).\u0275fac=function(e){return new(e||v)(f.Ob("host"),f.Ob(f.l))},v.\u0275cmp=f.Ib({type:v,selectors:[["app-geo-map-navigation"]],viewQuery:function(e,t){var r;1&e&&f.wc(a.a,!0),2&e&&f.oc(r=f.dc())&&(t.screenReaderComponent=r.first)},hostVars:1,hostBindings:function(e,t){1&e&&f.cc("keydown",(function(e){return t.handleKeyDown(e)}))("focus",(function(e){return t.handleFocus(e)}))("blur",(function(e){return t.handleBlur(e)})),2&e&&f.Db("tabindex",t.tabindex)},inputs:{enabled:"enabled"},decls:2,vars:1,consts:[["aria-hidden","true",1,"instructions",3,"innerHTML"]],template:function(e,t){1&e&&(f.Pb(0,"div",0),f.Pb(1,"app-screen-reader")),2&e&&f.lc("innerHTML",t.INSTRUCTIONS,f.rc)},directives:[a.a],styles:["[_nghost-%COMP%]{padding:1.5rem;display:flex;flex-direction:column;align-items:stretch}[_nghost-%COMP%]:not(:first-child){border-top:1px solid #dadce0}[_nghost-%COMP%]   .instructions[_ngcontent-%COMP%]{font-size:12px;line-height:2em;margin-bottom:.5rem}"]}),v),y=r("ofXK"),g=r("gFbo"),O=((m=function e(){_classCallCheck(this,e),this.A11yComponent=b}).\u0275mod=f.Mb({type:m}),m.\u0275inj=f.Lb({factory:function(e){return new(e||m)},imports:[[y.c,g.a]]}),m)}}]);
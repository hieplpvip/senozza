"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4477],{4477:function(r,n,t){function u(r,n){return r.skipToEnd(),n.cur=p,"error"}function e(r,n){return r.match(/^HTTP\/\d\.\d/)?(n.cur=c,"keyword"):r.match(/^[A-Z]+/)&&/[ \t]/.test(r.peek())?(n.cur=i,"keyword"):u(r,n)}function c(r,n){var t=r.match(/^\d+/);if(!t)return u(r,n);n.cur=o;var e=Number(t[0]);return e>=100&&e<400?"atom":"error"}function o(r,n){return r.skipToEnd(),n.cur=p,null}function i(r,n){return r.eatWhile(/\S/),n.cur=a,"string.special"}function a(r,n){return r.match(/^HTTP\/\d\.\d$/)?(n.cur=p,"keyword"):u(r,n)}function p(r){return r.sol()&&!r.eat(/[ \t]/)?r.match(/^.*?:/)?"atom":(r.skipToEnd(),"error"):(r.skipToEnd(),"string")}function f(r){return r.skipToEnd(),null}t.r(n),t.d(n,{http:function(){return s}});var s={name:"http",token:function(r,n){var t=n.cur;return t!=p&&t!=f&&r.eatSpace()?null:t(r,n)},blankLine:function(r){r.cur=f},startState:function(){return{cur:e}}}}}]);
//# sourceMappingURL=4477.f180827e.chunk.js.map
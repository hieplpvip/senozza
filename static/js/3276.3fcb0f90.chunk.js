"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3276],{3276:function(e,t,n){function r(e){for(var t={},n=e.split(" "),r=0;r<n.length;++r)t[n[r]]=!0;return t}n.r(t),n.d(t,{d:function(){return g}});var i,o="body catch class do else enum for foreach foreach_reverse if in interface mixin out scope struct switch try union unittest version while with",a={keywords:r("abstract alias align asm assert auto break case cast cdouble cent cfloat const continue debug default delegate delete deprecated export extern final finally function goto immutable import inout invariant is lazy macro module new nothrow override package pragma private protected public pure ref return shared short static super synchronized template this throw typedef typeid typeof volatile __FILE__ __LINE__ __gshared __traits __vector __parameters "+o),blockKeywords:r(o),builtin:r("bool byte char creal dchar double float idouble ifloat int ireal long real short ubyte ucent uint ulong ushort wchar wstring void size_t sizediff_t"),atoms:r("exit failure success true false null"),hooks:{"@":function(e,t){return e.eatWhile(/[\w\$_]/),"meta"}}},u=a.statementIndentUnit,l=a.keywords,s=a.builtin,c=a.blockKeywords,f=a.atoms,p=a.hooks,d=a.multiLineStrings,m=/[+\-*&%=<>!?|\/]/;function h(e,t){var n,r=e.next();if(p[r]){var o=p[r](e,t);if(!1!==o)return o}if('"'==r||"'"==r||"`"==r)return t.tokenize=(n=r,function(e,t){for(var r,i=!1,o=!1;null!=(r=e.next());){if(r==n&&!i){o=!0;break}i=!i&&"\\"==r}return(o||!i&&!d)&&(t.tokenize=null),"string"}),t.tokenize(e,t);if(/[\[\]{}\(\),;\:\.]/.test(r))return i=r,null;if(/\d/.test(r))return e.eatWhile(/[\w\.]/),"number";if("/"==r){if(e.eat("+"))return t.tokenize=k,k(e,t);if(e.eat("*"))return t.tokenize=y,y(e,t);if(e.eat("/"))return e.skipToEnd(),"comment"}if(m.test(r))return e.eatWhile(m),"operator";e.eatWhile(/[\w\$_\xa1-\uffff]/);var a=e.current();return l.propertyIsEnumerable(a)?(c.propertyIsEnumerable(a)&&(i="newstatement"),"keyword"):s.propertyIsEnumerable(a)?(c.propertyIsEnumerable(a)&&(i="newstatement"),"builtin"):f.propertyIsEnumerable(a)?"atom":"variable"}function y(e,t){for(var n,r=!1;n=e.next();){if("/"==n&&r){t.tokenize=null;break}r="*"==n}return"comment"}function k(e,t){for(var n,r=!1;n=e.next();){if("/"==n&&r){t.tokenize=null;break}r="+"==n}return"comment"}function b(e,t,n,r,i){this.indented=e,this.column=t,this.type=n,this.align=r,this.prev=i}function v(e,t,n){var r=e.indented;return e.context&&"statement"==e.context.type&&(r=e.context.indented),e.context=new b(r,t,n,null,e.context)}function w(e){var t=e.context.type;return")"!=t&&"]"!=t&&"}"!=t||(e.indented=e.context.indented),e.context=e.context.prev}var g={name:"d",startState:function(e){return{tokenize:null,context:new b(-e,0,"top",!1),indented:0,startOfLine:!0}},token:function(e,t){var n=t.context;if(e.sol()&&(null==n.align&&(n.align=!1),t.indented=e.indentation(),t.startOfLine=!0),e.eatSpace())return null;i=null;var r=(t.tokenize||h)(e,t);if("comment"==r||"meta"==r)return r;if(null==n.align&&(n.align=!0),";"!=i&&":"!=i&&","!=i||"statement"!=n.type)if("{"==i)v(t,e.column(),"}");else if("["==i)v(t,e.column(),"]");else if("("==i)v(t,e.column(),")");else if("}"==i){for(;"statement"==n.type;)n=w(t);for("}"==n.type&&(n=w(t));"statement"==n.type;)n=w(t)}else i==n.type?w(t):(("}"==n.type||"top"==n.type)&&";"!=i||"statement"==n.type&&"newstatement"==i)&&v(t,e.column(),"statement");else w(t);return t.startOfLine=!1,r},indent:function(e,t,n){if(e.tokenize!=h&&null!=e.tokenize)return null;var r=e.context,i=t&&t.charAt(0);"statement"==r.type&&"}"==i&&(r=r.prev);var o=i==r.type;return"statement"==r.type?r.indented+("{"==i?0:u||n.unit):r.align?r.column+(o?0:1):r.indented+(o?0:n.unit)},languageData:{indentOnInput:/^\s*[{}]$/,commentTokens:{line:"//",block:{open:"/*",close:"*/"}}}}}}]);
//# sourceMappingURL=3276.3fcb0f90.chunk.js.map
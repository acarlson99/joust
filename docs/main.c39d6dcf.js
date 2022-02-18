parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"kavB":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,a,r){return a&&t(e.prototype,a),r&&t(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Obstacle=exports.Obstacles=exports.EObstacleName=void 0;var r,i=require("./updater");!function(e){e.gem="gem",e.illegal="illegal",e.graveyard="graveyard",e.pitfall="pitfall"}(r||(r={})),exports.EObstacleName=r;var s=[r.gem,r.illegal,r.graveyard,r.pitfall],n=function(){function t(a){e(this,t),this.name=a,this.x=-1,this.y=-1}return a(t,[{key:"update",value:function(){i.Updater.Instance.updateObstacle(this.name,this.x,this.y)}}]),t}();function l(e){return console.log("creating obstacle"),new n(e)}exports.Obstacle=n;var o=function(){function t(a,i){e(this,t),this.size=a,(void 0===i||i<0)&&(i=2*Math.floor(a/4)+1),this.m=new Array(this.size);for(var s=0;s<this.size;s++)this.m[s]=new Array(this.size);for(var n=0;n<a;n++)this.setM_(0,n,l(r.illegal)),this.setM_(n,0,l(r.illegal)),this.setM_(n,a-1,l(r.illegal)),this.setM_(a-1,n,l(r.illegal));for(var o=1;o<a-1;o++)this.setM_(1,o,l(r.graveyard)),this.setM_(o,1,l(r.graveyard)),this.setM_(o,a-2,l(r.graveyard)),this.setM_(a-2,o,l(r.graveyard));this.setM_(1,1,l(r.illegal)),this.setM_(1,a-2,l(r.illegal)),this.setM_(a-2,1,l(r.illegal)),this.setM_(a-2,a-2,l(r.illegal));for(var u=0;u<i;u++){var c=Math.floor(Math.random()*this.size),h=Math.floor(Math.random()*this.size);this.m[h][c]?u--:this.setM_(c,h,l(r.gem))}}return a(t,[{key:"setM_",value:function(e,t,a){a?(a.x=e,a.y=t,this.m[t][e]=a):delete this.m[t][e]}},{key:"unsetM_",value:function(e,t){delete this.m[t][e]}},{key:"incrementObstacleAt",value:function(e,t){var a;console.log("incrementing obstacle");var r=null===(a=this.m[t][e])||void 0===a?void 0:a.name;r||this.setM_(e,t,l(s[0]));var i=s.indexOf(r);i++,this.unsetM_(e,t),i!==s.length&&this.setM_(e,t,l(s[i]))}},{key:"isSettable",value:function(e,t,a){a=!!a;var i=this.m[t][e];switch(null==i?void 0:i.name){case void 0:return!0;case r.gem:return a;case r.illegal:case r.graveyard:return!1;case r.pitfall:return!0}return console.error("fallthrough case"),!1}},{key:"isPushable",value:function(e,t){var a;switch(null===(a=this.m[t][e])||void 0===a?void 0:a.name){case void 0:case r.gem:return!0;case r.illegal:return!1;case r.graveyard:case r.pitfall:return!0}return console.error("fallthrough case"),!1}},{key:"getGemsPos",value:function(){return this.m.flat().filter(function(e){return(null==e?void 0:e.name)==r.gem}).map(function(e){return[e.x,e.y]})}},{key:"numGems",value:function(){return this.getGemsPos().length}},{key:"gemAt",value:function(e,t){var a=this.m[t][e];return a&&a.name==r.gem}},{key:"update",value:function(){this.m.forEach(function(e){return e.forEach(function(e){return e?e.update():e})})}}]),t}();exports.Obstacles=o;
},{"./updater":"JsON"}],"JsON":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function i(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),Object.defineProperty(t,"prototype",{writable:!1}),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Updater=void 0;var a=require("./obstacles"),r=require("./util"),o=function(){function e(){t(this,e),this.colors=["black","white","maroon"],e._instance&&console.error("creating duplicate updater"),this.boardSize=1,this.canvas=document.createElement("canvas");var i=this.canvas.getContext("2d");if(!i)throw"CANVAS GETCONTEXT FAIL";this.ctx=i,document.body.insertBefore(this.canvas,document.body.childNodes[0]),this.updateWH()}return i(e,[{key:"updateBoardSize",value:function(t){this.boardSize=t}},{key:"updateWH",value:function(){var t=window.innerWidth,e=window.innerHeight,i=e+e/this.boardSize*3;t>=i?(this.canvas.height=e,this.canvas.width=i):(this.canvas.height=e,this.canvas.width=t)}},{key:"xToCoord",value:function(t,e){return t*e}},{key:"yToCoord",value:function(t,e){return t*e}},{key:"getCardWidth",value:function(){return Math.min(Math.ceil(this.canvas.width/(this.boardSize+3)),Math.ceil(this.canvas.height/this.boardSize))}},{key:"updateObstacle",value:function(t,e,i){var r=this.ctx,o=this.getCardWidth();switch(t){case a.EObstacleName.gem:var l=o/3,n=this.xToCoord(e,o)+o/2,s=this.yToCoord(i,o)+o/2;r.beginPath(),r.arc(n,s,l,0,2*Math.PI,!1),r.fillStyle="lavender",r.fill(),r.lineWidth=5,r.strokeStyle="#003300",r.stroke();break;case a.EObstacleName.illegal:r.fillStyle="grey",r.fillRect(this.xToCoord(e,o),this.yToCoord(i,o),o,o);break;case a.EObstacleName.graveyard:r.globalAlpha=.75,r.fillStyle="darkgreen",r.fillRect(this.xToCoord(e,o),this.yToCoord(i,o),o,o),r.globalAlpha=1;break;case a.EObstacleName.pitfall:r.globalAlpha=.5,r.fillStyle="brown",r.fillRect(this.xToCoord(e,o),this.yToCoord(i,o),o,o),r.globalAlpha=1}}},{key:"drawCardArrows",value:function(t,e,i,a){var o=this,l=i/5,n=i/5-2,s=this.ctx;s.fillStyle="black",[{d:"l",v:[t+2,e+l,n,i-2*l]},{d:"r",v:[t+i-n-2,e+l,n,i-2*l]},{d:"u",v:[t+l,e+2,i-2*l,n]},{d:"d",v:[t+l,e+i-n-2,i-2*l,n]}].forEach(function(t){if(t.d in a){var e=a[t.d];if(e.v>0){var i=o.colors[(0,r.clamp)(0,e.v-1,3)];s.fillStyle=i,s.fillRect(t.v[0],t.v[1],t.v[2],t.v[3])}}})}},{key:"updateCard",value:function(t,e,i){var a=this.ctx,r=this.getCardWidth();e*=r,i*=r,a.fillStyle=t.color,a.fillRect(e,i,r,r),a.fillStyle="black",t.stats?this.drawCardArrows(e,i,r,t.stats):console.warn("no stats")}},{key:"updateCursor",value:function(t,e,i){var a=this.ctx,r=this.getCardWidth();a.lineWidth=10,a.beginPath(),a.rect(this.xToCoord(e,r)+a.lineWidth/2,this.yToCoord(i,r)+a.lineWidth/2,r-a.lineWidth,r-a.lineWidth),a.stroke()}},{key:"updateGameController",value:function(t){var e=this.ctx;e.clearRect(0,0,this.canvas.width,this.canvas.height),e.fillStyle="green",e.fillRect(0,0,this.canvas.width,this.canvas.height)}},{key:"updateGame",value:function(t,e,i){var a=this.ctx;a.font="30px Arial",a.textAlign="center",a.fillStyle="black",a.fillText(String(e),this.xToCoord(this.boardSize+1,this.getCardWidth()),this.yToCoord(2,this.getCardWidth())),a.fillText(String(i),this.xToCoord(this.boardSize+1,this.getCardWidth()),this.yToCoord(this.boardSize-2,this.getCardWidth()))}},{key:"updateCardEditor",value:function(t){}},{key:"updateBoard",value:function(t){}}],[{key:"Instance",get:function(){return this._instance||(this._instance=new this)}}]),e}();exports.Updater=o;
},{"./obstacles":"kavB","./util":"BHXf"}],"kkSr":[function(require,module,exports) {
"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&r(t,e)}function r(t,e){return(r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function n(t){var e=i();return function(){var r,n=c(t);if(e){var u=c(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return o(this,r)}}function o(e,r){if(r&&("object"===t(r)||"function"==typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return u(e)}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function i(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function s(t,e,r){return e&&a(t.prototype,e),r&&a(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Rock=exports.Card=exports.statDirection=void 0;var l=require("./board"),p=require("./updater");function y(t,e){if(t){var r=(0,l.directionToStr)(e);return r in t?t[r]:void 0}}exports.statDirection=y;var v=function(){function t(e,r,n){f(this,t),this.color=e,this.name=r,this.stats=JSON.parse(JSON.stringify(n))}return s(t,[{key:"canPush",value:function(t){var e;return((null===(e=y(this.stats,t))||void 0===e?void 0:e.v)||0)>0}},{key:"canBePushed",value:function(t,e){var r;return((null===(r=y(this.stats,l.opposites[t]))||void 0===r?void 0:r.v)||0)<e}},{key:"update",value:function(t,e){p.Updater.Instance.updateCard(this,t,e)}},{key:"copy",value:function(){return new t(this.color,name,this.stats)}}]),t}();exports.Card=v;var b=function(t){e(o,v);var r=n(o);function o(){return f(this,o),r.call(this,"brown","rock",{})}return s(o,[{key:"canPush",value:function(t){return!1}},{key:"canBePushed",value:function(t,e){return!1}},{key:"copy",value:function(){return this.constructor()}}]),o}();exports.Rock=b;
},{"./board":"tQwi","./updater":"JsON"}],"BHXf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.clamp=void 0;var r=require("./card");function n(r,n,e){return n<r?r:n>e?e:n}exports.clamp=n;var e=function(n){return new r.Card(n,"Troupple Acolyte",{l:{v:1},r:{v:2},d:{v:1}})},t=function(n){return new r.Card(n,"Shield Knight",{l:{v:2,wind:!0},r:{v:2,wind:!0},u:{v:3,wind:!0}})},u=function(n,e){return new r.Card(n,"Propeller Rat",{u:{v:e||1}})},o=function(n,e){return new r.Card(n,"blitzsteed",{l:{v:e||1}})},i=function(n,e){return new r.Card(n,"blorb",{d:{v:e||1}})},d=function(n,e){return new r.Card(n,"beeto",{r:{v:e||1}})};function a(r){return btoa(JSON.stringify(r))}function c(r){return JSON.parse(atob(r))}
},{"./card":"kkSr"}],"tQwi":[function(require,module,exports) {
"use strict";var t,e,r;function n(t,e){return u(t)||s(t,e)||o(t,e)||i()}function i(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(t,e){if(t){if("string"==typeof t)return a(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(t,e):void 0}}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function s(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,i,o=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(o.push(n.value),!e||o.length!==e);a=!0);}catch(u){s=!0,i=u}finally{try{a||null==r.return||r.return()}finally{if(s)throw i}}return o}}function u(t){if(Array.isArray(t))return t}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function f(t,e,r){return e&&l(t.prototype,e),r&&l(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function h(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Board=exports.strToDirection=exports.directionToStr=exports.opposites=exports.EDirection=void 0;var d,v=require("./util"),p=require("./card"),b=require("./obstacles"),y=require("./updater");!function(t){t.None="NONE",t.Up="UP",t.Down="DOWN",t.Left="LEFT",t.Right="RIGHT"}(d||(d={})),exports.EDirection=d;var g=(h(t={},d.None,"X"),h(t,d.Up,"u"),h(t,d.Down,"d"),h(t,d.Left,"l"),h(t,d.Right,"r"),t),m=(h(e={},d.Up,d.Down),h(e,d.Down,d.Up),h(e,d.Right,d.Left),h(e,d.Left,d.Right),h(e,d.None,d.None),e);exports.opposites=m;var w=function(t){return g[t]};exports.directionToStr=w;var N=function(t){switch(t){case d.Up:return d.Up;case d.Down:return d.Down;case d.Left:return d.Left;case d.Right:return d.Right;default:throw"strToDirection invalid string: '"+t+"'"}};exports.strToDirection=N;var C=(h(r={},d.Up,[function(t){return t},function(t){return t-1}]),h(r,d.Down,[function(t){return t},function(t){return t+1}]),h(r,d.Left,[function(t){return t-1},function(t){return t}]),h(r,d.Right,[function(t){return t+1},function(t){return t}]),h(r,d.None,void 0),r),D=function(){function t(e){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];c(this,t),this.size=e,this.cardMap=new Array(this.size);for(var n=0;n<this.cardMap.length;n++)this.cardMap[n]=new Array(this.size);this.obstacles=r?new b.Obstacles(e,-1):void 0,this.gameover=!1}return f(t,[{key:"inBounds",value:function(t,e){return t>=0&&e>=0&&t<this.size&&e<this.size}},{key:"getCard",value:function(t,e){return!!this.inBounds(t,e)&&(this.cardMap[e][t]?this.cardMap[e][t]:void 0)}},{key:"canSet",value:function(t,e){return!this.obstacles||this.obstacles.isSettable(t,e,!1)}},{key:"setCard",value:function(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return!this.gameover&&(r||console.warn("NOTE: UNSETTING CARD",t,e),!!this.canSet(t,e)&&this.setCard_(t,e,r,n))}},{key:"setCard_",value:function(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return r||console.warn("NOTE: UNSETTING CARD",t,e),!!this.inBounds(t,e)&&(n||(this.cardMap[e][t]=r.copy()),!0)}},{key:"unsetCard",value:function(t,e){delete this.cardMap[e][t]}},{key:"push",value:function(t,e,r,i){var o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(this.gameover)return!1;if(r===d.None)return!1;var a=n(C[r],2),s=a[0],u=a[1],c=s(t),l=u(e);if(!this.inBounds(c,l))return!1;var f=this.getCard(t,e);if(f){if(!f.canBePushed(r,i))return!1;var h=this.getCard(c,l);if(this.obstacles&&!this.obstacles.isPushable(c,l))return!1;if(void 0!==h)if(!this.push(c,l,r,i,o))return!1;var v=this.setCard_(c,l,f,o);return o||delete this.cardMap[e][t],v}}},{key:"pushC",value:function(t,e,r,n){var i,o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(this.gameover)return!1;if(r!=d.None){if(this.obstacles&&!this.obstacles.isSettable(t,e,!0))return!1;var a=null===(i=(0,p.statDirection)(n.stats,r))||void 0===i?void 0:i.v;return!(!a||!this.push(t,e,r,a,o))&&this.setCard_(t,e,n,o)}return!(this.obstacles&&!this.obstacles.isSettable(t,e,!1)||this.getCard(t,e))&&this.setCard(t,e,n,o)}},{key:"changeObstacleAt",value:function(t,e){var r;null===(r=this.obstacles)||void 0===r||r.incrementObstacleAt(t,e)}},{key:"canBePlayed",value:function(t){for(var e=0;e<this.size;e++)for(var r=0;r<this.size;r++)for(var n=[d.None,d.Up,d.Down,d.Left,d.Right],i=0;i<n.length;i++)if(this.pushC(e,r,n[i],t,!0))return!0;return!1}},{key:"getScore",value:function(){var t,e=this,r=null===(t=this.obstacles)||void 0===t?void 0:t.getGemsPos();if(!r)return[0,0];var i=0,o=0;return r.map(function(t){var r=n(t,2),a=r[0],s=r[1],u=e.getCard(a,s);u&&("blue"==u.color&&i++,"red"==u.color&&o++)}),[i,o]}},{key:"checkWin",value:function(){if(this.obstacles){var t=n(this.getScore(),2),e=t[0],r=t[1];if(!(e+r<this.obstacles.numGems())){var i=(0,v.clamp)(-1,e-r,1);return console.log("WINNER WINNER CHICKEN DINNER",i),this.gameover=!0,i}}}},{key:"update",value:function(){var t;y.Updater.Instance.updateBoard(this);for(var e=0;e<y.Updater.Instance.boardSize;e++)for(var r=0;r<y.Updater.Instance.boardSize;r++){var n=this.getCard(e,r);n&&n.update&&n.update(e,r)}null===(t=this.obstacles)||void 0===t||t.update()}}]),t}();exports.Board=D;
},{"./util":"BHXf","./card":"kkSr","./obstacles":"kavB","./updater":"JsON"}],"AwRF":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var i=0;i<t.length;i++){var o=t[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function i(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Cursor=void 0;var o=require("./util"),r=require("./board"),s=require("./updater"),a=function(){function t(i,o){e(this,t),this.size=(null==i?void 0:i.boardSize())||0,this.game=i,this.ce=o,this.x=Math.floor(this.size/2),this.y=Math.floor(this.size/2),this.heldCard=void 0}return i(t,[{key:"move",value:function(e){switch(console.log("MOVE",e),e){case r.EDirection.Up:this.y-=1;break;case r.EDirection.Down:this.y+=1;break;case r.EDirection.Left:this.x-=1;break;case r.EDirection.Right:this.x+=1}this.x=(0,o.clamp)(0,this.x,this.size-1),this.y=(0,o.clamp)(0,this.y,this.size-1)}},{key:"holdCard",value:function(e){this.heldCard=e,console.log("HOLDING CARD",this.heldCard)}},{key:"pushHeldCard",value:function(e){var t,i;console.log("cursor push",this.x,this.y,e);var o=null===(t=this.game)||void 0===t?void 0:t.pushC(this.x,this.y,e,this.heldCard);if(console.log("PUSH RETURNED:",o),!o)return!1;this.heldCard=void 0;var r=null===(i=this.game)||void 0===i?void 0:i.board.checkWin();if(r){var s=document.getElementById(1==r?"p1score":"p2score");s&&(s.style.background="lavender")}return console.log("push success"),!0}},{key:"boardEdit",value:function(){var e;console.log("board edit made"),null===(e=this.game)||void 0===e||e.board.changeObstacleAt(this.x,this.y)}},{key:"update",value:function(){s.Updater.Instance.updateCursor(this,this.x,this.y)}}]),t}();exports.Cursor=a;
},{"./util":"BHXf","./board":"tQwi","./updater":"JsON"}],"gimR":[function(require,module,exports) {
"use strict";function t(t){return o(t)||n(t)||e(t)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function e(t,r){if(t){if("string"==typeof t)return a(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?a(t,r):void 0}}function n(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function o(t){if(Array.isArray(t))return a(t)}function a(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function u(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}function i(t,r){for(var e=0;e<r.length;e++){var n=r[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function c(t,r,e){return r&&i(t.prototype,r),e&&i(t,e),Object.defineProperty(t,"prototype",{writable:!1}),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.colorDeck=exports.Deck=void 0;var s=require("./card"),l=function(){function r(t){u(this,r),this.cs=[];for(var e=0;e<t.length;e++){var n=t[e];this.cs.push(n)}}return c(r,[{key:"shuffle",value:function(){this.cs.sort(function(){return Math.random()-.5})}},{key:"draw",value:function(){return this.cs.pop()}},{key:"size",value:function(){return this.cs.length}},{key:"empty",value:function(){return 0===this.cs.length}},{key:"copy",value:function(){return new r(t(this.cs))}}]),r}();exports.Deck=l;var f=function(t){return new s.Card(t,"Troupple Acolyte",{u:{v:Math.floor(4*Math.random())},l:{v:Math.floor(4*Math.random())},r:{v:Math.floor(4*Math.random())},d:{v:Math.floor(4*Math.random())}})};function h(t,r){for(var e=[],n=function(t){var n=f(r);Object.keys(n.stats).forEach(function(t){0==n.stats[t].v&&delete n.stats[t]}),4==Object.keys(n.stats).length&&delete n.stats["udlr"[Math.floor(4*Math.random())]],e.push(n)},o=0;o<t;o++)n();return new l(e)}exports.colorDeck=h;
},{"./card":"kkSr"}],"d6pW":[function(require,module,exports) {
"use strict";function t(t){return o(t)||n(t)||r(t)||e()}function e(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function r(t,e){if(t){if("string"==typeof t)return i(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(t,e):void 0}}function n(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function o(t){if(Array.isArray(t))return i(t)}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function u(t,e,r){return e&&a(t.prototype,e),r&&a(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Hand=exports.Player=void 0;var c=function(){function t(e){s(this,t),this.size=e,this.cs=new Array(e)}return u(t,[{key:"push",value:function(t,e){return!(t>=this.size)&&(console.log("set",t,e),console.log(this.cs),this.cs[t]=e,console.log(this.cs),!0)}},{key:"pop",value:function(t){if(t>=this.size)throw"`pop("+String(t)+") exceeds size "+String(this.size);var e=this.cs[t];return delete this.cs[t],e}},{key:"shift",value:function(){this.cs=this.cs.filter(function(t){return t})}}]),t}();exports.Hand=c;var l=function(){function e(t,r){s(this,e),console.log("PLAYER DECK",r),this.h=t,this.d=r}return u(e,[{key:"draw",value:function(t){if(console.log("drawing into handpos",t),this.d.size()>0){var e=this.d.draw();return!!e&&this.h.push(t,e)}return!1}},{key:"play",value:function(t){return!!this.h.pop(t)&&(this.d.size()>0?this.draw(t):(this.h.shift(),!0))}},{key:"handAt",value:function(t){return console.log("PLAYER HAND",this.h),this.h.cs[t]}},{key:"hand",value:function(){return t(this.h.cs)}}]),e}();exports.Player=l;
},{}],"rQ9f":[function(require,module,exports) {
"use strict";function t(r){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(r)}function r(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}function e(t,r){for(var e=0;e<r.length;e++){var o=r[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function o(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),Object.defineProperty(t,"prototype",{writable:!1}),t}function n(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),r&&i(t,r)}function i(t,r){return(i=Object.setPrototypeOf||function(t,r){return t.__proto__=r,t})(t,r)}function u(t){var r=c();return function(){var e,o=f(t);if(r){var n=f(this).constructor;e=Reflect.construct(o,arguments,n)}else e=o.apply(this,arguments);return a(this,e)}}function a(r,e){if(e&&("object"===t(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return s(r)}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function c(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.CardEditor=exports.CECursor=exports.CEBoard=void 0;var p=require("./board"),d=require("./cursor"),l=require("./updater"),h=require("./gameController"),y=function(t){n(i,p.Board);var e=u(i);function i(){return r(this,i),e.apply(this,arguments)}return o(i,[{key:"update",value:function(){for(var t=0;t<this.size;t++)for(var r=0;r<this.size;r++){var e=this.getCard(t,r);e&&e.update&&e.update(l.Updater.Instance.boardSize+r,t>0?l.Updater.Instance.boardSize-1:0)}}}]),i}();exports.CEBoard=y;var b=function(t){n(i,d.Cursor);var e=u(i);function i(){return r(this,i),e.apply(this,arguments)}return o(i,[{key:"update",value:function(){l.Updater.Instance.updateCursor(this,l.Updater.Instance.boardSize+this.y,this.x>0?l.Updater.Instance.boardSize-1:0)}}]),i}();exports.CECursor=b;var v=function(){function t(){r(this,t),this.i=0,this.j=0,this.cardWidth=100,this.board=new y(3,!1),this.cursor=new b(void 0,void 0),this.cursor.x=this.i,this.cursor.y=this.j}return o(t,[{key:"selectCard",value:function(t,r){this.i=t,this.j="blue"==r?0:2,this.cursor.x=this.j,this.cursor.y=this.i,console.log(this.board)}},{key:"update",value:function(){l.Updater.Instance.updateCardEditor(this);for(var t=h.gc.game.p1.hand(),r=h.gc.game.p2.hand(),e=0;e<3;e++)t[e]?this.board.setCard(0,e,t[e]):this.board.unsetCard(0,e),r[e]?this.board.setCard(2,e,r[e]):this.board.unsetCard(2,e);this.board.update(),this.cursor.update()}}]),t}();exports.CardEditor=v;
},{"./board":"tQwi","./cursor":"AwRF","./updater":"JsON","./gameController":"K7xD"}],"K7xD":[function(require,module,exports) {
"use strict";function r(r,n){return a(r)||o(r,n)||t(r,n)||e()}function e(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function t(r,e){if(r){if("string"==typeof r)return n(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?n(r,e):void 0}}function n(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function o(r,e){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var n,o,a=[],i=!0,u=!1;try{for(t=t.call(r);!(i=(n=t.next()).done)&&(a.push(n.value),!e||a.length!==e);i=!0);}catch(s){u=!0,o=s}finally{try{i||null==t.return||t.return()}finally{if(u)throw o}}return a}}function a(r){if(Array.isArray(r))return r}function i(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function u(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function s(r,e,t){return e&&u(r.prototype,e),t&&u(r,t),Object.defineProperty(r,"prototype",{writable:!1}),r}Object.defineProperty(exports,"__esModule",{value:!0}),exports.gc=exports.GameController=exports.Game=void 0;var c=require("./board"),l=require("./cursor"),d=require("./deck"),h=require("./card"),p=require("./player"),f=require("./updater"),b=require("./cardEditor"),y=function(){function e(r){var t=this;i(this,e),this.size=r,this.p1=new p.Player(new p.Hand(3),(0,d.colorDeck)(10,"blue")),this.p2=new p.Player(new p.Hand(3),(0,d.colorDeck)(10,"red"));for(var n=0;n<3;n++)this.p1.draw(n),this.p2.draw(n);this.board=new c.Board(r),this.boardSize=function(){return this.board.size},this.board.setCard(1,1,new h.Rock),console.log(this.board),this.push=function(r,e,n,o){return t.board.push(r,e,n,o,!1)},this.pushC=function(r,e,n,o){return t.board.pushC(r,e,n,o,!1)},this.canPush=function(r,e,n,o){return t.board.push(r,e,n,o,!0)},this.canPushC=function(r,e,n,o){return t.board.pushC(r,e,n,o,!0)},console.log("boardsize",this.boardSize())}return s(e,[{key:"update",value:function(){this.board.update();var e=r(this.board.getScore(),2),t=e[0],n=e[1];f.Updater.Instance.updateGame(this,t,n)}}]),e}();exports.Game=y;var m,v=function(){function r(e){i(this,r),this.ce=new b.CardEditor,this.interval=void 0,this.game=new y(e),this.cursor=new l.Cursor(this.game,this.ce),this.boardSize=function(){return this.game.boardSize()},this.frameNo=0,console.log("GAEM",this.game)}return s(r,[{key:"update",value:function(){var r;f.Updater.Instance.updateGameController(this),null===(r=this.ce)||void 0===r||r.update(),this.game.update(),this.cursor.update()}}]),r}();function g(r){return m.frameNo/r%1==0}exports.GameController=v,exports.gc=m;try{console.log("CREATE GLOBAL GAME CONTROLLER"),exports.gc=m=new v(8)}catch(w){console.warn("UNABLE TO CREATE CONTROLLER:",w)}
},{"./board":"tQwi","./cursor":"AwRF","./deck":"gimR","./card":"kkSr","./player":"d6pW","./updater":"JsON","./cardEditor":"rQ9f"}],"S2gp":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.cardTest=void 0;var t=require("./card"),e=require("./board");function r(){console.log("BEGIN TEST");for(var r=[{d:e.EDirection.Left,stats:{l:{v:1}},w:!0},{d:e.EDirection.Right,stats:{l:{v:1}},w:!1},{d:e.EDirection.Right,stats:{r:{v:2}},w:!0}],s=0;s<r.length;s++){var o=r[s],a=new t.Card("blue","test",o.stats).canPush(o.d);o.w!==a&&console.warn("canpush test fail: want:",o.w,"got:",a)}for(var d=[{p:{stats:{l:{v:1}},d:e.EDirection.Left,p:1},w:!0},{p:{stats:{l:{v:1}},d:e.EDirection.Right,p:1},w:!1},{p:{stats:{l:{v:1}},d:e.EDirection.Left,p:2},w:!0},{p:{stats:{l:{v:1}},d:e.EDirection.Right,p:2},w:!0},{p:{stats:{l:{v:1}},d:e.EDirection.Up,p:1},w:!0},{p:{stats:{l:{v:1}},d:e.EDirection.Down,p:1},w:!0},{p:{stats:{l:{v:1}},d:e.EDirection.Up,p:2},w:!0},{p:{stats:{l:{v:1}},d:e.EDirection.Down,p:2},w:!0},{p:{stats:{l:{v:1},u:{v:2}},d:e.EDirection.Left,p:1},w:!0},{p:{stats:{l:{v:1},u:{v:2}},d:e.EDirection.Right,p:1},w:!1},{p:{stats:{l:{v:1},u:{v:2}},d:e.EDirection.Up,p:1},w:!0},{p:{stats:{l:{v:1},u:{v:2}},d:e.EDirection.Down,p:1},w:!1},{p:{stats:{l:{v:1},r:{v:2},d:{v:1}},d:e.EDirection.Right,p:2},w:!0}],n=0;n<d.length;n++){var i=d[n],p=new t.Card("blue","test",i.p.stats).canBePushed(i.p.d,i.p.p);i.w!==p&&console.warn("canbepushed test fail: want:",i.w,"got:",p)}for(var l=[{p:{pusher:{l:{v:1}},pushed:{l:{v:2}},d:e.EDirection.Left},boardPoss:[{x:1,y:1,color:"blue"},{x:0,y:1,color:"red"}],w:!0},{p:{pusher:{l:{v:1},r:{v:3}},pushed:{l:{v:2},u:{v:2},d:{v:2}},d:e.EDirection.Right},boardPoss:[{x:1,y:1,color:"blue"},{x:2,y:1,color:"red"}],w:!0},{p:{pusher:{l:{v:1}},pushed:{l:{v:2},r:{v:1}},d:e.EDirection.Left},boardPoss:[{x:1,y:1,color:"red"}],w:!1}],c=0;c<l.length;c++){var v=l[c],w=new t.Card("blue","test1",v.p.pusher),u=new t.Card("red","test2",v.p.pushed),h=new e.Board(3,!1),D=h.setCard(1,1,u);D||console.error("regression test in setCard, returned",D);var E=h.pushC(1,1,v.p.d,w);E!==v.w&&console.warn("cardPush test",c,"fail: want:",v.w,"got:",E);for(var g=0;g<v.boardPoss.length;g++){var f=v.boardPoss[g],b=[f.x,f.y,f.color],x=b[0],P=b[1],C=b[2],y=h.getCard(x,P);y&&y.color==C||console.warn("board pos wrong")}}return console.log("TESTS DONE"),0}exports.cardTest=r;
},{"./card":"kkSr","./board":"tQwi"}],"ZCfc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),window.addEventListener("error",function(e){console.error(e)});var e=require("./gameController"),a=require("./board"),o=require("./updater");function r(){e.gc.interval=setInterval(n,20)}function n(){o.Updater.Instance.updateBoardSize(e.gc.boardSize()),o.Updater.Instance.updateWH(),e.gc.update()}r();var c=function(){var o=0,r=["blue","red"],n=[0,0],c=!1;return function(d){var s=0==o?e.gc.game.p1:e.gc.game.p2,t=e.gc.cursor,l=n[o];switch(d.key){case"ArrowUp":t.move(a.EDirection.Up);break;case"ArrowDown":t.move(a.EDirection.Down);break;case"ArrowLeft":t.move(a.EDirection.Left);break;case"ArrowRight":t.move(a.EDirection.Right);break;case"w":t.holdCard(s.handAt(l)),t.pushHeldCard(a.EDirection.Up)&&(console.log("playing card at hand pos:",l),s.play(l),o++);break;case"a":t.holdCard(s.handAt(l)),t.pushHeldCard(a.EDirection.Left)&&(console.log("playing card at hand pos:",l),s.play(l),o++);break;case"s":t.holdCard(s.handAt(l)),t.pushHeldCard(a.EDirection.Down)&&(console.log("playing card at hand pos:",l),s.play(l),o++);break;case"d":t.holdCard(s.handAt(l)),t.pushHeldCard(a.EDirection.Right)&&(console.log("playing card at hand pos:",l),s.play(l),o++);break;case" ":if(console.log("space bar pressed.  mapeditor set to:",c),c){console.log("editing board"),t.boardEdit();break}t.holdCard(s.handAt(l)),t.pushHeldCard(a.EDirection.None)&&(console.log("playing card at hand pos:",l),s.play(l),o++);break;case"m":c=!c,console.log("MAP EDITOR:",c);break;case"1":case"2":case"3":n[o]=Number(d.key)-1}o%=2,e.gc.ce.selectCard(n[o],r[o]),s=0==o?e.gc.game.p1:e.gc.game.p2,console.log("HAND:",s.h.cs),console.log("decksize:",s.d.size());var i=!1,g=s.hand();console.log("BEGIN CAN BE PLAYED CHECK");for(var p=0;p<g.length;p++){var h=g[p];if(e.gc.game.board.canBePlayed(h)){i=!0;break}}console.log("END CAN BE PLAYED CHECK"),i||console.log("no possible moves")}}();document.onkeydown=function(e){console.log(e),c(e)};var d=require("./regressionTest");(0,d.cardTest)();
},{"./gameController":"K7xD","./board":"tQwi","./updater":"JsON","./regressionTest":"S2gp"}]},{},["ZCfc"], null)
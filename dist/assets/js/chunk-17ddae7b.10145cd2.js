(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-17ddae7b"],{"12ea":function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tran-group"},[i("el-row",{attrs:{gutter:20}},[i("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[i("transition-group",{attrs:{name:"list-complete","leave-active-class":"animated"},on:{leave:t.leave}},t._l(t.conditions,(function(e,o){return i("el-col",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"item.show"}],key:e.id,staticClass:"list-complete-item",attrs:{span:6}},[i("div",{staticClass:"grid-content bg-purple"},[i("el-form-item",[t._v(" "+t._s(e.txt)+" "),o==t.conditions.length-1?i("button",{on:{click:t.shuffle}},[t._v("Shuffle")]):t._e()])],1)])})),1)],1)],1),i("div",{staticStyle:{border:"1px solid #000",height:"60px"}})],1)},s=[],n=i("d0fd"),a={name:"TranGroup",mixins:[Object(n["a"])()],data:function(){return{conditions:[{id:"1",show:!0,txt:"条件1"},{id:"2",show:!0,txt:"条件2"},{id:"3",show:!0,txt:"条件3"},{id:"4",show:!0,txt:"条件4"},{id:"5",show:!0,txt:"条件5"},{id:"6",show:!0,txt:"条件6"},{id:"7",show:!0,txt:"条件7"}],form:{name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""}}},methods:{shuffle:function(){this.conditions.map((function(t,e,i){(e>2||e+1===i.length)&&(t.show=!t.show)}))},leave:function(){this.conditions[this.conditions.length-1].show=!this.conditions[this.conditions.length-1].show}}},c=a,r=(i("1f29"),i("2877")),l=Object(r["a"])(c,o,s,!1,null,"11d9ae5f",null);e["default"]=l.exports},"1f29":function(t,e,i){"use strict";var o=i("822c"),s=i.n(o);s.a},"822c":function(t,e,i){}}]);
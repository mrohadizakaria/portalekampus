(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-663b3b82"],{1681:function(t,a,e){},"2c64":function(t,a,e){},"3d86":function(t,a,e){},"43a6":function(t,a,e){"use strict";e("a9e3");var i=e("5530"),n=(e("ec29"),e("3d86"),e("c37a")),s=e("604c"),r=e("8547"),o=e("58df"),l=Object(o["a"])(r["a"],s["a"],n["a"]);a["a"]=l.extend({name:"v-radio-group",provide:function(){return{radioGroup:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},name:String,row:Boolean,value:null},computed:{classes:function(){return Object(i["a"])({},n["a"].options.computed.classes.call(this),{"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row})}},methods:{genDefaultSlot:function(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{id:this.id,role:"radiogroup","aria-labelledby":this.computedId}},n["a"].options.methods.genDefaultSlot.call(this))},genInputSlot:function(){var t=n["a"].options.methods.genInputSlot.call(this);return delete t.data.on.click,t},genLabel:function(){var t=n["a"].options.methods.genLabel.call(this);return t?(t.data.attrs.id=this.computedId,delete t.data.attrs.for,t.tag="legend",t):null},onClick:s["a"].options.methods.onClick}})},"4bd4":function(t,a,e){"use strict";e("4de4"),e("7db0"),e("4160"),e("caad"),e("07ac"),e("2532"),e("159b");var i=e("5530"),n=e("58df"),s=e("7e2b"),r=e("3206");a["a"]=Object(n["a"])(s["a"],Object(r["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var a=Object.values(t).includes(!0);this.$emit("input",!a)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var a=this,e=function(t){return t.$watch("hasError",(function(e){a.$set(a.errorBag,t._uid,e)}),{immediate:!0})},i={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",(function(n){n&&(a.errorBag.hasOwnProperty(t._uid)||(i.valid=e(t)))})):i.valid=e(t),i},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var a=this.inputs.find((function(a){return a._uid===t._uid}));if(a){var e=this.watchers.find((function(t){return t._uid===a._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==a._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==a._uid})),this.$delete(this.errorBag,a._uid)}}},render:function(t){var a=this;return t("form",{staticClass:"v-form",attrs:Object(i["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return a.$emit("submit",t)}}},this.$slots.default)}})},5311:function(t,a,e){"use strict";var i=e("5607"),n=e("2b0e");a["a"]=n["a"].extend({name:"rippleable",directives:{ripple:i["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),t.on=Object.assign({click:this.onChange},this.$listeners),this.$createElement("div",t)):null},onChange:function(){}}})},6220:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("SPMBLayout",{scopedSlots:t._u([{key:"filtersidebar",fn:function(){return[e("Filter19",{ref:"filter19",on:{changeTahunPendaftaran:t.changeTahunPendaftaran,changeSemesterPendaftaran:t.changeSemesterPendaftaran}})]},proxy:!0}])},[e("ModuleHeader",{scopedSlots:t._u([{key:"icon",fn:function(){return[t._v(" mdi-head-question-outline ")]},proxy:!0},{key:"name",fn:function(){return[t._v(" SOAL PMB ")]},proxy:!0},{key:"subtitle",fn:function(){return[t._v(" TAHUN PENDAFTARAN "+t._s(t.tahun_pendaftaran)+" - "+t._s(t.nama_semester_pendaftaran)+" ")]},proxy:!0},{key:"breadcrumbs",fn:function(){return[e("v-breadcrumbs",{staticClass:"pa-0",attrs:{items:t.breadcrumbs},scopedSlots:t._u([{key:"divider",fn:function(){return[e("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})]},proxy:!0},{key:"desc",fn:function(){return[e("v-alert",{attrs:{color:"cyan",border:"left","colored-border":"",type:"info"}},[t._v(" Berisi Soal PMB yang dikelompokan berdasarkan tahun akademik dan semester. ")])]},proxy:!0}])}),e("v-container",[e("v-row",{staticClass:"mb-4",attrs:{"no-gutters":""}},[e("v-col",{attrs:{cols:"12"}},[e("v-card",[e("v-card-text",[e("v-text-field",{attrs:{"append-icon":"mdi-database-search",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}})],1)],1)],1)],1),e("v-row",{staticClass:"mb-4",attrs:{"no-gutters":""}},[e("v-col",{attrs:{cols:"12"}},[e("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.datatable,search:t.search,"item-key":"id","sort-by":"name","show-expand":"",expanded:t.expanded,"single-expand":!0,loading:t.datatableLoading,"loading-text":"Loading... Please wait"},on:{"update:expanded":function(a){t.expanded=a},"click:row":t.dataTableRowClicked},scopedSlots:t._u([{key:"top",fn:function(){return[e("v-toolbar",{attrs:{flat:"",color:"white"}},[e("v-toolbar-title",[t._v("DAFTAR SOAL PMB")]),e("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e("v-spacer"),e("v-dialog",{attrs:{"max-width":"700px",persistent:""},scopedSlots:t._u([{key:"activator",fn:function(a){var i=a.on;return[e("v-btn",t._g({staticClass:"mb-2",attrs:{color:"primary",dark:""}},i),[t._v("TAMBAH")])]}}]),model:{value:t.dialogfrm,callback:function(a){t.dialogfrm=a},expression:"dialogfrm"}},[e("v-form",{ref:"frmdata",attrs:{"lazy-validation":""},model:{value:t.form_valid,callback:function(a){t.form_valid=a},expression:"form_valid"}},[e("v-card",[e("v-card-title",[e("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),e("v-card-text",[e("v-textarea",{attrs:{label:"SOAL",rules:t.rule_soal,type:"text",outlined:""},model:{value:t.formdata.soal,callback:function(a){t.$set(t.formdata,"soal",a)},expression:"formdata.soal"}}),e("v-divider",{staticClass:"mt-2"}),e("h3",{staticClass:"headline mt-2"},[t._v("Jawaban Ke-1:")]),e("v-text-field",{attrs:{label:"ISI JAWABAN",rules:t.rule_jawaban,outlined:""},model:{value:t.formdata.jawaban1,callback:function(a){t.$set(t.formdata,"jawaban1",a)},expression:"formdata.jawaban1"}}),e("v-divider",{staticClass:"mt-2"}),e("h3",{staticClass:"headline mt-2"},[t._v("Jawaban Ke-2:")]),e("v-text-field",{attrs:{label:"ISI JAWABAN",rules:t.rule_jawaban,outlined:""},model:{value:t.formdata.jawaban2,callback:function(a){t.$set(t.formdata,"jawaban2",a)},expression:"formdata.jawaban2"}}),e("v-divider",{staticClass:"mt-2"}),e("h3",{staticClass:"headline mt-2"},[t._v("Jawaban Ke-3:")]),e("v-text-field",{attrs:{label:"ISI JAWABAN",rules:t.rule_jawaban,outlined:""},model:{value:t.formdata.jawaban3,callback:function(a){t.$set(t.formdata,"jawaban3",a)},expression:"formdata.jawaban3"}}),e("v-divider",{staticClass:"mt-2"}),e("h3",{staticClass:"headline mt-2"},[t._v("Jawaban Ke-4:")]),e("v-text-field",{attrs:{label:"ISI JAWABAN",rules:t.rule_jawaban,outlined:""},model:{value:t.formdata.jawaban4,callback:function(a){t.$set(t.formdata,"jawaban4",a)},expression:"formdata.jawaban4"}}),e("v-divider",{staticClass:"mt-2"}),e("h3",{staticClass:"headline mt-2 blue--text lighten-4"},[t._v("Jawaban Benar:")]),e("v-select",{attrs:{items:t.daftar_jawaban,"item-value":"id","item-text":"text",label:"JAWABAN BENAR",outlined:""},model:{value:t.formdata.jawaban_benar,callback:function(a){t.$set(t.formdata,"jawaban_benar",a)},expression:"formdata.jawaban_benar"}})],1),e("v-card-actions",[e("v-spacer"),e("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(a){return a.stopPropagation(),t.closedialogfrm(a)}}},[t._v("BATAL")]),e("v-btn",{attrs:{color:"blue darken-1",text:"",loading:t.btnLoading,disabled:!t.form_valid||t.btnLoading},on:{click:function(a){return a.stopPropagation(),t.save(a)}}},[t._v(" SIMPAN ")])],1)],1)],1)],1),e("v-dialog",{attrs:{"max-width":"700px",persistent:""},model:{value:t.dialogeditfrm,callback:function(a){t.dialogeditfrm=a},expression:"dialogeditfrm"}},[e("v-form",{ref:"frmdata",attrs:{"lazy-validation":""},model:{value:t.form_valid,callback:function(a){t.form_valid=a},expression:"form_valid"}},[e("v-card",[e("v-card-title",[e("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),e("v-card-text",[e("v-textarea",{attrs:{label:"SOAL",rules:t.rule_soal,type:"text",outlined:""},model:{value:t.formdata.soal,callback:function(a){t.$set(t.formdata,"soal",a)},expression:"formdata.soal"}}),e("v-divider",{staticClass:"mt-2"}),e("v-radio-group",{model:{value:t.formdata.jawaban_benar,callback:function(a){t.$set(t.formdata,"jawaban_benar",a)},expression:"formdata.jawaban_benar"}},[e("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers_detail,items:t.daftar_soal_jawaban,search:t.search,"item-key":"id","sort-by":"jawaban","hide-default-footer":""},scopedSlots:t._u([{key:"item.status",fn:function(t){var a=t.item;return[e("v-radio",{attrs:{value:a.id}})]}}])})],1)],1),e("v-card-actions",[e("v-spacer"),e("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(a){return a.stopPropagation(),t.closedialogeditfrm(a)}}},[t._v("BATAL")]),e("v-btn",{attrs:{color:"blue darken-1",text:"",loading:t.btnLoading,disabled:!t.form_valid||t.btnLoading},on:{click:function(a){return a.stopPropagation(),t.save(a)}}},[t._v(" SIMPAN ")])],1)],1)],1)],1),e("v-dialog",{attrs:{"max-width":"700px",persistent:""},model:{value:t.dialogdetailitem,callback:function(a){t.dialogdetailitem=a},expression:"dialogdetailitem"}},[e("v-card",[e("v-card-title",[e("span",{staticClass:"headline"},[t._v("DETAIL DATA")])]),e("v-card-text",[e("v-row",{attrs:{"no-gutters":""}},[e("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[e("v-card",{attrs:{flat:""}},[e("v-card-title",[t._v("ID :")]),e("v-card-subtitle",[t._v(" "+t._s(t.formdata.id)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?e("v-responsive",{attrs:{width:"100%"}}):t._e(),e("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[e("v-card",{attrs:{flat:""}},[e("v-card-title",[t._v("CREATED :")]),e("v-card-subtitle",[t._v(" "+t._s(t.$date(t.formdata.created_at).format("DD/MM/YYYY HH:mm"))+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?e("v-responsive",{attrs:{width:"100%"}}):t._e()],1),e("v-row",{staticClass:"mb-4",attrs:{"no-gutters":""}},[e("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[e("v-card",{attrs:{flat:""}},[e("v-card-title",[t._v("SOAL :")]),e("v-card-subtitle",[t._v(" "+t._s(t.formdata.soal)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?e("v-responsive",{attrs:{width:"100%"}}):t._e(),e("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[e("v-card",{attrs:{flat:""}},[e("v-card-title",[t._v("UPDATED :")]),e("v-card-subtitle",[t._v(" "+t._s(t.$date(t.formdata.updated_at).format("DD/MM/YYYY HH:mm"))+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?e("v-responsive",{attrs:{width:"100%"}}):t._e()],1),e("v-row",{staticClass:"mb-4",attrs:{"no-gutters":""}},[e("v-col",{attrs:{col:"12"}},[e("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers_detail,items:t.daftar_soal_jawaban,search:t.search,"item-key":"id","sort-by":"jawaban","hide-default-footer":""},scopedSlots:t._u([{key:"item.status",fn:function(a){var i=a.item;return[e("v-icon",[t._v(" "+t._s(1==i.status?"mdi-check-bold":"mdi-close-thick")+" ")])]}}])})],1)],1)],1),e("v-card-actions",[e("v-spacer"),e("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(a){return a.stopPropagation(),t.closedialogdetailitem(a)}}},[t._v("KELUAR")])],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(a){var i=a.item;return[e("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(a){return a.stopPropagation(),t.viewItem(i)}}},[t._v(" mdi-eye ")]),e("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(a){return a.stopPropagation(),t.editItem(i)}}},[t._v(" mdi-pencil ")]),e("v-icon",{attrs:{small:"",loading:t.btnLoading,disabled:t.btnLoading},on:{click:function(a){return a.stopPropagation(),t.deleteItem(i)}}},[t._v(" mdi-delete ")])]}},{key:"expanded-item",fn:function(a){var i=a.headers,n=a.item;return[e("td",{staticClass:"text-center",attrs:{colspan:i.length}},[e("v-col",{attrs:{cols:"12"}},[e("strong",[t._v("ID:")]),t._v(t._s(n.id)+" "),e("strong",[t._v("created_at:")]),t._v(t._s(t.$date(n.created_at).format("DD/MM/YYYY HH:mm"))+" "),e("strong",[t._v("updated_at:")]),t._v(t._s(t.$date(n.updated_at).format("DD/MM/YYYY HH:mm"))+" ")])],1)]}},{key:"no-data",fn:function(){return[t._v(" Data belum tersedia ")]},proxy:!0}])})],1)],1)],1)],1)},n=[],s=(e("4160"),e("c975"),e("a434"),e("159b"),e("96cf"),e("1da1")),r=e("684f"),o=e("e477"),l=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-list-item",[e("v-list-item-content",[e("v-select",{attrs:{items:t.daftar_ta,"item-text":"tahun_akademik","item-value":"tahun",label:"TAHUN PENDAFTARAN",outlined:""},model:{value:t.tahun_pendaftaran,callback:function(a){t.tahun_pendaftaran=a},expression:"tahun_pendaftaran"}}),e("v-select",{attrs:{items:t.daftar_semester,"item-text":"text","item-value":"id",label:"SEMESTER PENDAFTARAN",outlined:""},model:{value:t.semester_pendaftaran,callback:function(a){t.semester_pendaftaran=a},expression:"semester_pendaftaran"}})],1)],1)},d=[],u={name:"FilterMode19",created:function(){this.daftar_ta=this.$store.getters["uiadmin/getDaftarTA"],this.tahun_pendaftaran=this.$store.getters["uiadmin/getTahunPendaftaran"],this.daftar_semester=this.$store.getters["uiadmin/getDaftarSemester"],this.semester_pendaftaran=this.$store.getters["uiadmin/getSemesterPendaftaran"]},data:function(){return{firstloading:!0,daftar_semester:[],semester_pendaftaran:null,daftar_ta:[],tahun_pendaftaran:null}},methods:{setFirstTimeLoading:function(t){this.firstloading=t}},watch:{tahun_pendaftaran:function(t){this.firstloading||(this.$store.dispatch("uiadmin/updateTahunPendaftaran",t),this.$emit("changeTahunPendaftaran",t))},semester_pendaftaran:function(t){this.firstloading||(this.$store.dispatch("uiadmin/updateSemesterPendaftaran",t),this.$emit("changeSemesterPendaftaran",t))}}},c=u,h=e("2877"),m=e("6544"),f=e.n(m),v=e("da13"),p=e("5d23"),b=e("b974"),g=Object(h["a"])(c,l,d,!1,null,null,null),_=g.exports;f()(g,{VListItem:v["a"],VListItemContent:p["a"],VSelect:b["a"]});var A={name:"SoalPMB",created:function(){this.breadcrumbs=[{text:"HOME",disabled:!1,href:"/dashboard/"+this.$store.getters["auth/AccessToken"]},{text:"SPMB",disabled:!1,href:"/spmb"},{text:"SOAL PMB",disabled:!0,href:"#"}],this.tahun_pendaftaran=this.$store.getters["uiadmin/getTahunPendaftaran"],this.semester_pendaftaran=this.$store.getters["uiadmin/getSemesterPendaftaran"],this.nama_semester_pendaftaran=this.$store.getters["uiadmin/getNamaSemester"](this.semester_pendaftaran),this.initialize()},data:function(){return{firstloading:!0,prodi_id:null,nama_prodi:null,tahun_pendaftaran:null,semester_pendaftaran:null,nama_semester_pendaftaran:null,btnLoading:!1,datatableLoading:!1,expanded:[],datatable:[],headers:[{text:"NAMA SOAL",value:"soal"},{text:"AKSI",value:"actions",sortable:!1,width:100}],headers_detail:[{text:"JAWABAN",value:"jawaban",sortable:!1},{text:"KET.",value:"status",sortable:!1,width:100}],search:"",dialogfrm:!1,dialogdetailitem:!1,dialogeditfrm:!1,daftar_soal_jawaban:[],form_valid:!0,image_prev:null,daftar_jawaban:[{id:1,text:"JAWABAN KE 1"},{id:2,text:"JAWABAN KE 2"},{id:3,text:"JAWABAN KE 3"},{id:4,text:"JAWABAN KE 4"}],formdata:{id:0,soal:"",gambar:"",jawaban1:"",jawaban2:"",jawaban3:"",jawaban4:"",jawaban_benar:"",created_at:"",updated_at:""},formdefault:{id:0,soal:"",gambar:"",jawaban1:"",jawaban2:"",jawaban3:"",jawaban4:"",jawaban_benar:"",created_at:"",updated_at:""},editedIndex:-1,rule_soal:[function(t){return!!t||"Mohon untuk di isi soal !!!"}],rule_gambar:[function(t){return!t||t.size<2e6||"File gambar harus kurang dari 2MB."}],rule_jawaban:[function(t){return!!t||"Mohon isi jawaban dari soal ini"}],rule_jawaban_benar:[function(t){return!!t||"Mohon pilih jawaban benar dari soal ini"}]}},methods:{changeTahunPendaftaran:function(t){this.tahun_pendaftaran=t},changeSemesterPendaftaran:function(t){this.semester_pendaftaran=t},initialize:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.datatableLoading=!0,t.next=3,this.$ajax.post("/spmb/soalpmb",{tahun_pendaftaran:this.tahun_pendaftaran,semester_pendaftaran:this.semester_pendaftaran},{headers:{Authorization:this.$store.getters["auth/Token"]}}).then((function(t){var e=t.data;a.datatable=e.soal,a.datatableLoading=!1})).catch((function(){a.datatableLoading=!1}));case 3:this.firstloading=!1,this.$refs.filter19.setFirstTimeLoading(this.firstloading);case 5:case"end":return t.stop()}}),t,this)})));function a(){return t.apply(this,arguments)}return a}(),dataTableRowClicked:function(t){t===this.expanded[0]?this.expanded=[]:this.expanded=[t]},viewItem:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$ajax.get("/spmb/soalpmb/"+a.id,{headers:{Authorization:this.$store.getters["auth/Token"]}}).then((function(t){var i=t.data;e.formdata=a,e.dialogdetailitem=!0,e.daftar_soal_jawaban=i.soal.jawaban}));case 2:case"end":return t.stop()}}),t,this)})));function a(a){return t.apply(this,arguments)}return a}(),editItem:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$ajax.get("/spmb/soalpmb/"+a.id,{headers:{Authorization:this.$store.getters["auth/Token"]}}).then((function(t){var i=t.data;e.editedIndex=e.datatable.indexOf(a),e.formdata=Object.assign({},a),e.dialogeditfrm=!0;var n="";i.soal.jawaban.forEach((function(t){1==t.status&&(n=t.id)})),e.formdata.jawaban_benar=n,e.daftar_soal_jawaban=i.soal.jawaban}));case 2:case"end":return t.stop()}}),t,this)})));function a(a){return t.apply(this,arguments)}return a}(),previewImage:function(t){var a=this;if("undefined"===typeof t)this.image_prev=null;else{var e=new FileReader;e.readAsDataURL(t),e.onload=function(t){a.image_prev=t.target.result}}},save:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.$refs.frmdata.validate()){t.next=9;break}if(this.btnLoading=!0,!(this.editedIndex>-1)){t.next=7;break}return t.next=5,this.$ajax.post("/spmb/soalpmb/"+this.formdata.id,{_method:"PUT",soal:this.formdata.soal,jawaban_benar:this.formdata.jawaban_benar},{headers:{Authorization:this.$store.getters["auth/Token"]}}).then((function(t){var e=t.data;Object.assign(a.datatable[a.editedIndex],e.soal),a.closedialogeditfrm(),a.btnLoading=!1})).catch((function(){a.btnLoading=!1}));case 5:t.next=9;break;case 7:return t.next=9,this.$ajax.post("/spmb/soalpmb/store",{soal:this.formdata.soal,gambar:"gambar",jawaban1:this.formdata.jawaban1,jawaban2:this.formdata.jawaban2,jawaban3:this.formdata.jawaban3,jawaban4:this.formdata.jawaban4,jawaban_benar:this.formdata.jawaban_benar,tahun_pendaftaran:this.tahun_pendaftaran,semester_pendaftaran:this.semester_pendaftaran},{headers:{Authorization:this.$store.getters["auth/Token"]}}).then((function(t){var e=t.data;a.datatable.push(e.soal),a.closedialogfrm(),a.btnLoading=!1})).catch((function(){a.btnLoading=!1}));case 9:case"end":return t.stop()}}),t,this)})));function a(){return t.apply(this,arguments)}return a}(),deleteItem:function(t){var a=this;this.$root.$confirm.open("Delete","Apakah Anda ingin menghapus data dengan ID "+t.id+" ?",{color:"red"}).then((function(e){e&&(a.btnLoading=!0,a.$ajax.post("/spmb/soalpmb/"+t.id,{_method:"DELETE"},{headers:{Authorization:a.$store.getters["auth/Token"]}}).then((function(){var e=a.datatable.indexOf(t);a.datatable.splice(e,1),a.btnLoading=!1})).catch((function(){a.btnLoading=!1})))}))},closedialogdetailitem:function(){var t=this;this.dialogdetailitem=!1,this.daftar_soal_jawaban=[],setTimeout((function(){t.formdata=Object.assign({},t.formdefault),t.editedIndex=-1}),300)},closedialogfrm:function(){var t=this;this.dialogfrm=!1,setTimeout((function(){t.formdata=Object.assign({},t.formdefault),t.$refs.frmdata.reset(),t.editedIndex=-1}),300)},closedialogeditfrm:function(){var t=this;this.dialogeditfrm=!1,setTimeout((function(){t.formdata=Object.assign({},t.formdefault),t.$refs.frmdata.reset(),t.editedIndex=-1}),300)}},computed:{gambarSoal:{get:function(){return null==this.image_prev?e("bd21"):this.image_prev},set:function(t){this.image_prev=t}},formTitle:function(){return-1===this.editedIndex?"TAMBAH DATA":"UBAH DATA"}},watch:{tahun_pendaftaran:function(){this.firstloading||this.initialize()},semester_pendaftaran:function(t){this.firstloading||(this.nama_semester_pendaftaran=this.$store.getters["uiadmin/getNamaSemester"](t),this.initialize())},prodi_id:function(t){this.firstloading||(this.nama_prodi=this.$store.getters["uiadmin/getProdiName"](t),this.initialize())}},components:{SPMBLayout:r["a"],ModuleHeader:o["a"],Filter19:_}},w=A,x=e("0798"),S=e("2bc5"),C=e("8336"),k=e("b0af"),T=e("99d9"),j=e("62ad"),y=e("a523"),B=e("8fea"),I=e("169a"),P=e("ce7e"),$=e("4bd4"),E=e("132d"),R=e("67b6"),V=e("43a6"),O=e("6b53"),L=e("0fd9"),N=e("2fa4"),M=e("8654"),D=(e("a9e3"),e("5530")),U=(e("1681"),e("58df")),F=Object(U["a"])(M["a"]),H=F.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(D["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},M["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var a=t.scrollHeight,e=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(e,a)+"px"}},genInput:function(){var t=M["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){M["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}}),z=e("71d9"),J=e("2a7f"),G=Object(h["a"])(w,i,n,!1,null,null,null);a["default"]=G.exports;f()(G,{VAlert:x["a"],VBreadcrumbs:S["a"],VBtn:C["a"],VCard:k["a"],VCardActions:T["a"],VCardSubtitle:T["b"],VCardText:T["c"],VCardTitle:T["d"],VCol:j["a"],VContainer:y["a"],VDataTable:B["a"],VDialog:I["a"],VDivider:P["a"],VForm:$["a"],VIcon:E["a"],VRadio:R["a"],VRadioGroup:V["a"],VResponsive:O["a"],VRow:L["a"],VSelect:b["a"],VSpacer:N["a"],VTextField:M["a"],VTextarea:H,VToolbar:z["a"],VToolbarTitle:J["a"]})},"67b6":function(t,a,e){"use strict";e("b0c0");var i=e("5530"),n=(e("2c64"),e("ba87")),s=e("9d26"),r=e("c37a"),o=e("7e2b"),l=e("a9ad"),d=e("4e82"),u=e("5311"),c=e("7560"),h=e("fe09"),m=e("80d2"),f=e("58df"),v=Object(f["a"])(o["a"],l["a"],u["a"],Object(d["a"])("radioGroup"),c["a"]);a["a"]=v.extend().extend({name:"v-radio",inheritAttrs:!1,props:{disabled:Boolean,id:String,label:String,name:String,offIcon:{type:String,default:"$radioOff"},onIcon:{type:String,default:"$radioOn"},readonly:Boolean,value:{default:null}},data:function(){return{isFocused:!1}},computed:{classes:function(){return Object(i["a"])({"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused},this.themeClasses,{},this.groupClasses)},computedColor:function(){return h["a"].options.computed.computedColor.call(this)},computedIcon:function(){return this.isActive?this.onIcon:this.offIcon},computedId:function(){return r["a"].options.computed.computedId.call(this)},hasLabel:r["a"].options.computed.hasLabel,hasState:function(){return(this.radioGroup||{}).hasState},isDisabled:function(){return this.disabled||!!this.radioGroup&&this.radioGroup.isDisabled},isReadonly:function(){return this.readonly||!!this.radioGroup&&this.radioGroup.isReadonly},computedName:function(){return this.name||!this.radioGroup?this.name:this.radioGroup.name||"radio-".concat(this.radioGroup._uid)},rippleState:function(){return h["a"].options.computed.rippleState.call(this)},validationState:function(){return(this.radioGroup||{}).validationState||this.computedColor}},methods:{genInput:function(t){return h["a"].options.methods.genInput.call(this,"radio",t)},genLabel:function(){var t=this;return this.hasLabel?this.$createElement(n["a"],{on:{click:function(a){a.preventDefault(),t.onChange()}},attrs:{for:this.computedId},props:{color:this.validationState,focused:this.hasState}},Object(m["s"])(this,"label")||this.label):null},genRadio:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(s["a"],this.setTextColor(this.validationState,{props:{dense:this.radioGroup&&this.radioGroup.dense}}),this.computedIcon),this.genInput(Object(i["a"])({name:this.computedName,value:this.value},this.attrs$)),this.genRipple(this.setTextColor(this.rippleState))])},onFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},onBlur:function(t){this.isFocused=!1,this.$emit("blur",t)},onChange:function(){this.isDisabled||this.isReadonly||this.isActive||this.toggle()},onKeydown:function(){}},render:function(t){var a={staticClass:"v-radio",class:this.classes};return t("div",a,[this.genRadio(),this.genLabel()])}})},"684f":function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("v-system-bar",{staticClass:"brown darken-2 white--text",attrs:{app:"",dark:""}}),e("v-app-bar",{attrs:{app:""}},[e("v-app-bar-nav-icon",{staticClass:"grey--text",on:{click:function(a){a.stopPropagation(),t.drawer=!t.drawer}}}),e("v-toolbar-title",{staticClass:"headline clickable",on:{click:function(a){a.stopPropagation(),t.$router.push("/dashboard/"+t.$store.getters["auth/AccessToken"]).catch((function(t){}))}}},[e("span",{staticClass:"hidden-sm-and-down"},[t._v(t._s(t.APP_NAME))])]),e("v-spacer"),e("v-menu",{attrs:{"close-on-content-click":!0,origin:"center center",transition:"scale-transition","offset-y":!0,bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(a){var i=a.on;return[e("v-avatar",{attrs:{size:"30"}},[e("v-img",t._g({attrs:{src:t.photoUser}},i))],1)]}}])},[e("v-list",[e("v-list-item",[e("v-list-item-avatar",[e("v-img",{attrs:{src:t.photoUser}})],1),e("v-list-item-content",[e("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),e("v-list-item-subtitle",[t._v(" "+t._s(t.ROLE)+" ")])],1)],1),e("v-divider"),e("v-list-item",{attrs:{to:"/system-users/profil"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account")])],1),e("v-list-item-title",[t._v("Profil")])],1),e("v-divider"),e("v-list-item",{on:{click:function(a){return a.preventDefault(),t.logout(a)}}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-power")])],1),e("v-list-item-title",[t._v("Logout")])],1)],1)],1),e("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e("v-app-bar-nav-icon",{on:{click:function(a){a.stopPropagation(),t.drawerRight=!t.drawerRight}}},[e("v-icon",[t._v("mdi-menu-open")])],1)],1),e("v-navigation-drawer",{staticClass:"brown darken-4",attrs:{width:"300",dark:"",temporary:t.isReportPage,app:""},model:{value:t.drawer,callback:function(a){t.drawer=a},expression:"drawer"}},[e("v-list-item",[e("v-list-item-avatar",[e("v-img",{attrs:{src:t.photoUser},on:{click:function(a){return a.stopPropagation(),t.toProfile(a)}}})],1),e("v-list-item-content",[e("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),e("v-list-item-subtitle",[t._v(" "+t._s(t.ROLE)+" ")])],1)],1),e("v-divider"),e("v-list",{attrs:{expand:""}},[t.CAN_ACCESS("SPMB-GROUP")&&"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?e("v-list-item",{attrs:{to:{path:"/spmb"},link:"",color:"deep-orange darken-1"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-monitor-dashboard")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v("MODULE SPMB")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-SOAL_BROWSE")?e("v-list-item",{attrs:{link:"",to:"/spmb/soalpmb"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-head-question-outline")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" SOAL PMB ")])],1)],1):t._e(),e("v-subheader",[t._v("DATA MHS. BARU")]),t.CAN_ACCESS("SPMB-PMB_BROWSE")?e("v-list-item",{attrs:{link:"",to:"/spmb/pendaftaranbaru"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account-plus")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" PENDAFTAR ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-FORMULIR-PENDAFTARAN_BROWSE")?e("v-list-item",{attrs:{link:"",to:"/spmb/formulirpendaftaran"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-file-document-edit-outline")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" BIODATA ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-PERSYARATAN_BROWSE")?e("v-list-item",{attrs:{link:"",to:"/spmb/persyaratan"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-file-document-edit-outline")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" PERSYARATAN ")])],1)],1):t._e(),e("v-subheader",[t._v("UJIAN PMB")]),t.CAN_ACCESS("SPMB-PMB-JADWAL-UJIAN_BROWSE")&&"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?e("v-list-item",{attrs:{link:"",to:"/spmb/jadwalujianpmb"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-calendar-account")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" JADWAL UJIAN ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-NILAI-UJIAN_BROWSE")&&"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?e("v-list-item",{attrs:{link:"",to:"/spmb/nilaiujian"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-calendar-account")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" NILAI UJIAN ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-GROUP")&&"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?e("v-subheader",[t._v("LAPORAN")]):t._e(),t.CAN_ACCESS("SPMB-PMB-LAPORAN-FAKULTAS_BROWSE")&&t.isBentukPT("universitas")?e("v-list-item",{attrs:{link:"",to:"/spmb/laporanfakultas"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-file-document-edit-outline")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" LAPORAN FAKULTAS ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-LAPORAN-PRODI_BROWSE")?e("v-list-item",{attrs:{link:"",to:"/spmb/laporanprodi"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-file-document-edit-outline")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" LAPORAN PRODI ")])],1)],1):t._e()],1)],1),e("v-navigation-drawer",{attrs:{width:"300",app:"",fixed:"",right:"",temporary:""},model:{value:t.drawerRight,callback:function(a){t.drawerRight=a},expression:"drawerRight"}},[e("v-list",{attrs:{dense:""}},[e("v-list-item",[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-menu-open")])],1),e("v-list-item-content",[e("v-list-item-title",{staticClass:"title"},[t._v(" OPTIONS ")])],1)],1),e("v-divider"),e("v-list-item",{staticClass:"teal lighten-5 mb-5"},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-filter")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v("FILTER")])],1)],1),t._t("filtersidebar")],2)],1),e("v-main",{staticClass:"mx-4 mb-4"},[t._t("default")],2)],1)},n=[],s=(e("b0c0"),e("ac1f"),e("5319"),e("5530")),r=e("2f62"),o={name:"SPMBLayout",created:function(){this.dashboard=this.$store.getters["uiadmin/getDefaultDashboard"]},data:function(){return{loginTime:0,drawer:null,drawerRight:null,dashboard:null}},methods:{logout:function(){var t=this;this.loginTime=0,this.$ajax.post("/auth/logout",{},{headers:{Authorization:this.TOKEN}}).then((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")})).catch((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")}))},isBentukPT:function(t){return this.$store.getters["uifront/getBentukPT"]==t}},computed:Object(s["a"])({},Object(r["b"])("auth",{AUTHENTICATED:"Authenticated",ACCESS_TOKEN:"AccessToken",TOKEN:"Token",ROLE:"Role",CAN_ACCESS:"can",ATTRIBUTE_USER:"AttributeUser"}),{APP_NAME:function(){return"PortalEkampus v3"},photoUser:function(){var t,a=this.ATTRIBUTE_USER("foto");return t=""==a?this.$api.url+"/storage/images/users/no_photo.png":this.$api.url+"/"+a,t},isReportPage:function(){return"ReportFormBMurni"==this.$route.name}}),watch:{loginTime:{handler:function(t){var a=this;t>=0?setTimeout((function(){a.loginTime=1==a.AUTHENTICATED?a.loginTime+1:-1}),1e3):(this.$store.dispatch("auth/logout"),this.$router.replace("/login"))},immediate:!0}}},l=o,d=e("2877"),u=e("6544"),c=e.n(u),h=e("40dc"),m=e("5bc1"),f=e("8212"),v=e("ce7e"),p=e("132d"),b=e("adda"),g=e("8860"),_=e("da13"),A=e("8270"),w=e("5d23"),x=e("34c3"),S=e("f6c4"),C=e("e449"),k=e("f774"),T=e("2fa4"),j=e("e0c7"),y=e("afd9"),B=e("2a7f"),I=Object(d["a"])(l,i,n,!1,null,null,null);a["a"]=I.exports;c()(I,{VAppBar:h["a"],VAppBarNavIcon:m["a"],VAvatar:f["a"],VDivider:v["a"],VIcon:p["a"],VImg:b["a"],VList:g["a"],VListItem:_["a"],VListItemAvatar:A["a"],VListItemContent:w["a"],VListItemIcon:x["a"],VListItemSubtitle:w["b"],VListItemTitle:w["c"],VMain:S["a"],VMenu:C["a"],VNavigationDrawer:k["a"],VSpacer:T["a"],VSubheader:j["a"],VSystemBar:y["a"],VToolbarTitle:B["a"]})},bd21:function(t,a,e){t.exports=e.p+"img/no-image.695dffd6.png"},ec29:function(t,a,e){},fe09:function(t,a,e){"use strict";e("4de4"),e("45fc"),e("d3b7"),e("25f0");var i=e("c37a"),n=e("5311"),s=e("8547"),r=e("58df");a["a"]=Object(r["a"])(i["a"],n["a"],s["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,a=this.value,e=this.internalValue;return this.isMultiple?!!Array.isArray(e)&&e.some((function(e){return t.valueComparator(e,a)})):void 0===this.trueValue||void 0===this.falseValue?a?this.valueComparator(a,e):Boolean(e):this.valueComparator(e,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=this,a=i["a"].options.methods.genLabel.call(this);return a?(a.data.on={click:function(a){a.preventDefault(),t.onChange()}},a):a},genInput:function(t,a){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},a),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown},ref:"input"})},onBlur:function(){this.isFocused=!1},onChange:function(){var t=this;if(this.isInteractive){var a=this.value,e=this.internalValue;if(this.isMultiple){Array.isArray(e)||(e=[]);var i=e.length;e=e.filter((function(e){return!t.valueComparator(e,a)})),e.length===i&&e.push(a)}else e=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(e,this.trueValue)?this.falseValue:this.trueValue:a?this.valueComparator(e,a)?null:a:!e;this.validate(!0,e),this.internalValue=e,this.hasColor=e}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);
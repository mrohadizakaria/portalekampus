(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e45611bc"],{"4bd4":function(t,i,e){"use strict";e("4de4"),e("7db0"),e("4160"),e("caad"),e("07ac"),e("2532"),e("159b");var a=e("5530"),s=e("58df"),n=e("7e2b"),r=e("3206");i["a"]=Object(s["a"])(n["a"],Object(r["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var i=Object.values(t).includes(!0);this.$emit("input",!i)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var i=this,e=function(t){return t.$watch("hasError",(function(e){i.$set(i.errorBag,t._uid,e)}),{immediate:!0})},a={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?a.shouldValidate=t.$watch("shouldValidate",(function(s){s&&(i.errorBag.hasOwnProperty(t._uid)||(a.valid=e(t)))})):a.valid=e(t),a},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var i=this.inputs.find((function(i){return i._uid===t._uid}));if(i){var e=this.watchers.find((function(t){return t._uid===i._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==i._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==i._uid})),this.$delete(this.errorBag,i._uid)}}},render:function(t){var i=this;return t("form",{staticClass:"v-form",attrs:Object(a["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return i.$emit("submit",t)}}},this.$slots.default)}})},"8c24":function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("SystemUserLayout",[e("ModuleHeader",{scopedSlots:t._u([{key:"icon",fn:function(){return[t._v(" mdi-account-key ")]},proxy:!0},{key:"name",fn:function(){return[t._v(" PERMISSIONS ")]},proxy:!0},{key:"breadcrumbs",fn:function(){return[e("v-breadcrumbs",{staticClass:"pa-0",attrs:{items:t.breadcrumbs},scopedSlots:t._u([{key:"divider",fn:function(){return[e("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})]},proxy:!0},{key:"desc",fn:function(){return[e("v-alert",{attrs:{color:"cyan",border:"left","colored-border":"",type:"info"}},[t._v(" Daftar aksi-aksi terhadap sebuah modul. Format penulisan permission, NAMAMODULE atau NAMA MODULE. Nama Permission tighly coupling dengan kode sumber. ")])]},proxy:!0}])}),e("v-container",[e("v-row",{staticClass:"mb-4",attrs:{"no-gutters":""}},[e("v-col",{attrs:{xs:"12",sm:"12",md:"12"}},[e("v-card",[e("v-card-text",[e("v-text-field",{attrs:{"append-icon":"mdi-database-search",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(i){t.search=i},expression:"search"}})],1)],1)],1)],1),e("v-row",{staticClass:"mb-4",attrs:{"no-gutters":""}},[e("v-col",{attrs:{xs:"12",sm:"12",md:"12"}},[e("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.daftar_permissions,search:t.search,"item-key":"id","sort-by":"name","show-expand":"",expanded:t.expanded,"single-expand":!0,loading:t.datatableLoading,"loading-text":"Loading... Please wait"},on:{"update:expanded":function(i){t.expanded=i},"click:row":t.dataTableRowClicked},scopedSlots:t._u([{key:"top",fn:function(){return[e("v-toolbar",{attrs:{flat:"",color:"white"}},[e("v-toolbar-title",[t._v("DAFTAR PERMISSION")]),e("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e("v-spacer"),e("v-dialog",{attrs:{"max-width":"500px",persistent:""},scopedSlots:t._u([{key:"activator",fn:function(i){var a=i.on;return[e("v-btn",t._g({staticClass:"mb-2",attrs:{color:"primary",dark:"",disabled:!t.CAN_ACCESS("PERMISSIONS_STORE")}},a),[t._v("TAMBAH")])]}}]),model:{value:t.dialog,callback:function(i){t.dialog=i},expression:"dialog"}},[e("v-form",{ref:"frmdata",attrs:{"lazy-validation":""},model:{value:t.form_valid,callback:function(i){t.form_valid=i},expression:"form_valid"}},[e("v-card",[e("v-card-title",[e("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),e("v-card-text",[e("v-container",[e("v-row",[e("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[e("v-text-field",{attrs:{label:"NAMA PERMISSION",rules:t.rule_permission_name},model:{value:t.editedItem.name,callback:function(i){t.$set(t.editedItem,"name",i)},expression:"editedItem.name"}})],1)],1)],1)],1),e("v-card-actions",[e("v-spacer"),e("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(i){return i.stopPropagation(),t.close(i)}}},[t._v("BATAL")]),e("v-btn",{attrs:{color:"blue darken-1",text:"",loading:t.btnLoading,disabled:!t.form_valid||t.btnLoading},on:{click:function(i){return i.stopPropagation(),t.save(i)}}},[t._v(" SIMPAN ")])],1)],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(i){var a=i.item;return[e("v-icon",{attrs:{small:"",loading:t.btnLoading,disabled:!t.CAN_ACCESS("PERMISSIONS_DESTROY")||t.btnLoading},on:{click:function(i){return i.stopPropagation(),t.deleteItem(a)}}},[t._v(" mdi-delete ")])]}},{key:"expanded-item",fn:function(i){var a=i.headers,s=i.item;return[e("td",{staticClass:"text-center",attrs:{colspan:a.length}},[e("strong",[t._v("ID:")]),t._v(t._s(s.id)+" "),e("strong",[t._v("created_at:")]),t._v(t._s(t.$date(s.created_at).format("DD/MM/YYYY HH:mm"))+" "),e("strong",[t._v("updated_at:")]),t._v(t._s(t.$date(s.updated_at).format("DD/MM/YYYY HH:mm"))+" ")])]}},{key:"no-data",fn:function(){return[t._v(" Data belum tersedia ")]},proxy:!0}])})],1)],1)],1)],1)},s=[],n=(e("c975"),e("a434"),e("b0c0"),e("5530")),r=e("2f62"),o=e("e0b6"),l=e("e477"),c={name:"Permissions",created:function(){this.breadcrumbs=[{text:"HOME",disabled:!1,href:"/dashboard/"+this.ACCESS_TOKEN},{text:"SYSTEM",disabled:!1,href:"#"},{text:"KONFIGURASI",disabled:!1,href:"#"},{text:"USERS",disabled:!1,href:"#"},{text:"PERMISSIONS",disabled:!0,href:"#"}],this.initialize()},data:function(){return{breadcrumbs:[],datatableLoading:!1,btnLoading:!1,expanded:[],daftar_permissions:[],headers:[{text:"NAMA PERMISSION",value:"name"},{text:"GUARD",value:"guard_name"},{text:"AKSI",value:"actions",sortable:!1,width:100}],search:"",form_valid:!0,dialog:!1,editedIndex:-1,editedItem:{id:0,name:"",guard:"",created_at:"",updated_at:""},defaultItem:{id:0,name:"",guard:"api",created_at:"",updated_at:""},rule_permission_name:[function(t){return!!t||"Mohon untuk di isi nama Permission !!!"},function(t){return/^[a-zA-Z\\-]+$/.test(t)||"Nama Permission hanya boleh string"}]}},methods:{initialize:function(){var t=this;this.datatableLoading=!0,this.$ajax.get("/system/setting/permissions",{headers:{Authorization:this.TOKEN}}).then((function(i){var e=i.data;t.daftar_permissions=e.permissions,t.datatableLoading=!1}))},dataTableRowClicked:function(t){t===this.expanded[0]?this.expanded=[]:this.expanded=[t]},editItem:function(t){this.editedIndex=this.daftar_permissions.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},close:function(){var t=this;this.btnLoading=!1,this.dialog=!1,this.$refs.frmdata.reset(),setTimeout((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}),300)},save:function(){var t=this;this.$refs.frmdata.validate()&&(this.editedIndex>-1||(this.btnLoading=!0,this.$ajax.post("/system/setting/permissions/store",{name:this.editedItem.name.toLowerCase()},{headers:{Authorization:this.TOKEN}}).then((function(){t.initialize(),t.close()})).catch((function(){t.btnLoading=!1}))))},deleteItem:function(t){var i=this;this.$root.$confirm.open("Delete","Apakah Anda ingin menghapus permission "+t.name+" ?",{color:"red"}).then((function(e){e&&(i.btnLoading=!0,i.$ajax.post("/system/setting/permissions/"+t.id,{_method:"DELETE"},{headers:{Authorization:i.TOKEN}}).then((function(){var e=i.daftar_permissions.indexOf(t);i.daftar_permissions.splice(e,1),i.btnLoading=!1})).catch((function(){i.btnLoading=!1})))}))}},computed:Object(n["a"])({formTitle:function(){return-1===this.editedIndex?"TAMBAH PERMISSION":"EDIT PERMISSION"}},Object(r["b"])("auth",{ACCESS_TOKEN:"AccessToken",TOKEN:"Token",CAN_ACCESS:"can",ATTRIBUTE_USER:"AttributeUser"})),watch:{dialog:function(t){t||this.close()}},components:{SystemUserLayout:o["a"],ModuleHeader:l["a"]}},d=c,m=e("2877"),u=e("6544"),v=e.n(u),h=e("0798"),f=e("2bc5"),p=e("8336"),_=e("b0af"),S=e("99d9"),E=e("62ad"),b=e("a523"),g=e("8fea"),A=e("169a"),C=e("ce7e"),T=e("4bd4"),I=e("132d"),k=e("0fd9"),N=e("2fa4"),x=e("8654"),R=e("71d9"),M=e("2a7f"),y=Object(m["a"])(d,a,s,!1,null,null,null);i["default"]=y.exports;v()(y,{VAlert:h["a"],VBreadcrumbs:f["a"],VBtn:p["a"],VCard:_["a"],VCardActions:S["a"],VCardText:S["c"],VCardTitle:S["d"],VCol:E["a"],VContainer:b["a"],VDataTable:g["a"],VDialog:A["a"],VDivider:C["a"],VForm:T["a"],VIcon:I["a"],VRow:k["a"],VSpacer:N["a"],VTextField:x["a"],VToolbar:R["a"],VToolbarTitle:M["a"]})},e0b6:function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("v-system-bar",{staticClass:"brown darken-2 white--text",attrs:{app:"",dark:""}}),e("v-app-bar",{attrs:{app:""}},[e("v-app-bar-nav-icon",{staticClass:"grey--text",on:{click:function(i){i.stopPropagation(),t.drawer=!t.drawer}}}),e("v-toolbar-title",{staticClass:"headline clickable",on:{click:function(i){i.stopPropagation(),t.$router.push("/dashboard/"+t.$store.getters["auth/AccessToken"]).catch((function(t){}))}}},[e("span",{staticClass:"hidden-sm-and-down"},[t._v(t._s(t.APP_NAME))])]),e("v-spacer"),t.CAN_ACCESS("SYSTEM-SETTING-GROUP")?e("v-menu",{attrs:{"close-on-content-click":!1,origin:"center center",transition:"scale-transition","offset-y":!0,bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(i){var a=i.on;return[e("v-btn",t._g({attrs:{icon:""}},a),[e("v-icon",[t._v("mdi-cogs")])],1)]}}],null,!1,501191807)},[e("v-list",{attrs:{dense:""}},[e("v-list-item",[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-cogs")])],1),e("v-list-item-content",[e("v-list-item-title",{staticClass:"title"},[t._v(" KONFIGURASI SISTEM ")]),e("v-list-item-subtitle")],1)],1),e("v-divider"),e("v-list-item",{staticClass:"teal lighten-5"},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v("PERGURUAN TINGGI")])],1)],1),t.CAN_ACCESS("SYSTEM-SETTING-IDENTITAS-DIRI")?e("v-list-item",{attrs:{link:"",to:"/system-setting/identitasdiri"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-chevron-right")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" IDENTITAS DIRI ")])],1)],1):t._e(),e("v-list-item",{staticClass:"teal lighten-5"},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v("USER")])],1)],1),t.CAN_ACCESS("SYSTEM-SETTING-PERMISSIONS")?e("v-list-item",{attrs:{link:"",to:"/system-setting/permissions"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-chevron-right")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" PERMISSIONS ")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-SETTING-ROLES")?e("v-list-item",{attrs:{link:"",to:"/system-setting/roles"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-chevron-right")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" ROLES ")])],1)],1):t._e(),e("v-list-item",{staticClass:"teal lighten-5"},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-server-network")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v("SERVER")])],1)],1),t.CAN_ACCESS("SYSTEM-SETTING-VARIABLES")?e("v-list-item",{attrs:{link:"",to:"/system-setting/captcha"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-chevron-right")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" CAPTCHA ")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-SETTING-VARIABLES")?e("v-list-item",{attrs:{link:"",to:"/system-setting/email"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-chevron-right")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" EMAIL ")])],1)],1):t._e()],1)],1):t._e(),e("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e("v-menu",{attrs:{"close-on-content-click":!0,origin:"center center",transition:"scale-transition","offset-y":!0,bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(i){var a=i.on;return[e("v-avatar",{attrs:{size:"30"}},[e("v-img",t._g({attrs:{src:t.photoUser}},a))],1)]}}])},[e("v-list",[e("v-list-item",[e("v-list-item-avatar",[e("v-img",{attrs:{src:t.photoUser}})],1),e("v-list-item-content",[e("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),e("v-list-item-subtitle",[t._v(" "+t._s(t.ROLE)+" ")])],1)],1),e("v-divider"),e("v-list-item",{attrs:{to:"/system-users/profil"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account")])],1),e("v-list-item-title",[t._v("Profil")])],1),e("v-divider"),e("v-list-item",{on:{click:function(i){return i.preventDefault(),t.logout(i)}}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-power")])],1),e("v-list-item-title",[t._v("Logout")])],1)],1)],1)],1),e("v-navigation-drawer",{staticClass:"brown darken-4",attrs:{width:"300",dark:"",temporary:t.isReportPage,app:""},model:{value:t.drawer,callback:function(i){t.drawer=i},expression:"drawer"}},[e("v-list-item",[e("v-list-item-avatar",[e("v-img",{attrs:{src:t.photoUser},on:{click:function(i){return i.stopPropagation(),t.toProfile(i)}}})],1),e("v-list-item-content",[e("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),e("v-list-item-subtitle",[t._v(" "+t._s(t.ROLE)+" ")])],1)],1),e("v-divider"),e("v-list",{attrs:{expand:""}},[t.CAN_ACCESS("SYSTEM-USERS-GROUP")?e("v-list-item",{attrs:{to:{path:"/system-users"},link:"",color:"deep-orange darken-1"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v("MODULE USER SISTEM")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-USERS-SUPERADMIN")?e("v-list-item",{attrs:{link:"",to:"/system-users/superadmin"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" SUPERADMIN ")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-USERS-KEUANGAN")?e("v-list-item",{attrs:{link:"",to:"/system-users/keuangan"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" KEUANGAN ")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-USERS-PMB")?e("v-list-item",{attrs:{link:"",to:"/system-users/pmb"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" TIM PMB ")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-USERS-AKADEMIK")?e("v-list-item",{attrs:{link:"",to:"/system-users/akademik"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" AKADEMIK ")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-USERS-PROGRAM-STUDI")?e("v-list-item",{attrs:{link:"",to:"/system-users/prodi"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" PROGRAM STUDI ")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-USERS-DOSEN")?e("v-list-item",{attrs:{link:"",to:"/system-users/dosen"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" DOSEN ")])],1)],1):t._e()],1)],1),e("v-main",{staticClass:"mx-4 mb-4"},[t._t("default")],2)],1)},s=[],n=(e("b0c0"),e("ac1f"),e("5319"),e("5530")),r=e("2f62"),o={name:"DataMasterLayout",data:function(){return{loginTime:0,drawer:null}},methods:{logout:function(){var t=this;this.loginTime=0,this.$ajax.post("/auth/logout",{},{headers:{Authorization:this.TOKEN}}).then((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")})).catch((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")}))},isBentukPT:function(t){return this.$store.getters["uifront/getBentukPT"]==t}},computed:Object(n["a"])({},Object(r["b"])("auth",{AUTHENTICATED:"Authenticated",ACCESS_TOKEN:"AccessToken",TOKEN:"Token",ROLE:"Role",CAN_ACCESS:"can",ATTRIBUTE_USER:"AttributeUser"}),{APP_NAME:function(){return"PortalEkampus v3"},photoUser:function(){var t,i=this.ATTRIBUTE_USER("foto");return t=""==i?this.$api.url+"/storage/images/users/no_photo.png":this.$api.url+"/"+i,t},isReportPage:function(){return"ReportFormBMurni"==this.$route.name}}),watch:{loginTime:{handler:function(t){var i=this;t>=0?setTimeout((function(){i.loginTime=1==i.AUTHENTICATED?i.loginTime+1:-1}),1e3):(this.$store.dispatch("auth/logout"),this.$router.replace("/login"))},immediate:!0}}},l=o,c=e("2877"),d=e("6544"),m=e.n(d),u=e("40dc"),v=e("5bc1"),h=e("8212"),f=e("8336"),p=e("ce7e"),_=e("132d"),S=e("adda"),E=e("8860"),b=e("da13"),g=e("8270"),A=e("5d23"),C=e("34c3"),T=e("f6c4"),I=e("e449"),k=e("f774"),N=e("2fa4"),x=e("afd9"),R=e("2a7f"),M=Object(c["a"])(l,a,s,!1,null,null,null);i["a"]=M.exports;m()(M,{VAppBar:u["a"],VAppBarNavIcon:v["a"],VAvatar:h["a"],VBtn:f["a"],VDivider:p["a"],VIcon:_["a"],VImg:S["a"],VList:E["a"],VListItem:b["a"],VListItemAvatar:g["a"],VListItemContent:A["a"],VListItemIcon:C["a"],VListItemSubtitle:A["b"],VListItemTitle:A["c"],VMain:T["a"],VMenu:I["a"],VNavigationDrawer:k["a"],VSpacer:N["a"],VSystemBar:x["a"],VToolbarTitle:R["a"]})}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-54539a04"],{1105:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",[i("v-card-title",[i("span",{staticClass:"headline"},[t._v("USER PERMISSIONS")])]),i("v-card-text",[i("v-container",{attrs:{fluid:""}},[i("v-row",{staticClass:"mb-4",attrs:{"no-gutters":""}},[i("v-col",{attrs:{xs:"12",sm:"12",md:"12"}},[i("v-card",[i("v-card-text",[i("v-row",{attrs:{"no-gutters":""}},[i("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[i("v-card",{attrs:{flat:""}},[i("v-card-title",[t._v("ID :")]),i("v-card-text",[t._v(" "+t._s(t.user.id)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[i("v-card",{attrs:{flat:""}},[i("v-card-title",[t._v("NOMOR HP :")]),i("v-card-text",[t._v(" "+t._s(t.user.nomor_hp)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e()],1),i("v-row",{attrs:{"no-gutters":""}},[i("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[i("v-card",{attrs:{flat:""}},[i("v-card-title",[t._v("USERNAME :")]),i("v-card-text",[t._v(" "+t._s(t.user.username)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[i("v-card",{attrs:{flat:""}},[i("v-card-title",[t._v("THEME :")]),i("v-card-text",[t._v(" "+t._s(t.user.theme)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e()],1),i("v-row",{attrs:{"no-gutters":""}},[i("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[i("v-card",{attrs:{flat:""}},[i("v-card-title",[t._v("NAMA :")]),i("v-card-text",[t._v(" "+t._s(t.user.name)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[i("v-card",{attrs:{flat:""}},[i("v-card-title",[t._v("CREATED :")]),i("v-card-text",[t._v(" "+t._s(t.$date(t.user.created_at).format("DD/MM/YYYY HH:mm"))+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e()],1),i("v-row",{attrs:{"no-gutters":""}},[i("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[i("v-card",{attrs:{flat:""}},[i("v-card-title",[t._v("EMAIL :")]),i("v-card-text",[t._v(" "+t._s(t.user.email)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[i("v-card",{attrs:{flat:""}},[i("v-card-title",[t._v("UPDATED :")]),i("v-card-text",[t._v(" "+t._s(t.$date(t.user.updated_at).format("DD/MM/YYYY HH:mm"))+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e()],1)],1)],1)],1)],1),i("v-row",{staticClass:"mb-4",attrs:{"no-gutters":""}},[i("v-col",{attrs:{cols:"12"}},[i("v-card",[i("v-card-text",[i("v-text-field",{attrs:{"append-icon":"mdi-database-search",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1)],1)],1),i("v-row",{attrs:{"no-gutters":""}},[i("v-col",{attrs:{col:"12"}},[i("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.daftar_permissions,search:t.search,"item-key":"name","sort-by":"name","show-select":""},scopedSlots:t._u([{key:"item.actions",fn:function(e){var s=e.item;return[i("v-icon",{attrs:{small:"",loading:t.btnLoading,disabled:t.btnLoading},on:{click:function(e){return e.stopPropagation(),t.revoke(s)}}},[t._v(" mdi-delete ")])]}}]),model:{value:t.permissions_selected,callback:function(e){t.permissions_selected=e},expression:"permissions_selected"}})],1)],1)],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){return e.stopPropagation(),t.close(e)}}},[t._v("KELUAR")]),i("v-btn",{attrs:{color:"blue darken-1",text:"",loading:t.btnLoading,disabled:t.btnLoading||!t.perm_selected.length>0},on:{click:function(e){return e.stopPropagation(),t.save(e)}}},[t._v(" SIMPAN ")])],1)],1)},a=[],n=(i("b0c0"),i("5530")),r=i("2f62"),o={name:"UserPermissions",data:function(){return{btnLoading:!1,headers:[{text:"NAMA PERMISSION",value:"name"},{text:"GUARD",value:"guard_name"},{text:"AKSI",value:"actions",sortable:!1,width:100}],search:"",perm_selected:[],perm_revoked:[]}},methods:{save:function(){var t=this;this.btnLoading=!0,this.$ajax.post("/system/users/storeuserpermissions",{user_id:this.user.id,chkpermission:this.permissions_selected},{headers:{Authorization:this.TOKEN}}).then((function(){t.close()})).catch((function(){t.btnLoading=!1}))},revoke:function(t){var e=this;this.btnLoading=!0,this.$ajax.post("/system/users/revokeuserpermissions",{user_id:this.user.id,name:t.name},{headers:{Authorization:this.TOKEN}}).then((function(){e.close()})).catch((function(){e.btnLoading=!1}))},close:function(){this.btnLoading=!1,this.permissions_selected=[],this.$emit("closeUserPermissions")}},props:{user:Object,daftarpermissions:Array,permissionsselected:Array},computed:Object(n["a"])({},Object(r["b"])("auth",{TOKEN:"Token"}),{daftar_permissions:function(){return this.daftarpermissions},permissions_selected:{get:function(){return this.perm_selected.length>0?this.perm_selected:this.permissionsselected},set:function(t){this.perm_selected=t}}})},l=o,d=i("2877"),c=i("6544"),u=i.n(c),m=i("8336"),h=i("b0af"),v=i("99d9"),p=i("62ad"),f=i("a523"),_=i("8fea"),g=i("132d"),b=i("6b53"),I=i("0fd9"),S=i("2fa4"),x=i("8654"),E=Object(d["a"])(l,s,a,!1,null,null,null);e["a"]=E.exports;u()(E,{VBtn:m["a"],VCard:h["a"],VCardActions:v["a"],VCardText:v["c"],VCardTitle:v["d"],VCol:p["a"],VContainer:f["a"],VDataTable:_["a"],VIcon:g["a"],VResponsive:b["a"],VRow:I["a"],VSpacer:S["a"],VTextField:x["a"]})},"2bfd":function(t,e,i){},"4bd4":function(t,e,i){"use strict";i("4de4"),i("7db0"),i("4160"),i("caad"),i("07ac"),i("2532"),i("159b");var s=i("5530"),a=i("58df"),n=i("7e2b"),r=i("3206");e["a"]=Object(a["a"])(n["a"],Object(r["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},s={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?s.shouldValidate=t.$watch("shouldValidate",(function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(s.valid=i(t)))})):s.valid=i(t),s},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(s["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},c6a6:function(t,e,i){"use strict";i("4de4"),i("7db0"),i("c975"),i("d81d"),i("45fc"),i("498a");var s=i("5530"),a=(i("2bfd"),i("b974")),n=i("8654"),r=i("d9f7"),o=i("80d2"),l=Object(s["a"])({},a["b"],{offsetY:!0,offsetOverflow:!0,transition:!1});e["a"]=a["a"].extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(t,e,i){return i.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:a["a"].options.props.menuProps.type,default:function(){return l}},noFilter:Boolean,searchInput:{type:String,default:void 0}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return Object(s["a"])({},a["a"].options.computed.classes.call(this),{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var t=this;return this.selectedItems.map((function(e){return t.getValue(e)}))},hasDisplayedItems:function(){var t=this;return this.hideSelected?this.filteredItems.some((function(e){return!t.hasItem(e)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var t=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(e){var i=Object(o["r"])(e,t.itemText),s=null!=i?String(i):"";return t.filter(e,String(t.internalSearch),s)}))},internalSearch:{get:function(){return this.lazySearch},set:function(t){this.lazySearch=t,this.$emit("update:search-input",t)}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var t=a["a"].options.computed.$_menuProps.call(this);return t.contentClass="v-autocomplete__content ".concat(t.contentClass||"").trim(),Object(s["a"])({},l,{},t)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var t=this;return this.multiple?null:this.selectedItems.find((function(e){return t.valueComparator(t.getValue(e),t.getValue(t.internalValue))}))},listData:function(){var t=a["a"].options.computed.listData.call(this);return t.props=Object(s["a"])({},t.props,{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),t}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(t){t?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.updateSelf())},isMenuActive:function(t){!t&&this.hasSlot&&(this.lazySearch=void 0)},items:function(t,e){e&&e.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!t.length||this.activateMenu()},searchInput:function(t){this.lazySearch=t},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},methods:{onFilteredItemsChanged:function(t,e){var i=this;t!==e&&(this.setMenuIndex(-1),this.$nextTick((function(){i.internalSearch&&(1===t.length||i.autoSelectFirst)&&(i.$refs.menu.getTiles(),i.setMenuIndex(0))})))},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(t){this.searchIsDirty||(this.multiple&&t===o["y"].left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&t===o["y"].right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:t!==o["y"].backspace&&t!==o["y"].delete||this.deleteCurrentItem())},deleteCurrentItem:function(){var t=this.selectedIndex,e=this.selectedItems[t];if(this.isInteractive&&!this.getDisabled(e)){var i=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===i){var s=this.selectedItems.length,a=t!==s-1?t:t-1,n=this.selectedItems[a];n?this.selectItem(e):this.setValue(this.multiple?[]:void 0),this.selectedIndex=a}else this.selectedIndex=i}},clearableCallback:function(){this.internalSearch=void 0,a["a"].options.methods.clearableCallback.call(this)},genInput:function(){var t=n["a"].options.methods.genInput.call(this);return t.data=Object(r["a"])(t.data,{attrs:{"aria-activedescendant":Object(o["p"])(this.$refs.menu,"activeTile.id"),autocomplete:Object(o["p"])(t.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),t},genInputSlot:function(){var t=a["a"].options.methods.genInputSlot.call(this);return t.data.attrs.role="combobox",t},genSelections:function(){return this.hasSlot||this.multiple?a["a"].options.methods.genSelections.call(this):[]},onClick:function(t){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(t.target)||this.activateMenu())},onInput:function(t){if(!(this.selectedIndex>-1)&&t.target){var e=t.target,i=e.value;e.value&&this.activateMenu(),this.internalSearch=i,this.badInput=e.validity&&e.validity.badInput}},onKeyDown:function(t){var e=t.keyCode;a["a"].options.methods.onKeyDown.call(this,t),this.changeSelectedIndex(e)},onSpaceDown:function(t){},onTabDown:function(t){a["a"].options.methods.onTabDown.call(this,t),this.updateSelf()},onUpDown:function(t){t.preventDefault(),this.activateMenu()},selectItem:function(t){a["a"].options.methods.selectItem.call(this,t),this.setSearch()},setSelectedItems:function(){a["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var t=this;this.$nextTick((function(){t.multiple&&t.internalSearch&&t.isMenuActive||(t.internalSearch=!t.selectedItems.length||t.multiple||t.hasSlot?null:t.getText(t.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(t){return this.selectedValues.indexOf(this.getValue(t))>-1},onCopy:function(t){if(-1!==this.selectedIndex){var e=this.selectedItems[this.selectedIndex],i=this.getText(e);t.clipboardData.setData("text/plain",i),t.clipboardData.setData("text/vnd.vuetify.autocomplete.item+plain",i),t.preventDefault()}}}})},e0b6:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-system-bar",{staticClass:"brown darken-2 white--text",attrs:{app:"",dark:""}}),i("v-app-bar",{attrs:{app:""}},[i("v-app-bar-nav-icon",{staticClass:"grey--text",on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),i("v-toolbar-title",{staticClass:"headline clickable",on:{click:function(e){e.stopPropagation(),t.$router.push("/dashboard/"+t.$store.getters["auth/AccessToken"]).catch((function(t){}))}}},[i("span",{staticClass:"hidden-sm-and-down"},[t._v(t._s(t.APP_NAME))])]),i("v-spacer"),t.CAN_ACCESS("SYSTEM-SETTING-GROUP")?i("v-menu",{attrs:{"close-on-content-click":!1,origin:"center center",transition:"scale-transition","offset-y":!0,bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on;return[i("v-btn",t._g({attrs:{icon:""}},s),[i("v-icon",[t._v("mdi-cogs")])],1)]}}],null,!1,501191807)},[i("v-list",{attrs:{dense:""}},[i("v-list-item",[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-cogs")])],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v(" KONFIGURASI SISTEM ")]),i("v-list-item-subtitle")],1)],1),i("v-divider"),i("v-list-item",{staticClass:"teal lighten-5"},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("PERGURUAN TINGGI")])],1)],1),t.CAN_ACCESS("SYSTEM-SETTING-IDENTITAS-DIRI")?i("v-list-item",{attrs:{link:"",to:"/system-setting/identitasdiri"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-chevron-right")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" IDENTITAS DIRI ")])],1)],1):t._e(),i("v-list-item",{staticClass:"teal lighten-5"},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("USER")])],1)],1),t.CAN_ACCESS("SYSTEM-SETTING-PERMISSIONS")?i("v-list-item",{attrs:{link:"",to:"/system-setting/permissions"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-chevron-right")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" PERMISSIONS ")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-SETTING-ROLES")?i("v-list-item",{attrs:{link:"",to:"/system-setting/roles"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-chevron-right")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" ROLES ")])],1)],1):t._e(),i("v-list-item",{staticClass:"teal lighten-5"},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-server-network")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("SERVER")])],1)],1),t.CAN_ACCESS("SYSTEM-SETTING-VARIABLES")?i("v-list-item",{attrs:{link:"",to:"/system-setting/captcha"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-chevron-right")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" CAPTCHA ")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-SETTING-VARIABLES")?i("v-list-item",{attrs:{link:"",to:"/system-setting/email"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-chevron-right")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" EMAIL ")])],1)],1):t._e()],1)],1):t._e(),i("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),i("v-menu",{attrs:{"close-on-content-click":!0,origin:"center center",transition:"scale-transition","offset-y":!0,bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on;return[i("v-avatar",{attrs:{size:"30"}},[i("v-img",t._g({attrs:{src:t.photoUser}},s))],1)]}}])},[i("v-list",[i("v-list-item",[i("v-list-item-avatar",[i("v-img",{attrs:{src:t.photoUser}})],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),i("v-list-item-subtitle",[t._v(" "+t._s(t.ROLE)+" ")])],1)],1),i("v-divider"),i("v-list-item",{attrs:{to:"/system-users/profil"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account")])],1),i("v-list-item-title",[t._v("Profil")])],1),i("v-divider"),i("v-list-item",{on:{click:function(e){return e.preventDefault(),t.logout(e)}}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-power")])],1),i("v-list-item-title",[t._v("Logout")])],1)],1)],1)],1),i("v-navigation-drawer",{staticClass:"brown darken-4",attrs:{width:"300",dark:"",temporary:t.isReportPage,app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[i("v-list-item",[i("v-list-item-avatar",[i("v-img",{attrs:{src:t.photoUser},on:{click:function(e){return e.stopPropagation(),t.toProfile(e)}}})],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),i("v-list-item-subtitle",[t._v(" "+t._s(t.ROLE)+" ")])],1)],1),i("v-divider"),i("v-list",{attrs:{expand:""}},[t.CAN_ACCESS("SYSTEM-USERS-GROUP")?i("v-list-item",{attrs:{to:{path:"/system-users"},link:"",color:"deep-orange darken-1"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("MODULE USER SISTEM")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-USERS-SUPERADMIN")?i("v-list-item",{attrs:{link:"",to:"/system-users/superadmin"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" SUPERADMIN ")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-USERS-KEUANGAN")?i("v-list-item",{attrs:{link:"",to:"/system-users/keuangan"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" KEUANGAN ")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-USERS-PMB")?i("v-list-item",{attrs:{link:"",to:"/system-users/pmb"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" TIM PMB ")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-USERS-AKADEMIK")?i("v-list-item",{attrs:{link:"",to:"/system-users/akademik"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" AKADEMIK ")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-USERS-PROGRAM-STUDI")?i("v-list-item",{attrs:{link:"",to:"/system-users/prodi"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" PROGRAM STUDI ")])],1)],1):t._e(),t.CAN_ACCESS("SYSTEM-USERS-DOSEN")?i("v-list-item",{attrs:{link:"",to:"/system-users/dosen"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" DOSEN ")])],1)],1):t._e()],1)],1),i("v-main",{staticClass:"mx-4 mb-4"},[t._t("default")],2)],1)},a=[],n=(i("b0c0"),i("ac1f"),i("5319"),i("5530")),r=i("2f62"),o={name:"DataMasterLayout",data:function(){return{loginTime:0,drawer:null}},methods:{logout:function(){var t=this;this.loginTime=0,this.$ajax.post("/auth/logout",{},{headers:{Authorization:this.TOKEN}}).then((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")})).catch((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")}))},isBentukPT:function(t){return this.$store.getters["uifront/getBentukPT"]==t}},computed:Object(n["a"])({},Object(r["b"])("auth",{AUTHENTICATED:"Authenticated",ACCESS_TOKEN:"AccessToken",TOKEN:"Token",ROLE:"Role",CAN_ACCESS:"can",ATTRIBUTE_USER:"AttributeUser"}),{APP_NAME:function(){return"PortalEkampus v3"},photoUser:function(){var t,e=this.ATTRIBUTE_USER("foto");return t=""==e?this.$api.url+"/storage/images/users/no_photo.png":this.$api.url+"/"+e,t},isReportPage:function(){return"ReportFormBMurni"==this.$route.name}}),watch:{loginTime:{handler:function(t){var e=this;t>=0?setTimeout((function(){e.loginTime=1==e.AUTHENTICATED?e.loginTime+1:-1}),1e3):(this.$store.dispatch("auth/logout"),this.$router.replace("/login"))},immediate:!0}}},l=o,d=i("2877"),c=i("6544"),u=i.n(c),m=i("40dc"),h=i("5bc1"),v=i("8212"),p=i("8336"),f=i("ce7e"),_=i("132d"),g=i("adda"),b=i("8860"),I=i("da13"),S=i("8270"),x=i("5d23"),E=i("34c3"),A=i("f6c4"),k=i("e449"),y=i("f774"),C=i("2fa4"),T=i("afd9"),w=i("2a7f"),O=Object(d["a"])(l,s,a,!1,null,null,null);e["a"]=O.exports;u()(O,{VAppBar:m["a"],VAppBarNavIcon:h["a"],VAvatar:v["a"],VBtn:p["a"],VDivider:f["a"],VIcon:_["a"],VImg:g["a"],VList:b["a"],VListItem:I["a"],VListItemAvatar:S["a"],VListItemContent:x["a"],VListItemIcon:E["a"],VListItemSubtitle:x["b"],VListItemTitle:x["c"],VMain:A["a"],VMenu:k["a"],VNavigationDrawer:y["a"],VSpacer:C["a"],VSystemBar:T["a"],VToolbarTitle:w["a"]})},eb92:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("SystemUserLayout",[i("ModuleHeader",{scopedSlots:t._u([{key:"icon",fn:function(){return[t._v(" mdi-account ")]},proxy:!0},{key:"name",fn:function(){return[t._v(" USERS KEUANGAN ")]},proxy:!0},{key:"breadcrumbs",fn:function(){return[i("v-breadcrumbs",{staticClass:"pa-0",attrs:{items:t.breadcrumbs},scopedSlots:t._u([{key:"divider",fn:function(){return[i("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})]},proxy:!0},{key:"desc",fn:function(){return[i("v-alert",{attrs:{color:"cyan",border:"left","colored-border":"",type:"info"}},[t._v(" User dengan role Keuangan bertanggungjawab terhadap proses keuangan. ")])]},proxy:!0}])}),i("v-container",[i("v-row",{staticClass:"mb-4",attrs:{"no-gutters":""}},[i("v-col",{attrs:{cols:"12"}},[i("v-card",[i("v-card-text",[i("v-text-field",{attrs:{"append-icon":"mdi-database-search",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1)],1)],1),i("v-row",{staticClass:"mb-4",attrs:{"no-gutters":""}},[i("v-col",{attrs:{cols:"12"}},[i("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.daftar_users,search:t.search,"item-key":"id","sort-by":"name","show-expand":"",expanded:t.expanded,"single-expand":!0,loading:t.datatableLoading,"loading-text":"Loading... Please wait"},on:{"update:expanded":function(e){t.expanded=e},"click:row":t.dataTableRowClicked},scopedSlots:t._u([{key:"top",fn:function(){return[i("v-toolbar",{attrs:{flat:"",color:"white"}},[i("v-toolbar-title",[t._v("DAFTAR USERS KEUANGAN")]),i("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),i("v-spacer"),t.$store.getters["auth/can"]("USER_STOREPERMISSIONS")?i("v-btn",{staticClass:"mb-2 mr-2",attrs:{color:"warning",loading:t.btnLoading,disabled:t.btnLoading},on:{click:function(e){return e.stopPropagation(),t.syncPermission(e)}}},[t._v(" SYNC PERMISSION ")]):t._e(),i("v-btn",{staticClass:"mb-2",attrs:{color:"primary",loading:t.btnLoading,disabled:t.btnLoading},on:{click:function(e){return e.stopPropagation(),t.showDialogTambahUserKeuangan(e)}}},[t._v(" TAMBAH ")]),i("v-dialog",{attrs:{"max-width":"500px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-form",{ref:"frmdata",attrs:{"lazy-validation":""},model:{value:t.form_valid,callback:function(e){t.form_valid=e},expression:"form_valid"}},[i("v-card",[i("v-card-title",[i("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),i("v-card-subtitle",[t._v(" Bila program studi, tidak dipilih artinya user ini dapat mengakses seluruh data keuangan mahasiswa ")]),i("v-card-text",[i("v-text-field",{attrs:{label:"NAMA USER",outlined:"",rules:t.rule_user_name},model:{value:t.editedItem.name,callback:function(e){t.$set(t.editedItem,"name",e)},expression:"editedItem.name"}}),i("v-text-field",{attrs:{label:"EMAIL",outlined:"",rules:t.rule_user_email},model:{value:t.editedItem.email,callback:function(e){t.$set(t.editedItem,"email",e)},expression:"editedItem.email"}}),i("v-text-field",{attrs:{label:"NOMOR HP",outlined:"",rules:t.rule_user_nomorhp},model:{value:t.editedItem.nomor_hp,callback:function(e){t.$set(t.editedItem,"nomor_hp",e)},expression:"editedItem.nomor_hp"}}),i("v-text-field",{attrs:{label:"USERNAME",outlined:"",rules:t.rule_user_username},model:{value:t.editedItem.username,callback:function(e){t.$set(t.editedItem,"username",e)},expression:"editedItem.username"}}),i("v-text-field",{attrs:{label:"PASSWORD",type:"password",outlined:"",rules:t.rule_user_password},model:{value:t.editedItem.password,callback:function(e){t.$set(t.editedItem,"password",e)},expression:"editedItem.password"}}),i("v-autocomplete",{attrs:{items:t.daftar_prodi,label:"PROGRAM STUDI","item-text":"text","item-value":"id",multiple:"","small-chips":""},model:{value:t.editedItem.prodi_id,callback:function(e){t.$set(t.editedItem,"prodi_id",e)},expression:"editedItem.prodi_id"}})],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){return e.stopPropagation(),t.close(e)}}},[t._v("BATAL")]),i("v-btn",{attrs:{color:"blue darken-1",text:"",loading:t.btnLoading,disabled:!t.form_valid||t.btnLoading},on:{click:function(e){return e.stopPropagation(),t.save(e)}}},[t._v(" SIMPAN ")])],1)],1)],1)],1),i("v-dialog",{attrs:{"max-width":"500px",persistent:""},model:{value:t.dialogEdit,callback:function(e){t.dialogEdit=e},expression:"dialogEdit"}},[i("v-form",{ref:"frmdata",attrs:{"lazy-validation":""},model:{value:t.form_valid,callback:function(e){t.form_valid=e},expression:"form_valid"}},[i("v-card",[i("v-card-title",[i("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),i("v-card-subtitle",[t._v(" Bila program studi, tidak dipilih artinya user ini dapat mengakses seluruh data keuangan mahasiswa ")]),i("v-card-text",[i("v-text-field",{attrs:{label:"NAMA USER",outlined:"",rules:t.rule_user_name},model:{value:t.editedItem.name,callback:function(e){t.$set(t.editedItem,"name",e)},expression:"editedItem.name"}}),i("v-text-field",{attrs:{label:"EMAIL",outlined:"",rules:t.rule_user_email},model:{value:t.editedItem.email,callback:function(e){t.$set(t.editedItem,"email",e)},expression:"editedItem.email"}}),i("v-text-field",{attrs:{label:"NOMOR HP",outlined:"",rules:t.rule_user_nomorhp},model:{value:t.editedItem.nomor_hp,callback:function(e){t.$set(t.editedItem,"nomor_hp",e)},expression:"editedItem.nomor_hp"}}),i("v-text-field",{attrs:{label:"USERNAME",outlined:"",rules:t.rule_user_username},model:{value:t.editedItem.username,callback:function(e){t.$set(t.editedItem,"username",e)},expression:"editedItem.username"}}),i("v-text-field",{attrs:{label:"PASSWORD",type:"password",outlined:"",rules:t.rule_user_passwordEdit},model:{value:t.editedItem.password,callback:function(e){t.$set(t.editedItem,"password",e)},expression:"editedItem.password"}}),i("v-autocomplete",{attrs:{items:t.daftar_prodi,label:"PROGRAM STUDI","item-text":"text","item-value":"id",multiple:"","small-chips":""},model:{value:t.editedItem.prodi_id,callback:function(e){t.$set(t.editedItem,"prodi_id",e)},expression:"editedItem.prodi_id"}})],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){return e.stopPropagation(),t.close(e)}}},[t._v("BATAL")]),i("v-btn",{attrs:{color:"blue darken-1",text:"",loading:t.btnLoading,disabled:!t.form_valid||t.btnLoading},on:{click:function(e){return e.stopPropagation(),t.save(e)}}},[t._v("SIMPAN")])],1)],1)],1)],1),i("v-dialog",{attrs:{"max-width":"800px",persistent:""},model:{value:t.dialogUserPermission,callback:function(e){t.dialogUserPermission=e},expression:"dialogUserPermission"}},[i("UserPermissions",{attrs:{user:t.editedItem,daftarpermissions:t.daftar_permissions,permissionsselected:t.permissions_selected},on:{closeUserPermissions:t.closeUserPermissions}})],1)],1)]},proxy:!0},{key:"item.actions",fn:function(e){var s=e.item;return[i("v-icon",{staticClass:"mr-2",attrs:{small:"",loading:t.btnLoading,disabled:t.btnLoading},on:{click:function(e){return e.stopPropagation(),t.setPermission(s)}}},[t._v(" mdi-axis-arrow-lock ")]),i("v-icon",{staticClass:"mr-2",attrs:{small:"",loading:t.btnLoading,disabled:t.btnLoading},on:{click:function(e){return e.stopPropagation(),t.editItem(s)}}},[t._v(" mdi-pencil ")]),i("v-icon",{attrs:{small:"",loading:t.btnLoading,disabled:t.btnLoading},on:{click:function(e){return e.stopPropagation(),t.deleteItem(s)}}},[t._v(" mdi-delete ")])]}},{key:"item.foto",fn:function(e){var s=e.item;return[i("v-avatar",{attrs:{size:"30"}},[i("v-img",{attrs:{src:t.$api.url+"/"+s.foto}})],1)]}},{key:"expanded-item",fn:function(e){var s=e.headers,a=e.item;return[i("td",{staticClass:"text-center",attrs:{colspan:s.length}},[i("v-col",{attrs:{cols:"12"}},[i("strong",[t._v("ID:")]),t._v(t._s(a.id)+" "),i("strong",[t._v("created_at:")]),t._v(t._s(t.$date(a.created_at).format("DD/MM/YYYY HH:mm"))+" "),i("strong",[t._v("updated_at:")]),t._v(t._s(t.$date(a.updated_at).format("DD/MM/YYYY HH:mm"))+" ")])],1)]}},{key:"no-data",fn:function(){return[t._v(" Data belum tersedia ")]},proxy:!0}])})],1)],1)],1)],1)},a=[],n=(i("4160"),i("c975"),i("a434"),i("b0c0"),i("159b"),i("5530")),r=(i("96cf"),i("1da1")),o=i("2f62"),l=i("e0b6"),d=i("e477"),c=i("1105"),u={name:"UsersKeuangan",created:function(){this.breadcrumbs=[{text:"HOME",disabled:!1,href:"/dashboard/"+this.ACCESS_TOKEN},{text:"USER SISTEM",disabled:!1,href:"system-users"},{text:"USERS KEUANGAN",disabled:!0,href:"#"}],this.initialize()},data:function(){return{role_id:0,datatableLoading:!1,btnLoading:!1,headers:[{text:"",value:"foto"},{text:"USERNAME",value:"username",sortable:!0},{text:"NAME",value:"name",sortable:!0},{text:"EMAIL",value:"email",sortable:!0},{text:"NOMOR HP",value:"nomor_hp",sortable:!0},{text:"AKSI",value:"actions",sortable:!1,width:100}],expanded:[],search:"",daftar_users:[],daftar_permissions:[],permissions_selected:[],form_valid:!0,dialog:!1,dialogEdit:!1,dialogUserPermission:!1,editedIndex:-1,daftar_prodi:[],editedItem:{id:0,username:"",password:"",name:"",email:"",nomor_hp:"",prodi_id:[],created_at:"",updated_at:""},defaultItem:{id:0,username:"",password:"",name:"",email:"",nomor_hp:"",prodi_id:[],created_at:"",updated_at:""},rule_user_name:[function(t){return!!t||"Mohon untuk di isi nama User !!!"},function(t){return/^[A-Za-z\s]*$/.test(t)||"Nama User hanya boleh string dan spasi"}],rule_user_email:[function(t){return!!t||"Mohon untuk di isi email User !!!"},function(t){return/.+@.+\..+/.test(t)||"Format E-mail harus benar"}],rule_user_nomorhp:[function(t){return!!t||"Nomor HP mohon untuk diisi !!!"},function(t){return/^\+[1-9]{1}[0-9]{1,14}$/.test(t)||"Nomor HP hanya boleh angka dan gunakan kode negara didepan seperti +6281214553388"}],rule_user_username:[function(t){return!!t||"Mohon untuk di isi username User !!!"},function(t){return/^[A-Za-z_]*$/.test(t)||"Username hanya boleh string dan underscore"}],rule_user_password:[function(t){return!!t||"Mohon untuk di isi password User !!!"},function(t){return t.length>=8||"Minimial Password 8 karaketer"}],rule_user_passwordEdit:[function(t){return!(t.length>0)||(t.length>=8||"Minimial Password 8 karaketer")}]}},methods:{initialize:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.datatableLoading=!0,t.next=3,this.$ajax.get("/system/userskeuangan",{headers:{Authorization:this.TOKEN}}).then((function(t){var i=t.data;e.daftar_users=i.users,e.role_id=i.role.id,e.datatableLoading=!1}));case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),dataTableRowClicked:function(t){t===this.expanded[0]?this.expanded=[]:this.expanded=[t]},syncPermission:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.btnLoading=!0,t.next=3,this.$ajax.post("/system/users/syncallpermissions",{role_name:"keuangan"},{headers:{Authorization:this.$store.getters["auth/Token"]}}).then((function(){e.btnLoading=!1})).catch((function(){e.btnLoading=!1}));case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),showDialogTambahUserKeuangan:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.daftar_prodi=this.$store.getters["uiadmin/getDaftarProdi"],this.dialog=!0;case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),editItem:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var i=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.editedIndex=this.daftar_users.indexOf(e),e.password="",this.editedItem=Object.assign({},e),this.daftar_prodi=this.$store.getters["uiadmin/getDaftarProdi"],t.next=6,this.$ajax.get("/system/users/"+e.id+"/prodi",{headers:{Authorization:this.TOKEN}}).then((function(t){var e=t.data,s=e.daftar_prodi,a=[];s.forEach((function(t){a.push(t.id)})),i.editedItem.prodi_id=a}));case 6:this.dialogEdit=!0;case 7:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),setPermission:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var i=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.btnLoading=!0,this.$ajax.get("/system/setting/roles/"+this.role_id+"/permission",{headers:{Authorization:this.TOKEN}}).then((function(t){var e=t.data;i.daftar_permissions=e.permissions})).catch((function(){i.btnLoading=!1})),t.next=4,this.$ajax.get("/system/users/"+e.id+"/permission",{headers:{Authorization:this.TOKEN}}).then((function(t){var e=t.data;i.permissions_selected=e.permissions,i.btnLoading=!1})).catch((function(){i.btnLoading=!1}));case 4:this.dialogUserPermission=!0,this.editedItem=e;case 6:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),close:function(){var t=this;this.btnLoading=!1,this.dialog=!1,this.dialogEdit=!1,setTimeout((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1,t.$refs.frmdata.reset()}),300)},closeUserPermissions:function(){this.btnLoading=!1,this.permissions_selected=[],this.dialogUserPermission=!1},save:function(){var t=this;this.$refs.frmdata.validate()&&(this.btnLoading=!0,this.editedIndex>-1?this.$ajax.post("/system/userskeuangan/"+this.editedItem.id,{_method:"PUT",name:this.editedItem.name,email:this.editedItem.email,nomor_hp:this.editedItem.nomor_hp,username:this.editedItem.username,password:this.editedItem.password,prodi_id:JSON.stringify(Object.assign({},this.editedItem.prodi_id))},{headers:{Authorization:this.TOKEN}}).then((function(e){var i=e.data;Object.assign(t.daftar_users[t.editedIndex],i.user),t.close()})).catch((function(){t.btnLoading=!1})):this.$ajax.post("/system/userskeuangan/store",{name:this.editedItem.name,email:this.editedItem.email,nomor_hp:this.editedItem.nomor_hp,username:this.editedItem.username,password:this.editedItem.password,prodi_id:JSON.stringify(Object.assign({},this.editedItem.prodi_id))},{headers:{Authorization:this.TOKEN}}).then((function(e){var i=e.data;t.daftar_users.push(i.user),t.close()})).catch((function(){t.btnLoading=!1})))},deleteItem:function(t){var e=this;this.$root.$confirm.open("Delete","Apakah Anda ingin menghapus username "+t.username+" ?",{color:"red"}).then((function(i){i&&(e.btnLoading=!0,e.$ajax.post("/system/userskeuangan/"+t.id,{_method:"DELETE"},{headers:{Authorization:e.TOKEN}}).then((function(){var i=e.daftar_users.indexOf(t);e.daftar_users.splice(i,1),e.btnLoading=!1})).catch((function(){e.btnLoading=!1})))}))}},computed:Object(n["a"])({formTitle:function(){return-1===this.editedIndex?"TAMBAH USER KEUANGAN":"EDIT USER KEUANGAN"}},Object(o["b"])("auth",{ACCESS_TOKEN:"AccessToken",TOKEN:"Token"})),watch:{dialog:function(t){t||this.close()},dialogEdit:function(t){t||this.close()}},components:{SystemUserLayout:l["a"],ModuleHeader:d["a"],UserPermissions:c["a"]}},m=u,h=i("2877"),v=i("6544"),p=i.n(v),f=i("0798"),_=i("c6a6"),g=i("8212"),b=i("2bc5"),I=i("8336"),S=i("b0af"),x=i("99d9"),E=i("62ad"),A=i("a523"),k=i("8fea"),y=i("169a"),C=i("ce7e"),T=i("4bd4"),w=i("132d"),O=i("adda"),N=i("0fd9"),R=i("2fa4"),M=i("8654"),U=i("71d9"),$=i("2a7f"),P=Object(h["a"])(m,s,a,!1,null,null,null);e["default"]=P.exports;p()(P,{VAlert:f["a"],VAutocomplete:_["a"],VAvatar:g["a"],VBreadcrumbs:b["a"],VBtn:I["a"],VCard:S["a"],VCardActions:x["a"],VCardSubtitle:x["b"],VCardText:x["c"],VCardTitle:x["d"],VCol:E["a"],VContainer:A["a"],VDataTable:k["a"],VDialog:y["a"],VDivider:C["a"],VForm:T["a"],VIcon:w["a"],VImg:O["a"],VRow:N["a"],VSpacer:R["a"],VTextField:M["a"],VToolbar:U["a"],VToolbarTitle:$["a"]})}}]);
(this.webpackJsonpcac_site=this.webpackJsonpcac_site||[]).push([[17],{101:function(e,a,t){"use strict";t.d(a,"a",(function(){return s}));var c=t(0),n=t.n(c);t(107);a.b=function(e){var a=e.children;return n.a.createElement("div",{className:"cac_popup"},a)};var s=function(e){var a=e.children,t=e.className,s=void 0===t?"error":t,l=e.onClick,r=void 0===l?function(){return null}:l;return Object(c.useEffect)((function(){var e=setTimeout((function(){r()}),5e3);return function(){return clearTimeout(e)}})),n.a.createElement("div",{onClick:r,className:"cac_popup-top ".concat(s||"")},a)}},107:function(e,a,t){},519:function(e,a,t){},536:function(e,a,t){"use strict";t.r(a);var c=t(3),n=t.n(c),s=t(1),l=t(4),r=t(0),o=t.n(r),i=t(18),d=t(8),u=t(101),_=t(29),m=t(36);t(519);a.default=function(){var e=Object(r.useContext)(_.a),a=Object(r.useState)(e.classData.code),t=Object(l.a)(a,2),c=t[0],p=t[1],f=Object(r.useState)(!1),v=Object(l.a)(f,2),E=v[0],N=v[1],b=Object(r.useState)(!1),C=Object(l.a)(b,2),h=C[0],D=C[1],j=Object(r.useState)(""),O=Object(l.a)(j,2),x=O[0],g=O[1],k=Object(r.useContext)(m.a);k.fetchPreviousClasses(),k.fetchNextClasses();Object(r.useEffect)((function(){e.classData.validCode||!c||e.classData.fetching||N(!0)}),[e.classData.validCode,e.classData.fetching]);return o.a.createElement("div",{className:"cac_attendance cac_attendance--not-in-class"},e.classData.isDataAvailable&&o.a.createElement(i.a,{to:"/attendance/".concat(c)}),E&&o.a.createElement(u.a,{className:"".concat(x," error"),onClick:function(){h||(D(!0),g("close"),setTimeout((function(){N(!1),g(""),D(!1)}),300))}},"Wrong Code"),o.a.createElement("form",{className:"cac_attendance_form",onSubmit:function(a){return n.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:a.preventDefault(),e.fetching||e.setClassData((function(e){return Object(s.a)({},e,{code:c})}));case 2:case"end":return t.stop()}}))}},o.a.createElement("label",{htmlFor:"code",className:"cac_attendance_label"},"Enter Code"),o.a.createElement("input",{type:"text",name:"code",id:"code",className:"cac_attendance_text-area ".concat(e.classData.validCode?"":"cac_attendance_text-area--invalid"),required:!0,value:c,onChange:function(e){p(e.target.value)}}),o.a.createElement(d.a,{className:"cac_attendance_form_button "},"Continue")),o.a.createElement("div",{className:"cac_attendance_classes cac_attendance_classes--previous"},o.a.createElement("span",{className:"cac_attendance_classes_title"},"Next classes"),k.nextClasses.map((function(e,a){return o.a.createElement("div",{key:a,className:"cac_attendance_class-box"},o.a.createElement("span",{className:"cac_attendance_class_title"},e.title),o.a.createElement("span",{className:"cac_attendance_class_date"},e.date.toDate().toDateString()),o.a.createElement("span",{className:"cac_attendance_classes_code"},e.code),o.a.createElement("p",{className:"cac_attendance_classes_description"},e.description),o.a.createElement("span",{className:"cac_attendance_classes_counter"},e.attendances.length," attendants"))}))),o.a.createElement("div",{className:"cac_attendance_classes cac_attendance_classes--previous"},o.a.createElement("span",{className:"cac_attendance_classes_title"},"Previous classes"),k.previousClasses.map((function(e,a){return o.a.createElement("div",{key:a,className:"cac_attendance_class-box"},o.a.createElement("span",{className:"cac_attendance_class_title"},e.title),o.a.createElement("span",{className:"cac_attendance_class_date"},e.date.toDate().toDateString()),o.a.createElement("span",{className:"cac_attendance_classes_code"},e.code),o.a.createElement("p",{className:"cac_attendance_classes_description"},e.description),o.a.createElement("span",{className:"cac_attendance_classes_counter"},e.attendances.length," attendants"))}))))}}}]);
//# sourceMappingURL=17.bec343da.chunk.js.map
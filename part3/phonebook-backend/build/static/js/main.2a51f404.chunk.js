(this["webpackJsonp2.6-.2.10"]=this["webpackJsonp2.6-.2.10"]||[]).push([[0],{41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(2),r=t.n(c),a=t(17),u=t.n(a),o=t(8),i=t(3),s=t(4),l=t.n(s),d="/api/persons",j=function(){return l.a.get(d).then((function(e){return e.data}))},b=function(e){return l.a.post(d,e).then((function(e){return e.data}))},h=function(e){return l.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},f=function(e){return l.a.put("".concat(d,"/").concat(e.id),e).then((function(e){return e.data}))},m=t(0),O=function(e){var n=e.query,t=e.setQuery;return Object(m.jsxs)("div",{children:["search: ",Object(m.jsx)("input",{value:n,onChange:function(e){e.preventDefault(),t(e.target.value)}})]})},p=function(e){var n=e.newName,t=e.phone,c=e.handleSubmit,r=e.handleNoteChange,a=e.handlePhoneChange;return Object(m.jsxs)("form",{onSubmit:c,children:[Object(m.jsxs)("div",{children:["name: ",Object(m.jsx)("input",{value:n,onChange:r})]}),Object(m.jsxs)("div",{children:["number: ",Object(m.jsx)("input",{value:t,onChange:a})]}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{type:"submit",children:"add"})})]})},v=function(e){var n=e.persons,t=e.query,c=e.handleDelete;return""!==t?n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return Object(m.jsxs)("p",{children:[e.name,e.number]},e.id)})):n.map((function(e){return Object(m.jsxs)("p",{children:[e.name," ",e.number,Object(m.jsx)("button",{onClick:function(){return c(e.id)},children:"delete"})]},e.id)}))},x=function(e){var n=e.message,t=e.messageClass;return null===n?null:Object(m.jsx)("div",{className:t,children:n})},g=(t(41),function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),u=Object(i.a)(a,2),s=u[0],l=u[1],d=Object(c.useState)(""),g=Object(i.a)(d,2),w=g[0],y=g[1],C=Object(c.useState)(""),S=Object(i.a)(C,2),k=S[0],N=S[1],D=Object(c.useState)(null),q=Object(i.a)(D,2),T=q[0],P=q[1],E=Object(c.useState)(null),J=Object(i.a)(E,2),L=J[0],Q=J[1];Object(c.useEffect)((function(){j().then((function(e){r(e)}))}),[]);return Object(m.jsxs)("div",{children:[Object(m.jsx)("h2",{children:"Phonebook"}),Object(m.jsx)(O,{query:k,setQuery:N}),Object(m.jsx)("h2",{children:"add a new"}),Object(m.jsx)(x,{message:T,messageClass:L}),Object(m.jsx)(p,{phone:w,newName:s,handleNoteChange:function(e){l(e.target.value)},handlePhoneChange:function(e){y(e.target.value)},handleSubmit:function(e){e.preventDefault();var n=t.filter((function(e){return e.name===s}));if(n.length>0&&n[0].number!==w){if(window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?"))){var c=Object(o.a)(Object(o.a)({},n[0]),{},{number:w});f(c).then((function(e){null===e?(Q("error"),P("".concat(c.name," has already been removed from the server")),setTimeout((function(){P(null)}),5e3)):r(t.map((function(n){return n.id!==c.id?n:e})))})).catch((function(e){Q("error"),P(e.response.data.error),setTimeout((function(){P(null)}),5e3)}))}}else if(n.length>0&&n[0].number===w)alert("".concat(s," is already added to phonebook"));else{b({name:s,number:w}).then((function(e){r(t.concat(e)),Q("notif"),P("".concat(e.name," added successfully")),setTimeout((function(){P(null)}),5e3)})).catch((function(e){Q("error"),P(e.response.data.error),setTimeout((function(){P(null)}),5e3)}))}l(""),y("")}}),Object(m.jsx)("h2",{children:"Numbers"}),Object(m.jsx)(v,{persons:t,query:k,handleDelete:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Do you want to delete ".concat(n.name,"?"))&&(r(t.filter((function(n){return n.id!==e}))),h(e))}})]})});u.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(g,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.2a51f404.chunk.js.map
const e=document.querySelector("button[data-start]"),t=document.querySelector("button[data-stop]"),d=document.querySelector("body");e.disabled=!1,t.disabled=!0;let o=null;e.addEventListener("click",(function(){o=setInterval((()=>{e.disabled=!0,t.disabled=!1,d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.addEventListener("click",(function(){e.disabled=!1,t.disabled=!0,clearInterval(o),console.log("Timer stopped")}));
//# sourceMappingURL=01-color-switcher.74e17c38.js.map

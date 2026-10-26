
(()=>{"use strict";
const reason=document.querySelector("#reason-picker"),state=document.querySelector("#state-picker"),button=document.querySelector("#open-path"),status=document.querySelector("#pathway-status"),search=document.querySelector("#state-search"),tiles=[...document.querySelectorAll("[data-state-tile]")];
const ready={"marriage":"The 50 state-specific marriage guide collection is prepared. Full instructions are reserved for verified paid customers. Checkout is not active until the website-access delivery is tested.","divorce":"State-specific divorce and former-name restoration instructions are being researched. This pathway is not available to purchase.","court-order":"State-specific court-order petitions, hearings and fees remain under review. This pathway is not available to purchase.","personal-choice":"The state-specific court petition process for personal choice name changes is in development. No completed paid guide is offered.","gender-affirming":"State-specific gender-affirming name change guidance is in development. No completed paid guide is offered.","adoption":"State-specific adoption and family name change guidance is in development. No completed paid guide is offered.","records-correction":"State-specific record correction guidance is in development. No completed paid guide is offered."};
const label=()=>state?.selectedOptions?.[0]?.textContent||"your state";
function announce(slug){const kind=reason.value;const place=(state.value===slug?label():tiles.find(x=>x.dataset.stateTile===slug)?.querySelector("strong")?.textContent)||"your state";
if(kind==="marriage"){window.location.assign("./states/"+encodeURIComponent(slug)+"/");return;}
status.innerHTML="<h3>"+place+" · Pathway in development</h3><p>"+ready[kind]+" General federal guidance is available from <a href='https://www.usa.gov/name-change' target='_blank' rel='noopener noreferrer'>USAGov</a>.</p>";
status.setAttribute("aria-hidden","false");status.scrollIntoView({behavior:"smooth",block:"nearest"});
}
button?.addEventListener("click",()=>{if(state.value)announce(state.value);else state.focus()});
state?.addEventListener("change",()=>{button.disabled=!state.value;status.setAttribute("aria-hidden","true");});
reason?.addEventListener("change",()=>{status.setAttribute("aria-hidden","true");const isMarriage=reason.value==="marriage";tiles.forEach(t=>{t.querySelector("small").textContent=isMarriage?"Marriage guide · Locked":"Pathway · In development";});});
tiles.forEach(t=>t.addEventListener("click",e=>{if(reason.value!=="marriage"){e.preventDefault();const slug=t.dataset.stateTile;state.value=slug;announce(slug);}}));
search?.addEventListener("input",()=>{const query=search.value.trim().toLowerCase();let shown=0;tiles.forEach(t=>{const visible=t.dataset.search.includes(query);t.hidden=!visible;if(visible)shown++;});document.querySelector("#state-count").textContent=shown+" of 50 states";});
const params=new URLSearchParams(location.search),picked=params.get("state");if(picked&&tiles.some(t=>t.dataset.stateTile===picked)){state.value=picked;button.disabled=false}
})();

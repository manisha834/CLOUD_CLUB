/* ===== Cloud Computing Club — Global JS ===== */
(function(){
 // Theme toggle
const root = document.documentElement;
const saved = localStorage.getItem("cc-theme");

if (saved) root.setAttribute("data-theme", saved);

document.addEventListener("click", e => {
    const t = e.target.closest(".theme-toggle");
    if (!t) return;

    const cur = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", cur);
    localStorage.setItem("cc-theme", cur);

    t.querySelector("i").className =
        cur === "dark"
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";
});

// Initial setup
document.addEventListener("DOMContentLoaded", () => {

    // Theme icon
    const cur = root.getAttribute("data-theme") || "light";

    document.querySelectorAll(".theme-toggle i").forEach(i => {
        i.className =
            cur === "dark"
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";
    });

    // Active page
    const path = location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(a => {
        if (a.getAttribute("href") === path) {
            a.classList.add("active");
        }
    });

    // Mobile Menu
    const menuBtn = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }

});
/* ===== Countdown ===== */
function initCountdown(targetDate,selector){
  const el=document.querySelector(selector);
  if(!el) return;
  const target=new Date(targetDate).getTime();
  const fields={d:el.querySelector('[data-d]'),h:el.querySelector('[data-h]'),m:el.querySelector('[data-m]'),s:el.querySelector('[data-s]')};
  function tick(){
    const diff=target-Date.now();
    if(diff<=0){el.innerHTML='<p style="font-size:1.3rem">🎉 The event is live!</p>';return;}
    const d=Math.floor(diff/86400000);
    const h=Math.floor(diff/3600000)%24;
    const m=Math.floor(diff/60000)%60;
    const s=Math.floor(diff/1000)%60;
    fields.d.textContent=String(d).padStart(2,'0');
    fields.h.textContent=String(h).padStart(2,'0');
    fields.m.textContent=String(m).padStart(2,'0');
    fields.s.textContent=String(s).padStart(2,'0');
  }
  tick();setInterval(tick,1000);
}

/* ===== Form Validation ===== */
function validateForm(formId,rules,onSuccess){
  const form=document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    let ok=true;
    form.querySelectorAll('.error-msg').forEach(s=>s.textContent='');
    for(const field in rules){
      const input=form.querySelector(`[name="${field}"]`);
      const errEl=form.querySelector(`[data-error="${field}"]`);
      const val=(input.value||'').trim();
      const rule=rules[field];
      let msg='';
      if(rule.required && !val) msg='This field is required.';
      else if(rule.minLength && val.length<rule.minLength) msg=`Minimum ${rule.minLength} characters.`;
      else if(rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) msg='Please enter a valid email.';
      else if(rule.phone && !/^[+\d][\d\s\-()]{6,}$/.test(val)) msg='Please enter a valid phone.';
      if(msg){ok=false;if(errEl) errEl.textContent=msg;}
    }
    if(ok){
      const succ=form.querySelector('.success-msg');
      if(succ){succ.style.display='block';setTimeout(()=>succ.style.display='none',5000);}
      form.reset();
      if(onSuccess) onSuccess();
    }
  });
}

/* ===== FAQ Accordion ===== */
function initFaq(){
  document.querySelectorAll('.faq-q').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item=btn.parentElement;
      item.classList.toggle('open');
    });
  });
}

/* ===== Gallery Slider ===== */
function initSlider(){
  const slider=document.querySelector('.slider');
  if(!slider) return;
  const slides=slider.querySelector('.slides');
  const imgs=slides.querySelectorAll('img');
  const dotsBox=document.querySelector('.dots');
  let idx=0;
  imgs.forEach((_,i)=>{
    const d=document.createElement('span');
    d.className='dot'+(i===0?' active':'');
    d.addEventListener('click',()=>go(i));
    dotsBox?.appendChild(d);
  });
  function go(i){
    idx=(i+imgs.length)%imgs.length;
    slides.style.transform=`translateX(-${idx*100}%)`;
    dotsBox?.querySelectorAll('.dot').forEach((d,j)=>d.classList.toggle('active',j===idx));
  }
  slider.querySelector('.prev')?.addEventListener('click',()=>go(idx-1));
  slider.querySelector('.next')?.addEventListener('click',()=>go(idx+1));
  setInterval(()=>go(idx+1),5000);
}

document.addEventListener('DOMContentLoaded',()=>{
  initFaq();
  initSlider();

  // Default countdown target: 45 days from now
  const evDate=new Date();
  evDate.setDate(evDate.getDate()+45);
  initCountdown(evDate,'#countdown');

  // Membership form
  validateForm('membership-form',{
    name:{required:true,minLength:2},
    email:{required:true,email:true},
    phone:{required:true,phone:true},
    university:{required:true},
    interest:{required:true}
  });

  // Contact form
  validateForm('contact-form',{
    name:{required:true,minLength:2},
    email:{required:true,email:true},
    subject:{required:true,minLength:3},
    message:{required:true,minLength:10}
  });

});   // <-- This was missing


})(); // <-- Keep this

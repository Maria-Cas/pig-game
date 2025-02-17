(function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))v(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const y of t.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&v(y)}).observe(document,{childList:!0,subtree:!0});function C(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function v(e){if(e.ep)return;e.ep=!0;const t=C(e);fetch(e.href,t)}})();document.querySelector("#app").innerHTML=`
 <main>
      <section class="player player--0 player--active">
        <h2 class="name" id="name--0">Player 1</h2>
        <p class="score" id="score--0">43</p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--0">3</p>
        </div>
      </section>
      <section class="player player--1">
        <h2 class="name" id="name--1">Player 2</h2>
        <p class="score" id="score--1">24</p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--1">5</p>
        </div>
      </section>

      <img src="dice-5.png" alt="Playing dice" class="dice" />
      <button class="btn btn--new">🔄 New game</button>
      <button class="btn btn--roll">🎲 Roll dice</button>
      <button class="btn btn--hold">📥 Hold</button>
    </main>
`;const o=document.querySelector(".player--0"),l=document.querySelector(".player--1"),m=document.querySelector("#score--0"),f=document.querySelector("#score--1"),a=document.querySelector("#current--0"),d=document.querySelector("#current--1"),S=document.querySelector(".btn--new"),b=document.querySelector(".btn--hold"),u=document.querySelector(".btn--roll"),i=document.querySelector(".dice");let s,n,r;const L=()=>{s=[0,0],n=0,r=0,i.classList.add("hidden"),m.textContent=0,f.textContent=0,a.textContent=0,d.textContent=0};L();u.addEventListener("click",h);function h(){const c=Math.trunc(Math.random()*6)+1;i.classList.remove("hidden"),i.src=`dice-${c}.png`,c!==1?x(c):g()}function x(c){n+=c,r===0?a.textContent=n:d.textContent=n}function g(){q(),o.classList.toggle("player--active"),l.classList.toggle("player--active"),r=r===0?1:0}function q(){n=0,a.textContent=0,d.textContent=0}function w(){s[r]+=n,r===0?m.textContent=s[r]:f.textContent=s[r],s[r]>=100?(r===0?(o.classList.add("player--winner"),o.classList.remove("player--active")):(l.classList.add("player--winner"),l.classList.remove("player--active")),i.classList.add("hidden"),u.disabled=!0,b.disabled=!0):g()}function P(){o.classList.remove("player--winner"),l.classList.remove("player--winner"),o.classList.add("player--active"),l.classList.remove("player--active"),m.textContent=0,f.textContent=0,a.textContent=0,d.textContent=0,s=[0,0],n=0,r=0,i.classList.add("hidden"),u.disabled=!1,b.disabled=!1,L()}u.addEventListener("click",h);b.addEventListener("click",w);S.addEventListener("click",P);

let secs=40*60,running=false,iv=null;
const disp=document.getElementById('timer-disp'),pbar=document.getElementById('pbar'),tbtn=document.getElementById('tbtn');
function pad(n){return String(n).padStart(2,'0');}
function render(){
  disp.textContent=pad(Math.floor(secs/60))+':'+pad(secs%60);
  pbar.style.width=((40*60-secs)/(40*60)*100)+'%';
  disp.className=secs<=300?'danger':secs<=600?'warn':'';
}
function toggleTimer(){
  if(running){clearInterval(iv);running=false;tbtn.textContent='▶';}
  else{iv=setInterval(()=>{if(secs>0){secs--;render();}else{clearInterval(iv);running=false;tbtn.textContent='▶';}},1000);running=true;tbtn.textContent='⏸';}
}
function resetTimer(){clearInterval(iv);running=false;secs=40*60;tbtn.textContent='▶';render();}
function go(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});}
render();
const btns=document.querySelectorAll('.nav-pill');
const ids=['b1','b2','b3','b4','b5','refs'];
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const i=ids.indexOf(e.target.id);btns.forEach(b=>b.classList.remove('active'));if(i>=0)btns[i].classList.add('active');}});},{threshold:0.25});
ids.forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el);});
document.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();toggleTimer();}if(e.code==='KeyR')resetTimer();});

// ── Interactive cell slide ──
function selectStep(el, group) {
  document.querySelectorAll(group === 'fv' ? '.fv-step' : '.layer-item')
    .forEach(e => e.classList.remove('active'));
  el.classList.add('active');
  const detail = document.getElementById(group === 'fv' ? 'fv-detail' : 'layer-detail');
  detail.innerHTML = '<p style="font-size:0.84rem; color:var(--ink); line-height:1.65;">' + el.dataset.detail + '</p>';
}
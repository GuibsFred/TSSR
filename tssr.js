const MODULES=['Historique de Debian','Installation de Debian','Démarrage de Debian','Debian en mode maintenance','Gestion du réseau','Gestion des paquets','Espaces de stockage','LVM'];
const MENU=[['Accueil','⌂'],['Cours','▤'],['Outils & Utilitaires TSSR','⚒'],['Fiches de révision','▣'],['QCM interactifs','✓'],['Commandes','⌘'],['Cheatsheets','≡'],['Le Journal TSSR','◷'],['Homelab','▥']];
const $=s=>document.querySelector(s);
$('#menu').innerHTML=MENU.map(([name,icon])=>`<a href="${name==='Cours'?'#cours':name==='Fiches de révision'?'#revision':name==='QCM interactifs'?'#qcm':'#'}" class="${name==='Cours'?'on':''}" ${!['Cours','Fiches de révision','QCM interactifs'].includes(name)?'title="Page non intégrée à ce prototype"':''}><span aria-hidden="true">${icon}</span>${name}</a>`).join('');
$('#modules').innerHTML=MODULES.map((name,i)=>`<a href="#" title="Ce module n’est pas intégré à ce prototype" class="${i===2?'on':''}"><i>${String(i+1).padStart(2,'0')}</i>${name}</a>`).join('');
$('#prog').innerHTML='<b>Progression du module</b><div>Démo de cours · module 03</div>';
$('#burger').addEventListener('click',()=>$('.side').classList.toggle('open'));
const key='tssr-demo-03';
document.querySelectorAll('.checks input').forEach((input,i)=>{try{const stored=localStorage.getItem(key+'-'+i);if(stored!==null)input.checked=stored==='1'}catch{}input.addEventListener('change',()=>{try{localStorage.setItem(key+'-'+i,input.checked?'1':'0')}catch{}})});
const tokenize=txt=>{const parts=txt.trim().split(/\s+/);return parts.map((p,i)=>`<span class="${i===0?'cmd-name':i===1?'cmd-opt':'cmd-arg'}">${p.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')}</span>`).join(' ')};
document.querySelectorAll('code.cmd').forEach(c=>{const txt=c.textContent;c.dataset.command=txt;c.innerHTML=tokenize(txt)});
document.querySelectorAll('.cp').forEach(b=>b.addEventListener('click',async()=>{const txt=b.closest('tr').querySelector('.cmd').dataset.command;try{await navigator.clipboard.writeText(txt);b.textContent='✓';setTimeout(()=>b.textContent='⧉',1200)}catch{b.textContent='!'}}));
$('#q').addEventListener('input',e=>{const query=e.target.value.toLowerCase();document.querySelectorAll('.cmds tbody tr').forEach(r=>r.hidden=!r.textContent.toLowerCase().includes(query))});
function switchTab(target){document.querySelectorAll('.tabs a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+target));$('#qcm').hidden=target!=='qcm';$('.content').hidden=target==='qcm';if(target==='revision'){$('.content').hidden=false;$('#revision').scrollIntoView({behavior:'smooth',block:'start'})}}
document.querySelectorAll('.tabs a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();switchTab(a.hash.slice(1))}));
document.querySelectorAll('#menu a').forEach(a=>{if(a.hash==='#revision'||a.hash==='#qcm'||a.hash==='#cours')a.addEventListener('click',e=>{e.preventDefault();switchTab(a.hash.slice(1))})});
$('#checkQcm').addEventListener('click',()=>{const v=document.querySelector('input[name=qcm1]:checked')?.value;$('#qcmResult').textContent=!v?'Sélectionne une réponse.':v==='b'?'Correct : systemd est généralement le processus PID 1.':'Pas tout à fait. Réponse attendue : systemd.'});

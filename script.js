const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const FLAVOURS={
 Pink:{color:"#ff9fc4",label:"Pink"},Raspberry:{color:"#e94d83",label:"Raspberry"},Blueberry:{color:"#86b9ff",label:"Blueberry"},
 Starberry:{color:"#ff9dad",label:"Starberry"},Regular:{color:"#ffe078",label:"Regular"},Cherry:{color:"#f35d73",label:"Cherry"},
 Watermelon:{color:"#ff8b91",label:"Watermelon"},Lychee:{color:"#ffd5dc",label:"Lychee"},Pineapple:{color:"#ffd05b",label:"Pineapple"},
 Mango:{color:"#ffad55",label:"Mango"},Passionfruit:{color:"#ffcc54",label:"Passionfruit"},Guava:{color:"#ff9fbd",label:"Guava"},
 Dragonfruit:{color:"#f36fa5",label:"Dragonfruit"},Peach:{color:"#ffc18f",label:"Peach"},Kiwi:{color:"#a9d65b",label:"Kiwi"},
 Coconut:{color:"#fff0df",label:"Coconut"},Tamarind:{color:"#9b765c",label:"Tamarind"},BloodOrange:{color:"#f26d3d",label:"Blood orange"}
};
const TOPPINGS=[
 ["whip","Cloud cream"],["cherry","Cherry pieces"],["peel","Lemon peel curls"],["slice","Lemon slice"],["ice","Extra ice"],
 ["umbrella","Paper umbrella"],["sparkles","Sugar sparkle dust"],["sprinkles","Rainbow sprinkles"],["mint","Mint leaves"],
 ["pearls","Fruit pearls"],["sugar","Crystal sugar"],["flower","Tiny flower"],["fruit","Fruit cubes"],["jelly","Jelly stars"]
];
const TOPPING_LABELS=Object.fromEntries(TOPPINGS);
const TOPART={whip:"cream",cherry:"cherries",peel:"peel",slice:"slice",ice:"ice",umbrella:"umbrella",sparkles:"sparkles",sprinkles:"sprinkles",mint:"mint",pearls:"pearls",sugar:"sugar",flower:"flower",fruit:"fruit",jelly:"jelly"};
const FLAVOUR_UNIT_COST=0.6, TOPPING_UNIT_COST=0.4, SHOP_BATCH=5, RUSH_MULTIPLIER=1.5, EMERGENCY_QTY=3, STARTING_STOCK=4;
const CHARACTERS=[
 ["Mochi","happy","#8d6d59","#ff9fc4",55,["That looks lovely!","I hope you had a nice day too.","This is exactly what I needed.","The little details are adorable."]],
 ["Sunny","excited","#f2a45f","#ffd36b",46,["I'M SO READY.","This better be the brightest lemonade in town!","I have been thinking about lemonade for three hours.","I am vibrating with anticipation."]],
 ["Boba","sassy","#4e4652","#c8b6ff",35,["Make it cute. I have standards.","I can already tell if this is going to disappoint me.","Surprise me, but not in a bad way.","I want elegance in a cup."]],
 ["Pip","shy","#7c5b4d","#a9e8d2",62,["Um... hi. Extra ice, please.","Sorry for being specific.","Thank you for being patient with me.","This is very nice."]],
 ["Clover","chill","#6e855f","#a9e8d2",76,["No rush. I'm just enjoying the vibes.","Whatever you make will probably be fine.","I brought my own playlist.","This place is peaceful."]],
 ["Mimi","angry","#5a4544","#ff879b",29,["WHERE is my drink?","Please do not test my patience.","I have places to be.","This service better improve."]],
 ["Peachy","dramatic","#c37e9a","#ffb6c9",32,["I need a beverage worthy of my emotional state.","Make it dramatic.","If the straw is crooked I may perish.","This is a very important lemonade."]],
 ["Riri","impressed","#5c7591","#a9d9ff",49,["Interesting... I am watching.","Oh! You actually did that correctly.","Okay, this is clever.","I respect the craftsmanship."]],
 ["Noodle","confused","#c2a56e","#ffe078",58,["Did I order blueberry? Probably.","I forgot what I wanted, so surprise me.","Why is the spoon over there?","I trust the process. I think."]],
 ["Berry","sleepy","#766b85","#c7b9ff",70,["Zzz... lemonade...","I am awake. Technically.","Please make it refreshing enough to wake me.","That was worth opening my eyes for."]],
 ["Taffy","sweet","#d99b82","#ffb2c8",67,["Please take care of yourself too!","I brought you a compliment.","This shop feels cozy.","Thank you so much!"]],
 ["Rocco","competitive","#8a6348","#8fc7ff",41,["I bet I can guess the flavour.","I am timing you. Respectfully.","Let's see what you've got.","Do not underestimate me."]],
 ["Fizz","chaotic","#e1c0a4","#ff9f9f",38,["BEEEEE FREEEEEEEE~~~~","I want bubbles. MANY bubbles.","Can the drink scream? No? Fine.","I have made several questionable decisions today."]],
 ["Dottie","grandma-ish","#b48d77","#e7b7ff",73,["Surprise me, sweetheart.","Make it how you would make it for yourself.","A little flower would be charming.","Bless this tiny cup."]],
 ["Pixel","techy","#756e85","#9fdcf4",44,["Please optimize the ice-to-liquid ratio.","My brain says blueberry.","Can I get a bug-free beverage?","I am collecting data on lemonade."]],
 ["Beans","hungry","#8f674f","#ffbd79",39,["I could eat the whole counter.","I ordered a drink but now I want fries.","Please hurry. My stomach has opinions.","This is an emergency beverage situation."]],
 ["Lulu","fancy","#7a5b78","#f1c2ff",52,["I require sophistication.","A tasteful umbrella, darling.","Could you make it look expensive?","The garnish must have confidence."]],
 ["Gizmo","mischievous","#765f50","#98e4cf",43,["I have a secret order.","Don't tell anyone about the jelly stars.","What if we add... EVERYTHING?","Hehehe."]],
 ["Sage","philosophical","#607463","#a8dcbf",64,["Does lemonade taste better if you believe?","Tiny Timmy's toes twitched tonight.","What is a topping, really?","We are all just cups in a large café."]],
 ["Kiki","hyper","#7d5973","#ff9eb8",36,["FASTER! FASTER!","I have waited approximately one thousand years.","Sparkles. NOW.","I can hear the ice cubes calling me."]],
 ["Moss","mysterious","#5e6a5f","#9bd5c0",60,["I know what you did last lemonade.","Make it green. Do not ask why.","The umbrella knows too much.","Interesting. Very interesting."]],
 ["Nova","romantic","#6c6c8e","#ffadc7",50,["Something sweet, please.","This lemonade is for someone special.","Add a flower if you can.","I hope today is gentle."]],
 ["Toby","goofy","#8b6d4f","#ffd873",48,["I want these seasoned with my grandmother's ashes. 💀","Just kidding. Probably.","Can the cup wear a hat?","My socks are mismatched on purpose."]],
 ["Mallow","anxious","#ad876f","#c7b4e8",57,["Sorry! I changed my mind twice.","Is everything okay?","I really hope I ordered correctly.","Thank you for not judging me."]],
 ["Rex","judgy","#6a5a54","#d9b07c",34,["I have reviewed cafés before.","The straw placement matters.","I notice everything.","Convince me."]],
 ["Coco","sunny","#8b5e46","#ffcd72",61,["What a gorgeous day.","I love tiny shops.","Add whatever makes you happy.","This already smells good."]],
 ["Wisp","weird","#7b7390","#b9b0ff",45,["I would like a normal lemonade. Actually, make it suspicious.","Do you sell lemonade for ghosts?","My shadow wants raspberry.","Do not tell the bees I am here."]],
 ["Tinker","inventive","#6d7660","#8bd6bd",53,["Can we invent a new topping?","I have a hypothesis.","The cup needs engineering.","This could be magnificent."]],
 ["Pudding","dramatic","#a56f75","#ffb4a6",40,["I need this drink to fix my entire afternoon.","I have suffered enough.","Make it beautiful.","The garnish is carrying my hopes."]],
 ["Maple","friendly","#8b634e","#f1b777",68,["Hello! How's your day going?","I hope you get a break too.","This place is adorable.","Thank you!"]]
];
const EXTRA_CUSTOMERS=[
 ["Juniper","calm","#687d72","#c8e8d9",74,["Take your time.","I like watching the little machines.","This place has a nice rhythm."]],
 ["Waffle","goofy","#9a7254","#ffd18a",47,["I have a waffle emergency.","Can my lemonade have a tiny personality?","My spoon is emotionally unavailable."]],
 ["Marzipan","fancy","#73566f","#eac8ff",45,["Garnish it elegantly.","I expect theatrical presentation.","A refined beverage, please."]],
 ["Orbit","spacey","#6c6f9c","#a8c5ff",58,["The moon approved this flavour.","I seek a beverage from the stars.","Add something cosmic."]],
 ["Cricket","hyper","#6e8057","#b8e67d",33,["I have SO MANY QUESTIONS.","Can we go faster?","I can hear the fizz from here!"]],
 ["Velvet","judgy","#5f505a","#e0a7c1",37,["Presentation is everything.","I am observing closely.","This better be worth the queue."]],
 ["Button","sweet","#9c7766","#ffd2df",69,["You are doing great.","A little umbrella would make my day.","Thank you for making this cute."]],
 ["Comet","chaotic","#74617e","#ffadcc",31,["I ordered chaos.","What if the cup had two straws?","I may have made a mistake."]],
 ["Maple II","friendly","#89634e","#f2bb76",71,["Hi! I love little cafés.","Surprise me.","I hope you have a lovely shift."]],
 ["Scribble","inventive","#687766","#a7e2c7",52,["Invent something new.","I want a flavour nobody has tried.","Can we make it look like a garden?"]],
 ["Pancake","sleepy","#796d7d","#c9b9ed",78,["Please whisper to the lemonade.","I need this drink and a nap.","Zzz... extra ice..."]],
 ["Nectar","mysterious","#5e6b70","#9ad4d0",49,["The lemon knows.","I cannot explain the umbrella.","Make it secret."]],
 ["Tutu","dramatic","#8d6179","#ffb0cf",39,["I need a beverage with a plot.","This lemonade is my main character.","Give it a grand finale."]],
 ["Sprout","cheerful","#69835e","#b6df7d",66,["Hello tiny café!","I love fruit.","Add something fresh!"]]
];
CHARACTERS.push(...EXTRA_CUSTOMERS);
const REVIEW_PREFIX=["The drink was","I came here for lemonade and","Honestly,","I cannot believe that","My friends warned me but","I ordered one thing and"];
const REVIEW_GOOD=["so cute I nearly cried.","surprisingly lovely.","actually excellent.","better than I expected.","fresh and cheerful.","a tiny cup of happiness."];
const REVIEW_BAD=["a little disappointing.","not what I asked for.","chaos in a cup.","a tragedy with a straw.","more confusing than my group chat.","something the bees would complain about."];
const WILD=[
 "I wanted ashes on this.","I wanted toenails.","BEEEEE FREEEEEEEE~~~~","Tiny Timmy's toes twitched tonight.","Can you make it taste like a Tuesday?",
 "My pet rock says blueberry.","Please make it look expensive. I have three dollars.","Can the umbrella be emotionally supportive?",
 "I would like one lemonade and one tiny existential crisis.","My left sock has a business degree.","Do NOT tell the bees I am here.",
 "I need 4% more mystery.","Can you make the ice cubes face north?","This drink is for my imaginary lawyer.",
 "I accidentally joined a circus this morning.","The moon told me to order guava.","I have never trusted a pineapple.",
 "If this doesn't sparkle, I'm writing a strongly worded poem.","I would like the cup to feel powerful.",
 "Season it with the concept of regret.","My hamster has very strong opinions about fizz."
];
const COSMETICS=[
 {id:"classic",name:"Classic Cup",cost:0,border:"#ffffff",straw:"#ef86a9",desc:"The original house cup."},
 {id:"pastel",name:"Pastel Dream",cost:15,border:"#ffd1e8",straw:"#c9a9ff",desc:"Soft, sweet, and a little dreamy."},
 {id:"gold",name:"Golden Rim",cost:35,border:"#ffd76b",straw:"#ffb84d",desc:"For customers with taste."},
 {id:"mint",name:"Mint Sparkle",cost:50,border:"#a8e8d2",straw:"#4fc79b",desc:"Cool, fresh, and a little sparkly.",sparkly:true}
];

// Web Audio SFX — synthesized on the fly, no external audio files needed.
const SFX=(()=>{
 let ctx=null, muted=false;
 try{muted=localStorage.getItem("lemonadeMuted")==="1"}catch(e){}
 function ensureCtx(){
   if(!ctx){try{ctx=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return null}}
   if(ctx&&ctx.state==="suspended")ctx.resume().catch(()=>{});
   return ctx;
 }
 function tone(freq,dur,type="sine",gainVal=0.15,delay=0){
   if(muted)return;let c=ensureCtx();if(!c)return;
   let t0=c.currentTime+delay, osc=c.createOscillator(), gain=c.createGain();
   osc.type=type;osc.frequency.setValueAtTime(freq,t0);
   gain.gain.setValueAtTime(0,t0);gain.gain.linearRampToValueAtTime(gainVal,t0+0.02);gain.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
   osc.connect(gain);gain.connect(c.destination);osc.start(t0);osc.stop(t0+dur+0.02);
 }
 function sweep(f1,f2,dur,type="sawtooth",gainVal=0.1){
   if(muted)return;let c=ensureCtx();if(!c)return;
   let t0=c.currentTime, osc=c.createOscillator(), gain=c.createGain();
   osc.type=type;osc.frequency.setValueAtTime(f1,t0);osc.frequency.exponentialRampToValueAtTime(f2,t0+dur);
   gain.gain.setValueAtTime(0,t0);gain.gain.linearRampToValueAtTime(gainVal,t0+0.03);gain.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
   osc.connect(gain);gain.connect(c.destination);osc.start(t0);osc.stop(t0+dur+0.02);
 }
 function noise(dur,filterFreq=1200,gainVal=0.09){
   if(muted)return;let c=ensureCtx();if(!c)return;
   let t0=c.currentTime, bufSize=Math.floor(c.sampleRate*dur);
   let buf=c.createBuffer(1,bufSize,c.sampleRate), data=buf.getChannelData(0);
   for(let i=0;i<bufSize;i++)data[i]=(Math.random()*2-1)*(1-i/bufSize);
   let src=c.createBufferSource();src.buffer=buf;
   let filt=c.createBiquadFilter();filt.type="bandpass";filt.frequency.value=filterFreq;
   let gain=c.createGain();gain.gain.setValueAtTime(gainVal,t0);gain.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
   src.connect(filt);filt.connect(gain);gain.connect(c.destination);src.start(t0);
 }
 return{
   pour(){noise(0.4,900,0.08)},
   fizz(){noise(0.5,2200,0.06)},
   pop(){tone(700,0.12,"triangle",0.12)},
   wrong(){tone(180,0.25,"sawtooth",0.1)},
   shake(){tone(880,0.08,"sine",0.1);tone(1175,0.09,"sine",0.09,0.07)},
   complete(){[660,880,1100].forEach((f,i)=>tone(f,0.18,"sine",0.12,i*0.08))},
   deliver(good){if(good){tone(880,0.08,"square",0.12,0);tone(1320,0.15,"square",0.12,0.08)}else{tone(220,0.3,"sawtooth",0.1)}},
   streak(n){let base=660+Math.min(n,10)*40;tone(base,0.1,"sine",0.13);tone(base*1.5,0.12,"sine",0.1,0.06)},
   vip(){[523,659,784,1046].forEach((f,i)=>tone(f,0.2,"sine",0.13,i*0.09))},
   purchase(){tone(520,0.09,"triangle",0.11);tone(780,0.12,"triangle",0.1,0.06)},
   dayComplete(){[523,659,784,1046,784,1046].forEach((f,i)=>tone(f,0.22,"triangle",0.12,i*0.12))},
   leave(){sweep(500,150,0.4,"sawtooth",0.08)},
   toggleMute(){muted=!muted;try{localStorage.setItem("lemonadeMuted",muted?"1":"0")}catch(e){}return muted},
   isMuted(){return muted}
 };
})();
function shade(hex,amt){
 let c=hex.replace('#',''), num=parseInt(c,16);
 let r=Math.max(0,Math.min(255,(num>>16)+amt)), g=Math.max(0,Math.min(255,((num>>8)&0xff)+amt)), b=Math.max(0,Math.min(255,(num&0xff)+amt));
 return "#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}

let day=1, money=0, stars=0, rating=5, orderNo=0, activeId=null, selectedDrinkId=null, selectedFlavour=null, stagedOrderId=null, served=0, totalServed=0, streak=0, bestStreak=0, target=dayTarget(), orders=[], reviews=[], timer=null, orderTicker=null, tutorialStep=0, paused=false, lastDrinkKey=null;
let upgrades={speed:0,patience:0,tip:0,quality:0,decor:0}, staff={mira:false,pepper:false}, achievements={}, lore=[];
let unlockedCosmetics=["classic"], activeCosmetic="classic";
let inventory={};
Object.keys(FLAVOURS).forEach(k=>inventory["flavour:"+k]=STARTING_STOCK);
TOPPINGS.forEach(([k])=>inventory["top:"+k]=STARTING_STOCK);
let dayStats={fastest:null,closest:null,wildSurvived:0,bestTip:{name:null,amount:0}};
let pourCount=0, iceCount=0, shakeCount=0;
function dayTarget(){return 4+Math.floor(Math.random()*4)+Math.min(day-1,5)}
function rand(a){return a[Math.floor(Math.random()*a.length)]}
function customerFor(id){return CHARACTERS[(id-1)%CHARACTERS.length]}
function weirdLine(){
 let chance=Math.min(.38,.1+day*.025);
 if(Math.random()<chance){
   let base=rand(WILD);
   if(Math.random()<.25) base+=" "+rand(["Please do not ask follow-up questions.","I am being completely serious.","This is between us.","The bees told me this."]);
   return base;
 }
 return null
}
function makeOrder(){
 orderNo++;let c=customerFor(orderNo), keys=Object.keys(FLAVOURS), f=rand(keys), n=Math.min(1+Math.floor(Math.random()*3),Math.min(4,1+Math.floor(day/2)));
 let tops=[...TOPPINGS].sort(()=>Math.random()-.5).slice(0,n).map(x=>x[0]);
 let wild=weirdLine();
 let isVIP=orderNo>1&&Math.random()<Math.min(0.05+day*0.01,0.15);
 return {id:orderNo,name:c[0],hair:c[2],shirt:c[3],patience:180,left:180,timerStarted:false,flavour:f,toppings:tops,fizz:Math.random()<.55,status:"waiting",made:[],score:0,comment:wild||rand(c[5]),isWild:!!wild,isVIP,tip:0,paid:false};
}
function chibi(o){
 let c=CHARACTERS.find(x=>x[0]===o.name)||CHARACTERS[0];
 let hairDark=shade(c[2],-35), shirtDark=shade(c[3],-30);
 let crown=o.isVIP?'<span class="accessory">👑</span>':"";
 return `<div class="chibi ${c[1]}" style="--hair:${c[2]};--hairDark:${hairDark};--shirt:${c[3]};--shirtDark:${shirtDark}">${crown}<div class="hair-back"></div><div class="head"><span class="blush l"></span><span class="blush r"></span><span class="eye l"><i></i></span><span class="eye r"><i></i></span><span class="mouth"></span></div><div class="hair-front"></div><div class="body"><span class="collar"></span></div></div>`;
}
function miniFace(o,small){
 let c=CHARACTERS.find(x=>x[0]===o.name)||CHARACTERS[0];
 return `<span class="mini-face ${small?"small":""}" style="background:${c[3]}">${o.name[0]}</span>`;
}
function ticketHTML(o){return `${o.isVIP?'<div class="vip-badge">👑 VIP customer — big tips ahead!</div>':""}<div class="order-line"><b>${miniFace(o,true)} ${o.name}</b><span>${o.flavour}</span></div><div class="order-line"><b>Fizz</b><span>${o.fizz?"Yes":"No"}</span></div><div><b>Toppings</b><div>${o.toppings.map(k=>`<span class="pill">${TOPPING_LABELS[k]}</span>`).join("")}</div></div>`}
function formatTime(sec){sec=Math.max(0,Math.ceil(sec));let m=Math.floor(sec/60),s=String(sec%60).padStart(2,"0");return `${m}:${s}`}
function toast(t){let e=$("#toast");e.textContent=t;e.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("show"),2200)}
function confetti(){for(let i=0;i<10;i++){let e=document.createElement("span");e.className="spark";e.textContent="✦";e.style.left=40+Math.random()*20+"vw";e.style.top=45+Math.random()*20+"vh";e.style.setProperty("--x",(Math.random()*180-90)+"px");document.body.appendChild(e);setTimeout(()=>e.remove(),900)}}
function go(id){$$(".scene").forEach(s=>s.classList.toggle("active",s.id===id));render()}
$$("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));

function addOrder(manual=false){
 let o=makeOrder();orders.push(o);announce(o);if(manual){activeId=o.id;go("cashier")}render();
}
function announce(o){
 let p=document.createElement("div");p.className="order-pop"+(o.isVIP?" vip":"");
 p.innerHTML=`<b>${o.isVIP?"👑 VIP ORDER":"NEW ORDER"} #${o.id}</b><span>${o.name} is waiting: "${o.comment}"</span><small>${o.flavour} · ${o.toppings.length} extras · timer starts once you take the order</small><button>Open ticket</button>`;
 document.body.appendChild(p);p.querySelector("button").onclick=()=>{activeId=o.id;stagedOrderId=o.id;p.remove();go("cashier")};setTimeout(()=>p.remove(),8500);
 if(o.isVIP){toast(`👑 A VIP customer just arrived — big tips await!`);SFX.vip()}
 else{toast(`🔔 ${o.name} just joined the queue — their 3:00 timer has not started yet.`)}
}
function throwTantrum(o){
 let e=document.createElement("span");
 e.className="tantrum-throw";
 e.textContent=rand(["🥤","🍦","🧊","☕"]);
 e.style.setProperty("--startX",(30+Math.random()*40)+"vw");
 document.body.appendChild(e);
 setTimeout(()=>e.remove(),1100);
}
function updateCounterStage(){
 const waitingOrders=orders.filter(o=>o.status==="waiting");
 const staged=waitingOrders.find(o=>o.id===stagedOrderId)||waitingOrders[0]||null;
 stagedOrderId=staged?staged.id:null;
 const stage=$("#customerStage"), speech=$("#customerSpeech");
 if(staged){
   stage.innerHTML=chibi(staged);
   speech.textContent=`${staged.comment} I'd like a ${staged.flavour} lemonade.`;
 }else{
   stage.innerHTML="";
   speech.textContent=orders.length?"No one waiting right now — nice work! More customers are on the way.":"A customer is approaching...";
 }
}
function stageCustomer(id){
 let o=orders.find(x=>x.id===id&&x.status==="waiting");
 if(!o)return;
 stagedOrderId=id;
 SFX.pop();
 toast(`${o.isVIP?"👑 ":""}${o.name} is now front of the line — click "Take their order"!`);
 render();
}
function startTimers(){
 clearInterval(timer);
 timer=setInterval(()=>{
   if(paused)return;
   let changed=false;
   orders.forEach(o=>{
     if(o.timerStarted && ["waiting","making","ready"].includes(o.status)){
       o.left=Math.max(0,o.left-.5*(1+upgrades.patience*.12));
       changed=true;
       if(o.left<=0){
         o.status="left";
         o.timerStarted=false;
         if(activeId===o.id)activeId=null;
         streak=0;
         throwTantrum(o);
         SFX.leave();
         toast(`💢 ${o.name} hurled their ${rand(["cup","ice cream","straw"])} and stormed off — the timer ran out!`);
         badReview(o,true);
       }
     }
   });
   if(changed)render();
 },500);
 clearInterval(orderTicker);
 orderTicker=setInterval(()=>{
   if(paused)return;
   let active=orders.filter(o=>["waiting","making","ready"].includes(o.status)).length;
   if(active<Math.min(2+day,5)&&served<target)addOrder(false);
 },Math.max(5000,10500-day*650));
}
function render(){
 $("#day").textContent=day;$("#totalServed").textContent=totalServed;$("#streak").textContent=streak;$("#streakStat").classList.toggle("hot",streak>=3);$("#stars").textContent=stars;$("#money").textContent=money.toFixed(2);$("#rating").textContent=rating.toFixed(1);$("#phoneRating").textContent=rating.toFixed(1);
 updateCounterStage();
 let active=orders.find(o=>o.id===activeId);
 let missingEl=$("#missingParts");
 if(missingEl){
   if(active && ["making","ready"].includes(active.status)){
     const missing=missingRecipeParts(active);
     missingEl.classList.toggle("complete",missing.length===0);
     missingEl.innerHTML=missing.length
       ? `<b>Still needed:</b> ${missing.join(" · ")}`
       : `<b>✨ Recipe complete!</b> Send the finished drink.`;
   }else{
     missingEl.innerHTML="";
     missingEl.classList.remove("complete");
   }
 }
 let timerEl=$("#orderTimer");
 if(timerEl){
   if(active && active.timerStarted && ["making","ready"].includes(active.status)){
     timerEl.classList.remove("hidden");
     timerEl.textContent=formatTime(active.left);
     timerEl.classList.toggle("warn",active.left<=60&&active.left>20);
     timerEl.classList.toggle("danger",active.left<=20);
   }else{
     timerEl.classList.add("hidden");
     timerEl.classList.remove("warn","danger");
   }
 }
 $("#queue").innerHTML=orders.filter(o=>["waiting","making","ready"].includes(o.status)).map(o=>{
   let waiting=o.status==="waiting";
   let action=waiting?`stageCustomer(${o.id})`:`selectOrder(${o.id});go('cashier')`;
   let isSel=waiting?o.id===stagedOrderId:o.id===activeId;
   return `<div class="ticket ${isSel?"selected":""} ${o.isVIP?"vip":""}" onclick="${action}" title="${waiting?"Click to serve them next":"Click to view ticket"}"><b>${o.isVIP?"👑 ":""}#${o.id} ${o.name}</b><div class="patience"><i class="${o.left<10?"danger":o.left<20?"warn":""}" style="width:${Math.max(0,o.left/o.patience*100)}%"></i></div><small>${o.timerStarted?formatTime(o.left):waiting&&o.id===stagedOrderId?"Ready to take →":"3:00 when taken"} · ${o.status}</small></div>`;
 }).join("")||"<p class='hint'>The queue is empty... suspiciously peaceful.</p>";
 $("#customerList").innerHTML=orders.filter(o=>["waiting","making","ready"].includes(o.status)).map(o=>{
   let isSel=o.status==="waiting"?o.id===stagedOrderId:o.id===activeId;
   return `<div class="customer-row ${isSel?"selected":""} ${o.isVIP?"vip":""}" onclick="selectOrder(${o.id})">${miniFace(o)}<div><b>${o.isVIP?"👑 ":""}${o.name}</b><small> · ${o.status}</small><div class="patience"><i class="${o.left<10?"danger":o.left<20?"warn":""}" style="width:${Math.max(0,o.left/o.patience*100)}%"></i></div><small>${o.timerStarted?formatTime(o.left):"Timer starts once taken"}</small></div></div>`;
 }).join("")||"<p>No customers right now.</p>";
 $("#activeOrder").className=active?"":"ticket-empty";
 $("#activeOrder").innerHTML=active?(ticketHTML(active)+(active.status==="waiting"?`<p class="hint">⏳ Not taken yet — go to the Counter and take this order first.</p>`:"")):"Choose a customer.";
 $("#sendKitchen").disabled=!active||active.status!=="making";
 $("#kitchenTicket").innerHTML=active?ticketHTML(active):"<p class='hint'>Choose an order that's being made.</p>";
 if(active&&active.status==="making"){
   let key=active.id+"|"+active.made.join(",");
   if(key!==lastDrinkKey){renderDrink(active);lastDrinkKey=key}
 }else{
   $("#drinkBench").innerHTML="<div class='bench-note'>Your cup appears here.</div>";
   lastDrinkKey=null;
 }
 updateProgress(active);
 $("#finishDrink").disabled=!active||active.status!=="making"||completion(active)<100;
 $("#readyDrinks").innerHTML=orders.filter(o=>o.status==="ready").map(o=>`<div class="ready-drink ${selectedDrinkId===o.id?"selected":""} ${o.isVIP?"vip":""}" draggable="true" data-drink="${o.id}" onclick="selectDrinkForDelivery(${o.id})">${miniDrink(o)}<b>${o.isVIP?"👑 ":""}#${o.id} ${o.name}</b></div>`).join("")||"<p class='hint'>No finished drinks yet.</p>";
 $("#dropCustomers").innerHTML=orders.filter(o=>o.status==="ready").map(o=>`<div class="drop-target ${o.isVIP?"vip":""}" data-target="${o.id}" onclick="dropOnCustomer(${o.id})">${o.isVIP?"👑 ":""}${o.name} · drop #${o.id} here</div>`).join("")||"<p class='hint'>Customers waiting for drinks will appear here.</p>";
 renderShop();renderBook();updateStockBadges(); $("#reviews").innerHTML=reviews.slice().reverse().map((r,i)=>`<div class="review"><b>${r.stars}★ ${r.name}</b><div>${r.text}</div>${r.reply?`<div class="reply">💬 ${r.reply}</div>`:""}<button class="reply-toggle" data-review="${reviews.indexOf(r)}">${r.reply?"View reply":"Reply"}</button></div>`).join("");
 $$(".reply-toggle").forEach(b=>b.onclick=()=>replyReview(+b.dataset.review));
}
function selectOrder(id){activeId=id;let o=orders.find(x=>x.id===id);if(o&&o.status==="waiting")stagedOrderId=id;render()}
function selectDrinkForDelivery(id){selectedDrinkId=(selectedDrinkId===id)?null:id;if(selectedDrinkId)toast("Drink selected — click its customer to deliver!");render()}
function dropOnCustomer(targetId){
 if(selectedDrinkId==null){toast("Select a ready drink first, then click its customer.");return}
 deliver(selectedDrinkId,targetId);
 selectedDrinkId=null;
}
function recipeChecklist(o){
  const required = [];
  if(o.flavour) required.push({key:"flavour",label:`${o.flavour} flavour`});
  if(o.fizz) required.push({key:"fizz",label:"Fizz"});
  (o.toppings||[]).forEach(t=>{
    required.push({key:`top:${t}`,label:TOPPING_LABELS[t]||t});
  });
  required.push({key:"shaken",label:"Give it a shake"});
  return required;
}
function isMade(o,key){
  return (o.made||[]).includes(key);
}
function completion(o){
  const required=recipeChecklist(o);
  if(!required.length) return 100;
  const done=required.filter(x=>isMade(o,x.key)).length;
  return Math.round(done/required.length*100);
}
function missingRecipeParts(o){
  return recipeChecklist(o).filter(x=>!isMade(o,x.key)).map(x=>x.label);
}
function updateProgress(o){let p=o?completion(o):0;$("#progressBar").style.width=p+"%";$("#progressText").textContent=p+"%";$("#kitchenHint").textContent=!o?"Choose an order that's being made.":p<40?"Start with the flavour.":p<100?"Keep going — the ticket isn't complete yet!":"Perfect ticket! Send it out!";}
function renderDrink(o){
 let f=FLAVOURS[o.flavour], hasFlavour=o.made.includes("flavour");
 let tops=o.made.filter(x=>x.startsWith("top:")).map(x=>x.slice(4));
 let extras="";
 tops.forEach((t,i)=>{if(TOPART[t]==="cream")extras+=`<span class="whip"></span>`;else if(TOPART[t]==="sparkles")extras+=`<span class="sparkles" style="left:${15+i*17}px;top:${35+i*8}px">✦</span>`;else if(TOPART[t]==="ice")extras+=`<span class="ice" style="left:${25+i*17}px;top:${55+i*8}px">◆</span>`;else extras+=`<span class="fruit top-small" style="left:${20+i*20}px;top:${48+i*5}px">${t==="cherry"?"●":t==="slice"?"◒":t==="mint"?"⌁":t==="flower"?"✿":t==="umbrella"?"⌒":t==="sprinkles"?"⁕":t==="peel"?"∿":t==="pearls"?"•":t==="sugar"?"◇":t==="jelly"?"★":"◆"}</span>`});
 let fizz=o.made.includes("fizz")?`<span class="fizz"><i class="bubble"></i><i class="bubble"></i><i class="bubble"></i></span>`:"";
 let liquid=hasFlavour?`<div class="liquid" style="--drink:${f.color}"></div>`:`<div class="liquid empty"></div>`;
 let cos=activeCosmeticData();
 let shimmer=cos.sparkly?'<span class="cosmetic-shimmer"></span>':"";
 $("#drinkBench").innerHTML=`<div class="drink-wrap" draggable="true" data-cup="1"><div class="straw" style="border-color:${cos.straw}"></div><div class="cup-art" style="border-color:${cos.border}">${liquid}<div class="cup-shine"></div>${extras}${fizz}${shimmer}</div></div>`;
}
function miniDrink(o){let f=FLAVOURS[o.flavour];let cos=activeCosmeticData();return `<div class="ready-mini"><div class="cup-art" style="transform:scale(.62);border-color:${cos.border}"><div class="liquid" style="--drink:${f.color}"></div>${o.made.includes("top:whip")?'<span class="whip"></span>':""}${o.made.includes("fizz")?'<span class="fizz"><i class="bubble"></i><i class="bubble"></i></span>':""}</div></div>`}

function setupDrag(){
 document.addEventListener("dragstart",e=>{
  let t=e.target.closest("[draggable]");if(!t)return;
  e.dataTransfer.setData("text/plain",t.dataset.cup?`cup:${t.dataset.cup}`:t.dataset.top?`top:${t.dataset.top}`:t.dataset.flavour?`flavour:${t.dataset.flavour}`:t.dataset.drink?`drink:${t.dataset.drink}`:"");
  if(e.dataTransfer.setDragImage){
    let r=t.getBoundingClientRect();
    e.dataTransfer.setDragImage(t,e.clientX-r.left,e.clientY-r.top);
  }
 });
 document.addEventListener("dragover",e=>{let t=e.target.closest(".machine-slot,.drink-bench,.drop-target");if(t)e.preventDefault();});
 document.addEventListener("dragenter",e=>{let t=e.target.closest(".machine-slot,.drink-bench,.drop-target");if(t)t.classList.add("over")});
 document.addEventListener("dragleave",e=>{let t=e.target.closest(".machine-slot,.drink-bench,.drop-target");if(t)t.classList.remove("over")});
 document.addEventListener("drop",e=>{
  let t=e.target.closest(".machine-slot,.drink-bench,.drop-target");if(!t)return;e.preventDefault();t.classList.remove("over");
  let [kind,val]=e.dataTransfer.getData("text/plain").split(":");let o=orders.find(x=>x.id===activeId);
  if(kind==="top"&&t.classList.contains("drink-bench"))addTop(o,val);
  else if(kind==="flavour"&&t.classList.contains("drink-bench"))pourFlavour(o,val);
  else if(kind==="cup"&&t.classList.contains("machine-slot"))machine(o,t.dataset.slot);
  else if(kind==="drink"&&t.classList.contains("drop-target"))deliver(+val,+t.dataset.target);
 });
}
function setupMachineClicks(){
 $$(".machine-slot").forEach(el=>{
   el.onclick=()=>{let o=orders.find(x=>x.id===activeId);machine(o,el.dataset.slot)};
 });
}
function flashMachine(slot){
 let m=document.querySelector(`[data-machine="${slot}"]`);
 if(m){m.classList.add("flash");setTimeout(()=>m.classList.remove("flash"),450)}
}
function machine(o,slot){
 if(!o||o.status!=="making"){toast("Choose a drink that is being made first.");return}
 if(slot==="fizz"){
   if(o.made.includes("fizz")){toast("Already nice and fizzy!");return}
   o.made.push("fizz");flashMachine("fizz");SFX.fizz();toast("Fizz spinner: bubbles are racing through the lemonade!");render();return;
 }
 if(slot==="whip"){
   if(!o.toppings.includes("whip")){toast("This customer didn't ask for cloud cream.");SFX.wrong();return}
   flashMachine("whip");addTop(o,"whip");return;
 }
}
function ensureStock(kind,key){
 let invKey=kind+":"+key;
 if((inventory[invKey]||0)>0){inventory[invKey]--;return{ok:true,rushed:false}}
 let unitCost=kind==="flavour"?FLAVOUR_UNIT_COST:TOPPING_UNIT_COST;
 let cost=Math.round(unitCost*RUSH_MULTIPLIER*EMERGENCY_QTY*100)/100;
 let label=kind==="flavour"?key:TOPPING_LABELS[key];
 if(money>=cost){
   money-=cost;
   inventory[invKey]=(inventory[invKey]||0)+EMERGENCY_QTY-1;
   return{ok:true,rushed:true,cost,label};
 }
 SFX.wrong();
 toast(`😬 Out of ${label} and can't afford a $${cost.toFixed(2)} rush restock — sell some drinks first!`);
 return{ok:false};
}
function pourFlavour(o,flavourKey){
 if(!o||o.status!=="making"){toast("Choose a drink being made first.");return}
 if(flavourKey!==o.flavour){
   toast(`${o.name} didn't order ${flavourKey} — they want ${o.flavour}!`);
   SFX.wrong();
   let c=document.querySelector(`.flavour-chip[data-flavour="${flavourKey}"]`);
   if(c){c.classList.remove("shake-drink");void c.offsetWidth;c.classList.add("shake-drink");setTimeout(()=>c.classList.remove("shake-drink"),600)}
   return;
 }
 if(o.made.includes("flavour")){toast("The flavour is already poured!");return}
 let stock=ensureStock("flavour",flavourKey);
 if(!stock.ok){render();return}
 o.made.push("flavour");flashMachine("flavour");
 if(stock.rushed){SFX.purchase();toast(`🚨 Out of ${flavourKey}! Rush-restocked for $${stock.cost.toFixed(2)} — poured anyway.`)}
 else{SFX.pour();toast(`Flavour mixer: ${o.flavour} is swirling into the cup!`)}
 selectedFlavour=null;renderFlavourChip();
 render();
}
function selectFlavour(key){selectedFlavour=key;SFX.pop();renderFlavourChip()}
function renderFlavourChip(){
 let el=$("#flavourChip");if(!el)return;
 if(selectedFlavour){
   let f=FLAVOURS[selectedFlavour];
   el.className="flavour-chip-zone has-chip";
   el.innerHTML=`<div class="flavour-chip" draggable="true" data-flavour="${selectedFlavour}" title="Drag onto your cup"><span class="chip-dot" style="background:${f.color}"></span><b>${selectedFlavour}</b><small>drag onto your cup →</small></div>`;
 }else{
   el.className="flavour-chip-zone";
   el.textContent="Click a bottle to select its flavour";
 }
}
function addTop(o,t){
 if(!o||o.status!=="making"){toast("Select a drink in progress first.");return}
 if(!o.toppings.includes(t)){toast("They didn't order that topping.");SFX.wrong();return}
 if(o.made.includes("top:"+t)){toast("That topping is already on this drink.");return}
 let stock=ensureStock("top",t);
 if(!stock.ok){render();return}
 o.made.push("top:"+t);
 if(stock.rushed){SFX.purchase();toast(`🚨 Out of ${TOPPING_LABELS[t]}! Rush-restocked for $${stock.cost.toFixed(2)} — added anyway.`)}
 else{SFX.pop();toast(`${TOPPING_LABELS[t]} added to the cup!`)}
 render()
}
function setupToppings(){
 $("#toppings").innerHTML=TOPPINGS.map(([k,label])=>`<button class="topping" draggable="true" data-top="${k}"><b class="stock-badge" data-stock-for="top:${k}"></b><span class="tiny-art" style="--tc:${({"cherry":"#ef667b","slice":"#ffd85d","mint":"#8dd1a4","flower":"#ffb1ca","sparkles":"#fff"}[k]||"#d8c7ff")}"></span>${label}</button>`).join("");
 $$(".topping").forEach(b=>b.onclick=()=>{let o=orders.find(x=>x.id===activeId);addTop(o,b.dataset.top)})
 $("#flavours").innerHTML=Object.entries(FLAVOURS).map(([k,f])=>`<div class="bottle" data-flavour="${k}" title="${k}"><b class="stock-badge" data-stock-for="flavour:${k}"></b><span class="liquid" style="--c:${f.color}"></span>${k}</div>`).join("");
 $$(".bottle").forEach(b=>b.onclick=()=>selectFlavour(b.dataset.flavour));
 renderFlavourChip();
 updateStockBadges();
}
function updateStockBadges(){
 $$(".stock-badge").forEach(b=>{
   let n=inventory[b.dataset.stockFor]||0;
   b.textContent="×"+n;
   b.classList.toggle("low",n>0&&n<=2);
   b.classList.toggle("empty",n<=0);
   let parent=b.closest(".bottle,.topping");
   if(parent)parent.classList.toggle("out-of-stock",n<=0);
 });
}
function pressButton(btn){if(!btn)return;btn.classList.add("active");setTimeout(()=>btn.classList.remove("active"),300)}
$("#takeOrder").onclick=()=>{
  let o=orders.find(x=>x.id===stagedOrderId&&x.status==="waiting")||orders.find(x=>x.status==="waiting");
  if(!o){addOrder(false);o=orders.find(x=>x.status==="waiting")}
  if(!o)return;
  o.timerStarted=true;
  o.left=180;
  o.status="making";
  activeId=o.id;
  stagedOrderId=null;
  toast(`⏱️ ${o.name}'s 3:00 timer has started! Head to the Cashier to send their ticket to the Lemon Lab.`);
  render();
  go("cashier");
}
$("#sendKitchen").onclick=()=>{
  let o=orders.find(x=>x.id===activeId);
  if(!o||o.status!=="making")return;
  toast(`${o.name}'s ticket is now in the Lemon Lab!`);
  go("kitchen");
}
$("#finishDrink").onclick=()=>{let o=orders.find(x=>x.id===activeId);if(!o||completion(o)<100)return;o.status="ready";SFX.complete();toast("Perfect drink finished! ✦");confetti();render();go("dropoff")}
function deliver(id,targetId){
 if(id!==targetId){toast("Wrong customer! They give you a very confused look.");return}
 let o=orders.find(x=>x.id===id);if(!o||o.status!=="ready"){toast("This drink is not ready to deliver yet.");return}
 let timeRatio=Math.max(0,o.left)/o.patience;
 let score=Math.max(0,Math.min(100,Math.round(55+timeRatio*45)));
 o.score=score;served++;totalServed++;o.status="paid";
 let base=4.5+(upgrades.quality*.35);
 let tip=o.isVIP?(2+Math.random()*4):(Math.random()<(0.45+upgrades.tip*.08)?(.5+Math.random()*4.5):0);
 o.tip=tip;
 let streakMilestone=null;
 if(score>=90){streak++;bestStreak=Math.max(bestStreak,streak);if(streak%3===0)streakMilestone=streak}else{streak=0}
 let streakMult=1+Math.min(streak,10)*0.05, vipMult=o.isVIP?3.5:1;
 let pay=(base+(score/100)*2+tip)*streakMult*vipMult;
 money+=pay;stars+=(score>=90?3:score>=70?2:1)*(o.isVIP?2:1);
 if(!dayStats.fastest||score>dayStats.fastest.score)dayStats.fastest={name:o.name,score};
 if(dayStats.closest===null||o.left<dayStats.closest.left)dayStats.closest={name:o.name,left:o.left};
 if(o.isWild)dayStats.wildSurvived++;
 if(tip>dayStats.bestTip.amount)dayStats.bestTip={name:o.name,amount:tip};
 if(score>=90)goodReview(o);else badReview(o,false);
 SFX.deliver(score>=90);
 toast(`${o.name}: ${score>=90?"“This is wonderful!”":score>=70?"“Pretty good!”":"“Bumbles Bees are better than this...”"} ${tip?`Tip +$${tip.toFixed(2)}!`:""}`);
 if(o.isVIP)addLore(`👑 A VIP named ${o.name} was thoroughly impressed with their ${o.flavour} lemonade and paid handsomely.`);
 if(streakMilestone){toast(`🔥 Streak x${streakMilestone}! Tips are pouring in!`);SFX.streak(streakMilestone)}
 if(staff.pepper){let next=orders.find(x=>x.status==="ready"&&x.id!==id);if(next)setTimeout(()=>{if(next.status==="ready")deliver(next.id,next.id)},1200)}
 confetti();render();checkDay()
}
function goodReview(o){let c=rand(REVIEW_GOOD), text=`${rand(REVIEW_PREFIX)} ${c}`;reviews.push({name:o.name,stars:5,text,reply:Math.random()<.75?rand(["The staff were so kind!","I heard they make every cup with tiny spoons.","I would come back for the umbrella alone.","I heard Pepper the rabbit runs the drop-off desk."]):""});
 addLore(`${o.name} left a glowing review after ordering ${o.flavour}. Someone immediately replied about the suspicious umbrellas.`);rating=Math.min(5,Math.max(0,(rating*4.6+5)/5));}
function badReview(o,left){
 let text=left?rand(["I waited until my soul left my body.","I left. They did not notice.","This place sucks. I am going to tell the window."]):rand(REVIEW_BAD);
 if(!left&&o.score<55)text+=` ${rand(["Bumbles Bees are better.","My neighbour's garden hose has better service.","The cup was fighting for its life.","I have received warmer service from a vending machine."])}`;
 reviews.push({name:o.name,stars:left?1:(o.score<55?1:2),text,reply:Math.random()<.85?rand(["I heard the manager there dips their toes in the drink.","Someone told me the ice cubes unionized.","The umbrella definitely has a secret.","I heard they only hire left-handed lemons.","Rumour says the blender has a second job.","I heard Mimi has a spreadsheet about this place."]):""});
 addLore(`${o.name} caused review drama after ${left?"walking out before the order was finished":"receiving a low-completion drink"}. The comment section became worse.`);
 rating=Math.max(1,Math.round((rating*(0.82+upgrades.decor*.02)+(left?1:o.score<55?1:2)*(0.18-upgrades.decor*.02))*10)/10);
 if(Math.random()<.2)windowEvent(o)
}
function windowEvent(o){throwTantrum(o);toast(`📱 SHOP ALERT: ${o.name} has started a scene outside!`);let w=document.createElement("div");w.className="order-pop";w.innerHTML=`<b>🚨 WINDOW INCIDENT</b><span>${o.name} threw an ice cream at the window.</span>`;document.body.appendChild(w);setTimeout(()=>w.remove(),3000)}
function replyReview(i){let r=reviews[i];let replies=["I heard the manager there dips their toes in the drink.","My cousin says the straws have unionized.","I heard the lemons are judging customers.","Someone saw a tiny frog running the till.","The bees have their own table now.","I heard the manager talks to the ice cubes.","My aunt says the umbrella owes her money.","Apparently the pineapple knows too much.","I heard they make the clouds by hand.","Someone said the blender has a secret life."];
 r.reply=rand(replies);render();toast("A customer replied to the review!")}
function checkDay(){
 if(served<target)return;
 clearInterval(orderTicker);
 SFX.dayComplete();
 let highlights=[];
 if(dayStats.fastest)highlights.push(`⚡ Best drink: <b>${dayStats.fastest.name}</b> scored ${dayStats.fastest.score}`);
 if(dayStats.closest)highlights.push(`😅 Closest call: <b>${dayStats.closest.name}</b>, delivered with ${formatTime(dayStats.closest.left)} left`);
 if(dayStats.wildSurvived>0)highlights.push(`🌀 Survived ${dayStats.wildSurvived} weird request${dayStats.wildSurvived>1?"s":""}`);
 if(dayStats.bestTip.amount>0)highlights.push(`💸 Biggest tip: $${dayStats.bestTip.amount.toFixed(2)} from <b>${dayStats.bestTip.name}</b>`);
 if(bestStreak>=3)highlights.push(`🔥 Best streak: ${bestStreak} in a row`);
 let o=$("#dayOverlay");o.className="day-overlay";
 o.innerHTML=`<div class="day-card"><div style="font-size:2rem">✦ ◡ ✦</div><small>DAY COMPLETE</small><h1>Day ${day} finished!</h1><p>You served ${served} customers. The café survived another day.</p><p>Stars: ${stars} · Money: $${money.toFixed(2)} · Rating: ${rating.toFixed(1)}</p>${highlights.length?`<div class="day-highlights">${highlights.map(h=>`<div>${h}</div>`).join("")}</div>`:""}<button id="nextDay" class="bigbtn">Continue to Day ${day+1}</button></div>`;
 $("#nextDay").onclick=()=>{
   o.className="";o.innerHTML="";
   day++;served=0;target=dayTarget();
   dayStats={fastest:null,closest:null,wildSurvived:0,bestTip:{name:null,amount:0}};
   orders=orders.filter(x=>x.status==="paid"||x.status==="left");
   activeId=null;selectedDrinkId=null;stagedOrderId=null;
   toast(`Day ${day}! More customers are coming!`);
   render();startTimers();go("counter");
 };
}
function openPanel(id){["shopPanel","bookPanel","reviewPanel"].forEach(p=>$("#"+p).classList.toggle("open",p===id))}
$("#phone").onclick=()=>openPanel("reviewPanel");$("#closePhone").onclick=()=>$("#reviewPanel").classList.remove("open");

const UPGRADE_DATA=[
 ["speed","Turbo Prep","Machine animations complete a little faster.","$18"],
 ["patience","Comfy Chairs","Customers lose patience 12% slower per level.","$22"],
 ["tip","Tip Jar","Nice customers are more likely to leave a tip.","$25"],
 ["quality","Golden Recipe Cards","Perfect drinks earn a little more money.","$30"],
 ["decor","Cute Decor","Your review score recovers slightly faster.","$35"]
];
const STAFF_DATA=[
 ["mira","Mira the Mixer","🧁","Automatically adds fizz when you shake a fizzy order.","$40"],
 ["pepper","Pepper the Runner","🐇","Brings finished drinks to drop-off automatically when you finish one.","$55"]
];
function upgradeCost(k){let base={speed:18,patience:22,tip:25,quality:30,decor:35}[k];return base+upgrades[k]*Math.ceil(base*.65)}
function renderShop(){
 $("#upgrades").innerHTML=UPGRADE_DATA.map(([k,n,d])=>`<div class="upgrade"><div class="upgrade-row"><div><b>${n}</b><small>${d}</small><small>Level ${upgrades[k]} · Next $${upgradeCost(k)}</small></div><button data-upgrade="${k}" ${money<upgradeCost(k)?"disabled":""}>Upgrade</button></div></div>`).join("");
 $$("#upgrades [data-upgrade]").forEach(b=>b.onclick=()=>buyUpgrade(b.dataset.upgrade));
 $("#staff").innerHTML=STAFF_DATA.map(([k,n,icon,d,cost])=>`<div class="staff-card"><div class="staff-icon">${icon}</div><div style="flex:1"><b>${n}</b><small>${d}</small></div>${staff[k]?'<b>HIRED ✓</b>':`<button class="hire" data-hire="${k}" ${money<parseInt(cost.slice(1))?"disabled":""}>Hire ${cost}</button>`}</div>`).join("");
 $$("#staff [data-hire]").forEach(b=>b.onclick=()=>hireStaff(b.dataset.hire));
 renderCosmetics();
 renderSupplies();
}
function renderSupplies(){
 let el=$("#supplies");if(!el)return;
 let tile=(key,label,dotColor,n,unitCost)=>{
   let cost=(unitCost*SHOP_BATCH).toFixed(2);
   return `<div class="supply-tile ${n<=0?"empty":n<=2?"low":""}"><span class="supply-dot" style="background:${dotColor}"></span><b>${label}</b><small>×${n}</small><button data-buy-supply="${key}" ${money<unitCost*SHOP_BATCH?"disabled":""}>+${SHOP_BATCH} $${cost}</button></div>`;
 };
 let flavourHTML=Object.entries(FLAVOURS).map(([k,f])=>tile("flavour:"+k,k,f.color,inventory["flavour:"+k]||0,FLAVOUR_UNIT_COST)).join("");
 let toppingHTML=TOPPINGS.map(([k,label])=>tile("top:"+k,label,"#d8c7ff",inventory["top:"+k]||0,TOPPING_UNIT_COST)).join("");
 el.innerHTML=`<p class="hint">Stock ingredients ahead of time — run dry mid-order and you'll pay a rush-delivery markup instead.</p><div class="supply-group-label">Flavours</div><div class="supply-grid">${flavourHTML}</div><div class="supply-group-label">Toppings</div><div class="supply-grid">${toppingHTML}</div>`;
 $$("#supplies [data-buy-supply]").forEach(b=>b.onclick=()=>buySupply(b.dataset.buySupply));
}
function buySupply(invKey){
 let kind=invKey.split(":")[0], key=invKey.slice(kind.length+1);
 let unitCost=kind==="flavour"?FLAVOUR_UNIT_COST:TOPPING_UNIT_COST;
 let cost=unitCost*SHOP_BATCH;
 if(money<cost)return;
 money-=cost;
 inventory[invKey]=(inventory[invKey]||0)+SHOP_BATCH;
 SFX.purchase();
 toast(`📦 Stocked up on ${SHOP_BATCH} ${kind==="flavour"?key:TOPPING_LABELS[key]}!`);
 renderSupplies();render();
}
function buyUpgrade(k){let c=upgradeCost(k);if(money<c)return;money-=c;upgrades[k]++;SFX.purchase();toast(`✨ ${UPGRADE_DATA.find(x=>x[0]===k)[1]} upgraded!`);renderShop();render()}
function hireStaff(k){let cost=k==="mira"?40:55;if(money<cost||staff[k])return;money-=cost;staff[k]=true;SFX.purchase();toast(`🎀 ${k==="mira"?"Mira":"Pepper"} joined the café!`);renderShop();render()}
function renderCosmetics(){
 $("#cosmetics").innerHTML=COSMETICS.map(c=>{
   let owned=unlockedCosmetics.includes(c.id), active=activeCosmetic===c.id;
   return `<div class="cosmetic ${active?"active":""}"><span class="cosmetic-swatch" style="--sw:${c.border}"></span><div style="flex:1"><b>${c.name}</b><small>${c.desc}</small></div>${active?"<b>EQUIPPED</b>":owned?`<button data-equip="${c.id}">Equip</button>`:`<button data-buy="${c.id}" ${money<c.cost?"disabled":""}>Buy $${c.cost}</button>`}</div>`;
 }).join("");
 $$("#cosmetics [data-buy]").forEach(b=>b.onclick=()=>buyCosmetic(b.dataset.buy));
 $$("#cosmetics [data-equip]").forEach(b=>b.onclick=()=>{activeCosmetic=b.dataset.equip;SFX.pop();lastDrinkKey=null;renderCosmetics();render()});
}
function buyCosmetic(id){
 let c=COSMETICS.find(x=>x.id===id);if(!c||money<c.cost||unlockedCosmetics.includes(id))return;
 money-=c.cost;unlockedCosmetics.push(id);activeCosmetic=id;SFX.purchase();toast(`✨ ${c.name} unlocked and equipped!`);
 lastDrinkKey=null;renderCosmetics();render();
}
function activeCosmeticData(){return COSMETICS.find(c=>c.id===activeCosmetic)||COSMETICS[0]}
const ACH=[
 ["first","First Sip","Serve your first customer.",()=>served>=1],
 ["five","Five-Star Energy","Serve five customers.",()=>served>=5],
 ["weird","Questionable Recipe","Survive a weird request.",()=>orders.some(o=>o.isWild)],
 ["sparkle","Sparkle Scientist","Use sugar sparkle dust.",()=>orders.some(o=>o.made.includes("top:sparkles"))],
 ["fizz","Bubble Trouble","Make a fizzy drink.",()=>orders.some(o=>o.made.includes("fizz"))],
 ["tips","Tip Magnet","Earn $10 in tips.",()=>money>=10],
 ["review","Internet Famous","Collect 10 reviews.",()=>reviews.length>=10],
 ["day3","Getting Busy","Reach Day 3.",()=>day>=3]
];
function renderBook(){
 $("#achievements").innerHTML=ACH.map(([k,n,d,fn])=>{let done=achievements[k]||fn();if(done)achievements[k]=true;return `<div class="achievement ${done?"done":""}"><b>${done?"✓ ":""}${n}</b><small>${d}</small></div>`}).join("");
 $("#lore").innerHTML=(lore.length?lore.slice(-12).reverse():["Mimi once stared at the ice machine for seven minutes.","Someone named BEEBEE has been banned from requesting toenails."]).map(x=>`<div class="lore-entry">${x}</div>`).join("");
}
function addLore(text){lore.push(text);if(lore.length>30)lore.shift()}
function playPourAnimation(){
 let bench=$("#drinkBench");
 if(!bench||!bench.querySelector(".drink-wrap"))return;
 let s=document.createElement("span");
 s.className="pour-stream";
 bench.appendChild(s);
 setTimeout(()=>s.remove(),750);
}
function prepAction(kind){
 let o=orders.find(x=>x.id===activeId);if(!o||o.status!=="making"){toast("Choose a drink being made first.");return}
 if(kind==="pour"){
   pourCount++;
   let wasPoured=o.made.includes("flavour");
   if(!wasPoured){o.made.push("flavour");toast(`The ${o.flavour} base is poured into the cup!`)}else toast("🥤 Pouring a silky lemonade stream!");
   render();
   playPourAnimation();
 }
 if(kind==="ice"){
   iceCount++;
   if(o.toppings.includes("ice")&&!o.made.includes("top:ice"))addTop(o,"ice");
   else{SFX.pop();toast("🧊 You scoop a crisp little handful of ice!");render()}
 }
 if(kind==="shake"){
   shakeCount++;
   let e=$("#drinkBench");e.classList.remove("shake-drink");void e.offsetWidth;e.classList.add("shake-drink");
   SFX.shake();
   if(!o.made.includes("shaken")){o.made.push("shaken");toast("✨ Shake shake shake! The drink sparkles in the light.")}
   else toast("✨ Shake shake shake! The drink sparkles in the light.");
   if(staff.mira&&o.fizz&&!o.made.includes("fizz")){o.made.push("fizz");toast("Mira catches the fizz at the perfect moment!")}
   render();
 }
}
$("#pourBtn").onclick=()=>{pressButton($("#pourBtn"));prepAction("pour")};
$("#iceBtn").onclick=()=>{pressButton($("#iceBtn"));prepAction("ice")};
$("#shakeBtn").onclick=()=>{pressButton($("#shakeBtn"));prepAction("shake")};
$("#shopBtn").onclick=()=>{renderShop();openPanel("shopPanel")};$("#closeShop").onclick=()=>$("#shopPanel").classList.remove("open");
$("#bookBtn").onclick=()=>{renderBook();openPanel("bookPanel")};$("#closeBook").onclick=()=>$("#bookPanel").classList.remove("open");


const TUTORIAL_STEPS=[
 ["1 · Meet your customer","Click <b>Take their order</b>. This is the moment their personal <b>3:00 timer starts</b>. Waiting customers do not lose time.","🍋 <b>Tip:</b> click any waiting ticket in the Queue to bring THAT customer to the front — great for grabbing a VIP 👑 before anyone else."],
 ["2 · Read the ticket","Check the flavour, fizz and toppings. Customers can be sweet, sassy, strange, or extremely strange.","📋 <b>Tip:</b> keep the ticket visible while you build the drink."],
 ["3 · Build the lemonade","Click the matching bottle in the Flavour Mixer to pick it up, then drag its little chip onto your cup. Use the Fizz Spinner if needed, and the Cloud Whipper if they ordered cream. Click or drag toppings onto the cup.","🫐 <b>Visual rule:</b> the flavour changes the liquid colour; toppings stay layered on top."],
 ["4 · Give it a shake","Every drink needs a <b>Shake</b> before it can be sent out — even if that's the last thing you do. Skipping it keeps the ticket stuck below 100%.","🧃 <b>Rule:</b> no shake, no delivery."],
 ["5 · Watch the clock","The timer keeps counting while you make the drink — and even after it's ready, until you deliver it. At 60 seconds it warns you; at 20 seconds it gets dramatic.","⏰ <b>Goal:</b> finish before 0:00. A late customer may walk out and leave a nasty review."],
 ["6 · Send it out","When the progress reaches 100%, send the drink to Drop-off. Click the drink, then click its owner to deliver.","💗 <b>Faster delivery</b> means a higher score — happier reviews, bigger tips, and more stars."],
 ["7 · Stock your supplies","Every flavour and topping is a real ingredient with limited stock — check the little badge on each bottle. Visit the Shop's <b>Supplies</b> section to buy more with your earnings.","📦 <b>Careful:</b> run dry mid-order and you'll still get it, but a rush restock costs extra — cheaper to stock up ahead of time."],
 ["8 · Survive the café","New orders arrive while you work. Check BuzzBook for reviews, buy upgrades, hire staff, and reach the daily customer target.","🏆 <b>And yes:</b> the customers can become increasingly ridiculous as the days go on."]
];
function renderTutorial(){
 let s=TUTORIAL_STEPS[tutorialStep];
 $("#tutorialStep").innerHTML=`<h2>${s[0]}</h2><p>${s[1]}</p><div class="tip-box">${s[2]}</div>`;
 $("#tutorialDots").textContent=TUTORIAL_STEPS.map((_,i)=>i===tutorialStep?"●":"○").join("");
 $("#tutorialBack").disabled=tutorialStep===0;
 $("#tutorialNext").textContent=tutorialStep===TUTORIAL_STEPS.length-1?"Start playing ✦":"Next →";
}
function hasSeenTutorial(){try{return localStorage.getItem("lemonadeTutorialSeen")==="1"}catch(e){return false}}
function markTutorialSeen(){try{localStorage.setItem("lemonadeTutorialSeen","1")}catch(e){}}
function openTutorial(){tutorialStep=0;renderTutorial();$("#tutorialPanel").classList.add("open");markTutorialSeen();paused=true}
function closeTutorial(){$("#tutorialPanel").classList.remove("open");paused=false}
$("#tutorialBtn").onclick=openTutorial;
$("#tutorialClose").onclick=closeTutorial;
$("#tutorialBack").onclick=()=>{if(tutorialStep>0){tutorialStep--;renderTutorial()}};
$("#tutorialNext").onclick=()=>{if(tutorialStep<TUTORIAL_STEPS.length-1){tutorialStep++;renderTutorial()}else{closeTutorial();toast("🍋 Good luck, lemonade legend!")}};

$("#muteBtn").textContent=SFX.isMuted()?"🔇":"🔊";
$("#muteBtn").onclick=()=>{let m=SFX.toggleMute();$("#muteBtn").textContent=m?"🔇":"🔊";if(!m)SFX.pop()};

setupToppings();setupDrag();setupMachineClicks();render();startTimers();
if(!hasSeenTutorial())setTimeout(openTutorial,500);
setTimeout(()=>{if(!paused)addOrder(false)},1200);

// Recipe completion regression check: exact requested items only.
window.testRecipeCompletion=function(){
  const t={flavour:"Blueberry",fizz:false,toppings:["slice"],made:["flavour","top:slice","shaken"]};
  return completion(t)===100;
};
console.assert(window.testRecipeCompletion(),"Recipe completion regression test failed");

(function(n,m,f,s,d){"use strict";var r=[{name:"Steam",links:["store.steampowered.com","steamcommunity.com","help.steampowered.com"],identifier:"steam://openurl/"},{name:"Tidal",links:["listen.tidal.com","tidal.com"],identifier:"tidal://"},{name:"Spotify",links:["open.spotify.com"],identifier:"spotify:"}];const c=[],a=n.findByDisplayName("SwitchItem");var u={onLoad(){const o=n.findByDisplayName("Anchor",!1);c.push(m.before("default",o,e=>{const t=e[0]?.href?.toLowerCase();if(t)for(const i of r)(s.persist.ghost[i.name]??!0)&&i.links.some(l=>~t.indexOf(l))&&(t.includes(i.identifier)||(e[0].href=`${i.identifier}${e[0].href}`));return e}));const p=n.findByProps("asyncify","copy");c.push(m.before("copy",p,([e])=>{for(const t of r)(s.persist.ghost[t.name]??!0)&&t.links.some(i=>~e.indexOf(i))&&(e=e.replace(t.identifier,""));return[e]}))},onUnload(){for(const o of c)o()},settings(){return f.useNest(s.persist),r.map(o=>d.React.createElement(a,{value:s.persist.ghost[o.name]??!0,onChange:()=>s.persist.store[o.name]=!s.persist.store[o.name]},o.name))}};return u})(cumcord.modules.webpack,cumcord.patcher,cumcord.utils,cumcord.pluginData,cumcord.modules.common);
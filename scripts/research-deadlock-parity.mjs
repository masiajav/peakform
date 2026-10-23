import fs from 'node:fs'
const directory='reports/deadlock-parity/sources'
fs.mkdirSync(directory,{recursive:true})
for(const kind of ['heroes','items'])for(const language of ['spanish','english']){
 const url=`https://api.deadlock-api.com/v1/assets/${kind}?language=${language}`
 const response=await fetch(url,{signal:AbortSignal.timeout(30000)})
 if(!response.ok)throw Error(`${url}: ${response.status}`)
 const data=await response.json()
 fs.writeFileSync(`${directory}/${kind}-${language}.json`,JSON.stringify(data,null,2))
 console.log(kind,language,data.length)
}
const response=await fetch('https://api.deadlock-api.com/v2/patches')
if(!response.ok)throw Error(`Patches: ${response.status}`)
fs.writeFileSync(`${directory}/patches.json`,JSON.stringify(await response.json(),null,2))
fs.writeFileSync(`${directory}/retrieval.json`,JSON.stringify({at:new Date().toISOString(),provider:'Deadlock API community asset mirror'},null,2))

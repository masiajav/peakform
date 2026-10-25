import type {DeadlockMapAtlas, DeadlockMapPoint} from './deadlock-map-contract'

export type MapTarget = ({kind:'point';groupId:string;index:number} | {kind:'lane';index:number}) & {x:number;y:number}
export const mapTargetKey = (target:MapTarget) => target.kind==='point' ? `${target.groupId}-${target.index}` : `lane-${target.index}`

/** Compare distances in screen pixels so dense resources remain selectable at every zoom. */
export function hitTestMap(atlas:DeadlockMapAtlas, visible:ReadonlySet<string>, lanes:boolean, cursor:DeadlockMapPoint, width:number, height:number, radius=10):MapTarget|null {
  let best:MapTarget|null=null, distance=Infinity
  for(const group of atlas.groups){
    if(!visible.has(group.id))continue
    const size=group.icon?11:group.points.length<=16?10:4
    const reach=radius+size*width/1000
    group.points.forEach((point,index)=>{
      const d=((point.x-cursor.x)*width)**2+((point.y-cursor.y)*height)**2
      if(d<=reach*reach&&d<distance){distance=d;best={kind:'point',groupId:group.id,index,x:point.x,y:point.y}}
    })
  }
  if(best||!lanes)return best
  distance=radius*radius
  atlas.lanes.forEach((lane,index)=>{
    for(let i=1;i<lane.points.length;i++){
      const a=lane.points[i-1],b=lane.points[i],dx=(b.x-a.x)*width,dy=(b.y-a.y)*height
      const length=dx*dx+dy*dy
      const t=length?Math.max(0,Math.min(1,((cursor.x-a.x)*width*dx+(cursor.y-a.y)*height*dy)/length)):0
      const x=a.x+(b.x-a.x)*t,y=a.y+(b.y-a.y)*t,d=((x-cursor.x)*width)**2+((y-cursor.y)*height)**2
      if(d<=distance){distance=d;best={kind:'lane',index,x,y}}
    }
  })
  return best
}

export function mapTooltipContent(atlas:DeadlockMapAtlas,target:MapTarget){
  if(target.kind==='lane'){
    const lane=atlas.lanes[target.index]
    return lane?{title:`Tirolina de ${lane.name}`,category:'Rutas',description:'La línea discontinua marca el recorrido de esta tirolina por la calle.'}:null
  }
  const group=atlas.groups.find(g=>g.id===target.groupId),point=group?.points[target.index]
  return group&&point?{title:point.label??group.label,category:point.label&&point.label!==group.label?group.label:'',description:group.description}:null
}

export function placeMapTooltip(x:number,y:number,width:number,height:number,tipWidth:number,tipHeight:number){
  const padding=8,gap=16
  const left=Math.max(padding,Math.min(x-tipWidth/2,width-tipWidth-padding))
  const preferred=y>=tipHeight+gap+padding?y-tipHeight-gap:y+gap
  const top=Math.max(padding,Math.min(preferred,height-tipHeight-padding))
  return {left,top,maxHeight:Math.max(80,height-padding*2)}
}

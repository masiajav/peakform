import { createHmac, timingSafeEqual } from 'node:crypto'
export function previewSignature(id:string,expires:string,key:string){return createHmac('sha256',key).update(`${id}:${expires}`).digest('hex')}
export function validPreviewSignature(id:string,expires:string,token:string,key:string){
 if(!key||!/^\d+$/.test(expires)||Number(expires)<Date.now()||Number(expires)>Date.now()+3_600_000||! /^[a-f0-9]{64}$/.test(token))return false
 return timingSafeEqual(Buffer.from(token),Buffer.from(previewSignature(id,expires,key)))
}

import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

type Callback = (...args:any[])=> Promise<any> //take any no. of argument but return the promise
export function cache<T extends Callback>(cb:T,keyParts:string[],options:{ //T extends Callback means T is subtype of Callback
    revalidate?:number|false; tags?:string[]} = {}
){
    return nextCache(reactCache(cb),keyParts,options);
}

// reason for making this helper function is to we don't have to import both reactCache and nextCache

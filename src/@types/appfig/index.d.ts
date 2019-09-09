// TODO: This works, but it's not the right format (caller states that appfig_1.default is not a function)
declare module 'appfig' {
    export default function appfig(filename: string) : any
}



// This is what the dts-gen module wrote (but TS doesn't see it as a valid module declaration)
/*

export = appfig;

declare function appfig(configFilePath: any, options: any, afterConfigLoaded: any): any;

*/
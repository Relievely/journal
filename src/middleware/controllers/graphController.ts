import { getFeelingData } from "../adapters/SQLiteAdapter";

export function getFeelings(req : any,res : any){
    
    let FeelingData = getFeelingData()
    res.status(200).json(FeelingData);
    
}
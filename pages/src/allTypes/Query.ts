import { stringArg, queryType, extendType } from "@nexus/schema";
import { Prescriptions } from "./Prescriptions";
import { data } from "../data";

export const Query = extendType({
    type:'Mutation',
    definition(t){
         t.list.field("prescriptions",{
             type: Prescriptions,
             resolve:() => data.prescritions,
         });

         t.list.field("prescription",{
             type:Prescriptions,             
             args:{prescription: stringArg()},
             resolve:(root,{prescription}:{prescription:string}, ctx)=>{
                 let ar = [];
                 let lenght_of_the_prescription_to_search = prescription.trim().length;
                 let it_matches = true; 
                data.prescritions.forEach((value) =>{
                          
                         let v = value.name.toLowerCase();
                         it_matches = true;
                          
                        for(let i = 0 ; i < lenght_of_the_prescription_to_search; i++)
                        {
                            if(v[i] !== prescription.toLowerCase()[i])
                                    it_matches = false;
                        } 
                           
                         if(it_matches)
                         {
                           
                            Object.assign(value,{search_name:`${value.name}(${value.generic_name})`})
                            console.log(value);   
                           ar.push(value);
                         }
                         it_matches = true;
                         let g = value.generic_name.toLowerCase();
                         for(let i = 0 ; i < lenght_of_the_prescription_to_search; i++)
                         {
                            if(g[i] !== prescription.toLowerCase()[i])
                                    it_matches = false;
                         }
                         if(it_matches)
                         {
                            Object.assign(value,{search_name:`${value.generic_name}(${value.name})`})
                            console.log(value);
                           ar.push(value);
                         }
                         

                });                 
             
             return ar;
            }
            
         });
    }
})
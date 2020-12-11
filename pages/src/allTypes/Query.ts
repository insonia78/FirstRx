import { queryType } from "@nexus/schema";
import { Prescriptions } from "./Prescriptions";
import { data } from "../data";

export const Query = queryType({
    definition(t){
         t.list.field("prescriptions",{
             type: Prescriptions,
             resolve:() => data.prescritions,
         });
    }
})
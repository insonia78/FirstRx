import { objectType } from "@nexus/schema";
import { Dosage } from "./Dosage";
export const Prescriptions = objectType({
    name: "Prescriptions",    
    definition(t) {
        t.string('name');
        t.string('generic_name');
        t.string('manufacturer');
        t.list.string('form');
        t.list.field('dosage', {
            type:Dosage,
            resolve(dosage) {                
                return dosage.dosage;                
            }
        });
        t.list.string('quantity');
    }
});

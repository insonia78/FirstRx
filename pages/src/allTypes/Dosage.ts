import { objectType } from "@nexus/schema";

export const Dosage = objectType({
    name: "Dosage",
    definition(t) {
        t.string('dosage');
        t.string('quantity');
        t.string('type');
    }
})
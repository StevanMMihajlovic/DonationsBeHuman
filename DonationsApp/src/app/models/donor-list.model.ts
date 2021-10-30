import { Donor } from "./donor.model";

export class DonorList {
    count: number;
    donors: Donor[];

    constructor(obj?:any) {
        this.count = obj && obj.count || 0;
        this.donors = obj && obj.donors && obj.donors.map((x:any) => {
            return new Donor(x);
        }) || [];
    }
}

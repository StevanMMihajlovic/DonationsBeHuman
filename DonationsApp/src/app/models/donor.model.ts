
export class Donor {
    _id: number;
    name: string;
    description: string;
    charity_date: string;
    categories: string[];
    estimated_value: number;

    constructor(obj?:any) {
        this.name = obj && obj.name || "";
        this.charity_date = obj && obj.charity_date || "";
        this._id = obj && obj._id || 0;
        this.description = obj && obj.description || "";
        this.categories = obj && obj.categories || [];
        this.estimated_value = obj && obj.estimated_value || 0;
        
    }
}
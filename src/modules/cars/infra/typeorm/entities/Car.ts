import { v4 as uuidV4 } from "uuid"

class Car {
    id: string;

    name: string;

    description: string;

    daily_rate: number;

    license_plate: string;

    fine_amount: number;

    brand: string;

    category_id: string;

    created_at: Date;

    available: boolean;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.available = true;
            this.available = true;
            this.created_at = new Date();
        }
    }

}

export { Car };
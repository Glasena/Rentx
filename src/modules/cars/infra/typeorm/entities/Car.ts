import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
class Car {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @Column()
    category_id: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    available: boolean;

    @ManyToMany(() => Specification)
    @JoinTable({

        name: "specifications_cars",

        // Nome da coluna que referencia a tabela Cars na tabela Specifications
        joinColumns: [{ name: "car_id" }],

        // Nome da coluna que referencia a tabela Specifications
        inverseJoinColumns: [{ name: "specification_id" }]
    })
    specifications: Specification[];

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.available = true;
        }
    }

}

export { Car };
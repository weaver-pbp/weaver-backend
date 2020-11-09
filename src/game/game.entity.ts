import { UUIDColumn } from "common/decorators/uuid-column.decorator";
import { Column, Entity } from "typeorm";

@Entity()
export default class Game {
    @UUIDColumn()
    public id: string;

    @Column({ length: 50 })
    public name: string;

    @Column({ length: 1024 })
    public description: string;
}

import CommonEntity from "common/entity/common.entity";
import { Column, Entity } from "typeorm";

@Entity()
export default class Game extends CommonEntity {
    @Column({ length: 50 })
    public name: string;

    @Column({ length: 1024 })
    public description: string;
}

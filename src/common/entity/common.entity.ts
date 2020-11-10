import { UUIDColumn } from "common/decorators/uuid-column.decorator";
import * as uuid from "uuid";
import { BeforeInsert } from "typeorm";

export default abstract class CommonEntity {
    @UUIDColumn({ primary: true })
    public id: string;

    @BeforeInsert()
    private generateUID() {
        if (!this.id) {
            this.id = uuid.v4();
        }
    }
}

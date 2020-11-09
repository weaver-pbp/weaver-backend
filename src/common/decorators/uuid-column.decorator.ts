import { applyDecorators } from "@nestjs/common";
import { FindOperator, PrimaryColumn } from "typeorm";
import * as uuid from "uuid";

export function UUIDColumn() {
    return applyDecorators(
        PrimaryColumn({
            type: "binary",
            length: 16,
            transformer: {
                from: dbValue => uuid.stringify(dbValue),
                to: entityValue => {
                    if (entityValue instanceof FindOperator) {
                        return new FindOperator(
                            entityValue.type as any,
                            Buffer.from(uuid.parse(entityValue.value)),
                            entityValue.useParameter,
                            entityValue.multipleParameters
                        );
                    } else {
                        return Buffer.from(uuid.parse(entityValue));
                    }
                },
            },
        })
    );
}

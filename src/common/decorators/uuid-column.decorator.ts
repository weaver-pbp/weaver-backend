import { applyDecorators } from "@nestjs/common";
import { Column, ColumnOptions, FindOperator } from "typeorm";
import * as uuid from "uuid";

export function UUIDColumn(params: ColumnOptions = {}) {
    return applyDecorators(
        Column({
            type: "binary",
            length: 16,
            transformer: {
                from: dbValue => {
                    if (dbValue) {
                        return uuid.stringify(dbValue);
                    } else {
                        return null;
                    }
                },
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
            ...params,
        })
    );
}

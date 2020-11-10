import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    Not,
    UpdateEvent,
} from "typeorm";
import User from "user/user.entity";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    listenTo() {
        return User;
    }

    async generateTag(event: UpdateEvent<User> | InsertEvent<User>) {
        const userRepository = event.manager.getRepository(User);
        const entity = event.entity;

        while (
            !entity.tag ||
            (await userRepository.findOne({
                where: {
                    id: Not(entity.id),
                    username: entity.username,
                    tag: entity.tag,
                },
            }))
        ) {
            entity.tag = Math.floor(Math.random() * 9999);
        }
    }

    async beforeUpdate(event: UpdateEvent<User>) {
        return await this.generateTag(event);
    }

    async beforeInsert(event: InsertEvent<User>) {
        return await this.generateTag(event);
    }
}

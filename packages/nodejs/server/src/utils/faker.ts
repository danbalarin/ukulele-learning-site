import faker from 'faker';

export class Faker {
    username = () => faker.internet.userName();
    password = () => faker.internet.password();
    email = () => faker.internet.email();
    number = () => faker.random.number();
}

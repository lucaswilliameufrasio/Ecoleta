import faker from './faker-config';

export const mockPoints = {
    name: faker.company.companyName(),
    email: faker.internet.email(),
    whatsapp: faker.phone.phoneNumberFormat(),
    latitude: Number(faker.address.latitude()),
    longitude: Number(faker.address.longitude()),
    city: faker.address.city(),
    uf: faker.address.stateAbbr(),
    items: '1,2,3',
};

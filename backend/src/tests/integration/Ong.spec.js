const request = require('supertest');
const app = require('../../app');
const conection = require('../../database/connection');
describe('ONG', () =>{

    beforeEach(async() => {
        await conection.migrate.rollback();
        await conection.migrate.latest();
    });

    afterAll(()=>{
        conection.destroy();
    });

    it('shoul be able to create a new ONG', async ()=> {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "ONG 40",
            email: "contato@ong1.com",
            whatsapp: "34999029678",
            city: "Ituitaba",
            uf: "MG"
        });

       expect(response.body).toHaveProperty('id');
       expect(response.body.id).toHaveLength(8);
    });
})
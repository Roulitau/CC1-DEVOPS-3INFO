const request = require('supertest')
const app = require ('./server');

describe("ToDoList API Tests", ()=>{
    //Test du get vide
    it('Devrait return une liste vide au départ', async () =>{
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.tasks).toEqual([]);
    })

    it('Devrait add une nouvelle tâche', async() =>{
        const response = await request(app)
        .post('/add-task')
        .send({task : {id: 0, task: "Tâche de test"}});
        expect(response.statusCode).toBe(200);
        expect(response.body.tasks).toContainEqual({id: 0, task: "Tâche de test"})
    })

    it('Devrait delete', async()=> {
        //await request(app).post('/add-task').send({task :{id: 0, text: 'Tâche à supprimer'}})
        const response = await request(app).delete('?id=0');
        expect(response.statusCode).toBe(200);
        expect(response.body.tasks).toEqual([])
    })
})
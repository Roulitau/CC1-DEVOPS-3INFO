const request = require('supertest');
const app = require('./src/App');

describe("API de gestion des tâches", () => {
    
    it('Devrait retourner une liste vide au départ', async () => {
        const response = await request(app).get('/tasks');
        expect(response.statusCode).toBe(200);
        expect(response.body.tasks).toEqual([]);
    });

    it('Devrait ajouter une tâche', async () => {
        const newTask = { id: 1, task: 'Test de tâche' };
        const response = await request(app)
            .post('/tasks')
            .send(newTask);
        expect(response.statusCode).toBe(200);
        expect(response.body.tasks).toContainEqual(newTask);
    });

    it('Devrait supprimer une tâche', async () => {
        const taskToDelete = { id: 1, task: 'Tâche à supprimer' };
        await request(app).post('/tasks').send(taskToDelete); 
        const response = await request(app).delete(`/tasks/${taskToDelete.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.tasks).not.toContainEqual(taskToDelete);
    });
});

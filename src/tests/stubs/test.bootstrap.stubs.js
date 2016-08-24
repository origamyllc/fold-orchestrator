/**
 * Created by prashun on 8/22/16.
 */

export const  user_stub = {
    username:'bart',
    password:'bartmargeisTheSon',
    email:'bart@cut.com',
    roles:['catalog.admin']
};


export const role_stub  = {
    name: 'catalog.admin',
    description: 'can administer the catalog',
    claims: 'ghafdgsfdgahvh6433517683485'
}

export const jwt_token = {
    response: {
        value: 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1N2FlYzY1NWFkZWNlZWM5MG'
        + 'Y1NDNlMGUiLCJ1c2VybmFtZSI6ImhvbWVyIiwicm9sZXMiOlsiY2F0YWxvZy5hZG1pbiJdLCJ'
        + 'jbGFpbXMiOiI1N2FlYzY1NWFkZWNlZWM5MGY1NDNlMTMiLCJpYXQiOjE0NzExNjk2OTl9.pWHk'
        + '1ztxsaTsHYK9deQYpi5J5EyZ1ZP_hVlF6Lbus1s'
    },
    status:200
};

export const access_token = '6d3323f5-e9ec-4717-90ea-b3217cda1333';

export const successResponse = {
    "response": "SUCCESS!",
    "status": 200
}
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

export const claims_stub  = {
    name:'catalog.admin.claims',
    description:'Has full admin rights for the catalog',
    applications:[],
    devices:[],
    api_white_list:[
        {"/catalog/devices":"Y"},
        {"/catalog/application":"Y"},
        {"/catalog/api":"Y"}
    ]
}


export const jwt_token = {
    response: {
        value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1N2FlYzY1NWFkZWNlZWM5MGY1NDNlMGYiLCJ1c2VybmFtZSI6Im1hcmdlIiwicm9sZXMiOlsiY2F0YWxvZy5hZG1pbiJdLCJjbGFpbXNJZCI6IjU3YWVjNjU1YWRlY2VlYzkwZjU0M2UxMyIsImlhdCI6MTQ3MjEwNDM4MH0.qJjSi46JyJ6NjaKpVi18jg1RH5BL7XfsdyulEobyZdg'
    },
    status:200
};

export const access_token = '6d3323f5-e9ec-4717-90ea-b3217cda1333';

export const successResponse = {
    "response": "SUCCESS!",
    "status": 200
}
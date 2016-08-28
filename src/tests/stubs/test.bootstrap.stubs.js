/**
 * Created by prashun on 8/22/16.
 */

export const  user_stub = {
    docs:
    [ { _id: '57aec655adeceec90f543e10',
        updated_at: '2016-08-13T07:03:49.760Z',
        created_at: '2016-08-13T07:03:49.760Z',
        username: 'bart',
        hashedPassword: 'Q9gyYkboM5yBTcZRS2/OYEBQ+qZEbFJ2skeJW/nk1AaixFGcZ4HxqF/782zpRHfGrW1l7RzxsSBlobzynD+oPQ==',
        __v: 0,
        salt: 'aQpNcjg+IeWS8b/mzMJXBQ==',
        roles:['catalog.admin'],
        email: 'bart@cut.com' } ]
};

export const jwt_object = {
    userId: '57aec655adeceec90f543e0f',
    username: 'bart',
    roles: [ 'catalog.admin' ]
}

export const role_stub  = {
    "docs":[ {"_id":"57aec663adeceec90f543e19",
        "updated_at":"2016-08-13T07:04:06.396Z",
        "created_at":"2016-08-13T07:04:06.396Z",
        "name":"catalog.admin",
        "description":"can administer the catalog",
        "claims":"57aec655adeceec90f543e13","__v":0}]
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
        value:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1N2FlYzY1NWFkZWNlZWM5MGY1NDNlMGYiLCJ1c2VybmFtZSI6Im1hcmdlIiwicm9sZXMiOlsiY2F0YWxvZy5hZG1pbiJdLCJjbGFpbXNJZCI6IjU3YWVjNjU1YWRlY2VlYzkwZjU0M2UxMyIsImlhdCI6MTQ3MjEwNDM4MH0.qJjSi46JyJ6NjaKpVi18jg1RH5BL7XfsdyulEobyZdg'
    },
    status:200
};

export const access_token = '6d3323f5-e9ec-4717-90ea-b3217cda1333';

export const successResponse = {
    "response": "SUCCESS!",
    "status": 200
}
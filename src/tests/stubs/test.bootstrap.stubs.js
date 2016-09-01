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
    userId: '57aec655adeceec90f543e10',
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
    "docs":
        [{"_id":"57aec655adeceec90f543e13",
            "updated_at":"2016-08-13T07:03:49.770Z",
            "created_at":"2016-08-13T07:03:49.770Z",
            "name":"catalog.admin.claims",
            "description":"Has full admin rights for the catalog",
            "api_white_list":[
                {"/catalog/devices":"Y"},
                {"/catalog/application":"Y"},
                {"/catalog/api":"Y"}
            ],
            "__v":0,"applications":[],
            "devices":[]}]
        }


export const jwt_token = {
    "response": {
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1N2FlYzY1NWFkZWNlZWM5MGY1NDNlMGUiLCJ1c2VybmFtZSI6ImhvbWVyIiwicm9sZXMiOlsiY2F0YWxvZy5hZG1pbiJdLCJjbGFpbXMiOiI1N2FlYzY1NWFkZWNlZWM5MGY1NDNlMTMiLCJpYXQiOjE0NzExNjk2OTl9.pWHk1ztxsaTsHYK9deQYpi5J5EyZ1ZP_hVlF6Lbus1s"
    },
    "status": 200
}

export const token_stub = {"docs":[ {"_id":"57aec65badeceec90f543e16",
        "updated_at":"2016-08-13T07:03:55.959Z",
        "created_at":"2016-08-13T07:03:55.959Z",
        "userId":"57aec655adeceec90f543e10",
        "accessToken":"abb0d6af-bafc-4f32-b698-88878a1911f9",
        "__v":0}]};

export const access_token = '6d3323f5-e9ec-4717-90ea-b3217cda1333';

export const successResponse = {
    "response": "SUCCESS!",
    "status": 200
}
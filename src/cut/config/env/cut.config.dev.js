export const config = {
    mongo: 'mongodb://localhost/security-5',
    redis: {
     session :{
        server: 'localhost',
        secretKey: 'SeekQret-CranberryDev',
        prefix: 'sess-dev',
        port: 6379,
        db: 0
    },
        db : {
            server: 'localhost',
            secretKey: 'SeekQret-CranberryDev',
            port: 6379,
            db: 1
        }
    },
    rabbit: {
        host: 'localhost'
    },
    express:{
        port:9200
    }
}




























































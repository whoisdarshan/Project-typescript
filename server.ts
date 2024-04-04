import express  from "express";
import dotenv from "dotenv";
import {DBUtil} from './db/dbUtil'
import userRoute from "./routes/user_routes";
import adminRoute  from "./routes/admin/admin.routes";
import productRoute from "./routes/admin/product.routes"
import productRoutes from "./routes/user/product.routes";
import favouriteRoute from "./routes/user/favourite.routes";
import cartRoute from "./routes/user/cart.routes";

const server = express();

dotenv.config({
    path: './.env'
})


const port: Number | undefined = Number(process.env.PORT);
const dbUrl: string | undefined = process.env.MONGO_URL;
const dbName: string | undefined = process.env.MONGO_NAME;

server.use(express.json());

server.use('/api/user', userRoute);
server.use('/api/admin',adminRoute);
server.use('/api/product',productRoute);
server.use('/api/product/user',productRoutes);
server.use('/api/favourite',favouriteRoute);
server.use('/api/cart',cartRoute);



if(port && dbUrl && dbName){
    server.listen(port, ()=>{
        if (dbUrl && dbName) {
            DBUtil.connectToDb(dbUrl, dbName).then((dbResponse) => {
                console.log(dbResponse);
            }).catch((error) => {
                console.error(error);
                process.exit(0); // stops the node js process
            });
        }   
        console.log(`Server is running on http://localhost:${port}`);
    })
}
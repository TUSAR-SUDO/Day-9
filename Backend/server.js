/**server ko start karna
 * database se connect karna
 * 
 */
require('dotenv').config()
const connectToDb = require("./src/config/database")
connectToDb()

const app = require("./src/app")
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
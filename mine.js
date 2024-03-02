import express from"express"
import bootstrap from './src/bootStrab.js';
import {config} from "dotenv"
const app = express()
config()
// import QRCode from 'qrcode'

// QRCode.toDataURL('I am a pony!', function (err, url) {
//   console.log(url)
// })
const port = +process.env.PORT
bootstrap(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
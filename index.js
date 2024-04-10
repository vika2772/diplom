import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import path, { dirname, join } from "path"; // Импортируем модуль path из Node.js
import morgan from "morgan";
import fs from "fs";
import authRouter from "./routes/auth.js";
import projectRouter from "./routes/project.js";
import modeleRouter from "./routes/module.js";
import fileRouter from "./routes/file.js";

import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express(); //создание сервера
const PORT = process.env.PORT || 5000; //порт на котором все запускается

//Для env
dotenv.config();

//Рандомная генерация токенов
const generateRandomToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
const access_token_secret = generateRandomToken();
const refresh_token_secret = generateRandomToken();
const corsOption = { credential: true, origin: process.env.URL || "*" };
//Запись токинов в файл
fs.writeFileSync(
  ".env",
  `ACCESS_TOKEN_SECRET=${access_token_secret}\nREFRESH_TOKEN_SECRET=${refresh_token_secret}`
);

app.use(morgan("dev")); //В режиме 'dev', morgan предоставляет удобочитаемые логи каждого запроса к серверу, что удобно при разработке. Эти логи включают метод запроса, URL, статус ответа, время ответа и другие полезные данные.

app.use(bodyParser.urlencoded({ extended: true })); //Это подключает bodyParser, промежуточное ПО для разбора тел запросов. В данном случае, оно настроено на разбор данных, отправляемых через HTML-формы (urlencoded), позволяя извлекать и использовать эти данные в Express-приложении.
app.use(bodyParser.json()); // Это также подключение bodyParser, но настроенное на разбор JSON-данных, отправляемых клиентом. Это позволяет легко работать с JSON-данными, получаемыми в теле запросов.

app.use(cors(corsOption)); //Это подключает промежуточное ПО cors, которое позволяет управлять политиками CORS (Cross-Origin Resource Sharing) в приложении. Это важно для разрешения или ограничения доступа к вашему серверу из скриптов, запущенных на других доменах. Без этого, браузеры по умолчанию блокируют запросы к серверам, расположенным вне исходного домена.
app.use("/api/auth", authRouter); //прослушка роута авторизации
app.use("/api", projectRouter);
app.use("/api", modeleRouter);
app.use("/api", fileRouter);

app.use(express.static(join(__dirname, "client")));
// При запросе к корню сайта, отправляем HTML страницу index.html из папки "html"
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "client", "html", "index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(join(__dirname, "client", "html", "About.html"));
});
// Маршрут для страницы "kontakt.html"
app.get("/kontakt", (req, res) => {
  res.sendFile(join(__dirname, "client", "html", "kontakt.html"));
});

// Маршрут для страницы "QandAscreen.html"
app.get("/q-and-a", (req, res) => {
  res.sendFile(join(__dirname, "client", "html", "QandAscreen.html"));
});
app.get("/mainprepod.html", (req, res) => {
  res.sendFile(join(__dirname, "client", "html", "mainprepod.html"));
});

app.get("/myproject.html", (req, res) => {
  res.sendFile(join(__dirname, "client", "html", "myproject.html"));
});
app.get("/addproject.html", (req, res) => {
  res.sendFile(join(__dirname, "client", "html", "addproject.html"));
});
app.get("/changeproject.html", (req, res) => {
  res.sendFile(join(__dirname, "client", "html", "changeproject.html"));
});

app.get("/viewCurs.html", (req, res) => {
  res.sendFile(join(__dirname, "client", "html", "viewCurs.html"));
});

app.listen(PORT, () => console.log(`server work on ${PORT}`)); //запуск сервера

export default app;

import { Elysia } from "elysia";
import { html } from "@elysiajs/html";

export const miniApp = new Elysia().use(html()).get(
	"/",
	() => `<html lang='en'>
                <script src="https://telegram.org/js/telegram-web-app.js"></script>
                <script> 
                    fetch("https://${process.env.HOST}/v1/tg-login", {
                        method: "POST",
                        body: JSON.stringify({
                            tg_init_data: Telegram.WebApp.initData
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    document.addEventListener("DOMContentLoaded", function(e) {
                        document.querySelector('#fetchMe').addEventListener('click', async () => {
                            const tgUsernameElem = document.querySelector('#tg_username');
                            const tgIdElem = document.querySelector('#tg_id');

                            tgUsernameElem.innerText = '';
                            tgIdElem.innerText = '';

                            const tgUserData = await fetch("https://${
															process.env.HOST
														}/v1/me")
                                .then(res => res.json());

                            tgUsernameElem.innerText = 'tg_username: ' + tgUserData.tg_username;
                            tgIdElem.innerText =  'tg_id: ' + tgUserData.tg_id;
                        });

                        const userNumberForm = document.querySelector('#userNumberForm');

                        userNumberForm.addEventListener('submit', (e) => {
                            e.preventDefault();

                            const data = new FormData(e.target);
                            const userNumber =  data.get('userNumberInput');
                            const now = new Date();
                            const expiresAt = new Date(
                                now.setSeconds(now.getSeconds() + ${Number.parseInt(
																	process.env.CRON_TTL_IN_SECONDS
																)})
                            ).toISOString();
                            
                            document.querySelector('#userNumberInput').value = "";

                            fetch("https://${
															process.env.HOST
														}/v1/endpoint", {
                                method: "POST",
                                body: JSON.stringify({
                                    value: parseInt(userNumber),
                                    expires_at: expiresAt
                                }),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            });
                        });

                        const fetchUserNumberButton = document.querySelector('#fetchUserNumber');

                        fetchUserNumberButton.addEventListener('click', async () => {
                            const valueField = document.querySelector('#userNumberValue');

                            valueField.innerText = '';

                            const userNumber = await fetch("https://${
															process.env.HOST
														}/v1/endpoint")
                                .then(res => res.json());

                            valueField.innerText = JSON.stringify(userNumber);
                        });
                    });
                </script>
                <head>
                    <title>tz-igaming</title>
                </head>
                <body>
                    <h1 id="title">tz-igaming</h1>
                    <button id="fetchMe" type="button">ME</button>
                    <div id="tg_id"></div>
                    <div id="tg_username"></div>
                    <div style="display:inline; height:50px"></div>
                    <form id="userNumberForm">
                        <label for="userNumberInput">User Number:</label><br>
                        <input type="text" id="userNumberInput" name="userNumberInput" value=""><br><br>
                        <input type="submit" value="Submit">
                    </form> 
                    <button id="fetchUserNumber" type="button">FetchUserNumber</button>
                    <div id="userNumberValue"></div>
                </body>
            </html>`
);

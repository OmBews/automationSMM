const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/config").mongoURI;
const teamMembers = require("./routes/api/teamMembers");
const trials = require("./routes/api/trials");
const comments = require("./routes/api/comments");
const {Builder, By, WebElement} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const axios = require("axios");
const cron = require("node-cron");
const ig = require("instagram-scraping");
const path = require("path");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const SMMKEY = "f009489187f3dce80207c2c5ee2d47fc";
const followizKey = "14fa86ed817dd6ea7a8dd9e9cfbb8725";
const paytoKey = "b825403d29ef9f7b4e20389a37bfc17a";

app.use(cors());
app.use(bodyParser.json());

app.use("/api/teammembers", teamMembers);
app.use("/api/trials", trials);
app.use("/api/comments", comments);

mongoose.connect(db, () => {
    console.log("DB is connected");
});



app.post('/fetch', (req, res) => {
    let followizz;
    let paytoz;
    let indianSmartz;
    let SMMz;
    axios.post('https://followiz.com/api/v2', {

        key: "14fa86ed817dd6ea7a8dd9e9cfbb8725",
        action: "services"

    }).then(resp => {
        followizz = resp.data;

        axios.post('https://paytosmm.com/api/v2', {

            key: "b825403d29ef9f7b4e20389a37bfc17a",
            action: "services"

        }).then(resp => {
            paytoz = resp.data;

            axios.post('https://smmfollows.com/api/v2', {

                key: "f009489187f3dce80207c2c5ee2d47fc",
                action: "services"

            }).then(resp => {
                SMMz = resp.data;


                axios.post('https://indiansmartpanel.com/api/v2', {

                    api_token: "$2y$10$KgbapTBSR8oM7myoeZpP9eXrDXoXEzmmeWxaGdGIknu3mo1haJZLu",
                    action: "packages"

                }).then(resp => {
                    indianSmartz = resp.data;
                    const allServices = {
                        followizz,
                        paytoz,
                        indianSmartz,
                        SMMz

                    }
                    res.json(allServices);
                }).catch(err => {
                    res.json({"message": "error"})
                });


            }).catch(err => {
                res.json({"message": "error"})
            });


        }).catch(err => {
            res.json({"message": "error"})
        });

    }).catch(err => {
        res.json({"message": "error"})
    });


});


let followizOrder = {};
let paytoOrder = {};
let SMMOrder = {};
let orders = [];

app.post('/followizfollowers', async (req, res) => {
    console.log(req.body);
    followizOrder = req.body;
    await axios.get('http://localhost:5000/api/teammembers').then(response => {
        if (response.data) {
            response.data.map(async (item, index) => {

                console.log(item.url);
                await axios.post('https://followiz.com/api/v2', {

                    key: "14fa86ed817dd6ea7a8dd9e9cfbb8725",
                    action: "add",
                    service: req.body.followizFollowers,
                    link: item.url,
                    quantity: req.body.followersFollowiz

                }).then(resp => {
                    console.log(resp.data);
                    
                    if (resp.data.order) 
                        orders.push(resp.data.order)
                    res.json(resp.data);

                    


                }).catch(err => console.log(err))
            });
        }
    }).catch(err => console.log(err));

});

app.post('/paytofollowers', async (req, res) => {
    console.log(req.body);
    paytoOrder = req.body;
    await axios.get('http://localhost:5000/api/teammembers').then(response => {
        if (response.data) {
            response.data.map(async (item, index) => {

                console.log(item.url);
                await axios.post('https://paytosmm.com/api/v2', {

                    key: "b825403d29ef9f7b4e20389a37bfc17a",
                    action: "add",
                    service: req.body.PaytoFollowers,
                    link: item.url,
                    quantity: req.body.followersPayto

                }).then(resp => {
                    console.log(resp.data);
                    if (resp.data.order) 
                        orders.push(resp.data.order)

                        res.json(resp.data);

                    


                }).catch(err => console.log(err))
            });
        }
    }).catch(err => console.log(err));

});

app.post('/smmfollowers', async (req, res) => {
    console.log(req.body);
    SMMOrder = req.body;
    await axios.get('http://localhost:5000/api/teammembers').then(response => {
        if (response.data) {
            response.data.map(async (item, index) => {

                console.log(item.url);
                await axios.post('https://smmfollows.com/api/v2', {

                    key: "f009489187f3dce80207c2c5ee2d47fc",
                    action: "add",
                    service: req.body.SMMFollowers,
                    link: item.url,
                    quantity: req.body.followersSMM

                }).then(resp => {
                    console.log(resp.data);
                    if (resp.data.order) 
                        orders.push(resp.data.order)


                        res.json(resp.data);
                    


                }).catch(err => console.log(err))
            });
        }
    }).catch(err => console.log(err));

});

app.post('/api/starter', (req, res) => {
    let teamMembers;
    let times = 0;
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    console.log('somthing');
    // getting the array of teammembers
    axios.get("http://localhost:5000/api/teammembers").then(async resp => {
        teamMembers = await resp.data;
        let counter = 0;


        for (let count = 0; count < teamMembers.length; count++) {
            let username = teamMembers[count].url.substring(22);
            await sleep(10000);

            ig.scrapeUserPage(username).then(async result => {
                console.log(result.medias[0].thumbnail_resource)

                const first = result.medias[0].shortcode;
                const second = result.medias[1].shortcode;
                const third = result.medias[2].shortcode;
                const followersCount = result.user.edge_followed_by.count;
                console.log("counr " + result.user.edge_followed_by.count);

                const obj = {
                    first,
                    second,
                    third,
                    followers: followersCount,
                    limitCounter: 0
                };


                await axios.post(`http://localhost:5000/api/teammembers/${
                    teamMembers[count]
                }._id}/update`, obj).then(response => {
                    console.log('done');
                }).catch(Err => console.log("Err"))


            }).catch(err => console.log(err));


        }


        // //////////////////automation here////////////////


        let task = cron.schedule("0 */3 * * * *", () => {
            times++;
            let limitCounter = 0;
            console.log("running");
            let automationArray = [];
            axios.get("http://localhost:5000/api/teammembers").then(async res => {
                let check = false;
                teamMembers = res.data;
                for (let count = 0; count < teamMembers.length; count++) {
                    const username = teamMembers[count].url.substring(22);
                    await sleep(10000);
                    ig.scrapeUserPage(username).then(async result => {
                        console.log("scraping result length " + result.medias.length);

                        if (result.medias.length > 2 && teamMembers[count].limitCounter < 3) {
                            const first = result.medias[0].shortcode;
                            const second = result.medias[1].shortcode;
                            const third = result.medias[2].shortcode;

                            if (first != teamMembers[count].firstImage) {
                                automationArray.push(teamMembers[count]);
                                limitCounter++;
                                const obj = {
                                    first,
                                    second,
                                    third,
                                    limitCounter,
                                    followers: result.user.edge_followed_by.count
                                };

                                await axios.post(`http://localhost:5000/api/teammembers/${
                                    teamMembers[count]._id
                                }/update`, obj).then(() => console.log('done with updating')).catch(err => console.log(err));
                            }
                            // if(second != teamMembers[count].firstImage && limitCounter < 3){
                            // automationArray.push(teamMembers[count])
                            // limitCounter++;
                            // }
                            // if(third != teamMembers[count].second && limitCounter < 3){
                            // automationArray.push(teamMembers[count])
                            // limitCounter++;
                            // }

                        }
                    });

                }


                await sleep((teamMembers.length + 1) * 10000);
                axios.get('http://localhost:5000/api/comments').then(async resp => {
                    for (let count = 0; count < automationArray.length; count++) {

                        let comments = resp.data;
                        let selectedComments = "";
                        let size = comments.length;

                        let numberRandom = Math.floor(Math.random() * (size - 1));
                        if (size - 15 == numberRandom) 
                            numberRandom = numberRandom + 10;
                        


                        let temporaryArray = [];

                        for (let count = 0; count < numberRandom; count++) {
                            // let commentNumber = Math.floor(Math.random() * (size - 2 + 1)) + 3;
                            // commentNumber--;
                            let randomnumber = Math.floor(Math.random() * (size - 1));
                            // selectedComments = selectedComments + (comments[randomnumber].comment) + '\r\n';
                            temporaryArray.push(comments[randomnumber].comment);
                        }
                        console.log(temporaryArray);
                        // temporaryArray[0] = selectedComments;

                        let random1 = Math.floor(Math.random() * 10);
                        let random2 = Math.floor(Math.random() * 10);
                        let random3 = Math.floor(Math.random() * 10);
                        let random4 = Math.floor(Math.random() * 10);
                        let random5 = Math.floor(Math.random() * 10);
                        let random6 = Math.floor(Math.random() * 10);
                        let random7 = Math.floor(Math.random() * 10);
                        let random8 = Math.floor(Math.random() * 10);
                        let random9 = Math.floor(Math.random() * 10);
                        let random10 = Math.floor(Math.random() * 10);
                        let random11 = Math.floor(Math.random() * 10);
                        let commentsCounter = Math.floor(Math.random() * 30) + 10;
                        console.log(automationArray[count]);
                        let likes = parseInt(automationArray[count].followers, 10);
                        likes = (likes / 100) * 2;
                        likes = Math.ceil(likes);
                        if (likes < 50) 
                            likes = 50;
                        


                        console.log(likes);

                        await axios.post('https://followiz.com/api/v2', {

                            key: "14fa86ed817dd6ea7a8dd9e9cfbb8725",
                            action: "add",
                            service: followizOrder.followizLikes,
                            link: automationArray[count].url + "/p/" + automationArray[count].firstImage,
                            quantity: likes

                        }).then(async resp => {

                            console.log(resp.data);
                            if (resp.data.order) 
                                orders.push(resp.data.order)


                            


                            await axios.post('https://followiz.com/api/v2', {

                                key: "14fa86ed817dd6ea7a8dd9e9cfbb8725",
                                action: "add",
                                service: followizOrder.followizComments,
                                link: automationArray[count].url + "/p/" + automationArray[count].firstImage,
                                commments: temporaryArray[random11] + "\n" + temporaryArray[random10] + "\n" + temporaryArray[random1] + "\n" + temporaryArray[random9] + "\n" + temporaryArray[random8] + "\n" + temporaryArray[random7] + "\n" + temporaryArray[random6] + "\n" + temporaryArray[random5] + "\n" + temporaryArray[random4] + "\n" + temporaryArray[random3] + "\n" + temporaryArray[random2],
                                quantity: commentsCounter

                                // comments:

                            }).then(resp => {

                                console.log(resp.data);
                                if (resp.data.order) 
                                    orders.push(resp.data.order)


                                


                            }).catch(err => console.log(err));
                        }).catch(err => console.log(err));

                        await axios.post('https://paytosmm.com/api/v2', {

                            key: "b825403d29ef9f7b4e20389a37bfc17a",
                            action: "add",
                            service: paytoOrder.PaytoLikes,
                            link: automationArray[count].url + "/p/" + automationArray[count].firstImage,
                            quantity: likes

                        }).then(resp => {
                            console.log(resp.data);
                            if (resp.data.order) 
                                orders.push(resp.data.order)


                            


                            axios.post('https://paytosmm.com/api/v2', {

                                key: "b825403d29ef9f7b4e20389a37bfc17a",
                                action: "add",
                                service: paytoOrder.PaytoComments,
                                link: automationArray[count].url + "/p/" + automationArray[count].firstImage,
                                commments: temporaryArray[random11] + "\n" + temporaryArray[random10] + "\n" + temporaryArray[random1] + "\n" + temporaryArray[random9] + "\n" + temporaryArray[random8] + "\n" + temporaryArray[random7] + "\n" + temporaryArray[random6] + "\n" + temporaryArray[random5] + "\n" + temporaryArray[random4] + "\n" + temporaryArray[random3] + "\n" + temporaryArray[random2],
                                quantity: commentsCounter

                            }).then(resp => {
                                if (resp.data.order) 
                                    orders.push(resp.data.order)


                                


                                console.log(resp.data);
                            }).catch(err => console.log(err));

                        }).catch(err => console.log(err));


                        await axios.post('https://smmfollows.com/api/v2', {

                            key: "f009489187f3dce80207c2c5ee2d47fc",
                            action: "add",
                            service: SMMOrder.SMMLikes,
                            link: automationArray[count].url + "/p/" + automationArray[count].firstImage,
                            quantity: likes

                        }).then(resp => {
                            if (resp.data.order) 
                                orders.push(resp.data.order)


                            


                            console.log(resp.data);


                            axios.post('https://smmfollows.com/api/v2', {

                                key: "f009489187f3dce80207c2c5ee2d47fc",
                                action: "add",
                                service: SMMOrder.SMMComments,
                                link: automationArray[count].url + "/p/" + automationArray[count].firstImage,
                                commments: temporaryArray[random11] + "\n" + temporaryArray[random10] + "\n" + temporaryArray[random1] + "\n" + temporaryArray[random9] + "\n" + temporaryArray[random8] + "\n" + temporaryArray[random7] + "\n" + temporaryArray[random6] + "\n" + temporaryArray[random5] + "\n" + temporaryArray[random4] + "\n" + temporaryArray[random3] + "\n" + temporaryArray[random2],
                                quantity: commentsCounter

                            }).then(resp => {
                                if (resp.data.order) 
                                    orders.push(resp.data.order)


                                


                                console.log(resp.data);
                            }).catch(err => console.log(err))


                        }).catch(err => console.log(err))

                    }


                }).catch(err => console.log(err));


                let taskTwo = cron.schedule("0 0 */20 * * *", () => {

                    const options = new chrome.Options();
                    options.addArguments("--disable-dev-shm-usage");
                    options.addArguments("--no-sandbox");
                    options.addArguments("--headless");


                    const driver = new Builder().forBrowser("chrome").setChromeOptions(options).build();


                    const driverPayto = new Builder().forBrowser("chrome").setChromeOptions(options).build();


                    const driverSMMfollowers = new Builder().forBrowser("chrome").setChromeOptions(options).build();


                    ticketFollowiz();
                    ticketPayto();
                    ticketSMM();

                    setTimeout(() => {
                        taskTwo.stop()
                    }, 360000)
                });


                // ticket followiz
                function ticketFollowiz() {
                    const pendingOrders = [];
                    driver.get("https://followiz.com/").then(() => {
                        setTimeout(() => {
                            driver.findElement(By.name("LoginForm[username]")).sendKeys("oceanooi").then(() => {
                                driver.findElement(By.name("LoginForm[password]")).sendKeys("ooi0314475").then(() => {
                                    driver.findElement(By.css(".btn:nth-child(1)")).click().then(() => {


                                        driver.get("https://followiz.com/").then(() => {
                                            driver.get("https://followiz.com/orders").then(() => {
                                                driver.sleep(3000);
                                                driver.get("https://followiz.com/orders").then(() => {
                                                    for (let count = 1; count < 101; count++) {
                                                        driver.findElement(By.css(`tr:nth-child(${count}) .status`)).then(res => {
                                                            res.getText().then(res => {
                                                                if (res == "Pending") {
                                                                    driver.findElement(By.css(`tr:nth-child(${count}) > td:nth-child(1)`).then(response => {
                                                                        response.getText().then(id => {
                                                                            pendingOrders.push(id);
                                                                        });
                                                                    }));
                                                                }

                                                                console.log(pendingOrders);
                                                            }).catch(err => console.log(err));
                                                        }).catch(Err => console.log(Err));
                                                    }
                                                    setTimeout(function () {
                                                        driver.get("https://followiz.com/tickets").then(() => {
                                                            driver.get("https://followiz.com/tickets").then(() => {
                                                                driver.findElement(By.css(".therequest .col:nth-child(3) .custom-control-label")).click().then(() => {
                                                                    for (let count = 0; count < pendingOrders.length; count++) {
                                                                        driver.findElement(By.css("#ordernumbers")).sendKeys(pendingOrders[count] + ",");
                                                                    }
                                                                }).catch(err => console.log(err));
                                                                setTimeout(function () {
                                                                    driver.findElement(By.css("#submit")).click().then(() => {
                                                                        setTimeout(() => {
                                                                            driver.quit();
                                                                        }, 7000)
                                                                    });
                                                                }, 5000);
                                                            }).catch(err => console.log(err));
                                                        });
                                                    }, 8000);
                                                });
                                                driver.sleep(8000);
                                            });
                                        }).catch(err => console.log(err));


                                    }).catch(err => console.log(err));
                                }).catch(err => console.log(err));
                            }).catch(err => console.log("here start men"));
                        })
                    }, 3000).catch(err => console.log(err));


                }
                // payto ticket
                function ticketPayto() {
                    const pendingOrders = [];


                    driverPaytoT.get("https://paytosmm.com/").then(() => {
                        driverPaytoT.findElement(By.name("LoginForm[username]")).sendKeys("oceanooi").then(() => {
                            driverPaytoT.findElement(By.name("LoginForm[password]")).sendKeys("ooi0314475").then(() => {
                                driverPaytoT.findElement(By.css(".btn")).click().then(() => {


                                    driverPayto.get("https://paytosmm.com/").then(() => {
                                        driverPayto.get("https://paytosmm.com/orders").then(() => {
                                            driverPayto.sleep(3000);
                                            driverPayto.get("https://paytosmm.com/orders").then(() => {
                                                for (let count = 1; count < 101; count++) {
                                                    driverPayto.findElement(By.css(`tr:nth-child(${count}) > td:nth-child(8)`)).then(res => {
                                                        res.getText().then(res => {
                                                            if (res == "In progress") {
                                                                driverPayto.findElement(By.css(`tr:nth-child(${count}) > td:nth-child(1)`).then(response => {
                                                                    response.getText().then(id => {
                                                                        pendingOrders.push(id);
                                                                    });
                                                                }));
                                                            }

                                                            console.log(pendingOrders);
                                                        }).catch(err => console.log(err));
                                                    }).catch(Err => console.log(Err));
                                                }
                                                setTimeout(function () {
                                                    driverPayto.get("https://paytosmm.com/tickets").then(() => {
                                                        driverPayto.get("https://paytosmm.com/tickets").then(() => {
                                                            driverPayto.findElement(By.css("#subject")).sendKeys("Order").then(() => {
                                                                driverPayto.findElement(By.css("#want")).sendKeys("Speed Up");

                                                                for (let count = 0; count < pendingOrders.length; count++) {
                                                                    driverPayto.findElement(By.css("#orderid")).sendKeys(pendingOrders[count] + ",");
                                                                }
                                                            }).catch(err => console.log(err));
                                                            setTimeout(function () {
                                                                driverPayto.findElement(By.css(".btn-primary")).click();
                                                            }, 5000);
                                                        }).catch(err => console.log(err));
                                                    });
                                                }, 8000);
                                            }).catch(err => console.log(err));
                                            driverPayto.sleep(8000);
                                        }).catch(err => console.log(err));
                                    }).catch(err => console.log(err));


                                }).catch(err => console.log(err))
                            }).catch(err => console.log(err));
                        }).catch(err => console.log("here start men"));
                    }).catch(err => console.log(err));


                }
                // smm comments
                function ticketSMM() {
                    // tr:nth-child(100) > td:nth-child(1)

                    // li:nth-child(9) > a


                    const pendingOrders = [];


                    driverSMM.get("https://smmfollows.com/").then(() => {
                        driverSMM.findElement(By.name("LoginForm[username]")).sendKeys("oceanooi").then(() => {
                            driverSMM.findElement(By.name("LoginForm[password]")).sendKeys("ooi0314475").then(() => {
                                driverSMM.findElement(By.css(".btn-primary")).click().then(() => {
                                    driverSMMfollowers.get("https://smmfollows.com").then(() => {
                                        driverSMMfollowers.get("https://smmfollows.com/orders").then(() => {
                                            driverSMMfollowers.sleep(3000);
                                            driverSMMfollowers.get("https://smmfollows.com/orders").then(() => {
                                                for (let count = 1; count < 101; count++) {
                                                    driverSMMfollowers.findElement(By.css(`tr:nth-child(${count}) > td:nth-child(8)`)).then(res => {
                                                        res.getText().then(res => {
                                                            if (res == "Pending") {
                                                                driverSMMfollowers.findElement(By.css(`tr:nth-child(${count}) > td:nth-child(1)`).then(response => {
                                                                    response.getText().then(id => {
                                                                        pendingOrders.push(id);
                                                                    });
                                                                }));
                                                            }

                                                            console.log(pendingOrders);
                                                        }).catch(err => console.log(err));
                                                    }).catch(Err => console.log(Err));
                                                }
                                                setTimeout(function () {
                                                    driverSMMfollowers.get("https://smmfollows.com/tickets").then(() => {
                                                        driverSMMfollowers.get("https://smmfollows.com/tickets").then(() => {
                                                            driverSMMfollowers.findElement(By.css("#subject")).sendKeys("Speed Up").then(() => {
                                                                for (let count = 0; count < pendingOrders.length; count++) {
                                                                    driverSMMfollowers.findElement(By.css("#message")).sendKeys(pendingOrders[count] + ",");
                                                                }
                                                            }).catch(err => console.log(err));
                                                            setTimeout(function () {
                                                                driverSMMfollowers.findElement(By.css(".btn-primary")).click();
                                                            }, 5000);
                                                        }).catch(err => console.log(err));
                                                    }).catch(err => console.log(err));
                                                }, 8000);
                                            }).catch(err => console.log(err));
                                            driverSMMfollowers.sleep(8000);
                                        }).catch(err => console.log(err));

                                        // });
                                    }).catch(err => console.log(err));


                                }).catch(err => console.log(err))
                            }).catch(err => console.log(err));
                        }).catch(err => console.log("here start men"));
                    }).catch(err => console.log(err));


                }
            }).catch(err => console.log(err));
            if (times > 6) {
                console.log('stopped');
                task.stop();
            }
        });


        // cron for likes and comments


    }).catch(err => console.log(err));

});


app.use(express.static('../build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


app.listen(5000, function () {
    console.log("server listening on port 5000");
});

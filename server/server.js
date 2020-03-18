const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/config").mongoURI;
const teamMembers = require("./routes/api/teamMembers");
const trials = require("./routes/api/trials");
const comments = require("./routes/api/comments");
const { Builder, By, WebElement } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const axios = require("axios");
const cron = require("node-cron");
const ig = require("instagram-scraping");
const path = require("path");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
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

// app.post("/api/scrape", async (req, responser) => {
//   let followizFollowersArray = [];
//   let followizLikesArray = [];
//   let followizCommentsArray = [];

//   let paytoFollowersArray = [];
//   let paytoLikesArray = [];
//   let paytoCommentsArray = [];

//   let SMMFollowersArray = [];
//   let SMMLikesArray = [];
//   let SMMCommentsArray = [];

//   const options = new chrome.Options();
//   options.addArguments("--disable-dev-shm-usage");
//   options.addArguments("--no-sandbox");
//   options.addArguments("--headless");

//   const driverT = new Builder()
//     .forBrowser("chrome")
//     .setChromeOptions(options)
//     .build();

//   // const driverIndianSmart = new Builder()
//   // .forBrowser("chrome")
//   // .setChromeOptions(options)
//   // .build();

//   const driverSMMT = new Builder()
//     .forBrowser("chrome")
//     .setChromeOptions(options)
//     .build();

//   const driverPaytoT = new Builder()
//     .forBrowser("chrome")
//     .setChromeOptions(options)
//     .build();

//   driverT
//     .manage()
//     .window()
//     .maximize();

//   // login followiz
//   driverT
//     .get("https://followiz.com/")
//     .then(() => {
//       setTimeout(() => {
//         driverT
//         .findElement(By.name("LoginForm[username]"))
//         .sendKeys("oceanooi")
//         .then(() => {
//           driverT
//             .findElement(By.name("LoginForm[password]"))
//             .sendKeys("ooi0314475")
//             .then(() => {
//               driverT
//                 .findElement(By.css(".btn:nth-child(1)"))
//                 .click()
//                 .then(() => {
//                   setTimeout(() => {
//                     driverT
//                     setTimeout(() => {
//                       driverT
//                         .get("https://bing.com/")
//                         .then(() => {
//                           driverT
//                             .get("http://followiz.com")
//                             .then(() => {
//                               driverT
//                                 .findElement(
//                                   By.css("#orderform-category")
//                                 )
//                                 .sendKeys(
//                                   "Instagram - Followers [Not Guaranteed/No Refill]"
//                                 )
//                                 .then(() => {
//                                   setTimeout(async () => {
//                                     let html = await driverT.getPageSource().catch(err => console.log('page source code getter'));

//                                     const dom = new JSDOM(html);
//                                     const document = dom.window.document;
//                                     let ddl = await document.getElementById(
//                                       "orderform-service"
// )
//                                     // console.log(ddl);

//                                     for (
//                                       i = 0;
//                                       i < ddl.options.length;
//                                       i++
//                                     ) {
//                                       // console.log(ddl.options[i]);
//                                       followizFollowersArray[i] =
//                                         ddl.options[i].text;
//                                     }
//                                     console.log(followizFollowersArray)


//                                     driverT
//                                     .findElement(
//                                       By.css("#orderform-category")
//                                     )
//                                     .sendKeys("Instagram - Likes")
//                                     .then(() => {
//                                       setTimeout(async () => {
//                                         let html = await driverT.getPageSource().catch(err => console.log('err getting page source code'));
//                                         const dom = new JSDOM(html);
//                                         const document =
//                                           dom.window.document;
//                                         let ddl = await document.getElementById(
//                                           "orderform-service"
// )
//                                         for (
//                                           i = 0;
//                                           i < ddl.options.length;
//                                           i++
//                                         ) {
//                                           followizLikesArray[i] =
//                                             ddl.options[i].text;
//                                         }
//                                         console.log(followizLikesArray);


//                                         driverT
//                                         .findElement(
//                                           By.css("#orderform-category")
//                                         )
//                                         .sendKeys("Instagram - Comments")
//                                         .then(() => {
//                                           setTimeout(async () => {
//                                             let html = await driverT.getPageSource().catch(err => console.log('err getting page source code comments'));
//                                             const dom = new JSDOM(html);
//                                             const document =
//                                               dom.window.document;
//                                             let ddl = await document.getElementById(
//                                               "orderform-service"
// )    
//                                             for (
//                                               i = 0;
//                                               i < ddl.options.length;
//                                               i++
//                                             ) {
//                                               followizCommentsArray[i] =
//                                                 ddl.options[i].text;
//                                             }
//                                             console.log(followizCommentsArray);
                                            
                                       
//                                             setTimeout(() => {
//                                               driverT.quit();
                                              
//                                             }, 30000);
                                      
                                     
//                                           }, 2000);
//                                         })
//                                         .catch(err => console.log(err));
                                        

//                                       }, 2000);
//                                     })
//                                     .catch(err => console.log(err));
//                                   }, 2000);

                         

                               
//                                 })
//                                 .catch(err =>
//                                   console.log("err is here not below")
//                                 );
//                             })
//                             .catch(err =>
//                               console.log(
//                                 "error sleeping below second get"
//                               )
//                             );
//                   }).catch(err => console.log(err))
                     
//                     }, 1000);

//                   }, 2000)
                 
//                 })
//                 .catch(err => console.log(err));
//             })
//             .catch(err => console.log(err));
//         })
//         .catch(err => console.log("here start men"));
//     })
//       }, 3000)
    
//     .catch(err => console.log(err));

//   // driverIndianSmart
//   // .manage()
//   // .window()
//   // .maximize();

//   driverSMMT
//     .manage()
//     .window()
//     .maximize();

//   //login smm
//   driverSMMT
//     .get("https://smmfollows.com/")
//     .then(() => {
//       driverSMMT
//         .findElement(By.name("LoginForm[username]"))
//         .sendKeys("oceanooi")
//         .then(() => {
//           driverSMMT
//             .findElement(By.name("LoginForm[password]"))
//             .sendKeys("ooi0314475")
//             .then(() => {
//               driverSMMT
//                 .findElement(By.css(".btn-primary"))
//                 .click()
//                 .then(() => {
            
                  
//                           setTimeout(() => {
                            
                             
//                                     driverSMMT
//                                       .findElement(
//                                         By.css("#orderform-category")
//                                       )
//                                       .sendKeys(
//                                         "Instagram Followers No Refill"
//                                       )
//                                       .then(() => {
//                                         setTimeout(async () => {
//                                           let html = await driverSMMT.getPageSource().catch(err => console.log('error in page source code fetching'));

//                                           const dom = new JSDOM(html);
//                                           const document = dom.window.document;
//                                           let ddl = await document.getElementById(
//                                             "orderform-service"
// )

//                                           for (
//                                             i = 0;
//                                             i < ddl.options.length;
//                                             i++
//                                           ) {
//                                             SMMFollowersArray[i] =
//                                               ddl.options[i].text;
//                                           }
//                                           console.log(SMMFollowersArray)

//                                           driverSMMT
//                                           .findElement(
//                                             By.css("#orderform-category")
//                                           )
//                                           .sendKeys("Instagram Likes")
//                                           .then(() => {
//                                             setTimeout(async () => {
//                                               let html = await driverSMMT.getPageSource() .catch(err => console.log('err getting page source code'));
//                                               const dom = new JSDOM(html);
//                                               const document =
//                                                 dom.window.document;
//                                               let ddl = await document.getElementById(
//                                                 "orderform-service"
// )
//                                               for (
//                                                 i = 0;
//                                                 i < ddl.options.length;
//                                                 i++
//                                               ) {
//                                                 SMMLikesArray[i] =
//                                                   ddl.options[i].text;
//                                               }
//                                               console.log(SMMLikesArray);


//                                               driverSMMT
//                                               .findElement(
//                                                 By.css("#orderform-category")
//                                               )
//                                               .sendKeys("Instagram Comments Worldwide")
//                                               .then(() => {
//                                                 setTimeout(async () => {
//                                                   let html = await driverSMMT.getPageSource().catch(err => console.log('getting page source code error'));
//                                                   const dom = new JSDOM(html);
//                                                   const document =
//                                                     dom.window.document;
//                                                   let ddl = await document.getElementById(
//                                                     "orderform-service"
// )      
//                                                   for (
//                                                     i = 0;
//                                                     i < ddl.options.length;
//                                                     i++
//                                                   ) {
//                                                     SMMCommentsArray[i] =
//                                                       ddl.options[i].text;
//                                                   }
//                                                   console.log(SMMCommentsArray);
//                                                   setTimeout(() => {
//                                                     driverSMMT.quit();
                                                    
//                                                   }, 30000)
//                                                 }, 2000);
//                                               })
//                                               .catch(err => console.log(err));
                                              

//                                             }, 2000);
//                                           })
//                                           .catch(err => console.log(err));
//                                         }, 2000);

                               

                                     
//                                       })
//                                       .catch(err =>
//                                         console.log("err is here not below")
//                                       );
                                  
                          
//                           }, 1000);
                    
                  
//                 })
//                 .catch(err => console.log(err))
//             })
//             .catch(err => console.log(err));
//         })
//         .catch(err => console.log("here start men"));
//     })
//     .catch(err => console.log(err));





//   driverPaytoT
//     .manage()
//     .window()
//     .maximize();

//   //payto signin

// setTimeout(() => {
//   const obj = {
//     followizFollowersArray,
//     followizLikesArray,
//     followizCommentsArray,
//     paytoCommentsArray,
//     paytoLikesArray,
//     paytoFollowersArray,
//     SMMCommentsArray,
//     SMMFollowersArray,
//     SMMLikesArray
//   }
//   responser.send(obj);
// }, 50000)


// });

// app.post("/api/start", async (req, res) => {
//   console.log(req.body)
//   const followers = req.body.followers;
//   let teamMembers = [];
//   let comments = [];


  // /////////////////////////////////////////FOLLOWERS BLOCK////////////////////////////////////////

  // followiz followers
  // function followersFollowiz(url) {
  //   driver
  //     .get("https://followiz.com/")
  //     .then(() => {
  //       driver
  //         .findElement(By.css("#orderform-category"))
  //         .sendKeys("Instagram - Followers [Not Guaranteed/No Refill]");
  //       driver.sleep(5000);

        
  //         driver
  //           .findElement(By.css("#orderform-service"))
  //           .sendKeys(req.body.followiz.followers);
      
  //       driver
  //         .findElement(By.css("#field-orderform-fields-link"))
  //         .sendKeys(url);
  //       driver
  //         .findElement(By.css("#field-orderform-fields-quantity"))
  //         .sendKeys(followers.followersFollowiz)
  //         .then(() => {
  //           driver
  //             .sleep(8000)
  //             .then(() => {
  //               // likesFollowiz(teamMembers[0]);
  //             })
  //             .catch(err => console.log(err));
  //         })
  //         .catch(err => console.log(err));

  //       // driver.findElement(By.css(".btn-blue")).click();
  //     })
  //     .catch(err => console.log("here not start men"));
  // }

  // // payto followers
  // function followersPayto(url) {
  //   driverPayto.get("https://paytosmm.com/").then(() => {
  //     driver.sleep(2000);
  //     driverPayto
  //       .findElement(By.css("#orderform-category"))
  //       .sendKeys("➡️Instagram Followers (No Refill)");
  //     driver.sleep(2000);

  //       driverPayto
  //         .findElement(By.css("#orderform-service"))
  //         .sendKeys(
  //           req.body.payto.followers
  //         );
     
  //     driverPayto.sleep(8000);

  //     driverPayto
  //       .findElement(By.css("#field-orderform-fields-link"))
  //       .sendKeys(url);
  //     driverPayto
  //       .findElement(By.css("#field-orderform-fields-quantity"))
  //       .sendKeys(followers.followersPayto);
  //   });

  //   driverPayto.findElement(By.css(".btn-primary")).click();
  // }
  // // smm followers
  // function followersSMM(url) {
  //   driverSMMfollowers.get("https://smmfollows.com/").then(() => {
  //     driverSMMfollowers
  //       .findElement(By.css("#orderform-category"))
  //       .sendKeys("Instagram Followers No Refill");
  //     driver.sleep(3000);

  //       driverSMMfollowers
  //         .findElement(By.css("#orderform-service"))
  //           req.body.SMM.followers
  //           .sendKeys();
     
  //     driverSMMfollowers.sleep(8000);

  //     driverSMMfollowers
  //       .findElement(By.css("#field-orderform-fields-link"))
  //       .sendKeys(url);
  //     driverSMMfollowers
  //       .findElement(By.css("#field-orderform-fields-quantity"))
  //       .sendKeys(followers.followersSMM);
  //   });
  //   driverSMMfollowers.findElement(By.css(".btn-primary")).click();

  //   driverSMMfollowers.sleep(5000);
  // }
  // // followiz indianSmart
  // function followersIndianSmart(url) {
  //   driverIndianSmart.get("https://indiansmartpanel.com/").then(() => {
  //     driverIndianSmart.sleep(8000);
  //     driverIndianSmart.findElement(By.css("#username")).sendKeys("oceanooi");
  //     driverIndianSmart.findElement(By.css("#password")).sendKeys("ooi0314475");
  //     driverIndianSmart
  //       .findElement(By.css(".cuteBtn:nth-child(6)"))
  //       .click()
  //       .then(() => {
  //         setTimeout(() => {
  //           driverIndianSmart
  //             .findElement(By.xpath("/html/body/div[3]/div/div[3]/button[1]"))
  //             .click();
  //           driverIndianSmart.sleep(8000);
  //           driverIndianSmart
  //             .findElement(By.xpath("/html/body/div[3]/div/div[3]/button[1]"))
  //             .click();
  //           driverIndianSmart.sleep(8000);
  //           driverIndianSmart
  //             .findElement(By.xpath("/html/body/div[3]/div/div[3]/button[1]"))
  //             .click();
  //           driverIndianSmart.sleep(8000);
  //           driverIndianSmart
  //             .findElement(By.xpath("/html/body/div[3]/div/div[3]/button[1]"))
  //             .click();
  //           driverIndianSmart.sleep(8000);
  //           driverIndianSmart
  //             .findElement(By.xpath("/html/body/div[3]/div/div[3]/button[1]"))
  //             .click();
  //           driverIndianSmart.sleep(8000);
  //         }, 4000);
  //       });
  //   });
  // }

  // //////////////////////////////////FOLLOWERS BLOCK END//////////////////////////////////

  // ////////////////////////////////////LIKES BLOCK//////////////////////////////////////

  // likes followiz
//   function likesFollowiz(item) {
//     let likes = parseInt(item.followers, 10);
//     likes = (likes / 100) * 1.5;
//     likes = Math.ceil(likes)

//     let selectedComments = [];
//     let size = comments.length;

//     let randomnumber = Math.floor(Math.random() * (size - 5 + 1)) + 5;
//     randomnumber--;

//     for (let count = 0; count < randomnumber; count++) {
//       let commentNumber = Math.floor(Math.random() * (size - 2 + 1)) + 3;
//       commentNumber--;
//       selectedComments.push(comments[commentNumber]);
//     }

//     driver
//       .get("https://followiz.com/")
//       .then(() => {
//           driver
//               .findElement(By.css("#orderform-category"))
//               .sendKeys("Instagram - Likes")
//               .then(() => {
//                 setTimeout(() => {

//                   driver
//                   .findElement(By.css("#orderform-service"))
//                   .sendKeys(req.body.followiz.likes);

//                 driver
//                   .findElement(By.css("#field-orderform-fields-link"))
//                   .sendKeys(item.url);
//                 if (likes < 20)
//                   driver
//                     .findElement(By.css("#field-orderform-fields-quantity"))
//                     .sendKeys(20);
//                 else
//                   driver
//                     .findElement(By.css("#field-orderform-fields-quantity"))
//                     .sendKeys(likes);
//                 driver.findElement(By.css(".btn-blue")).click().then(() => {
//                   setTimeout(() => {
//                     commentsFollowiz(item);
//                   }, 2000)
//                 }).catch(err => console.log(err));
//                 }, 2000)
             
//               })
//               .catch(err => console.log(err));
//       })
//       .catch(err => console.log(err));
//   }
//   // payto likes
//   function likesPayto(item) {
//     let likes = parseInt(item.followers, 10);
//     likes = (likes / 100) * 1.5;
//     likes = Math.ceil(likes);

//     driverPayto
//       .get("https://paytosmm.com/")
//       .then(() => {
//         setTimeout(function() {
//           driverPayto
//             .findElement(By.css("#orderform-category"))
//             .sendKeys("➡️Instagram Likes")
//             .then(() => {
//               driverPayto
//                 .findElement(By.css("#orderform-service"))
//                 .sendKeys(req.body.payto.likes);
//             })
//             .catch(err => console.log(err));

//           driverPayto.sleep(8000);

//           driverPayto
//             .findElement(By.css("#field-orderform-fields-link"))
//             .sendKeys(item.url);
//           if (likes < 20)
//             driverPayto
//               .findElement(By.css("#field-orderform-fields-quantity"))
//               .sendKeys(20);
//           else
//             driverPayto
//               .findElement(By.css("#field-orderform-fields-quantity"))
//               .sendKeys(likes);
//           driverPayto.findElement(By.css(".btn-primary")).click()
//             .then(() => {
//               setTimeout(() => {
//                 commentsPayto(item);
//               }, 2000)
//             })
//             .catch(err => console.log(err));
//         }, 5000);
//       })
//       .catch(err => console.log(err));
//   }
//   // smm likes
//   function likesSMM(item) {
//     let likes = parseInt(item.followers, 10);
//     Math.ceil(likes);
//     console.log(likes);
//     likes = (likes / 100) * 1.5;
//     likes = Math.ceil(likes);
//     console.log(likes);
//     driverSMMfollowers
//       .get("https://smmfollows.com/")
//       .then(() => {
//         driverSMMfollowers.sleep(3000);

//         driverSMMfollowers
//           .findElement(By.css("#orderform-category"))
//           .sendKeys("Instagram Likes");

//         // if(followers <= 18000)
//         // driverSMMfollowers
//         // .findElement(By.css("#orderform-service"))
//         // .sendKeys("New Instagram Likes [50k] [FAST] — $0.30 per 1000");
//         // else
//         driverSMMfollowers
//           .findElement(By.css("#orderform-service"))
//           .sendKeys(req.body.SMM.likes);

//         driverSMMfollowers
//           .findElement(By.css("#field-orderform-fields-link"))
//           .sendKeys(item.url);
//         if (likes < 20)
//           driverSMMfollowers
//             .findElement(By.css("#field-orderform-fields-quantity"))
//             .sendKeys(20);
//         else
//           driverSMMfollowers
//             .findElement(By.css("#field-orderform-fields-quantity"))
//             .sendKeys(likes);
//         driverSMMfollowers
//           .findElement(By.css(".btn-primary"))
//           .click()
//           .then(() => {
//             setTimeout(() => {
//               commentsSMM(item);
//             }, 2000);
//           })
//           .catch(err => console.log(err));
//       })
//       .catch(err => console.log(err));
//   }

//   // ////////////////////////////////////LIKES BLOCK END//////////////////////////////////////

//   // ////////////////////////////////////Comments BLOCK//////////////////////////////////////

//   axios.get("http://localhost:5000/api/comments").then(res => {
//     comments = res.data;

//     // delay function
  

  

//     // for tickets

//   });

//   // comments followiz
//   function commentsFollowiz(item) {
//     let selectedComments = [];
//     let size = comments.length;

//     let randomnumber = Math.floor(Math.random() * (size - 15 + 1)) + 5;
//     randomnumber--;

//     for (let count = 0; count < randomnumber; count++) {
//       let commentNumber = Math.floor(Math.random() * (size - 2 + 1)) + 3;
//       commentNumber--;
//       selectedComments.push(comments[commentNumber]);
//     }

//     driver
//       .get("https://followiz.com/")
//       .then(() => {
//         setTimeout(() => {
      
//           driver.sleep(8000);

//           driver
//             .findElement(By.css("#orderform-category"))
//             .sendKeys("Instagram - Comments");
//           driver.sleep(5000);

//           driver
//             .findElement(By.css("#orderform-service"))
//             .sendKeys(req.body.followiz.comments);

//           driver
//             .findElement(By.css("#field-orderform-fields-link"))
//             .sendKeys(item.url);
//             const com = req.body.followiz.comments;

//           if(com.includes('CUSTOM')){
//           selectedComments.map(comments => {
//             console.log(comments);
//             driver
//               .findElement(By.css("#field-orderform-fields-comment"))
//               .sendKeys(comments.comment + "\n");
//           });
//           driver.findElement(By.css(".btn-blue")).click();

//         } else {
//           driver
//           .findElement(By.css("#field-orderform-fields-quantity"))
//           .sendKeys(randomnumber).then(() => {
//           driver.findElement(By.css(".btn-blue")).click();

//           });
//         }
//           // driver
//           // .findElement(By.css("#field-orderform-fields-comment"))
//           // .sendKeys(numOfComments);

//         }, 5000);

//         driver.sleep(8000);
//       })
//       .catch(err => console.log(err));
//   }
//   // payto comments
//   function commentsPayto(item) {
//     let selectedComments = [];
//     let size = comments.length;

//     let randomnumber = Math.floor(Math.random() * (size - 15 + 1)) + 5;
//     randomnumber--;

//     for (let count = 0; count < randomnumber; count++) {
//       let commentNumber = Math.floor(Math.random() * (size - 2 + 1)) + 3;
//       commentNumber--;
//       selectedComments.push(comments[commentNumber]);
//     }

//     driverPayto
//       .get("https://paytosmm.com/")
//       .then(() => {
//         setTimeout(function() {
//           driverPayto
//             .findElement(By.css("#orderform-category"))
//             .sendKeys("➡️Instagram Comments and Comment Likes");

//           driverPayto
//             .findElement(By.css("#orderform-service"))
//             .sendKeys(req.body.payto.comments);
//           driverPayto.sleep(8000);

//           driverPayto
//             .findElement(By.css("#field-orderform-fields-link"))
//             .sendKeys(item.url);
//             const com = req.body.payto.comments;


//             if(com.includes('CUSTOM')){
//               selectedComments.map(comments => {
//                 console.log(comments);
//                 driverPayto
//                   .findElement(By.css("#field-orderform-fields-comment"))
//                   .sendKeys(comments.comment + "\n");
//               });
//               driverPayto.findElement(By.css(".btn-blue")).click();
    
//             } else {
//               driverPayto
//               .findElement(By.css("#field-orderform-fields-quantity"))
//               .sendKeys(randomnumber).then(() => {
//               driverPayto.findElement(By.css(".btn-primary")).click();
    
//               });
//             }

//           // selectedComments.map(item => {
//           //   driverPayto
//           //     .findElement(By.css("#field-orderform-fields-comment"))
//           //     .sendKeys(item.comment + "\n");
//           // });

//           // driverPayto.findElement(By.css(".btn-primary")).click();

//           // driverPayto.sleep(5000);
//         }, 10000);
//       })
//       .catch(err => console.log(err));
//   }
//   // smm comments
//   function commentsSMM(item) {
//     let selectedComments = [];
//     let size = comments.length;

//     let randomnumber = Math.floor(Math.random() * (size - 15 + 1)) + 5;
//     randomnumber--;

//     for (let count = 0; count < randomnumber; count++) {
//       let commentNumber = Math.floor(Math.random() * (size - 2 + 1)) + 3;
//       commentNumber--;
//       selectedComments.push(comments[commentNumber]);
//     }

//     driverSMMfollowers
//       .get("https://smmfollows.com/")
//       .then(() => {
//         driverSMMfollowers.sleep(5000);
//         setTimeout(function() {
//           driverSMMfollowers
//             .findElement(By.css("#orderform-category"))
//             .sendKeys("Instagram Comments Worldwide");

//           driverSMMfollowers
//             .findElement(By.css("#orderform-service"))
//             .sendKeys(req.body.SMM.comments);
//           driverSMMfollowers.sleep(8000);

//           driverSMMfollowers
//             .findElement(By.css("#field-orderform-fields-link"))
//             .sendKeys(item.url);
//           const com = req.body.SMM.comments

//             if(com.includes('CUSTOM')){
//               selectedComments.map(comments => {
//                 console.log(comments);
//                 driverSMMfollowers
//                   .findElement(By.css("#field-orderform-fields-comment"))
//                   .sendKeys(comments.comment + "\n");
//               });
//               driverSMMfollowers.findElement(By.css(".btn-blue")).click();
    
//             } else {
//               driverSMMfollowers
//               .findElement(By.css("#field-orderform-fields-quantity"))
//               .sendKeys(randomnumber).then(() => {
//               driverSMMfollowers.findElement(By.css(".btn-primary")).click();
    
//               });
//             }
//           // selectedComments.map(item => {
//           //   driverSMMfollowers
//           //     .findElement(By.css("#field-orderform-fields-comment"))
//           //     .sendKeys(item.comment + "\n");
//           // });

      
//           // driverSMMfollowers.sleep(5000);
//         }, 18000);
//       })
//       .catch(err => console.log(err));
//   }

// });




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
          SMMz= resp.data;


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
  await axios.get('http://localhost:5000/api/teammembers')
    .then(response => {
      if(response.data){
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
        if(resp.data.order)
        orders.push(resp.data.order)
      })
      .catch(err => console.log(err))
      });
      }
    }).catch(err => console.log(err));  

});

app.post('/paytofollowers',async (req, res) => {
  console.log(req.body);
  paytoOrder = req.body;
  await axios.get('http://localhost:5000/api/teammembers')
    .then(response => {
      if(response.data){
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
        if(resp.data.order)
        orders.push(resp.data.order)
      })
      .catch(err => console.log(err))
      });
      }
    }).catch(err => console.log(err));  

});

app.post('/smmfollowers',async (req, res) => {
  console.log(req.body);
  SMMOrder = req.body;
  await axios.get('http://localhost:5000/api/teammembers')
    .then(response => {
      if(response.data){
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
        if(resp.data.order)
        orders.push(resp.data.order)
      })
      .catch(err => console.log(err))
      });
      }
    }).catch(err => console.log(err));  

});

app.post('/api/starter',(req, res) => {
  let teamMembers;
  let times = 0;
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
   // getting the array of teammembers
   axios
   .get("http://localhost:5000/api/teammembers")
   .then(async resp => {
     teamMembers = await resp.data;
     let counter = 0;



    for(let count = 0; count<teamMembers.length; count++){
      let username = teamMembers[count].url.substring(22);
      await sleep(10000);

        ig.scrapeUserPage(username)
        .then(async result => {
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
        
        
          await axios
          .post(
            `http://localhost:5000/api/teammembers/${teamMembers[count]}._id}/update`,
            obj
          )
          .then(response => {
            console.log('done');
          })
          .catch(Err => console.log("Err"))


        }).catch(err => console.log(err));
 



    }


  // //////////////////automation here////////////////


  let task = cron.schedule("0 * */3 * * *", () => {
    times++;
    let limitCounter = 0;
    console.log("running");
    let automationArray = [];
    axios
      .get("http://localhost:5000/api/teammembers")
      .then(async res => {
        let check = false;
        teamMembers = res.data;
        for (let count = 0; count < teamMembers.length; count++) {
          const username = teamMembers[count].url.substring(22);
          await sleep(10000);
          ig.scrapeUserPage(username).then(async result => {
            console.log("scraping result length " + result.medias.length);

            if (
              result.medias.length > 2 &&
              teamMembers[count].limitCounter < 3
            ) {
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
  
                await axios
                  .post(
                    `http://localhost:5000/api/teammembers/${teamMembers[count]._id}/update`,
                    obj
                  )
                  .then(() => console.log('done with updating'))
                  .catch(err => console.log(err));
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


        await sleep((teamMembers.length  + 1) * 10000);
          axios.get('http://localhost:5000/api/comments')
            .then( async resp => {
              for(let count = 0; count < automationArray.length; count++){

              let comments = resp.data;
              let selectedComments = "";
              let size = comments.length;
          
              let numberRandom = Math.floor(Math.random() * (size - 1));
              if(size - 15 == numberRandom)
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

              console.log(automationArray[count]);
              let likes = parseInt(automationArray[count].followers, 10);
              likes = (likes / 100) * 2;
              likes = Math.ceil(likes);
              if(likes < 50)
              likes = 50;
              console.log(likes);
              // console.log(paytoOrder);
              // console.log(SMMOrder);
    
              await axios.post('https://followiz.com/api/v2', {
          
                      key: "14fa86ed817dd6ea7a8dd9e9cfbb8725",
                      action: "add",
                      service: followizOrder.followizLikes,
                      link: automationArray[count].url + "/p/" + automationArray[count].firstImage,
                      quantity: likes
                 
                }).then(async resp => {
                  
                  console.log(resp.data);
                  if(resp.data.order)
                  orders.push(resp.data.order)
                  await axios.post('https://followiz.com/api/v2', {
          
                    key: "14fa86ed817dd6ea7a8dd9e9cfbb8725",
                    action: "add",
                    service: followizOrder.followizComments,
                    link: automationArray[count].url + "/p/" + automationArray[count].firstImage,
                    commments: temporaryArray[random11] + "\n" + temporaryArray[random10] + "\n" + temporaryArray[random1] + "\n" + temporaryArray[random9] + "\n" + temporaryArray[random8] + "\n" + temporaryArray[random7] + "\n" + temporaryArray[random6] + "\n" + temporaryArray[random5] + "\n" + temporaryArray[random4] + "\n" + temporaryArray[random3] + "\n" + temporaryArray[random2],
                    quantity: likes

                    // comments:
               
              }).then(resp => {
                
                console.log(resp.data);
                if(resp.data.order)
                orders.push(resp.data.order)
    
              })
              .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
    
                await axios.post('https://paytosmm.com/api/v2', {
    
                  key: "b825403d29ef9f7b4e20389a37bfc17a",
                  action: "add",
                  service: paytoOrder.PaytoLikes,
                  link: automationArray[count].url + "/p/" +automationArray[count].firstImage,
                  quantity: likes
               
              }).then(resp => {
                console.log(resp.data);
                if(resp.data.order)
                orders.push(resp.data.order)


                axios.post('https://paytosmm.com/api/v2', {
    
                  key: "b825403d29ef9f7b4e20389a37bfc17a",
                  action: "add",
                  service: paytoOrder.PaytoComments,
                  link: automationArray[count].url + "/p/" +automationArray[count].firstImage,
                  commments: temporaryArray[random11] + "\n" + temporaryArray[random10] + "\n" + temporaryArray[random1] + "\n" + temporaryArray[random9] + "\n" + temporaryArray[random8] + "\n" + temporaryArray[random7] + "\n" + temporaryArray[random6] + "\n" + temporaryArray[random5] + "\n" + temporaryArray[random4] + "\n" + temporaryArray[random3] + "\n" + temporaryArray[random2],
                  quantity: likes
               
              }).then(resp => {
                if(resp.data.order)
                orders.push(resp.data.order)
                console.log(resp.data);
              })
              .catch(err => console.log(err));

              })
              .catch(err => console.log(err));
    
              
    
              await axios.post('https://smmfollows.com/api/v2', {
    
                key: "f009489187f3dce80207c2c5ee2d47fc",
                action: "add",
                service: SMMOrder.SMMLikes,
                link: automationArray[count].url + "/p/" +automationArray[count].firstImage,
                quantity: likes
             
            }).then(resp => {
              if(resp.data.order)
              orders.push(resp.data.order)
              console.log(resp.data);



              axios.post('https://smmfollows.com/api/v2', {
    
                key: "f009489187f3dce80207c2c5ee2d47fc",
                action: "add",
                service: SMMOrder.SMMComments,
                link: automationArray[count].url + "/p/" +automationArray[count].firstImage,
                commments: temporaryArray[random11] + "\n" + temporaryArray[random10] + "\n" + temporaryArray[random1] + "\n" + temporaryArray[random9] + "\n" + temporaryArray[random8] + "\n" + temporaryArray[random7] + "\n" + temporaryArray[random6] + "\n" + temporaryArray[random5] + "\n" + temporaryArray[random4] + "\n" + temporaryArray[random3] + "\n" + temporaryArray[random2],
                quantity: likes
             
            }).then(resp => {
              if(resp.data.order)
              orders.push(resp.data.order)
              console.log(resp.data);
            })
            .catch(err => console.log(err))


            })
            .catch(err => console.log(err))

          }



            }).catch(err => console.log(err));

   
            cron.schedule("0 0 */20 * * *", () => {

              const options = new chrome.Options();
              options.addArguments("--disable-dev-shm-usage");
              options.addArguments("--no-sandbox");
              options.addArguments("--headless");


              const driver = new Builder()
              .forBrowser("chrome")
              .setChromeOptions(options)
              .build();

              
              const driverPayto = new Builder()
              .forBrowser("chrome")
              .setChromeOptions(options)
              .build();

              
              const driverSMMfollowers = new Builder()
              .forBrowser("chrome")
              .setChromeOptions(options)
              .build();
          

              ticketFollowiz();
              ticketPayto();
              ticketSMM();


            });



  // ticket followiz
  function ticketFollowiz() {
    const pendingOrders = [];
    driver
    .get("https://followiz.com/")
    .then(() => {
      setTimeout(() => {
        driver
        .findElement(By.name("LoginForm[username]"))
        .sendKeys("oceanooi")
        .then(() => {
          driver
            .findElement(By.name("LoginForm[password]"))
            .sendKeys("ooi0314475")
            .then(() => {
              driver
                .findElement(By.css(".btn:nth-child(1)"))
                .click()
                .then(() => {
            
                 
                  driver
                  .get("https://followiz.com/")
                  .then(() => {
                    driver.get("https://followiz.com/orders").then(() => {
                      driver.sleep(3000);
                      driver.get("https://followiz.com/orders").then(() => {
                        for (let count = 1; count < 101; count++) {
                          driver
                            .findElement(By.css(`tr:nth-child(${count}) .status`))
                            .then(res => {
                              res
                                .getText()
                                .then(res => {
                                  if (res == "Pending") {
                                    driver.findElement(
                                      By.css(
                                        `tr:nth-child(${count}) > td:nth-child(1)`
                                      ).then(response => {
                                        response.getText().then(id => {
                                          pendingOrders.push(id);
                                        });
                                      })
                                    );
                                  }
            
                                  console.log(pendingOrders);
                                })
                                .catch(err => console.log(err));
                            })
                            .catch(Err => console.log(Err));
                        }
                        setTimeout(function() {
                          driver.get("https://followiz.com/tickets").then(() => {
                            driver
                              .get("https://followiz.com/tickets")
                              .then(() => {
                                driver
                                  .findElement(
                                    By.css(
                                      ".therequest .col:nth-child(3) .custom-control-label"
                                    )
                                  )
                                  .click()
                                  .then(() => {
                                    for (
                                      let count = 0;
                                      count < pendingOrders.length;
                                      count++
                                    ) {
                                      driver
                                        .findElement(By.css("#ordernumbers"))
                                        .sendKeys(pendingOrders[count] + ",");
                                    }
                                  })
                                  .catch(err => console.log(err));
                                setTimeout(function() {
                                  driver.findElement(By.css("#submit")).click()
                                  .then(() => {
                                    setTimeout(() => {
                                      driver.quit();
                                    }, 7000)
                                  });
                                }, 5000);
                              })
                              .catch(err => console.log(err));
                          });
                        }, 8000);
                      });
                      driver.sleep(8000);
                    });
                  })
                  .catch(err => console.log(err));




                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log("here start men"));
    })
      }, 3000)
    
    .catch(err => console.log(err));


    

  }
  // payto ticket
  function ticketPayto() {
    const pendingOrders = [];








    driverPaytoT
    .get("https://paytosmm.com/")
    .then(() => {
      driverPaytoT
        .findElement(By.name("LoginForm[username]"))
        .sendKeys("oceanooi")
        .then(() => {
          driverPaytoT
            .findElement(By.name("LoginForm[password]"))
            .sendKeys("ooi0314475")
            .then(() => {
              driverPaytoT
                .findElement(By.css(".btn"))
                .click()
                .then(() => {
      
                  
    driverPayto
    .get("https://paytosmm.com/")
    .then(() => {
      driverPayto
        .get("https://paytosmm.com/orders")
        .then(() => {
          driverPayto.sleep(3000);
          driverPayto
            .get("https://paytosmm.com/orders")
            .then(() => {
              for (let count = 1; count < 101; count++) {
                driverPayto
                  .findElement(
                    By.css(`tr:nth-child(${count}) > td:nth-child(8)`)
                  )
                  .then(res => {
                    res
                      .getText()
                      .then(res => {
                        if (res == "In progress") {
                          driverPayto.findElement(
                            By.css(
                              `tr:nth-child(${count}) > td:nth-child(1)`
                            ).then(response => {
                              response.getText().then(id => {
                                pendingOrders.push(id);
                              });
                            })
                          );
                        }

                        console.log(pendingOrders);
                      })
                      .catch(err => console.log(err));
                  })
                  .catch(Err => console.log(Err));
              }
              setTimeout(function() {
                driverPayto.get("https://paytosmm.com/tickets").then(() => {
                  driverPayto
                    .get("https://paytosmm.com/tickets")
                    .then(() => {
                      driverPayto
                        .findElement(By.css("#subject"))
                        .sendKeys("Order")
                        .then(() => {
                          driverPayto
                            .findElement(By.css("#want"))
                            .sendKeys("Speed Up");

                          for (
                            let count = 0;
                            count < pendingOrders.length;
                            count++
                          ) {
                            driverPayto
                              .findElement(By.css("#orderid"))
                              .sendKeys(pendingOrders[count] + ",");
                          }
                        })
                        .catch(err => console.log(err));
                      setTimeout(function() {
                        driverPayto
                          .findElement(By.css(".btn-primary"))
                          .click();
                      }, 5000);
                    })
                    .catch(err => console.log(err));
                });
              }, 8000);
            })
            .catch(err => console.log(err));
          driverPayto.sleep(8000);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));

                    
                   
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log("here start men"));
    })
    .catch(err => console.log(err));














  }
  // smm comments
  function ticketSMM() {
    // tr:nth-child(100) > td:nth-child(1)

    // li:nth-child(9) > a


    
    const pendingOrders = [];


    driverSMM
    .get("https://smmfollows.com/")
    .then(() => {
      driverSMM
        .findElement(By.name("LoginForm[username]"))
        .sendKeys("oceanooi")
        .then(() => {
          driverSMM
            .findElement(By.name("LoginForm[password]"))
            .sendKeys("ooi0314475")
            .then(() => {
              driverSMM
                .findElement(By.css(".btn-primary"))
                .click()
                .then(() => {
                  driverSMMfollowers
                  .get("https://smmfollows.com")
                  .then(() => {
                    driverSMMfollowers
                      .get("https://smmfollows.com/orders")
                      .then(() => {
                        driverSMMfollowers.sleep(3000);
                        driverSMMfollowers
                          .get("https://smmfollows.com/orders")
                          .then(() => {
                            for (let count = 1; count < 101; count++) {
                              driverSMMfollowers
                                .findElement(
                                  By.css(`tr:nth-child(${count}) > td:nth-child(8)`)
                                )
                                .then(res => {
                                  res
                                    .getText()
                                    .then(res => {
                                      if (res == "Pending") {
                                        driverSMMfollowers.findElement(
                                          By.css(
                                            `tr:nth-child(${count}) > td:nth-child(1)`
                                          ).then(response => {
                                            response.getText().then(id => {
                                              pendingOrders.push(id);
                                            });
                                          })
                                        );
                                      }
            
                                      console.log(pendingOrders);
                                    })
                                    .catch(err => console.log(err));
                                })
                                .catch(Err => console.log(Err));
                            }
                            setTimeout(function() {
                              driverSMMfollowers
                                .get("https://smmfollows.com/tickets")
                                .then(() => {
                                  driverSMMfollowers
                                    .get("https://smmfollows.com/tickets")
                                    .then(() => {
                                      driverSMMfollowers
                                        .findElement(By.css("#subject"))
                                        .sendKeys("Speed Up")
                                        .then(() => {
                                          for (
                                            let count = 0;
                                            count < pendingOrders.length;
                                            count++
                                          ) {
                                            driverSMMfollowers
                                              .findElement(By.css("#message"))
                                              .sendKeys(pendingOrders[count] + ",");
                                          }
                                        })
                                        .catch(err => console.log(err));
                                      setTimeout(function() {
                                        driverSMMfollowers
                                          .findElement(By.css(".btn-primary"))
                                          .click();
                                      }, 5000);
                                    })
                                    .catch(err => console.log(err));
                                })
                                .catch(err => console.log(err));
                            }, 8000);
                          })
                          .catch(err => console.log(err));
                        driverSMMfollowers.sleep(8000);
                      })
                      .catch(err => console.log(err));
            
                    // });
                  })
                  .catch(err => console.log(err));
                    
                  
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log("here start men"));
    })
    .catch(err => console.log(err));



  }
        // automationArray.map((order, index) => {
        //   console.log(order);
        //   // await axios.get('http://localhost:5000/api/teammembers')
        //   // .then(response => {
        //   //   if(response.data){
        //   //   response.data.map(async (item, index) => {
      
        //   //     console.log(item.url);
        //   //     await axios.post('https://followiz.com/api/v2', {
      
        //   //       key: "14fa86ed817dd6ea7a8dd9e9cfbb8725",
        //   //       action: "add",
        //   //       service: req.body.followizFollowers,
        //   //       link: item.url,
        //   //       quantity: req.body.followersFollowiz
             
        //   //   }).then(resp => {
        //   //     console.log(resp.data);
        //   //   })
        //   //   .catch(err => console.log(err))
        //   //   });
        //   //   }
        //   // }).catch(err => console.log(err)); 
          
          


        //   // await axios.get('http://localhost:5000/api/teammembers')
        //   // .then(response => {
        //   //   if(response.data){
        //   //   response.data.map(async (item, index) => {
      
        //   //     console.log(item.url);
        //   //     await axios.post('https://paytosmm.com/api/v2', {
      
        //   //       key: "b825403d29ef9f7b4e20389a37bfc17a",
        //   //       action: "add",
        //   //       service: req.body.PaytoFollowers,
        //   //       link: item.url,
        //   //       quantity: req.body.followersPayto
             
        //   //   }).then(resp => {
        //   //     console.log(resp.data);
        //   //   })
        //   //   .catch(err => console.log(err))
        //   //   });
        //   //   }
        //   // }).catch(err => console.log(err));  



        //   // await axios.get('http://localhost:5000/api/teammembers')
        //   // .then(response => {
        //   //   if(response.data){
        //   //   response.data.map(async (item, index) => {
      
        //   //     console.log(item.url);
        //   //     await axios.post('https://smmfollows.com/api/v2', {
      
        //   //       key: "f009489187f3dce80207c2c5ee2d47fc",
        //   //       action: "add",
        //   //       service: req.body.SMMFollowers,
        //   //       link: item.url,
        //   //       quantity: req.body.followersSMM
             
        //   //   }).then(resp => {
        //   //     console.log(resp.data);
        //   //   })
        //   //   .catch(err => console.log(err))
        //   //   });
        //   //   }
        //   // }).catch(err => console.log(err));  


        // });


        // sleep(10000 * teamMembers.length + 2000)
        //   .then(() => {
        //     if (automationArray.length != 0) {
        //       console.log("not empty");
        //       let instance = 0;

        //       function likesLoop() {
        //         setTimeout(function() {
        //           likesFollowiz(automationArray[instance]);
        //           likesPayto(automationArray[instance]);
        //           likesSMM(automationArray[instance]);
        //           instance++;

        //           if (instance < automationArray.length) {
        //             likesLoop();
        //           }
        //         }, 30000);
        //       }

        //       likesLoop();
        //     } else console.log("empty");
        //   })
        //   .catch(err => console.log("691 line men masla"));
      })
      .catch(err => console.log(err));
      if(times > 6){
        console.log('stopped');
        task.stop();
      }
  });


     //cron for likes and comments

     
   })
   .catch(err => console.log(err));

});

app.listen(5000, function() {
  console.log("server listening on port 5000");
});

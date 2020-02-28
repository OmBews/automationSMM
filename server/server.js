const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/config").mongoURI;
const teamMembers = require("./routes/api/teamMembers");
const trials = require("./routes/api/trials");
const comments = require("./routes/api/comments");
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const axios = require('axios');
const sleep = require('sleep-promise');
const cron = require('node-cron');
const ig = require('instagram-scraping');
const teamMemberModel = require('./models/teamMember')
const Scraper = require('node-scraper');
const pretty = require('pretty');


app.use(cors());
app.use(bodyParser.json());

app.use("/api/teammembers", teamMembers);
app.use("/api/trials", trials);
app.use("/api/comments", comments);

mongoose.connect(db, () => {
  console.log("DB is connected");
});



app.post("/api/start", async (req, res) => {
  const followers = req.body.followers;
  let teamMembers = [];
  let comments = [];

  // let likes = parseInt(followers, 10);
  // likes = (likes/100) * 15;


    //init selenium
    const options = new chrome.Options();
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments("--no-sandbox");
  
    
    const driver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

      //   const driverIndianSmart = new Builder()
      // .forBrowser("chrome")
      // .setChromeOptions(options)
      // .build();
 
      const driverSMMfollowers = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

      const driverPayto = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
/////////////////////////////////////temporary code liines here///////////////////////////////

      driver
      .manage()
      .window()
      .maximize();  


      //login followiz
      driver.get("https://followiz.com/").then(() => {
        driver.findElement(By.name("LoginForm[username]")).sendKeys("oceanooi").then(() => {
          driver.findElement(By.name("LoginForm[password]")).sendKeys("ooi0314475").then(() => {
            driver.findElement(By.css(".btn:nth-child(1)")).click().then(() => {
              // driver.sleep(3000)
              // driver.get("https://google.com/");

            }).catch(err => console.log(err));

          }).catch(err => console.log(err));

        }).catch(err => console.log(err));

        

      }).catch(err => console.log('here start men'))
    

      // driverIndianSmart
      // .manage()
      // .window() 
      // .maximize();
  
      driverSMMfollowers
      .manage()
      .window()
      .maximize(); 

      //login smm

      driverSMMfollowers.get("https://smmfollows.com/")
      .then(() => {
        driverSMMfollowers.sleep(8000);
        driverSMMfollowers.findElement(By.css("#username")).sendKeys("oceanooi");
      driverSMMfollowers.findElement(By.css("#password")).sendKeys("ooi0314475");
      driverSMMfollowers.findElement(By.css(".btn-primary")).click()
     .catch(err => console.log(err));
      }).catch(err => console.log(err));

      driverPayto
      .manage()
      .window()
      .maximize();

      //payto signin
      driverPayto.get("https://paytosmm.com/")
      .then(() => {
        driverPayto.sleep(8000);
        driverPayto.findElement(By.name("LoginForm[username]")).sendKeys("oceanooi");
        driverPayto.findElement(By.name("LoginForm[password]")).sendKeys("ooi0314475");
        driverPayto.findElement(By.css(".btn")).click()
      .then(() => {
        driverPayto.sleep(5000);
        
    
      }).catch(err => console.log(err));
      }).catch(err => console.log(err));

/////////////////////////////////////end temp lines here////////////////////////////
  

  //getting the array of teammembers
  axios.get('http://localhost:5000/api/teammembers')
    .then(async resp => {
      teamMembers = resp.data;
       
      let counter = 0;

    //fetch initial user data
      function initialFollowers () {    
        
        setTimeout(function () {    
  
              const username = teamMembers[counter].url.substring(22);
      
        ig.scrapeUserPage(username).then(async result => {
          console.log('length ' + result.medias.length)
          if(result.medias.length > 2){

          const first = result.medias[0].media_id;
          const second = result.medias[1].media_id;
          const third = result.medias[2].media_id;
          const followersCount = result.user.edge_followed_by.count;
          console.log('counr ' + result.user.edge_followed_by.count)
          
          const obj = {    
               first,
               second,
               third,
               followers: followersCount,
               limitCounter: 0
            } 
            console.log(obj)
            console.log('username' + teamMembers[counter].url)
            await axios.post(`http://localhost:5000/api/teammembers/${teamMembers[counter]._id}/update`, obj)
            .then(res => {
              counter++;
              axios.get('http://localhost:5000/api/teammembers')
                .then(resp => {
                    teamMembers = resp.data
                    if (counter < teamMembers.length)           
                      initialFollowers();  
                    console.log('data is here' + teamMembers)
                }).catch(err => console.log(err))
            }) .catch(err => console.log(err))
          } else {console.log('less than 3')
        
          if (counter < teamMembers.length)           
            initialFollowers();  
          
        }
        }).catch(err => console.log('user not found'));
                                   
        }, 10000)
      } 

    initialFollowers();
      
     




      let i = 0;                     

      function followersLoop () {     
       

        setTimeout(function () {    
          console.log(teamMembers[i])
              // followersFollowiz(teamMembers[i].url);
              // followersPayto(teamMembers[i].url);
              // followersSMM(teamMembers[i].url)
              // likesSMM(teamMembers[i])
              // ticketSMM();
              i++; 
 
            if (i < teamMembers.length) 
            {           
            followersLoop();            
              
            }                        
        }, 30000)
      }

    followersLoop();


     
 
    })
    .catch(err => console.log(err)) 

    ///////////////////////////////////////////FOLLOWERS BLOCK////////////////////////////////////////

    //followiz followers
    function followersFollowiz(url){

     
      
        
      driver.get("https://followiz.com/").then(() => {
            driver
            .findElement(By.css("#orderform-category"))
            .sendKeys("Instagram -  Followers [Not Guaranteed/No Refill]");
        driver.sleep(5000);
  
        if(followers <= 15000)
         
        driver
          .findElement(By.css("#orderform-service"))
          .sendKeys("Instagram Followers [15K] [6H - 5K/D] ⚡️ — $0.53 ");
        
        else if(followers <= 40000)
        driver
        .findElement(By.css("#orderform-service"))
        .sendKeys("Instagram Followers [40K] [1H - 10K/D] — $0.66 ");
  
        else 
        driver
        .findElement(By.css("#orderform-service"))
        .sendKeys("Instagram Followers [100K] [2H - 5K/D] ⚡️ — $1.26 ");
         
          driver
          .findElement(By.css("#field-orderform-fields-link"))
          .sendKeys(url);
        driver
          .findElement(By.css("#field-orderform-fields-quantity"))
          .sendKeys(followers).then(() => {
            driver.sleep(8000).then(() => {
              // likesFollowiz(teamMembers[0]);  
            }).catch(err => console.log(err));
          }).catch(err => console.log(err));
      
      
          // driver
          // .findElement(By.css(".btn-blue"))
          // .click();
        

          }).catch(err => console.log('here not start men')); 
  
      
      
       
       
        

    
    
      
    }

    //payto followers
    function followersPayto(url){
       
      driverPayto.get("https://paytosmm.com/")
      .then(() => {
        driver.sleep(2000)
        driverPayto
        .findElement(By.css("#orderform-category"))
        .sendKeys("➡️Instagram Followers (No Refill)");
        driver.sleep(2000)
        if(followers <= 20000)
        driverPayto
        .findElement(By.css("#orderform-service"))
        .sendKeys("Instagram Followers [BOTS] [INSTANT] [20K] — $1.20 per 1000");
        else 
        driverPayto
        .findElement(By.css("#orderform-service"))
        .sendKeys("Instagram Followers [FASTEST] [MAX 100K] 🔥 — $2.75 per 1000");
        driverPayto.sleep(8000);

        driverPayto
          .findElement(By.css("#field-orderform-fields-link"))
          .sendKeys(url);
        driverPayto
          .findElement(By.css("#field-orderform-fields-quantity"))
          .sendKeys(followers);
          });
  
  
      // driverPayto
      // .findElement(By.css(".btn-primary"))
      // .click();
  
    
  }
    //smm followers
    function followersSMM(url){

      driverSMMfollowers.get("https://smmfollows.com/")
      .then(() => {
        
        
        driverSMMfollowers
        .findElement(By.css("#orderform-category"))
        .sendKeys("Instagram Followers No Refill");
        driver.sleep(3000)
        if(followers <= 10000)
        driverSMMfollowers
        .findElement(By.css("#orderform-service"))
        .sendKeys("Instagram - Followers ~ Max 10k [No refill][they can drop all and there is no refill and no refund] — $0.80 per 1000");
        else 
        driverSMMfollowers
        .findElement(By.css("#orderform-service"))
        .sendKeys("Instagram Followers - [200k][No refill][Read The Description Carefully] — $0.48 per 1000");
    driverSMMfollowers.sleep(8000);

      driverSMMfollowers
      .findElement(By.css("#field-orderform-fields-link"))
      .sendKeys(url);
    driverSMMfollowers
      .findElement(By.css("#field-orderform-fields-quantity"))
      .sendKeys(followers);
  
      });
      // driverSMMfollowers
      // .findElement(By.css(".btn-primary"))
      // .click();
    
    driverSMMfollowers.sleep(5000);
      

  
    
  }
  // followiz indianSmart
  function followersIndianSmart(url){

    driverIndianSmart.get("https://indiansmartpanel.com/")
    .then(() => {
      driverIndianSmart.sleep(8000);
      driverIndianSmart.findElement(By.css("#username")).sendKeys("oceanooi");
      driverIndianSmart.findElement(By.css("#password")).sendKeys("ooi0314475");
      driverIndianSmart.findElement(By.css(".cuteBtn:nth-child(6)")).click()
      .then(() => {
      setTimeout(() => {
        driverIndianSmart.findElement(By.xpath("/html/body/div[3]/div/div[3]/button[1]")).click();
        driverIndianSmart.sleep(8000);
        driverIndianSmart.findElement(By.xpath("/html/body/div[3]/div/div[3]/button[1]")).click();
        driverIndianSmart.sleep(8000);
        driverIndianSmart.findElement(By.xpath("/html/body/div[3]/div/div[3]/button[1]")).click();
        driverIndianSmart.sleep(8000);
        driverIndianSmart.findElement(By.xpath("/html/body/div[3]/div/div[3]/button[1]")).click();
        driverIndianSmart.sleep(8000);
        driverIndianSmart.findElement(By.xpath("/html/body/div[3]/div/div[3]/button[1]")).click();
        driverIndianSmart.sleep(8000);

      }, 4000)

    
  
  
      });
    });

  

  
    



    

   
  
}

  ////////////////////////////////////FOLLOWERS BLOCK END//////////////////////////////////  


  //////////////////////////////////////LIKES BLOCK//////////////////////////////////////


    //likes followiz
    function likesFollowiz(item){

      let likes = parseInt(item.followers, 10);
      likes = (likes/100) * 1.5;



      let selectedComments = [];
      let size = comments.length
  
      let randomnumber = Math.floor(Math.random() * (size - 5 + 1)) + 5;
      randomnumber--;
  
      for(let count=0; count < randomnumber; count++){
        
        let commentNumber = Math.floor(Math.random() * (size - 2 + 1)) + 3;
        commentNumber--;
        selectedComments.push(comments[commentNumber])
      }


      driver.get("https://followiz.com/").then(() => {


          driver.sleep(8000);
           
        setTimeout(function(){ 
        
          driver
          .findElement(By.css("#orderform-category"))
          .sendKeys("Instagram -  Likes");
      driver.sleep(8000);
        
      
      if(likes < 15000)

      driver
        .findElement(By.css("#orderform-service"))
        .sendKeys("Instagram Likes [15K] [1H - 15K/D] ⚡️ — $0.40 ");

      else 
      driver
      .findElement(By.css("#orderform-service"))
      .sendKeys("Instagram Likes [500K] [1H - 10K/D] — $0.60 ");

      
      driver
        .findElement(By.css("#field-orderform-fields-link"))
        .sendKeys(item.url);
        if(likes < 20)
      driver
        .findElement(By.css("#field-orderform-fields-quantity"))
        .sendKeys(likes + 20);
        else 
        driver
        .findElement(By.css("#field-orderform-fields-quantity"))
        .sendKeys(likes);
    
    
        // driver
        // .findElement(By.css(".btn-blue"))
        // .click();
      
      driver.sleep(5000).then(() => {
        driver.get("https://followiz.com/").then(() => {
    
          setTimeout(() => {
            driver.get("https://google.com/");
            driver.get("https://followiz.com/"); 
            driver.sleep(8000);
      
            driver
            .findElement(By.css("#orderform-category"))
            .sendKeys("Instagram - Comments");
        driver.sleep(5000);
      
        
        driver
        .findElement(By.css("#orderform-service"))
        .sendKeys("Instagram Comments [1K] [CUSTOM - 1H - 1K/D] — $7.20");
        
          driver
          .findElement(By.css("#field-orderform-fields-link"))
          .sendKeys(item.url);
       
          selectedComments.map(item => {
              console.log(item)
        driver
          .findElement(By.css("#field-orderform-fields-comment"))
          .sendKeys(item.comment + "\n");
           
          })
          
        // driver
          // .findElement(By.css(".btn-blue"))
          // .click();
  
          }, 5000)
  
  
        driver.sleep(8000);
      }).catch(err => console.log(err));
      });
        
        }, 10000);
    
        
     
      }).catch(err => console.log(err));
      
     
    }


       //payto likes
       function likesPayto(item){

        let selectedComments = [];
        let size = comments.length
    
        let randomnumber = Math.floor(Math.random() * (size - 5 + 1)) + 5;
        randomnumber--;
    
        for(let count=0; count < randomnumber; count++){
          
          let commentNumber = Math.floor(Math.random() * (size - 2 + 1)) + 3;
          commentNumber--;
          selectedComments.push(comments[commentNumber])
        }

        let likes = parseInt(item.followers, 10);
      likes = (likes/100) * 1.5;

        driverPayto.get("https://paytosmm.com/")
        .then(() => {
          driverPayto.sleep(8000);
        

          driverPayto.sleep(5000);
          setTimeout(function(){ 
          
          
            driverPayto
            .findElement(By.css("#orderform-category"))
            .sendKeys("➡️Instagram Likes");
            
            if(likes <= 50000)
            driverPayto
            .findElement(By.css("#orderform-service"))
            .sendKeys("Instagram Likes  [Instant Start] [10k / Hour] [50K] — $0.46 per 1000");
            else 
            driverPayto
            .findElement(By.css("#orderform-service"))
            .sendKeys("Instagram Likes - [10K / Hour] [Max 100k] [BOTS] — $0.82 per 1000");
        driverPayto.sleep(8000);
    
          driverPayto
          .findElement(By.css("#field-orderform-fields-link"))
          .sendKeys(item.url);
          if(likes < 20)
          driver
            .findElement(By.css("#field-orderform-fields-quantity"))
            .sendKeys(likes + 20);
            else 
            driver
            .findElement(By.css("#field-orderform-fields-quantity"))
            .sendKeys(likes);
      
          // driverPayto
          // .findElement(By.css(".btn-primary"))
          // .click();
        
        driverPayto.sleep(5000).then(() => {

          driverPayto.get("https://paytosmm.com/")
          .then(() => {
            driverPayto.sleep(5000).then(() => {
              driverPayto
              .findElement(By.css("#orderform-category"))
              .sendKeys("➡️Instagram Comments and Comment Likes");
           
              driverPayto
              .findElement(By.css("#orderform-service"))
              .sendKeys("Instagram Comments [INSTANT] - [ CUSTOM ] [ MAX 1K ] REAL ACCOUNTS⚡ — $13.00 per 1000");
          driverPayto.sleep(5000);
      
            driverPayto
            .findElement(By.css("#field-orderform-fields-link"))
            .sendKeys(item.url);
  
       
            selectedComments.map(item => {
                
          driver
            .findElement(By.css("#field-orderform-fields-comment"))
            .sendKeys(item.comment + "\n");
             
            })
         
        
        
            // driverPayto
            // .findElement(By.css(".btn-primary"))
            // .click();
          
          driverPayto.sleep(5000);

            }).catch(err => console.log(err));
            
            
            
           
            
      
        
          }).catch(err => console.log(err));
        

        }).catch(err => console.log(err));
          
          }, 10000);
     
        }).catch(err => console.log(err));
      
     
      
    }


       //smm likes
       function likesSMM(item){



        

      

        let likes = parseInt(item.followers, 10);
        console.log(likes)
        likes = (likes/100) * 1.5;
        console.log(likes)
        driverSMMfollowers.get("https://smmfollows.com/")
        .then(() => {
          driverSMMfollowers.sleep(8000);

          
          
            driverSMMfollowers
            .findElement(By.css("#orderform-category"))
            .sendKeys("Instagram Likes");
             
            if(followers <= 18000)
            driverSMMfollowers
            .findElement(By.css("#orderform-service"))
            .sendKeys("Latest Instagram Likes - [18k] — $1.30 per 1000");
            else 
            driverSMMfollowers
            .findElement(By.css("#orderform-service"))
            .sendKeys("Instagram Likes [100K] — $1.23 per 1000");
        driverSMMfollowers.sleep(8000);
     
          driverSMMfollowers
          .findElement(By.css("#field-orderform-fields-link"))
          .sendKeys(item.url);
          if(likes < 20)
          driver
            .findElement(By.css("#field-orderform-fields-quantity"))
            .sendKeys(20);
            else 
            driver
            .findElement(By.css("#field-orderform-fields-quantity"))
            .sendKeys(likes);
      
      
          // driverSMMfollowers
          // .findElement(By.css(".btn-primary"))
          // .click();
        
        driverSMMfollowers.sleep(5000).then(() => {
          // driverSMMfollowers.get("https://smmfollows.com/")
          // .then(() => {
          //   driverSMMfollowers.sleep(5000).then(() => {


          //     driverSMMfollowers
          //     .findElement(By.css("#orderform-category"))
          //     .sendKeys("Instagram Comments Worldwide");
              
          // driverSMMfollowers.sleep(5000);
             
          //     driverSMMfollowers
          //     .findElement(By.css("#orderform-service"))
          //     .sendKeys("Instagram Comments [1K] [CUSTOM] — $9.38 per 1000");
      
          //   driverSMMfollowers
          //   .findElement(By.css("#field-orderform-fields-link"))
          //   .sendKeys(item.url);
          //   selectedComments.map(item => {
                  
          //     driver
          //       .findElement(By.css("#field-orderform-fields-comment"))
          //       .sendKeys(item.comment + "\n");
                 
          //       })
        
        
          //   // driverSMMfollowers
          //   // .findElement(By.css(".btn-primary"))
          //   // .click();
          
          // driverSMMfollowers.sleep(5000);

          //   }).catch(err => console.log(err));
            
            
         
            
        
          // }).catch(err => console.log(err));
    
        
        });
        
        }).catch(err => console.log(err));
      
    
      
    }

  //////////////////////////////////////LIKES BLOCK END//////////////////////////////////////

  //////////////////////////////////////Comments BLOCK//////////////////////////////////////

axios.get('http://localhost:5000/api/comments')
    .then(res => {

      comments = res.data
 
      //delay function
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
 
////////////////////automation here//////////////// 
    cron.schedule("0 */3 * * * *", () => {
      let limitCounter = 0;
      console.log('running')
      let automationArray = []
      axios.get('http://localhost:5000/api/teammembers').then(async (res) => {
        teamMembers = res.data;
        for(let count=0; count<teamMembers.length; count++){
          const username = teamMembers[count].url.substring(22);
          await sleep(10000);
          ig.scrapeUserPage(username).then(async result => {
            console.log('scraping result length ' + result.medias.length)
 
            if(result.medias.length > 2 && teamMembers[count].limitCounter < 3){

 
              const first = result.medias[0].media_id;
              const second = result.medias[1].media_id;
              const third = result.medias[2].media_id;

            if(first != teamMembers[count].firstImage){
              automationArray.push(teamMembers[count])
              limitCounter++;
            }
            // if(second != teamMembers[count].firstImage && limitCounter < 3){
            //   automationArray.push(teamMembers[count])
            //   limitCounter++;
            // }
            // if(third != teamMembers[count].second && limitCounter < 3){
            //   automationArray.push(teamMembers[count])
            //   limitCounter++;
            // }
              const obj = {
                first,
                second,
                third,
                limitCounter,
                followers : result.user.edge_followed_by.count
             }
             

             await axios.post(`http://localhost:5000/api/teammembers/${teamMembers[count]._id}/update`, obj)
  
             .catch(err => console.log(err))

            }  
 });
  
         }
         sleep((10000*teamMembers.length) + 5000).then(() => {

          if(automationArray.length != 0){
            console.log('not empty')
           let instance = 0;                     
 
           function likesLoop () {      
            
     
             setTimeout(function () {    
                   // likesFollowiz(automationArray[instance]);
                   // likesPayto(automationArray[instance]);
                   likesSMM(automationArray[instance])
               instance++;
 
     
                 if (instance < automationArray.length) {           
                   likesLoop();            
                 }                         
             }, 30000)
           }
     
           likesLoop();
 
         } else console.log('empty')



         }).catch(err => console.log('824 line men masla'))
         

      }).catch(err => console.log(err))
  
    })

    //for tickets
    cron.schedule("* 3 * * * *", () => {
      ticketFollowiz();
      ticketPayto();
      ticketSMM();

    })
    })

   
  //comments followiz 
  function commentsFollowiz(item){
    let selectedComments = [];
    let size = comments.length

    let randomnumber = Math.floor(Math.random() * (size - 5 + 1)) + 5;
    randomnumber--;

    for(let count=0; count < randomnumber; count++){
      
      let commentNumber = Math.floor(Math.random() * (size - 2 + 1)) + 3;
      commentNumber--;
      selectedComments.push(comments[commentNumber])
    }

    driver.get("https://followiz.com/").then(() => {
    
        setTimeout(() => {
          driver.get("https://google.com/");
          driver.get("https://followiz.com/"); 
          driver.sleep(8000);
    
          driver
          .findElement(By.css("#orderform-category"))
          .sendKeys("Instagram - Comments");
      driver.sleep(5000);
    
      
      driver
      .findElement(By.css("#orderform-service"))
      .sendKeys("Instagram Comments [1K] [CUSTOM - 1H - 1K/D] — $7.20");
      
        driver
        .findElement(By.css("#field-orderform-fields-link"))
        .sendKeys(item.url);
     
        selectedComments.map(item => {
            console.log(item)
      driver
        .findElement(By.css("#field-orderform-fields-comment"))
        .sendKeys(item.comment + "\n");
         
        })
        
      // driver
      //   .findElement(By.css("#field-orderform-fields-comment"))
      //   .sendKeys(numOfComments);
    
    
        // driver
        // .findElement(By.css(".btn-blue"))
        // .click();

        }, 5000)


      driver.sleep(8000);
    }).catch(err => console.log(err));




  }
    //payto comments
  function commentsPayto(item){


    let selectedComments = [];
    let size = comments.length

    let randomnumber = Math.floor(Math.random() * (size - 5 + 1)) + 5;
    randomnumber--;

    for(let count=0; count < randomnumber; count++){
      
      let commentNumber = Math.floor(Math.random() * (size - 2 + 1)) + 3;
      commentNumber--;
      selectedComments.push(comments[commentNumber])
    }



        driverPayto.get("https://paytosmm.com/")
        .then(() => {
          driverPayto.sleep(5000);
          setTimeout(function(){ 
          
          
            driverPayto
            .findElement(By.css("#orderform-category"))
            .sendKeys("➡️Instagram Comments and Comment Likes");
         
            driverPayto
            .findElement(By.css("#orderform-service"))
            .sendKeys("Instagram Comments [INSTANT] - [ CUSTOM ] [ MAX 1K ] REAL ACCOUNTS⚡ — $13.00 per 1000");
        driverPayto.sleep(8000);
    
          driverPayto
          .findElement(By.css("#field-orderform-fields-link"))
          .sendKeys(item.url);

     
          selectedComments.map(item => {
              
        driver
          .findElement(By.css("#field-orderform-fields-comment"))
          .sendKeys(item.comment + "\n");
           
          })
       
      
      
          // driverPayto
          // .findElement(By.css(".btn-primary"))
          // .click();
        
        driverPayto.sleep(5000);
          
          }, 18000);
      
        }).catch(err => console.log(err));
      
     
      
    }
    //smm comments
  function commentsSMM(item){


    let selectedComments = [];
    let size = comments.length

    let randomnumber = Math.floor(Math.random() * (size - 5 + 1)) + 5;
    randomnumber--;

    for(let count=0; count < randomnumber; count++){
      
      let commentNumber = Math.floor(Math.random() * (size - 2 + 1)) + 3;
      commentNumber--;
      selectedComments.push(comments[commentNumber])
    }

      driverSMMfollowers.get("https://smmfollows.com/")
      .then(() => {
        driverSMMfollowers.sleep(5000);
        setTimeout(function(){ 
        
        
          driverSMMfollowers
          .findElement(By.css("#orderform-category"))
          .sendKeys("Instagram Comments Worldwide");
          
         
          driverSMMfollowers
          .findElement(By.css("#orderform-service"))
          .sendKeys("Instagram Comments [1K] [CUSTOM] — $9.38 per 1000");
      driverSMMfollowers.sleep(8000);
  
        driverSMMfollowers
        .findElement(By.css("#field-orderform-fields-link"))
        .sendKeys(item.url);
        selectedComments.map(item => {
              
          driver
            .findElement(By.css("#field-orderform-fields-comment"))
            .sendKeys(item.comment + "\n");
             
            })
    
    
        // driverSMMfollowers
        // .findElement(By.css(".btn-primary"))
        // .click();
      
      driverSMMfollowers.sleep(5000);
        
        }, 18000);
    
      }).catch(err => console.log(err));

    
  
    
    }
  //////////////////////////////////////Comments BLOCK END//////////////////////////////////////





  //////////////////////////ticketing start////////////////////////////////


     //ticket followiz
  function ticketFollowiz(){
   const pendingOrders = [];
  
    driver.get("https://followiz.com/")
    .then(() => {
   

      driver.get("https://followiz.com/orders").then(() => {
        driver.sleep(3000);
        driver.get("https://followiz.com/orders").then(() => {


        for(let count=1; count< 101; count++){
        driver
        .findElement(By.css(`tr:nth-child(${count}) .status`)).then(res => {
          res.getText().then((res) => {
            if(res == 'Pending'){
              driver.findElement(By.css(`tr:nth-child(${count}) > td:nth-child(1)`).then(response => {
                response.getText().then(id => {
                  pendingOrders.push(id);
                })
              }))
            }

            console.log(pendingOrders) 
 
          }).catch(err => console.log(err));
        }).catch(Err => console.log(Err)) 
        
        } 
        setTimeout(function(){
    driver.get("https://followiz.com/tickets").then(() => {

   
    driver.get("https://followiz.com/tickets")
    .then(() => {
      driver.findElement(By.css(".therequest .col:nth-child(3) .custom-control-label")).click()
      .then(() => {
        for(let count = 0; count < pendingOrders.length; count++){
          driver.findElement(By.css("#ordernumbers")).sendKeys(pendingOrders[count] + ',')
        }

        
      }).catch(err => console.log(err));
      setTimeout(function(){
        driver.findElement(By.css('#submit')).click();
      }, 5000)
    }).catch(err => console.log(err))
  })

        }, 8000)
       
          

        });
        driver.sleep(8000);
 
        
      });
   



    }).catch(err => console.log(err));
   
  
  




  }

       //payto ticket
  function ticketPayto(){


    const pendingOrders = [];
  
    driverPayto.get("https://paytosmm.com/")
    .then(() => {
   

      driverPayto.get("https://paytosmm.com/orders").then(() => {
        driverPayto.sleep(3000);
        driverPayto.get("https://paytosmm.com/orders").then(() => {


        for(let count=1; count < 101; count++){
        driverPayto
        .findElement(By.css(`tr:nth-child(${count}) > td:nth-child(8)`)).then(res => {
          res.getText().then((res) => {
            if(res == 'In progress'){
              driverPayto.findElement(By.css(`tr:nth-child(${count}) > td:nth-child(1)`).then(response => {
                response.getText().then(id => {
                  pendingOrders.push(id);
                })
              }))
            }

            console.log(pendingOrders) 
 
          }).catch(err => console.log(err));
        }).catch(Err => console.log(Err)) 
        
        } 
        setTimeout(function(){
    driverPayto.get("https://paytosmm.com/tickets").then(() => {

    driverPayto.get("https://paytosmm.com/tickets")
    .then(() => {
      driverPayto.findElement(By.css("#subject")).sendKeys('Order')
      .then(() => {

      driverPayto.findElement(By.css("#want")).sendKeys('Speed Up')
        


        for(let count = 0; count < pendingOrders.length; count++){
          driverPayto.findElement(By.css("#orderid")).sendKeys(pendingOrders[count] + ',')
        }

        
      }).catch(err => console.log(err));
      // setTimeout(function(){
      //   driverPayto.findElement(By.css('.btn-primary')).click();
      // }, 5000)
    }).catch(err => console.log(err))
  })

        }, 8000)
       
          

        }).catch(err => console.log(err));
        driverPayto.sleep(8000);
 
        
      }).catch(err => console.log(err));
   



    }).catch(err => console.log(err));
   
  
  
     
      
    }
     //smm comments
  function ticketSMM(){
    // tr:nth-child(100) > td:nth-child(1)

    // li:nth-child(9) > a

    const pendingOrders = [];
  
    driverSMMfollowers.get("https://smmfollows.com")
    .then(() => {
      // driverSMMfollowers.findElement(By.name("#username")).sendKeys("oceanooi");
      // driverSMMfollowers.findElement(By.name("#password")).sendKeys("ooi0314475");
      // driverSMMfollowers.findElement(By.css(".btn-primary")).click().then(() => {

      driverSMMfollowers.get("https://smmfollows.com/orders").then(() => {
        driverSMMfollowers.sleep(3000);
        driverSMMfollowers.get("https://smmfollows.com/orders").then(() => {

 
        for(let count=1; count< 101; count++){
        driverSMMfollowers
        .findElement(By.css(`tr:nth-child(${count}) > td:nth-child(8)`)).then(res => {
          res.getText().then((res) => {
            if(res == 'Pending'){
              driverSMMfollowers.findElement(By.css(`tr:nth-child(${count}) > td:nth-child(1)`).then(response => {
                response.getText().then(id => {
                  pendingOrders.push(id);
                })
              }))
            }

            console.log(pendingOrders) 
 
          }).catch(err => console.log(err));
        }).catch(Err => console.log(Err)) 
        
        } 
        setTimeout(function(){
    driverSMMfollowers.get("https://smmfollows.com/tickets").then(() => {

   
    driverSMMfollowers.get("https://smmfollows.com/tickets")
    .then(() => {
      driverSMMfollowers.findElement(By.css("#subject")).sendKeys('Speed Up')
      .then(() => {
        for(let count = 0; count < pendingOrders.length; count++){
          driverSMMfollowers.findElement(By.css("#message")).sendKeys(pendingOrders[count] + ',')
        }

        
      }).catch(err => console.log(err));
      // setTimeout(function(){
      //   driverSMMfollowers.findElement(By.css('.btn-primary')).click();
      // }, 5000)
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))

        }, 8000)
       
          

        }).catch(err => console.log(err));
        driverSMMfollowers.sleep(8000);
 
        
      }).catch(err => console.log(err));
   
 
      // });
    }).catch(err => console.log(err));
   
  
    
    }
    
  //////////////////////////ticketing end////////////////////////////////////

} );

app.listen(5000, function() {
  console.log("server listening on port 5000");
});



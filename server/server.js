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
  
    
    // const driver = new Builder()
    //   .forBrowser("chrome")
    //   .setChromeOptions(options)
    //   .build();

      //   const driverIndianSmart = new Builder()
      // .forBrowser("chrome")
      // .setChromeOptions(options)
      // .build();

      const driverSMMfollowers = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

      // const driverPayto = new Builder()
      // .forBrowser("chrome")
      // .setChromeOptions(options)
      // .build();
/////////////////////////////////////temporary code liines here///////////////////////////////

      // driver
      // .manage()
      // .window()
      // .maximize();  

      // driverIndianSmart
      // .manage()
      // .window()
      // .maximize();

      driverSMMfollowers
      .manage()
      .window()
      .maximize(); 

      // driverPayto
      // .manage()
      // .window()
      // .maximize();

/////////////////////////////////////end temp lines here////////////////////////////
  

  //getting the array of teammembers
  axios.get('http://localhost:5000/api/teammembers')
    .then(async resp => {
      teamMembers = resp.data;
      
      
       //fetch initial user data
       for(let count=0; count<teamMembers.length; count++){
        const username = teamMembers[count].url.substring(22);
        await ig.scrapeUserPage(username).then(async result => {
          console.log(result.medias.length)
          if(result.medias.length > 2){

          const first = result.medias[0].media_id;
          const second = result.medias[1].media_id;
          const third = result.medias[2].media_id;
          const followersCount = result.user.edge_followed_by.count;
          console.log(result.user.edge_followed_by.count)
          
          const obj = {
               first,
               second,
               third,
               followers: followersCount
            }
            
            await axios.post(`http://localhost:5000/api/teammembers/${teamMembers[count]._id}/update`, obj)
            .then(res => {
              axios.get('http://localhost:5000/api/teammembers')
                .then(res => {
                    teamMembers = res.data
                    console.log('data is here' + teamMembers)
                }
                    )
                  .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
          } else console.log('less than 3')

        });

       }




      let i = 0;                     

      function myLoop () {     
       

        setTimeout(function () {    
          console.log(teamMembers[i])
              // followersFollowiz(teamMembers[i].url);
              // followersPayto(teamMembers[i].url);
              followersSMM(teamMembers[i].url)
              // likesSMM(teamMembers[i])
              i++;

            if (i < teamMembers.length) 
            {           
            myLoop();            
              
            }                        
        }, 5000)
      }

    myLoop();
 
    })
    .catch(err => console.log(err))

    ///////////////////////////////////////////FOLLOWERS BLOCK////////////////////////////////////////

    //followiz followers
    function followersFollowiz(url){

        driver.get("https://followiz.com/");
        driver.sleep(8000);
        driver.sleep(6000);
      
      
        driver.findElement(By.name("LoginForm[username]")).sendKeys("oceanooi");
        driver.findElement(By.name("LoginForm[password]")).sendKeys("ooi0314475");
        driver.findElement(By.css(".btn:nth-child(1)")).click();
    
        setTimeout(function(){ 
        
          driver.get("https://google.com/");
          driver.get("https://followiz.com/"); 
          driver.sleep(8000);
      
      
      
          driver
          .findElement(By.css("#orderform-category"))
          .sendKeys("Instagram -  Followers [Not Guaranteed/No Refill]");
      driver.sleep(8000);

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
        .sendKeys(followers);
    
    
        driver
        .findElement(By.css(".btn-blue"))
        .click();
      
      driver.sleep(5000);
        
        }, 18000);
      
    }

    //payto followers
    function followersPayto(url){

      driverPayto.get("https://paytosmm.com/")
      .then(() => {
        driverPayto.sleep(8000);
        driverPayto.findElement(By.name("LoginForm[username]")).sendKeys("oceanooi");
      driverPayto.findElement(By.name("LoginForm[password]")).sendKeys("ooi0314475");
      driverPayto.findElement(By.css(".btn")).click()
      .then(() => {
        driverPayto.sleep(5000);
        setTimeout(function(){ 
        
        
          driverPayto
          .findElement(By.css("#orderform-category"))
          .sendKeys("➡️Instagram Followers (No Refill)");
          
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
    
    
        // driverPayto
        // .findElement(By.css(".btn-primary"))
        // .click();
      
      driverPayto.sleep(5000);
        
        }, 18000);
    
      });
      });
    
   
    
  }
    //smm followers
    function followersSMM(url){

      driverSMMfollowers.get("https://smmfollows.com/")
      .then(() => {
        driverSMMfollowers.sleep(8000);
        driverSMMfollowers.findElement(By.css("#username")).sendKeys("oceanooi");
      driverSMMfollowers.findElement(By.css("#password")).sendKeys("ooi0314475");
      driverSMMfollowers.findElement(By.css(".btn-primary")).click()
      .then(() => {
        driverSMMfollowers.sleep(5000);
        setTimeout(function(){ 
        
        
          driverSMMfollowers
          .findElement(By.css("#orderform-category"))
          .sendKeys("Instagram Followers No Refill");
          
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
    
    
        // driverSMMfollowers
        // .findElement(By.css(".btn-primary"))
        // .click();
      
      driverSMMfollowers.sleep(5000);
        
        }, 18000);
    
      });
      });
    
  
    
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
      likes = (likes/100) * 15;


      driver.get("https://followiz.com/").then(() => {


        driver.findElement(By.name("LoginForm[username]")).sendKeys("oceanooi");
        driver.findElement(By.name("LoginForm[password]")).sendKeys("ooi0314475");
        driver.findElement(By.css(".btn:nth-child(1)")).click().then(() => {
          driver.sleep(8000);
          driver.get("https://google.com/");
          driver.get("https://followiz.com/"); 
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
      driver
        .findElement(By.css("#field-orderform-fields-quantity"))
        .sendKeys(likes);
    
    
        // driver
        // .findElement(By.css(".btn-blue"))
        // .click();
      
      driver.sleep(5000);
        
        }, 18000);
        });
    
        
     
      });
      
     
    }


       //payto likes
       function likesPayto(item){


        let likes = parseInt(item.followers, 10);
      likes = (likes/100) * 15;

        driverPayto.get("https://paytosmm.com/")
        .then(() => {
          driverPayto.sleep(8000);
          driverPayto.findElement(By.name("LoginForm[username]")).sendKeys("oceanooi");
        driverPayto.findElement(By.name("LoginForm[password]")).sendKeys("ooi0314475");
        driverPayto.findElement(By.css(".btn")).click()
        .then(() => {
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
        driverPayto
          .findElement(By.css("#field-orderform-fields-quantity"))
          .sendKeys(likes);
      
      
          // driverPayto
          // .findElement(By.css(".btn-primary"))
          // .click();
        
        driverPayto.sleep(5000);
          
          }, 18000);
      
        });
        });
      
     
      
    }


       //smm likes
       function likesSMM(item){
        let likes = parseInt(item.followers, 10);
        console.log(likes)
        likes = (likes/100) * 15;
        driverSMMfollowers.get("https://smmfollows.com/")
        .then(() => {
          driverSMMfollowers.sleep(8000);
          driverSMMfollowers.findElement(By.css("#username")).sendKeys("oceanooi");
        driverSMMfollowers.findElement(By.css("#password")).sendKeys("ooi0314475");
        driverSMMfollowers.findElement(By.css(".btn-primary")).click()
        .then(() => {
          driverSMMfollowers.sleep(5000);
          setTimeout(function(){ 
          
          
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
        driverSMMfollowers
          .findElement(By.css("#field-orderform-fields-quantity"))
          .sendKeys(likes);
      
      
          // driverSMMfollowers
          // .findElement(By.css(".btn-primary"))
          // .click();
        
        driverSMMfollowers.sleep(5000);
          
          }, 18000);
      
        });
        });
      
    
      
    }
  //////////////////////////////////////LIKES BLOCK END//////////////////////////////////////

  //////////////////////////////////////Comments BLOCK//////////////////////////////////////

axios.get('http://localhost:5000/api/comments')
    .then(res => {
      comments = res.data
    


////////////////////automation here//////////////// 
    cron.schedule("* * * * *", () => {
      console.log('running')
      let automationArray = []
      axios.get('http://localhost:5000/api/teammembers').then(async (res) => {
        teamMembers = res.data;
        for(let count=0; count<teamMembers.length; count++){
          const username = teamMembers[count].url.substring(22);
          await ig.scrapeUserPage(username).then(async result => {


            if(result.medias.length > 2){


              const first = result.medias[0].media_id;
              const second = result.medias[1].media_id;
              const third = result.medias[2].media_id;

              if(first != teamMembers[count].firstImage)
              automationArray.push(teamMembers[count])
            if(second !=teamMembers[count].secondImage)
              automationArray.push(teamMembers[count])
            if(third !=teamMembers[count].thirdImage)
              automationArray.push(teamMembers[count])
              const obj = {
                first,
                second,
                third
             }
             

             await axios.post(`http://localhost:5000/api/teammembers/${teamMembers[count]._id}/update`, obj)
            //  .then(res => console.log(res))
             .catch(err => console.log(err))

            }
 });
  
         }

         if(automationArray.length != 0){
           console.log('not working (likes)')
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




          function commentsLoop () {     
           
    
            setTimeout(function () {    
                  commentsFollowiz(automationArray[instance]);
                  commentsPayto(automationArray[instance]);
                  commentsSMM(automationArray[instance])
              instance++;

    
                if (instance < automationArray.length) {           
                  commentsLoop();            
                }                        
            }, 30000)
          }
    
          // commentsLoop();
        } else console.log('yay working!')

      }).catch(err => console.log(err))
     

      
      
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

    driver.get("https://followiz.com/");
    driver.sleep(8000);
    driver.sleep(6000);
  
  
    driver.findElement(By.name("LoginForm[username]")).sendKeys("oceanooi");
    driver.findElement(By.name("LoginForm[password]")).sendKeys("ooi0314475");
    driver.findElement(By.css(".btn:nth-child(1)")).click();

    setTimeout(function(){ 
    
      driver.get("https://google.com/");
      driver.get("https://followiz.com/"); 
      driver.sleep(8000);
  
  
  
      driver
      .findElement(By.css("#orderform-category"))
      .sendKeys("Instagram -  Comments");
  driver.sleep(8000);

  
  driver
  .findElement(By.css("#orderform-service"))
  .sendKeys("Instagram Comments [1K] [CUSTOM - 1H - 1K/D] — $7.20 ");
  
    driver
    .findElement(By.css("#field-orderform-fields-link"))
    .sendKeys(item.url);

    selectedComments.map(item => {
        
  driver
    .findElement(By.css("#field-orderform-fields-comment"))
    .sendKeys(item + "\n");
     
    })
    
  // driver
  //   .findElement(By.css("#field-orderform-fields-comment"))
  //   .sendKeys(numOfComments);


    // driver
    // .findElement(By.css(".btn-blue"))
    // .click();
  
  driver.sleep(5000);
    
    }, 18000);



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
          driverPayto.sleep(8000);
          driverPayto.findElement(By.name("LoginForm[username]")).sendKeys("oceanooi");
        driverPayto.findElement(By.name("LoginForm[password]")).sendKeys("ooi0314475");
        driverPayto.findElement(By.css(".btn")).click()
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
          .sendKeys(item + "\n");
           
          })
       
      
      
          // driverPayto
          // .findElement(By.css(".btn-primary"))
          // .click();
        
        driverPayto.sleep(5000);
          
          }, 18000);
      
        });
        });
      
     
      
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
        driverSMMfollowers.sleep(8000);
        driverSMMfollowers.findElement(By.css("#username")).sendKeys("oceanooi");
      driverSMMfollowers.findElement(By.css("#password")).sendKeys("ooi0314475");
      driverSMMfollowers.findElement(By.css(".btn-primary")).click()
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
            .sendKeys(item + "\n");
             
            })
    
    
        // driverSMMfollowers
        // .findElement(By.css(".btn-primary"))
        // .click();
      
      driverSMMfollowers.sleep(5000);
        
        }, 18000);
    
      });
      });
    
  
    
    }
    

  //////////////////////////////////////Comments BLOCK END//////////////////////////////////////



} );

app.listen(5000, function() {
  console.log("server listening on port 5000");
});



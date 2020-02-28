// var ig = require('instagram-scraping');
// const cron = require('node-cron')
// // const axios = require('axios');


// // // const array1 = ['oceanooi', 'occeanooi', 'sadas','oceanoi', 'wqefq', 'sadas', 'oceanoi', 'sadq', 'sadas']
// // // const array = ['testing_user_hello']
// // // async function testing () {
// // //   array.map(async item => {
// // //     await ig.scrapeUserPage(item).then(result => {
// // //       console.log(result);
// // //     }).catch(err => console.log(err));
// // //   })
// // // }

// // // testing();

// // // ooi0314475
// const item = 'testing_user_hello'

// ig.scrapeUserPage(item).then(result => {
//   console.log(result);
// }).catch(err => console.log(err));



// // axios.get('http://localhost:5000/api/teammembers')
// // .then(async resp => {
// //   const teamMembers = resp.data;
  
  
// //    //fetch initial user data
// //    for(let count=0; count<teamMembers.length; count++){
// //     const username = teamMembers[count].url.substring(22);
// //     await ig.scrapeUserPage(username).then(async result => {
// //       console.log(result.medias.length)
// //       if(result.medias.length > 2){

// //       const first = result.medias[0].media_id;
// //       const second = result.medias[1].media_id;
// //       const third = result.medias[2].media_id;
// //       const followersCount = result.user.edge_followed_by.count;
      
      
// //       } else console.log('less than 3')

// //     });

// //    }




// //   let i = 0;                     

// //   function myLoop () {     
   

// //     setTimeout(function () {    
// //       console.log(teamMembers[i])
// //           // followersFollowiz(teamMembers[i].url);
// //           // followersPayto(teamMembers[i].url);
// //           // followersSMM(teamMembers[i].url)
// //           console.log('wait')
// //           i++;

// //         if (i < teamMembers.length) 
// //         {           
// //         myLoop();            
          
// //         }                        
// //     }, 5000)
// //   }

// // myLoop();

// // })
// // .catch(err => console.log(err))


// // console.log('outside')
const Scraper = require('node-scraper');
var pretty = require('pretty');


let scraper = new Scraper('https://followiz.com/orders');
scraper.scrape().on('done', function(err, statusCode, content){
  if (err){
    console.error(err);
  }
  else {
    console.log(pretty(JSON.stringify(content)));
  }
});
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Redirect } from "react-router-dom";
import axios from "axios";

let countForUseEffect = 1;

function Home() {
  const [userStatus, setUserStatus] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [url, setUrlAgain] = useState("");
  const [comment, setComment] = useState("");
  const [successURL, setSuccessURL] = useState(null);
  const [successComment, setSuccessComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);
  const [teammembers, setTeammembers] = useState([]);
  const [comments, setComments] = useState([]);
  const [followersSMM, setfollowersSMM] = useState(0);
  const [followersPayto, setfollowersPayto] = useState(0);
  const [loadingGo, setLoadingGo] = useState(false);
  const [err, setErr] = useState(false);
  const [initialFetch, setInitialFetch] = useState(null);
  const [PaytoFollowers, setPaytoFollowers] = useState(null);
  const [PaytoLikes, setPaytoLikes] = useState(null);
  const [PaytoComments, setPaytoComments] = useState(null);
  const [SMMFollowers, setSMMFollowers] = useState(null);
  const [SMMLikes, setSMMLikes] = useState(null);
  const [SMMComments, setSMMComments] = useState(null);
  const [secondErr, setSecondErr] = useState(false);
  const [followizServices, setfollowizServices] = useState([]);
  const [paytoServices, setPaytoServices] = useState([]);
  const [SMMServices, setSMMServices] = useState([]);
  const [followizFiltered, setFollowizFiltered] = useState([]);
  const [SMMFiltered, setSMMFiltered] = useState([]);
  const [paytoFiltered, setPaytoFiltered] = useState([]);
  const [categoriesFollowiz, setCategoriesFollowiz] = useState([]);
  const [categoriesPayto, setCategoriesPayto] = useState([]);
  const [categoriesSMM, setCategoriesSMM] = useState([]);
  const [categoriesIndianSmart, setCategoriesIndianSmart] = useState([]);
  const [followizFilteredLikes, setFollowizFilteredLikes] = useState([]);
  const [paytoFilteredLikes, setPaytoFilteredLikes] = useState([]);
  const [SMMFilteredLikes, setSMMFilteredLikes] = useState([]);
  const [commentFiltered, setCommentFiltered] = useState([]);
  const [commentFilteredPayto, setCommentFilteredPayto] = useState([]);
  const [commentFilteredSMM, setCommentFilteredSMM] = useState([]);
  
  //-----------------------------------------------
  //          states for form at the last
  //-----------------------------------------------
  //followiz states
  const [followersFollowiz, setfollowersFollowiz] = useState(0);
  const [followizFollowers, setFollowizFollowers] = useState(null);
  const [followizLikes, setFollowizLikes] = useState(null);
  const [followizComments, setFollowizComments] = useState(null);
  const [followersFollowizCategory, setFollowersFollowizCategory] = useState('');
  const [followersFollowizService, setFollowersFollowizService] = useState('');
  const [followersFollowizNumber, setFollowersFollowizNumber] = useState('');
  const [likesFollowizCategory, setLikesFollowizCategory] = useState('');
  const [likesFollowizService, setLikesFollowizService] = useState('');
  const [commentsFollowizService, setCommenstFollowizService] = useState('');
  const [SMMSubmitCheck, setSMMSubmitCheck] = useState(false);
  const [errFollowiz, setErrorFollowiz] = useState(false);


  //payto states
  const [followersPaytoCategory, setFollowersPaytoCategory] = useState('');
  const [followersPaytoService, setFollowersPaytoService] = useState('');
  const [followersPaytoNumber, setFollowersPaytoNumber] = useState('');
  const [likesPaytoCategory, setLikesPaytoCategory] = useState('');
  const [likesPaytoService, setLikesPaytoService] = useState('');
  const [commentsPaytoService, setCommenstPaytoService] = useState('');
  const [PaytoSubmitCheck, setPaytoSubmitCheck] = useState(false);
  const [errPayto, setErrorPayto] = useState(false);


  //SMM states
  const [followersSMMCategory, setFollowersSMMCategory] = useState('');
  const [errSMM, setErrorSMM] = useState(false);
  const [followersSMMService, setFollowersSMMService] = useState('');
  const [followersSMMNumber, setFollowersSMMNumber] = useState('');
  const [likesSMMCategory, setLikesSMMCategory] = useState('');
  const [likesSMMService, setLikesSMMService] = useState('');
  const [commentsSMMService, setCommenstSMMService] = useState('');
  const [followizSubmitCheck, setFollowizSubmitCheck] = useState(false);

  //--------------------------------------------------------------

  useEffect(() => {
    fetch();
    initFetchServices();
    // if(countForUseEffect)
      // initFetch();
    countForUseEffect = 0;
    auth.onAuthStateChanged(user => {
      if (user == null) {
        setRedirect(true);
        setUserStatus(user);
      } else setUserStatus(user);
    });
  }, [userStatus]);


  function handleSubmitSMM(){
    setFollowizSubmitCheck(true);
    if(followersSMM == 0 || SMMLikes == null || SMMFollowers == null || SMMComments == null )
      setErrorSMM(true);
    else{ 
      setErrorSMM(false)
    const obj = {
      followersSMM,
      SMMLikes,
      SMMFollowers,
      SMMComments
    }
    axios.post('http://193.46.199.129:5000/smmfollowers', obj)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err));
    }
  }

  function handleSubmitPayto(){
    setPaytoSubmitCheck(true);
    if(followersPayto == 0 || PaytoLikes == null || PaytoFollowers == null || PaytoComments == null )
      setErrorPayto(true);
    else{
      setErrorPayto(false);
    const obj = {
      followersPayto,
      PaytoLikes,
      PaytoFollowers,
      PaytoComments
    }
    axios.post('http://193.46.199.129:5000/paytofollowers', obj)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err));
    }
  }

  function handleSubmitFollowiz(){
    setSMMSubmitCheck(true);
    if(followersFollowiz == 0 || followizLikes == null || followizFollowers == null || followizComments == null )
    setErrorFollowiz(true);
    else {
      setErrorFollowiz(false);
    const obj = {
      followersFollowiz,
      followizLikes,
      followizFollowers,
      followizComments
    }
    console.log(obj);

    axios.post('http://193.46.199.129:5000/followizfollowers', obj)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err));
    }
  }


  function initFetchServices(){
    let tempCategoriesArray = [];
    let tempCategoriesArrayPayto = [];
    let tempCategoriesArraySMM = [];
    let tempCategoriesArrayIndianSmart = [];
    let tempArray = [];
    let tempArrayPayto = [];
    let tempArraySMM = [];
    let tempArrayIndianSmart = [];
    axios.post('http://193.46.199.129:5000/fetch')
    .then(res => {
      console.log(res.data)

      res.data.followizz.map((service, index) => {
          if(
            service.category == "Instagram - Followers [Guaranteed/Refill]"  || 
            service.category == "Instagram -  Followers [Not Guaranteed/No Refill]"  || 
            service.category == "Instagram -  Followers [Targeted]"  || 
            service.category == "Instagram - Followers [ADS]"  || 
            service.category == "Instagram -  Likes"  || 
            service.category == "Instagram -  Likes [Targeted]"  || 
            service.category == "Instagram - Likes [Per Minute]"  || 
            service.category == "Instagram - Likes [Last Posts]"  || 
            service.category == "Instagram -  Comments"
          
            ){
            tempCategoriesArray.push(service.category)
            tempArray.push(service);
            }
        });

        res.data.paytoz.map(service => {
          if(
            service.category == "➡️Instagram Likes" ||
            service.category == "➡️Instagram Followers (Guaranteed)" ||
            service.category == "➡️Instagram Followers (No Refill)" ||
            service.category == "➡️Instagram Comments and Comment Likes" 
          ){
          tempCategoriesArrayPayto.push(service.category);
          tempArrayPayto.push(service)
          }
        })

        res.data.SMMz.map(service => {
          if(
            service.category.includes('Follower') ||
            service.category.includes('Like') ||
            service.category.includes('Comments Worldwide')
          ){
          tempCategoriesArraySMM.push(service.category);
          tempArraySMM.push(service)
          }
        })

        // res.data.indianSmartz.map(service => {
        //   if(
        //     service.category.includes('Comments') || 
        //     service.category.includes('Like') || 
        //     service.category.includes('Follower')
        //   ){
        //   tempCategoriesArrayIndianSmart.push(service.category);
        //   tempArrayIndianSmart.push(service)
        //   }
        // })
        
        let categories = [...new Set(tempCategoriesArray)];
        let categoriesPaytoArray = [...new Set(tempCategoriesArrayPayto)];
        let categoriesSMMArray = [...new Set(tempCategoriesArraySMM)];
        let categoriesIndianSmartArray = [...new Set(tempCategoriesArrayIndianSmart)];
        let commentService = [];
        let commentServicePayto = [];
        let commentServiceSMM = [];

        tempArray.map(obj => {
          if(obj.category.includes('omment'))
            commentService.push(obj);
        });
        tempArrayPayto.map(obj => {
          if(obj.category.includes('omment'))
          commentServicePayto.push(obj);
        })
        tempArraySMM.map(obj => {
          if(obj.category.includes('omment'))
          commentServiceSMM.push(obj);
        })
        setCommentFiltered(commentService);
        setCommentFilteredPayto(commentServicePayto);
        setCommentFilteredSMM(commentServiceSMM);
        setfollowizServices(tempArray);
        setPaytoServices(tempArrayPayto);
        setSMMServices(tempArraySMM);
        setCategoriesFollowiz(categories);
        setCategoriesPayto(categoriesPaytoArray);
        setCategoriesSMM(categoriesSMMArray);
        setCategoriesIndianSmart(categoriesIndianSmartArray);

    }).catch(err => console.log(err))
  }


  function categoryChangeFollowiz(e){
    console.log(e.target.value);
    setFollowersFollowizCategory(e.target.value)
    let filtered = [];
    followizServices.map(service => {
      console.log(service.category)
      if(service.category == e.target.value)
        filtered.push(service);
    });
    console.log(filtered)
    setFollowizFiltered(filtered);
  }


  function categoryChangeLikesFollowiz(e){
    console.log(e.target.value);
    setLikesFollowizCategory(e.target.value);
    let filtered = [];
    followizServices.map(service => {
      console.log(service.category)
      if(service.category == e.target.value)
        filtered.push(service);
    });
    console.log(filtered)
    setFollowizFilteredLikes(filtered);
  }


  function categoryChangePayto(e){
    console.log(e.target.value)
    let filtered = [];
    paytoServices.map(service => {
      console.log(service.category)
      if(service.category == e.target.value)
        filtered.push(service);
    });
    console.log(filtered)
    setPaytoFiltered(filtered);
  }


  function categoryChangeLikesPayto(e){
    console.log(e.target.value)
    let filtered = [];
    paytoServices.map(service => {
      console.log(service.category)
      if(service.category == e.target.value)
        filtered.push(service);
    });
    console.log(filtered)
    setPaytoFilteredLikes(filtered);
  }


  function categoryChangeSMM(e){
    console.log(e.target.value)
    let filtered = [];
    SMMServices.map(service => {
      console.log(service.category)
      if(service.category == e.target.value)
        filtered.push(service);
    });
    console.log(filtered)
    setSMMFiltered(filtered);
  }


  function categoryChangeLikesSMM(e){
    console.log(e.target.value)
    let filtered = [];
    SMMServices.map(service => {
      console.log(service.category)
      if(service.category == e.target.value)
        filtered.push(service);
    });
    console.log(filtered)
    setSMMFilteredLikes(filtered);
  }

  async function fetch() {
    await axios
      .get("http://193.46.199.129:5000/api/teammembers")
      .then(res => {
        setTeammembers(res.data);
        console.log("team" + res.data);
      })
      .catch(err => console.log(err));

    await axios
      .get("http://193.46.199.129:5000/api/comments")
      .then(res => {
        setComments(res.data);
      })
      .catch(err => console.log(err));
  }

  async function initFetch(){
    await axios.post('http://193.46.199.129:5000/api/scrape')
    .then(res => {
      setInitialFetch(res.data)
    })
    .catch(err => console.log(err));
  }

  const handleLogout = e => {
    auth.signOut();
  };

  const handleURL = e => {
    e.preventDefault();
    setUrlAgain(e.target.value);
  };

  const commentHandling = e => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const obj = {
      url: url
    };
    axios
      .post("http://193.46.199.129:5000/api/teammembers", obj)
      .then(res => {
        setSuccessURL(true);
        setLoading(false);

        axios
          .get("http://193.46.199.129:5000/api/teammembers")
          .then(res => {
            setTeammembers(res.data);
            console.log("team" + res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        setSuccessURL(false);
        setLoading(false);
      });
  };

  const commentHandler = e => {
    e.preventDefault();
    setLoadingComment(true);

    const obj = {
      comment: comment
    };
    axios
      .post("http://193.46.199.129:5000/api/comments", obj)
      .then(res => {
        setSuccessComment(true);
        setLoadingComment(false);
        axios
          .get("http://193.46.199.129:5000/api/comments")
          .then(res => {
            setComments(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        setSuccessComment(false);
        setLoadingComment(false);
      });
  };

  const handleDeleteComment = item => {
    axios
      .post(`http://193.46.199.129:5000/api/comments/${item._id}`)
      .then(() => {
        axios
          .get("http://193.46.199.129:5000/api/comments")
          .then(res => {
            setComments(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  const handleDeleteMember = item => {
    axios
      .post(`http://193.46.199.129:5000/api/teammembers/${item._id}`)
      .then(() => {
        axios
          .get("http://193.46.199.129:5000/api/teammembers")
          .then(res => {
            setTeammembers(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  const StartingEngine = e => {
    e.preventDefault();
    if(followersSMM == 0 || SMMLikes == null || SMMFollowers == null || SMMComments == null || followersPayto == 0 || PaytoLikes == null || PaytoFollowers == null || PaytoComments == null || followersFollowiz == 0 || followizLikes == null || followizFollowers == null || followizComments == null )
    setErr(true)
    else {

      setErr(false);
      // const followiz = {
      //   followers: followizFollowers,
      //   comments: followizComments,
      //   likes: followizLikes
      // }

      // const payto = {
      //   followers: PaytoFollowers,
      //   comments: PaytoComments,
      //   likes: PaytoLikes
      // }

      // const SMM = {
      //   followers: SMMFollowers,
      //   comments: SMMComments,
      //   likes: SMMLikes
      // }

      // const obj = {
      //   followers: {
      //     followersPayto,
      //     followersSMM,
      //     followersFollowiz
      //   },
      //   followiz,
      //   payto,
      //   SMM
      // };
      axios
        .post("http://193.46.199.129:5000/api/starter")
        .then(res => {})
        .catch(err => console.log(err));
        setLoadingGo(true);

    }
  };

  const handleFollowersFollowiz = e => {
    e.preventDefault();
    setErr(false);
    setfollowersFollowiz(e.target.value);
  };

  const handleFollowersPayto = e => {
    e.preventDefault();
    setErr(false);
    setfollowersPayto(e.target.value);
  };

  const handleFollowersSMM = e => {
    e.preventDefault();
    setErr(false);
    setfollowersSMM(e.target.value);
  };


  const handleFollowizFollowers = e => {
    e.preventDefault();
    setFollowizFollowers(e.target.value);
    console.log(e.target.value)
  }

  const handleFollowizLikes = e => {
    e.preventDefault();
    setFollowizLikes(e.target.value);
    console.log(e.target.value)
  }

  const handleFollowizComments = e => {
    e.preventDefault();
    setFollowizComments(e.target.value);
    console.log(e.target.value)
  }

 
  const handlePaytoFollowers = e => {
    e.preventDefault();
    setPaytoFollowers(e.target.value);
    console.log(e.target.value)
  }

  const handlePaytoLikes = e => {
    e.preventDefault();
    setPaytoLikes(e.target.value);
    console.log(e.target.value)
  }

  const handlePaytoComments = e => {
    e.preventDefault();
    setPaytoComments(e.target.value);
    console.log(e.target.value)
  }

  const handleSMMFollowers = e => {
    e.preventDefault();
    setSMMFollowers(e.target.value);
    console.log(e.target.value)
  }

  const handleSMMLikes = e => {
    e.preventDefault();
    setSMMLikes(e.target.value);
    console.log(e.target.value)
  }

  const handleSMMComments = e => {
    e.preventDefault();
    setSMMComments(e.target.value);
    console.log(e.target.value)
  }

  return (
    <>
      {redirect ? (
        <Redirect to="/signin" />
      ) : (
        <>
          <div className="row w-100 h-100">
            <div className="col-lg-4 border border-left-0 border-bottom-0">
              <div class="panel panel-primary" id="result_panel">
                <div class="panel-body">
                  <ul class="list-group">
                    {teammembers.map(item => {
                      return (
                        <li class="list-group-item">
                          {item.url}
                          <button
                            onClick={() => handleDeleteMember(item)}
                            className="btn btn-danger btn-sm float-right"
                          >
                            x
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 border border-left-10 border-bottom-0">
              <div class="panel panel-primary" id="result_panel">
                <div class="panel-body">
                  <ul class="list-group">
                    {comments.map(item => {
                      return (
                        <>
                          <li class="list-group-item">
                            {item.comment}
                            <button
                              onClick={() => handleDeleteComment(item)}
                              className="btn btn-danger btn-sm float-right roundede"
                            >
                              x
                            </button>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 border border-left-10 border-bottom-0 border-right-0">
              <div className="col col-lg-12 border m-1 p-4">
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Instagram handle</label>
                    <input
                      onChange={handleURL}
                      type="text"
                      class="form-control"
                      id="url"
                      aria-describedby="emailHelp"
                      placeholder="URL"
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      Input the instagram user address here like(https://instagram.com/username){" "}
                    </small>
                  </div>

                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    {loading ? <>Adding</> : <>Add</>}
                  </button>
                </form>
              </div>

              <div className="col col-lg-12 border m-1 p-4">
                <form onSubmit={commentHandler}>
                  <div class="form-group">
                    <label>Add Comments </label>
                    <input
                      onChange={commentHandling}
                      type="text"
                      class="form-control"
                      id="comment"
                      placeholder="Input comment"
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      Input the comments which need to added{" "}
                    </small>
                  </div>

                  <button
                    onClick={commentHandler}
                    type="submit"
                    class="btn btn-primary"
                  >
                    {loadingComment ? <>Adding</> : <>Add</>}
                  </button>
                  {/* {successComment === true ? (
                    <span className="alert alert-success ml-3">Done </span>
                  ) : (
                    <>
                      {successComment === false ? (
                        <span className="alert alert-danger ml-3">
                          Error :(
                        </span>
                      ) : (
                        <></>
                      )}
                    </>
                  )} */}
                </form>
              </div>
              <div className="col col-lg-12 border m-1 p-4">
                <form onSubmit={StartingEngine}>
                  <div class="form-group">
                    {/* <label>Number of followers </label>
                    <input
                      onChange={handleFollowers}
                      type="number"
                      class="form-control"
                      id="comment"
                      placeholder="Input Followers"
                    /> */}
                  </div>

                  <button
                    onClick={StartingEngine}
                    className="btn btn-primary mt-3 col-lg-12 ml-2"
                  >
                    {loadingGo ? (
                      <>Started</>
                    ) : (
                      <>
                        {err ? <>Fill out the below fields first</> : <>GO!</>}
                      </>
                    )}
                  </button>
                </form>
                <br />
                {secondErr ? <div className="alert alert-danger">Please fill out the below fields</div>:<></>}
              </div>
            </div>
            {/* Instagram -  Followers [Not Guaranteed/No Refill] */}

          </div>
          {/* <button onClick={handleLogout} className="btn btn-info mt-3">logout</button> */}
          {/* <div className="container">
            <div className="row">
              <div className="col col-lg-4">
                <h3>Followiz</h3>
                             
              </div>
              <div className="col col-lg-4">
              <h3>Payto</h3>
                </div>
                <div className="col col-lg-4">
              <h3>SMM</h3>
                
                </div>
            </div>
          </div> */}
          <hr />
          
           <>
          <div className="alert alert-info">Loading the latest prices.. Please wait for 5-10 seconds.
            </div></>:<>
            <div className="container pt-5 mt-5 pb-5 mb-5">
            <div className="row">
          <div className="col col-lg-4">
            <h1>Followiz</h1>
            {errFollowiz ? <div className="alert alert-danger">Please fill out all the fields</div> : <></>}

            <div class="form-group">
    <label for="exampleFormControlSelect1">Categories Followers</label>
    <select onChange={categoryChangeFollowiz} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>
    {categoriesFollowiz.map(category => {
      return(
        category.includes('Followers') ?
        <option value={category}>{category}</option>: <></>
      );
    })}
    {/* <option >Instagram - Followers [Not Guaranteed/No Refill]</option>
    <option >Instagram - Followers [Targeted]</option>
    <option >Instagram - Followers [ADS]</option> */}
    </select>
    <br />
    <label for="exampleFormControlSelect1">Services</label>
    <select onChange={handleFollowizFollowers} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>

    {followizFiltered.map(item => {
      return(
      <option value={item.service}>{item.name} - ${item.rate} - min[{item.min}] </option>

      );
    })}
    </select>
    <br />
    <label for="exampleFormControlSelect1">Categories Likes</label>
    <select onChange={categoryChangeLikesFollowiz} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>
    {categoriesFollowiz.map(category => {
      return(
        category.includes('Likes') ?
        <option value={category}>{category}</option>: <></>
      );  
    })}
  </select>

    <br />
    <label for="exampleFormControlSelect1">Services</label>
    <select onChange={handleFollowizLikes} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>

    {followizFilteredLikes.map(item => {
      return(

        <option value={item.service}>{item.name} - ${item.rate} - min[{item.min}]</option>

      );
    })}
    </select>
    <br />

    <label for="exampleFormControlSelect1">Comments Services</label>
    <select onChange={handleFollowizComments} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>

    {commentFiltered.map(item => {
      return(
        <option value={item.service}>{item.name} - ${item.rate} - min[{item.min}]</option>

      );
    })}
    </select>
    <br />

    <label>Number of followers </label>
                    <input
                      onChange={handleFollowersFollowiz}
                      type="number"
                      class="form-control"
                      id="comment"
                      placeholder="Input Followers"
                    />
                    <br />
                    <button onClick={handleSubmitFollowiz} className="btn btn-lg btn-primary">{!errFollowiz && SMMSubmitCheck ? <>Started</>:<>Start</>}</button>
  </div>
          </div>
          <div className="col col-lg-4">
            <h1>Payto</h1>
            {errPayto ? <div className="alert alert-danger">Please fill out all the fields</div> : <></>}

            <label for="exampleFormControlSelect1">Categories Followers</label>
    <select onChange={categoryChangePayto} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>
    {categoriesPayto.map(category => {
      return(
        category.includes('Followers') ?
        <option value={category}>{category}</option>: <></>
      );
    })}
    {/* <option >Instagram - Followers [Not Guaranteed/No Refill]</option>
    <option >Instagram - Followers [Targeted]</option>
    <option >Instagram - Followers [ADS]</option> */}
    </select>
    <br />
    <label for="exampleFormControlSelect1">Services</label>
    <select onChange={handlePaytoFollowers} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>

    {paytoFiltered.map(item => {
      return(
        <option value={item.service}>{item.name} - ${item.rate} - min[{item.min}]</option>
      );
    })}
    </select>
    <br />
    <label for="exampleFormControlSelect1">Categories Likes</label>
    <select onChange={categoryChangeLikesPayto} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>
    {categoriesPayto.map(category => {
      return(
        category.includes('Likes') ?
        <option value={category}>{category}</option>: <></>
      );
    })}
  </select>

    <br />
    <label for="exampleFormControlSelect1">Services</label>
    <select onChange={handlePaytoLikes} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>

    {paytoFilteredLikes.map(item => {
      return(

        <option value={item.service}>{item.name} - ${item.rate} - min[{item.min}]</option>

      );
    })}
    </select>
    <br />

    <label for="exampleFormControlSelect1">Comments Services</label>
    <select onChange={handlePaytoComments} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>

    {commentFilteredPayto.map(item => {
      return(
        <option value={item.service}>{item.name} - ${item.rate} - min[{item.min}]</option>

      );
    })}
    </select>
    <br />

    <label>Number of followers </label>
                    <input
                      onChange={handleFollowersPayto}
                      type="number"
                      class="form-control"
                      id="comment"
                      placeholder="Input Followers"
                    />
                    <br />
                    <button onClick={handleSubmitPayto} className="btn btn-lg btn-primary">{!errPayto && PaytoSubmitCheck ? <>Started</>:<>Start</>}</button>
          </div>
          <div className="col col-lg-4">
            <h1>SMM</h1>
            {errSMM ? <div className="alert alert-danger">Please fill out all the fields</div> : <></>}
            <label for="exampleFormControlSelect1">Categories Followers</label>
    <select onChange={categoryChangeSMM} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>
    {categoriesSMM.map(category => {
      return(
        category.includes('Followers') ?
        <option value={category}>{category}</option>: <></>
      );
    })}
    {/* <option >Instagram - Followers [Not Guaranteed/No Refill]</option>
    <option >Instagram - Followers [Targeted]</option>
    <option >Instagram - Followers [ADS]</option> */}
    </select>
    <br />
    <label for="exampleFormControlSelect1">Services</label>
    <select onChange={handleSMMFollowers} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>

    {SMMFiltered.map(item => {
      return(
        <option value={item.service}>{item.name} - ${item.rate} - min[{item.min}]</option>

      );
    })}
    </select>
    <br />
    <label for="exampleFormControlSelect1">Categories Likes</label>
    <select onChange={categoryChangeLikesSMM} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>
    {categoriesSMM.map(category => {
      return(
        category.includes('Likes') ?
        <option value={category}>{category}</option>: <></>
      );
    })}
  </select>

    <br />
    <label for="exampleFormControlSelect1">Services</label>
    <select onChange={handleSMMLikes} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>

    {SMMFilteredLikes.map(item => {
      return(

        <option value={item.service}>{item.name} - ${item.rate} - min[{item.min}]</option>

      );
    })}
    </select>
    <br />

    <label for="exampleFormControlSelect1">Comments Services</label>
    <select onChange={handleSMMComments} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>

    {commentFilteredSMM.map(item => {
      return(
        <option value={item.service}>{item.name}</option>

      );
    })}
    </select>
    <br />

    <label>Number of followers </label>
                    <input
                      onChange={handleFollowersSMM}
                      type="number"
                      class="form-control"
                      id="comment"
                      placeholder="Input Followers"
                    />
                    <br />
  <button onClick={handleSubmitSMM} className={"btn btn-lg btn-primary"}>{!errSMM && followizSubmitCheck ? <>Started</>:<>Start</>}</button>
          </div>
          </div>
          </div>
       
            </>
         
        </>
      )}
      <button onClick={handleLogout} className="btn btn-danger col-sm-12">logout</button>
    </>
  );
}

export default Home;

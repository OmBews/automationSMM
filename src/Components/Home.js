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
  const [followersFollowiz, setfollowersFollowiz] = useState(0);
  const [followersSMM, setfollowersSMM] = useState(0);
  const [followersPayto, setfollowersPayto] = useState(0);
  const [loadingGo, setLoadingGo] = useState(false);
  const [err, setErr] = useState(false);
  const [initialFetch, setInitialFetch] = useState(null);
  const [followizFollowers, setFollowizFollowers] = useState(null);
  const [followizLikes, setFollowizLikes] = useState(null);
  const [followizComments, setFollowizComments] = useState(null);
  const [PaytoFollowers, setPaytoFollowers] = useState(null);
  const [PaytoLikes, setPaytoLikes] = useState(null);
  const [PaytoComments, setPaytoComments] = useState(null);
  const [SMMFollowers, setSMMFollowers] = useState(null);
  const [SMMLikes, setSMMLikes] = useState(null);
  const [SMMComments, setSMMComments] = useState(null);
  const [secondErr, setSecondErr] = useState(false);
  

  useEffect(() => {
    fetch();
    if(countForUseEffect)
      initFetch();
    countForUseEffect = 0;
    // auth.onAuthStateChanged(user => {
    //   if (user == null) {
    //     setRedirect(true);
    //     setUserStatus(user);
    //   } else setUserStatus(user);
    // });
  }, [userStatus]);



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
    if (followersFollowiz < 100 || followersSMM < 100 || followersPayto < 100) setErr(true);
    else if(followizFollowers == null || followizComments == null || followizLikes == null || PaytoComments == null || PaytoFollowers == null || PaytoLikes == null || SMMComments == null || SMMFollowers == null || SMMLikes == null)
    setSecondErr(true)
    else {
      // setSecondErr(false)

      const followiz = {
        followers: followizFollowers,
        comments: followizComments,
        likes: followizLikes
      }

      const payto = {
        followers: PaytoFollowers,
        comments: PaytoComments,
        likes: PaytoLikes
      }

      const SMM = {
        followers: SMMFollowers,
        comments: SMMComments,
        likes: SMMLikes
      }

      const obj = {
        followers: {
          followersPayto,
          followersSMM,
          followersFollowiz
        },
        followiz,
        payto,
        SMM
      };
      axios
        .post("http://193.46.199.129:5000/api/start", obj)
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
                        {err ? <>Value must be greater than 100</> : <>GO!</>}
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
          {initialFetch == null ? <>
          <div className="alert alert-info">Loading the latest prices.. Please wait for 40-45 seconds.
            </div></>:<>
            <div className="container pt-5 mt-5 pb-5 mb-5">
            <div className="row">
          <div className="col col-lg-4">
            <h1>Followiz</h1>
            <div class="form-group">
    <label for="exampleFormControlSelect1">Followers</label>
    <select onChange={handleFollowizFollowers} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>

    {initialFetch.followizFollowersArray.map(item => {
      return(
        <option value={item}>{item}</option>

      );
    })}
    
    </select>
    <label for="exampleFormControlSelect1">Comments</label>
    <select onChange={handleFollowizComments} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>

    {initialFetch.followizCommentsArray.map(item => {
      return(
        <option value={item}>{item}</option>

      );
    })}
    </select>
    <label for="exampleFormControlSelect1">Likes</label>

    <select onChange={handleFollowizLikes} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>
  
    {initialFetch.followizLikesArray.map(item => {
      return(
        <option value={item}>{item}</option>

      );
    })}
    </select>
    <label>Number of followers </label>
                    <input
                      onChange={handleFollowersFollowiz}
                      type="number"
                      class="form-control"
                      id="comment"
                      placeholder="Input Followers"
                    />
  </div>
          </div>
          <div className="col col-lg-4">
            <h1>Payto</h1>
    <label for="exampleFormControlSelect1">Followers</label>

            <select onChange={handlePaytoFollowers} class="form-control" id="exampleFormControlSelect1">
            <option >...</option>
  
            {initialFetch.paytoFollowersArray.map(item => {
      return(
        <option value={item}>{item}</option>

      );
    })}
    </select>
    <label for="exampleFormControlSelect1">Comments</label>

    <select onChange={handlePaytoComments} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>
  
    {initialFetch.paytoCommentsArray.map(item => {
      return(
        <option value={item}>{item}</option>

      );
    })}
    </select>
    <label for="exampleFormControlSelect1">Likes</label>

    <select onChange={handlePaytoLikes} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>

    {initialFetch.paytoLikesArray.map(item => {
      return(
        <option value={item}>{item}</option>

      );
    })}
    </select>
    <label>Number of followers </label>
                    <input
                      onChange={handleFollowersPayto}
                      type="number"
                      class="form-control"
                      id="comment"
                      placeholder="Input Followers"
                    />
          </div>
          <div className="col col-lg-4">
            <h1>SMM</h1>
    <label for="exampleFormControlSelect1">Followers</label>

            <select onChange={handleSMMFollowers} class="form-control" id="exampleFormControlSelect1">
            <option >...</option>

            {initialFetch.SMMFollowersArray.map(item => {
      return(
        <option value={item}>{item}</option>

      );
    })}
    </select>
    <label for="exampleFormControlSelect1">Comments</label>

    <select onChange={handleSMMComments} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>
  
    {initialFetch.SMMCommentsArray.map(item => {
      return(
        <option value={item}>{item}</option>

      );
    })}
    </select>
    <label for="exampleFormControlSelect1">Likes</label>

    <select onChange={handleSMMLikes} class="form-control" id="exampleFormControlSelect1">
    <option >...</option>
  
    {initialFetch.SMMLikesArray.map(item => {
      return(
        <option value={item}>{item}</option>

      );
    })}
    </select>
               <label>Number of followers </label>
                    <input
                      onChange={handleFollowersSMM}
                      type="number"
                      class="form-control"
                      id="comment"
                      placeholder="Input Followers"
                    />
          </div>
          </div>
          </div>
       
            </>}
         
        </>
      )}
    </>
  );
}

export default Home;

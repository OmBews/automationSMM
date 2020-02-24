import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Redirect } from "react-router-dom";
import axios from "axios";

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
  const [foll, setFoll] = useState(0);
  const [loadingGo, setLoadingGo] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch();

    auth.onAuthStateChanged(user => {
      if (user == null) {
        setRedirect(true);
        setUserStatus(user);
      } else setUserStatus(user);
    });
  }, [userStatus]);

  async function fetch() {
    await axios
      .get("http://localhost:5000/api/teammembers")
      .then(res => {
        setTeammembers(res.data);
        console.log("team" + res.data);
      })
      .catch(err => console.log(err));

    await axios
      .get("http://localhost:5000/api/comments")
      .then(res => {
        setComments(res.data);
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
      .post("http://localhost:5000/api/teammembers", obj)
      .then(res => {
        setSuccessURL(true);
        setLoading(false);

        axios
          .get("http://localhost:5000/api/teammembers")
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
      .post("http://localhost:5000/api/comments", obj)
      .then(res => {
        setSuccessComment(true);
        setLoadingComment(false);
        axios
          .get("http://localhost:5000/api/comments")
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
      .post(`http://localhost:5000/api/comments/${item._id}`)
      .then(() => {
        axios
          .get("http://localhost:5000/api/comments")
          .then(res => {
            setComments(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  const handleDeleteMember = item => {
    axios
      .post(`http://localhost:5000/api/teammembers/${item._id}`)
      .then(() => {
        axios
          .get("http://localhost:5000/api/teammembers")
          .then(res => {
            setTeammembers(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  const StartingEngine = e => {
    e.preventDefault();
    if (foll < 100) setErr(true);
    else {
      const obj = {
        followers: foll
      };
      axios
        .post("http://localhost:5000/api/start", obj)
        .then(res => {})
        .catch(err => console.log(err));
      setLoadingGo(true);
    }
  };

  const handleFollowers = e => {
    e.preventDefault();
    setErr(false);
    setFoll(e.target.value);
  };

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
                    <label>Number of followers </label>
                    <input
                      onChange={handleFollowers}
                      type="number"
                      class="form-control"
                      id="comment"
                      placeholder="Input Followers"
                    />
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
              </div>
            </div>

            {/* <button onClick={handleLogout} className="btn btn-info">logout</button> */}
          </div>
        </>
      )}
    </>
  );
}

export default Home;

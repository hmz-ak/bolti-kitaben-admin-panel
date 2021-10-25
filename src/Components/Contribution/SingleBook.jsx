import {
  Button,
  Divider,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
// import novelService from "../../services/NovelService";
// import userService from "../../services/UserService";
import Chapters from "./Chapters";
// import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import libraryService from "../services/LibraryService";
import { toast } from "react-toastify";
// import { FaWindows } from "react-icons/fa";
import Auth from "../Auth/Auth";
import bookService from "../services/BookService";
import userService from "../services/UserService";
import chapterService from "../services/ChapterService";
import { withRouter } from "react-router-dom";

const SingleBook = (props) => {
  const [novel, setNovel] = useState([]);
  //   const [user_info, setUserInfo] = useState([]);
  const [chapters, setChapters] = useState([]);
  //   const [library, setLibrary] = useState([]);
  //   const [loader, setLoader] = useState(true);
  //   const [trigger, setTrigger] = useState(false);
  //   const [trigger2, setTrigger2] = useState(false);

  // const [existing, setExisting] = useState([]);
  
  const id = props.match.params.id;
  console.log(id);
  useEffect(() => {
    bookService
      .getSingleBook(id)
      .then((data) => {
        console.log(data);
        setNovel(data);
        // setUserInfo(data.user_info);
        // setChapters(data.chapters);
        // setLibrary(data.library);
        // setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });

    
  }, []);

  useEffect(()=>{
    chapterService
    .getChapter(id)
    .then((data) => {
      setChapters(data);
      
    })
    .catch((err) => console.log(err));
  },[])

  return (
    <Auth>
      <div>
        <Grid container style={{ marginTop: "30px" }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} md={10} lg={1}>
            <img
              src={`/images/${novel.image}`}
              className="image3"
              width="300px"
              height="400px"
              alt=""
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={10} lg={6}>
            <br />
            Name <strong>{novel.title}</strong>
            <br />
            <br />
            Genre <strong>{novel.genre}</strong>
            
            <br />
            {/* <br />
            Written by <strong>{user_info.name}</strong> */}
            <br />
            <br />
            <hr style={{ marginTop: "30px" }} />
            <br />
            <br />
            <Typography variant="h5">Theme of the story</Typography>
            <Typography variant="body2" style={{ marginTop: "15px" }}>
              {novel.description}
            </Typography>
            <br />
            <br />
             <Button onClick={()=>{
               bookService
               .approveBook(id)
               .then((data) => {
                toast.success("Book Approved Successfully", {
                  position: toast.POSITION.TOP_CENTER,
                });
                props.history.push('/contribution');
               })
               .catch((err) => {
                 console.log(err);
               });
             }} style={{backgroundColor:"green",color:"white"}}>Approve</Button>
          </Grid>
        </Grid>
        {/* {userService.isLoggedIn() && ( */}
     
        {/* )} */}
        <Divider style={{ marginTop: "50px", marginBottom: "20px" }} />
        {!chapters.length == 0 ? (
          <div>
            <Grid container>
              <Grid item xs={3} md={4}></Grid>
              <Grid item xs={6}>
                <h2>TABLE OF CONTENTS</h2>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>

            <Grid container>
              <Grid item xs={3} md={4}></Grid>
              <Grid item xs={8}>
                <Chapters chapters={chapters} />
              </Grid>
            </Grid>
          </div>
        ) : (
          <p
            style={{
              textAlign: "center",
              fontSize: "20px",
              marginTop: "40px",
            }}
          >
            <strong>This story does not have any chapters yet!</strong>
          </p>
        )}
      </div>
    </Auth>
  );
};

export default withRouter(SingleBook);

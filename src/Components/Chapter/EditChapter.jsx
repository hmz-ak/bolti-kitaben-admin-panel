import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import ImageInput from "../ImageInput/ImageInput";
import { toast } from "react-toastify";
import chapterService from "../services/ChapterService";
import Auth from "../Auth/Auth";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const AddChapter = (props) => {
  const chapter_id = props.match.params.id;

  const [chapter, setChapter] = useState([]);
  const [title, setTitle] = useState("");
  const [titleUrdu, setTitleUrdu] = useState("");
  const [tags, setTags] = React.useState([]);

  const [audio, setAudio] = useState(null);

  const id = props.match.params.id;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  useEffect(() => {
    chapterService
      .getSingleChapter(chapter_id)
      .then((data) => {
        setChapter(data);
        setTitle(data.title);
        setTitleUrdu(data.titleUrdu);
        setTags([...data.tags]);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Auth>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            <Grid align={isMobile ? "center" : "left"} container>
              <Grid item xs={12} lg={6}>
                <TextField
                  style={isMobile ? { width: "100%" } : {}}
                  required
                  id="standard-required"
                  label="Chapter Title English"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  style={isMobile ? { width: "100%" } : {}}
                  required
                  id="standard-required"
                  label="Chapter Title Urdu"
                  value={titleUrdu}
                  onChange={(e) => setTitleUrdu(e.target.value)}
                />
              </Grid>
              <Grid style={{ marginTop: 20 }} item xs={12}>
                <ReactTagInput
                  tags={tags}
                  placeholder="Type keyword and press enter"
                  onChange={(newTags) => setTags(newTags)}
                />
              </Grid>

              <Grid item xs={12}>
                <ImageInput
                  inputType={"AUDIO"}

                  nameAttr={"ChapterAudio"}
                  idAttr={"chapter-audio"}
                  uploadText={"mp3"}
                  
                  getter={audio}
                  setter={(e) => setAudio(e.target.files[0])}
                  helperText={", size limit: 100 mb"}
                />
              </Grid>
              <Grid align="center" item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ width: "30%", marginTop: 30 }}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    handleToggle();
                    const formData = new FormData();
                    formData.append("book_id", id);
                    formData.append("title", title);
                  
                    formData.append("titleUrdu", titleUrdu);
                    formData.append("audio", audio);

                    for (var i = 0; i < tags.length; i++) {
                        formData.append("tags[]", tags[i]);
                      }
                    chapterService
                      .updateChapter(chapter_id,formData, config)
                      .then((res) => {
                        console.log(res);
                        handleClose();
                        toast.success("Chapter Updated Successfully", {
                          position: toast.POSITION.TOP_CENTER,
                        });
                       
                      })
                      .catch((err) => {
                        handleClose();
                        toast.error(err?.response.data, {
                          position: toast.POSITION.TOP_CENTER,
                        });
                      });
                  }}
                >
                  Update Chapter
                </Button>
                <Backdrop
                  className={classes.backdrop}
                  open={open}
                  onClick={handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Auth>
  );
};

export default withRouter(AddChapter);

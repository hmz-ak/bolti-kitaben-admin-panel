import {
  Container,
  Grid,
  InputLabel,
  Typography,
  Button,
} from "@material-ui/core";

import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { withRouter } from "react-router-dom";
import Auth from "../Auth/Auth";
import bookService from "../services/BookService";
import chapterService from "../services/ChapterService";
import { toast } from "react-toastify";

const SingleChapter = (props) => {
  const chapter_id = props.match.params.id;

  const [chapter, setChapter] = useState(null);
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    chapterService
      .getSingleChapter(chapter_id)
      .then((data) => {
        setChapter(data);

        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (chapter != null) {
      bookService
        .getSingleBook(chapter.book_id)
        .then((data) => {
          setBookData(data);

          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [chapter]);

  return (
    <Auth>
      <Container align="center" maxWidth="md">
        <Grid container>
          <Grid style={{ marginBottom: 50 }} item xs={12} align="center">
            {!chapter?.approved && (
              <Button
                onClick={() => {
                  chapterService
                    .approveChapter(chapter._id)
                    .then((data) => {
                      toast.success("Chapter Approved Successfully", {
                        position: toast.POSITION.TOP_CENTER,
                      });
                      props.history.push("/unapproved_chapters");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
                style={{ backgroundColor: "green", color: "white" }}
              >
                Approve
              </Button>
            )}
          </Grid>
          <Grid item xs={4}>
            <Typography>
              Book Name: <strong>{bookData?.title}</strong>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              Author: <strong>{bookData?.author}</strong>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              Contributor: <strong>{bookData?.contributor}</strong>
            </Typography>
          </Grid>
          <Grid style={{ marginTop: 30 }} item xs={4}>
            <Typography>
              Narrator: <strong>{bookData?.narrator}</strong>
            </Typography>
          </Grid>
          <Grid style={{ marginTop: 30 }} item xs={4}>
            <Typography>
              Chapter Name: <strong>{chapter?.title}</strong>
            </Typography>
          </Grid>

          <Grid style={{ marginTop: 100 }} item xs={12}>
            <InputLabel style={{ marginBottom: 10 }}>Chapter Audio</InputLabel>

            <ReactAudioPlayer
              src={`/audios/${chapter?.audio}`}
              autoPlay={false}
              controls
            />
          </Grid>
        </Grid>
      </Container>
    </Auth>
  );
};

export default withRouter(SingleChapter);

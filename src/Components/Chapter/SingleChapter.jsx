import { Container, Grid, InputLabel, Typography } from "@material-ui/core";

import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { withRouter } from "react-router-dom";
import Auth from "../Auth/Auth";
import chapterService from "../services/ChapterService";

const SingleChapter = (props) => {
  const chapter_id = props.match.params.id;

  const [chapter, setChapter] = useState([]);

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
  return (
    <Auth>
      <Container align="center" maxWidth="md">
        <Grid container>
          <Grid item xs={6}>
            <InputLabel>Chapter Name</InputLabel>
            <Typography>{chapter.title}</Typography>
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Chapter Name Urdu</InputLabel>

            <Typography>{chapter.titleUrdu}</Typography>
          </Grid>
          <Grid style={{ marginTop: 100 }} item xs={12}>
            <InputLabel style={{ marginBottom: 10 }}>Chapter Audio</InputLabel>

            <ReactAudioPlayer
              src={`http://localhost:4000/audios/${chapter.audio}`}
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

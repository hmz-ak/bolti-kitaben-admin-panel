import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

const AddCategory = () => {
  return (
    <div>
      <Typography align="center" variant="h3">
        ADD CATEGORY
      </Typography>
      <Container
        style={{
          marginTop: 40,
          border: "1px solid black",
          padding: 70,
          borderRadius: 50,
        }}
        maxWidth="sm"
      >
        <Grid align="center" container>
          <Grid item xs={12}>
            <TextField
              style={{ width: "70%", marginBottom: 20 }}
              id="outlined-basic"
              label="Enter Category"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{ width: "70%" }}
              size="medium"
              color="primary"
              variant="contained"
              onClick={() => {}}
            >
              Add Category
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AddCategory;

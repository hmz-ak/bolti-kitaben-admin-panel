import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import categoryService from "../services/CategoryService";
import { toast } from "react-toastify";
import { useStyles } from "./styles";

const AddCategory = () => {
  const classes = useStyles();

  const [name, setName] = useState("");
  return (
    <div>
      <Typography align="center" variant="h3">
        ADD CATEGORY
      </Typography>
      <Container className={classes.container} maxWidth="sm">
        <Grid align="center" container>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Enter Category"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{ width: "70%" }}
              size="medium"
              color="primary"
              variant="contained"
              onClick={() => {
                categoryService
                  .addCategory(name)
                  .then(() => {
                    setName("");
                    toast.success("Category added successfully!", {
                      position: toast.POSITION.TOP_CENTER,
                    });
                  })
                  .catch((err) => {
                    toast.error(err?.response.data, {
                      position: toast.POSITION.TOP_CENTER,
                    });
                  });
              }}
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

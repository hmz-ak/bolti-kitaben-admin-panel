import React from "react";
import { Grid, Paper, Button, TextField, InputLabel } from "@material-ui/core";
import { useStyles } from "./styles";
import { toast } from "react-toastify";
import categoryService from "../services/CategoryService";

const CategoryCard = ({ name, setName, categoryText, service }) => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root} elevation={3}>
        <Grid style={{ padding: 30, paddingTop: 0 }} align="center" container>
          <Grid item xs={12}>
            <h3>{categoryText}</h3>
          </Grid>
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
                service();
              }}
            >
              Add Category
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CategoryCard;

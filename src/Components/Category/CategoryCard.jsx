import React from "react";
import {
  Grid,
  Paper,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
} from "@material-ui/core";
import { useStyles } from "./styles";
import { toast } from "react-toastify";
import categoryService from "../services/CategoryService";
import Auth from "../Auth/Auth";

const CategoryCard = ({
  name,
  setName,
  categoryText,
  service,
  parentCategories,
  state,
  setState,
}) => {
  const classes = useStyles();

  return (
    <Auth>
      <div>
        <Paper className={classes.root} elevation={3}>
          <Grid style={{ padding: 30, paddingTop: 0 }} align="center" container>
            <Grid item xs={12}>
              <h3>{categoryText}</h3>
            </Grid>
            {parentCategories && (
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-native-simple">
                    Parent Category
                  </InputLabel>
                  <Select
                    native
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option aria-label="None" value="" />
                    {parentCategories.map((item) => {
                      return <option value={item.name}>{item.name}</option>;
                    })}
                  </Select>
                </FormControl>
              </Grid>
            )}
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
    </Auth>
  );
};

export default CategoryCard;

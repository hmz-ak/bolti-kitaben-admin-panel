import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  InputLabel,
} from "@material-ui/core";
import React, { useState } from "react";
import categoryService from "../services/CategoryService";
import { toast } from "react-toastify";
import { useStyles } from "./styles";
import CategoryCard from "./CategoryCard";
import subCategoryService from "../services/SubCategoryService";
import genreService from "../services/GenreService";

const AddCategory = () => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");

  const AddCategory = () => {
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
  };

  const AddSubCategory = () => {
    subCategoryService
      .addSubCategory(name2)
      .then(() => {
        setName2("");
        toast.success("Sub Category added successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        toast.error(err?.response.data, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  const AddGenre = () => {
    genreService
      .addGenre(name3)
      .then(() => {
        setName3("");
        toast.success("Genre added successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        toast.error(err?.response.data, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <div>
      <Typography align="center" variant="h3">
        ADD CATEGORY
      </Typography>
      <Container className={classes.container} maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <CategoryCard
              name={name}
              setName={setName}
              categoryText={"Parent Caregory"}
              service={AddCategory}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CategoryCard
              name={name2}
              setName={setName2}
              categoryText={"Child Caregory"}
              service={AddSubCategory}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CategoryCard
              name={name3}
              setName={setName3}
              categoryText={"Genre"}
              service={AddGenre}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AddCategory;

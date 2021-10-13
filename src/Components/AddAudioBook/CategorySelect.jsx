import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { useEffect } from "react";
import categoryService from "../services/CategoryService";
import genreService from "../services/GenreService";
import Auth from "../Auth/Auth";
const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({ genre, setGenre }) {
  const classes = useStyles();
  const theme = useTheme();
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    genreService
      .getGenre()
      .then((data) => {
        setCategoryData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // const handleChangeMultiple = (event) => {
  //   const { options } = event.target;
  //   const value = [];
  //   for (let i = 0, l = options.length; i < l; i += 1) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  //   setPersonName(value);
  // };

  return (
    <Auth>
      <div>
        <FormControl style={{ width: "60%" }} className={classes.formControl}>
          <InputLabel id="demo-mutiple-chip-label">
            select genres/level 3
          </InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={genre}
            onChange={setGenre}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {categoryData?.map((name, index) => (
              <MenuItem
                key={index}
                value={name.name}
                style={getStyles(name, genre, theme)}
              >
                {name.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Auth>
  );
}

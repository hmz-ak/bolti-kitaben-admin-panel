import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  AssignmentInd,
  AddBox,
  Home,
  Store,
  Category,
} from "@material-ui/icons";

import React from "react";
import { withRouter } from "react-router-dom";

const ListComponent = (props) => {
  return (
    <List>
      <ListItem button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentInd />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
      <ListItem onClick={() => props.history.push("/categories")} button>
        <ListItemIcon>
          <Category />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItem>
      <Divider />
      <ListItem onClick={() => props.history.push("/addAudioBook")} button>
        <ListItemIcon>
          <AddBox />
        </ListItemIcon>
        <ListItemText primary="Add Audio Book" />
      </ListItem>
      <ListItem onClick={() => props.history.push("/addCategory")} button>
        <ListItemIcon>
          <Category />
        </ListItemIcon>
        <ListItemText primary="Add Category" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <Store />
        </ListItemIcon>
        <ListItemText primary="Edit Audio Book" />
      </ListItem>
    </List>
  );
};

export default withRouter(ListComponent);

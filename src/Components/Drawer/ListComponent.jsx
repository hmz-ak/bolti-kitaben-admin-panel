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

const ListComponent = () => {
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
      <ListItem button>
        <ListItemIcon>
          <Category />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <AddBox />
        </ListItemIcon>
        <ListItemText primary="Add Audio Book" />
      </ListItem>
      <ListItem button>
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

export default ListComponent;

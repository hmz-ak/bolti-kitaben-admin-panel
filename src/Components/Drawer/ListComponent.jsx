import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  AssignmentInd,
  Pages,
  AddBox,
  Home,
  Store,
  Category,
  MenuBook,
} from "@material-ui/icons";
import ExitToApp from "@material-ui/icons/ExitToApp";

import React from "react";
import { withRouter } from "react-router-dom";

const ListComponent = (props) => {
  return (
    <List>
      {/* <ListItem button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem> */}
      <ListItem onClick={() => props.history.push("/users")} button>
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
      <ListItem onClick={() => props.history.push("/books")} button>
        <ListItemIcon>
          <MenuBook />
        </ListItemIcon>
        <ListItemText primary="Edit Audio Books" />
      </ListItem>
      <ListItem onClick={() => props.history.push("/chapters")} button>
        <ListItemIcon>
          <Pages />
        </ListItemIcon>
        <ListItemText primary="View Audio Books" />
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
      <ListItem onClick={() => props.history.push("/contribution")} button>
        <ListItemIcon>
          <Store />
        </ListItemIcon>
        <ListItemText primary="Unapproved Books" />
      </ListItem>
      <ListItem
        onClick={() => props.history.push("/unapproved_chapters")}
        button
      >
        <ListItemIcon>
          <Store />
        </ListItemIcon>
        <ListItemText primary="Unapproved Chapters" />
      </ListItem>
      <ListItem
        onClick={() => {
          localStorage.removeItem("token");
          props.history.push("/login");
        }}
        button
      >
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
};

export default withRouter(ListComponent);

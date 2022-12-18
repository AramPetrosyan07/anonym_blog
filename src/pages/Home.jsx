import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  fetchTags,
  sortPopular,
  newItems,
} from "../redux/slices/posts";
import GridComponent from "./GridComponent";

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const popular = () => {
    console.log("~~~~~~~");
    dispatch(sortPopular());
  };

  const newItem = () => {
    dispatch(fetchPosts());
  };

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Новые" onClick={newItem} />
        <Tab value="two" label="Популярные" onClick={popular} />
      </Tabs>
      <GridComponent />
    </>
  );
};

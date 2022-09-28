import React from "react";
import { CircularProgress } from "@mui/material";
import styles from './loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <CircularProgress color="inherit"/>
    </div>
  );
};

export default Loading;

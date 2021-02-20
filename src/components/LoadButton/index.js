import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';

export default function LoadButton({ isFetching, onLoadMore, children, isEnd }) {
  const spinner = useRef();
  const button = useRef();
  const wrapper = useRef();

  const toggleDisplayingdElement = () => {
    if (!isFetching) {
      spinner.current.className = styles.hidden;
      button.current.className = styles.button;
    } else {
      spinner.current.className = styles.spinner;
      button.current.className = styles.hidden;
    }
  }

  useEffect(() => {
    toggleDisplayingdElement();
  }, [isFetching]);

  useEffect(() => {
    if (isEnd) {
      wrapper.current.className = styles.hidden;
    } else {
      wrapper.current.className = styles.wrapper;
    }
  }, [isEnd])

  return (
    <div className={styles.wrapper} ref={wrapper}>
      <div className={styles.spinner} ref={spinner}></div>
      <button className={styles.button} ref={button} onClick={onLoadMore}>{children}</button>
    </div>
  )
}
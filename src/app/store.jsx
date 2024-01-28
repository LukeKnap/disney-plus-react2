import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import movieReducer from '../features/movie/movieSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
  },
});

const originalDispatch = store.dispatch;

store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action)
  let result = originalDispatch(action)
  console.log('next state', store.getState())
  return result
}

export default store;



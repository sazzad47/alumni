import { Reducer } from "react";
import { GlobalAction } from "./actions";
import { GlobalProps } from "./props";
import { GlobalTypes } from "./types";

const sidebarReducer: Reducer<GlobalProps, GlobalAction> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GlobalTypes.NOTIFY:
      return {
        ...state,
        notify: {
          ...state.notify,
          ...payload,
        },
      };
    case GlobalTypes.LOADING:
      return {
        ...state,
        loading: payload,
      };
    case GlobalTypes.REGISTER:
      return {
        ...state,
        register: {
          ...state.register,
          [payload.name]: payload.value,
        },
      };
    case GlobalTypes.AUTH:
      return {
        ...state,
        auth: {
          ...payload,
        },
      };
    case GlobalTypes.SEARCH:
      return {
        ...state,
        searchTerm: payload,
      };
    case GlobalTypes.NEWS_PAGE:
      return {
        ...state,
        news: {
          ...state.news,
          ...payload,
        },
      };
    case GlobalTypes.NOTICE_PAGE:
      return {
        ...state,
        notice: {
          ...state.notice,
          ...payload,
        },
      };
    case GlobalTypes.EVENT_PAGE:
      return {
        ...state,
        event: {
          ...state.event,
          past: {
            ...state.event.past,
            ...payload,
          },
          upcoming: {
            ...state.event.upcoming,
            ...payload,
          },
        },
      };
    default:
      return state;
  }
};

export default sidebarReducer;

import { call, put, takeLatest } from "redux-saga/effects";
import Cookies from "js-cookie";
import axios from "axios";
import config from "../config/default";
import socket from '../common/socket';

function* fetchMessages(action) {
  try {
    yield put({ type: "FETCH_MESSAGES_INIT"});
    if(action.term) {
      const url = config.api.message.list;
      const messages = yield call(
        axios.get,
        url,
        {
          params: {
            keyword: action.term,
          }
        }
      );
      let sessionId = Cookies.get('sessionId')
      socket.emit('start_message_stream', {sessionId, keyword: action.term})
      yield put({ type: "FETCH_MESSAGES_SUCCEEDED", messages: messages.data.result });
    } else {
      yield put({ type: "FETCH_MESSAGES_SUCCEEDED", messages: [] });
    }
  } catch (e) {
    console.log(e)
    yield put({ type: "FETCH_MESSAGES_FAILED", error: e });
  }
}

function* fetchNewMessages(action) {
  try {
    yield put({ type: "FETCH_NEW_MESSAGES_INIT"});
    if(action.term) {
      const url = config.api.message.newMessages;
      const messages = yield call(
        axios.get,
        url,
        {
          params: {
            keyword: action.term
          }
        }
      );
      yield put({ type: "FETCH_NEW_MESSAGES_SUCCEEDED", messages: messages.data.result });
    } else {
      yield put({ type: "FETCH_NEW_MESSAGES_SUCCEEDED", messages: [] });
    }
  } catch (e) {
    console.log(e);
    yield put({ type: "FETCH_NEW_MESSAGES_FAILED", error: e });
  }
}

function* setNewMessageCount(action) {
  yield put({ type: "SET_NEW_MESSAGE_COUNT", count: action.count});
}

export function* layout() {
  yield takeLatest("FETCH_MESSAGES", fetchMessages);
  yield takeLatest("FETCH_NEW_MESSAGES", fetchNewMessages);
  yield takeLatest("NEW_MESSAGE_COUNT", setNewMessageCount);
}

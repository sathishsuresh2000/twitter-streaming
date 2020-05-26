const InitialState = {
  list: [],
  loading: false,
  newMessageCount: 0,
  error: ''
}
export default (state = InitialState, action) => {
  switch (action.type) {
    case 'FETCH_MESSAGES_INIT':
      return {
        ...state, loading: true
      }
    case 'FETCH_MESSAGES_SUCCEEDED':
      return {
        ...state, list: action.messages, error: '', loading: false
      }
    case 'FETCH_MESSAGES_FAILED':
      return {
        ...state, error: action.error, list: [], loading: false
      }
    case 'FETCH_NEW_MESSAGES_INIT':
      return {
        ...state, loading: true
      }
    case 'FETCH_NEW_MESSAGES_SUCCEEDED':
      return {
        ...state, list: [...action.messages, ...state.list], error: '', loading: false, newMessageCount: 0
      }
    case 'FETCH_NEW_MESSAGES_FAILED':
      return {
        ...state, error: action.error, list: [], loading: false
      }
    case 'SET_NEW_MESSAGE_COUNT':
      return {
        ...state, newMessageCount: action.count
      }
    default:
      return state
  }
}

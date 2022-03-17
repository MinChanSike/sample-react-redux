/*
    https://redux.js.org/understanding/history-and-design/middleware
*/

const sampleMiddleware = store => next => action => {
    console.log('=> sampleMiddleware.dispatching', action)
    console.log('=> sampleMiddleware.state(before action)', store.getState())
    let result = next(action);
    console.log('=> sampleMiddleware.state(after action)', store.getState())
    return result
}
export default sampleMiddleware;
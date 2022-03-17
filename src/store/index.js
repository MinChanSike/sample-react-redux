import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import rootEpic from './epics';
import rootReducer from './slices/rootReducer';
import sampleMiddleware from './middlewares/sampleMiddleware';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [epicMiddleware, sampleMiddleware]
});

epicMiddleware.run(rootEpic);

export default store;
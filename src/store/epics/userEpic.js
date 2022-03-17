import 'rxjs-compat';
import { ajax } from 'rxjs/ajax'
import { mergeMap, map, catchError, retryWhen } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { fetchUser, fetchSuccess, fetchFailed } from '../slices/userSlice'
import { handleError, defaultRetryStrategy } from './helper'

export const getUsers = action$ =>
    action$.pipe(ofType(fetchUser.type),
        mergeMap(action =>
            ajax.getJSON("https://jsonplaceholder.typicode.com/users")
                .pipe(map(res => fetchSuccess(res)),
                    retryWhen(defaultRetryStrategy),
                    catchError(ex => {
                        console.error("GetUsers ERROR\n", ex);
                        return handleError(ex, fetchFailed.type);
                    }))
        )
    )


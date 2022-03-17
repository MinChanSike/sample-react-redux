import { of, Observable } from "rxjs";

export const defaultRetryStrategy = attempts => attempts
    .zip(Observable.range(1, 4))
    .flatMap(([error, i]) => {
        if (i > 3 || error.status !== 0) {
            return Observable.throw(error)
        }
        return Observable.timer(i * 1000)
    })

export function handleError(response, type, responseMessage = null) {
    let _message = "";
    let _isAuthenticationError = false;
    if (responseMessage === null || responseMessage === undefined) {
        if (response.status === 401) {
            _isAuthenticationError = true;
        } else {
            _isAuthenticationError = false;
        }

        _message = defaultHandle(response);
        if (_message === undefined) {
            _message = "<h4><b>Unknown Error occured!</b></h4>";
        }
    } else {
        _message = responseMessage(response);
    }

    if (_isAuthenticationError) {
        return of({
            type: "AUTHENTICATION_ERROR",
            message: "Unauthorized Access"
        }, {
            type: type,
            message: _message
        });
    } else {
        return of({
            type: type,
            message: _message
        });
    }
}

export default function (response, type, responseMessage = null) {
    let _message = "";
    let _isSpecialError = false;
    if (responseMessage === null || responseMessage === undefined) {
        if (response.status === 401) {
            _isSpecialError = true;
            _message = "";
        } else {
            _message = defaultHandle(response);
            if (_message === undefined) {
                _message = "Server Unavailable now!";
            }
            _isSpecialError = false;
        }
    } else {
        _message = responseMessage(response);
    }

    return of({
        type: type,
        isSpecialError: _isSpecialError,
        message: _message
    });
}

function defaultHandle(response) {
    var dictionary = {};
    dictionary[0] = "<h4><b> Network Connection Error!</b></h4> Please check the back-end servers are running or not.";
    dictionary[400] = "<h4><b> 400 Bad Request! </b></h4>";
    dictionary[401] = "<h4><b>401 Unauthorized: Access is denied due to invalid credentials.</b></h4> You do not have permission to view this directory or page using credentials that you supplied.";
    dictionary[403] = "<h4><b> 403 Forbidden! </b></h4> You do not have permission to access the resource you requested.";
    dictionary[403.2] = "<h4><b> Read access forbidden! </b></h4> You do not have permission to access the resource you requested.";
    dictionary[403.3] = "<h4><b> Write access forbidden! </b></h4> You do not have permission to access the resource you requested.";
    dictionary[403.4] = "<h4><b> SSL required! </b></h4> You do not have permission to access the resource you requested.";
    dictionary[403.8] = "<h4><b> Site access denied! </b></h4> You do not have permission to access the resource you requested.";
    dictionary[403.9] = "<h4><b> Too many users! </b></h4> You do not have permission to access the resource you requested.";
    dictionary[403.502] = "<h4><b> Too many requests from the same client IP; Dynamic IP Restriction limit reached! </b></h4> You do not have permission to access the resource you requested.";
    dictionary[404] = "<h4><b> 404 Not Found! </b></h4> The requested URL or resource was not found on this server.";
    dictionary[408] = "<h4><b> HTTP Request Timeout! </b></h4> This request takes too long to process, it is timed out by the server.";
    dictionary[413] = "<h4><b> Payload Too Large! </b></h4> The request is larger than the server is willing or able to process.That's all we know.";
    dictionary[415] = "<h4><b> Unsupported Media Type! </b></h4> The server refused this request because the request entity is in a format not supported by the requested resource for the requested method.";
    dictionary[429] = "<h4><b> Too many Requests ! </b></h4> The user has sent too many requests in a given amount of time";
    dictionary[500] = "<h4><b> Internal Server Error! </b></h4> There is a problem with the resource you are looking for, and it cannot be displayed.";
    dictionary[501] = "<h4><b> Not Implemented Error! </b></h4> The server is unable to process your request.";
    dictionary[502] = "<h4><b> Bad Gateway! </b></h4> The server was acting as a gateway or proxy and received an invalid response from the upstream server";
    dictionary[502.3] = "<h4><b> Bad Gateway! </b></h4> The operation timed out. The server was acting as a gateway or proxy and received an invalid response from the upstream server";
    dictionary[503] = "<h4><b> Service Unavailable! </b></h4> The server is temporarily unable to service your request due to maintenance downtime or capacity problems. Please try again later.";
    dictionary[504] = "<h4><b> Gateway Timeout! </b></h4> The server encountered a temporary error and could not complete your request. Please try again later.";
    dictionary[505] = "<h4><b> HTTP Version Not Supported Error! </b></h4> The server does not support the HTTP protocol version used in the request.";
    dictionary[520] = "<h4><b> Unknown Error!</b></h4> There is uncaught error occured.That's all we know.";
    dictionary[521] = "<h4><b> Web Server Is Down! </b></h4> The origin server has refused the connection from Cloud or local server.";
    dictionary[522] = "<h4><b> Connection Timed Out! </b></h4> Cloud or Local server could not negotiate a TCP handshake with the origin server.";
    if (response.response === null || response.response === undefined || response.response === "") {
        return dictionary[response.status];
    }
    return response.response.Message;
}
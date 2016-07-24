'use strict';

import util from "util";


// create the new instance of the AppError object, ensureing that it properly
// extends from the Error class.
export function  createCustomError( settings ) {

    // NOTE: We are overriding the "implementationContext" so that the createAppError()
    // function is not part of the resulting stacktrace.
   var e = new CustomError (settings, createCustomError );
    console.log(e.stack)
    return e;

}



function CustomError( settings, implementationContext ) {

    Error.call(this)
    // Ensure that settings exists to prevent refernce errors.
    settings = ( settings || {} );
    this.type = ( settings.type || "Application" );
    this.message = ( settings.message || "An error occurred." );
    this.details = ( settings.details || "" );
    this.status = ( settings.status || "" );
    this.errorCode = ( settings.errorCode || "" );

    // This is just a flag that will indicate if the error is a custom AppError. If this
    // is not an AppError, this property will be undefined, which is a Falsey.
    this.isAppError = true;

    // Capture the current stacktrace and store it in the property "this.stack". By
    // providing the implementationContext argument, we will remove the current
    // constructor (or the optional factory function) line-item from the stacktrace; this
    // is good because it will reduce the implementation noise in the stack property.
    // --
    // Rad More: https://code.google.com/p/v8-wiki/wiki/JavaScriptStackTraceApi#Stack_trace_collection_for_custom_exceptions
    Error.captureStackTrace( this, ( implementationContext || CustomError ) );

}

util.inherits( CustomError, Error );
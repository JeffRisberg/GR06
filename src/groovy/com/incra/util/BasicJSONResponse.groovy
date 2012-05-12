package com.incra.util

import grails.converters.JSON

/**
 * Wrapper for a JSON message that includes data and pagination information.
 *
 * @author Jeff Risberg
 * @since 04/30/12
 */
class BasicJSONResponse {
    boolean success
    String message
    long total
    List data

    JSON toJSON() {
        def result = [:] as Map<String, Object>
        result.put('success', success)
        result.put('total', total)

        if (message)
            result.put('message', message)

        if (data) {
            result.put('data', data)
            if (total == 0)
                result.put('total', data.size())
        }

        result as JSON
    }
}

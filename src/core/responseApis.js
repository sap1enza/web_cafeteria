class ResponseAPI
{

    static list = (item) => {
        return {
            'totals' : item.length,
            'results' : item 
        }
    }

    static data = (item) => {
        return item
    }


    static success = (message) => {
        return {'message' : [message]}
    }

    static internalError = (message) => {
        return {
            'message' : {
                'non_field_error' : [message]
            }
        }
    }
}

export default ResponseAPI;
export const SuccessStatusCodes = {
    Success : 200,
    ResourceCreated : 201 , 
    SuccessNoResponse : 202 ,
    NoContent : 204
};

export const ClientErrorStatusCodes={
    BadRequest : 400 , 
    Unathorized : 401 ,
    ResourceNotFound : 404 ,
    Conflicts : 409 , 
    FailedValidation : 422
};

export const ServerErrors={
    InternalServerError : 500 , 
    NoServerResponse : 504  
};
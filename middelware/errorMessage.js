exports.validate = ((schema) => {
    return ((req, res, next)=> {
        const { error } = schema.validate(req.body, { abortEarly: false })   
        if(error) res.send(error)
        next()
    })
})
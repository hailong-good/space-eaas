function paramsToSql(params = {}) {
    const sqlArr = []
    Object.keys(params).forEach((key) => {
        if (!params[key] && params[key] !== 0) {
            delete params[key];
        } else {
            sqlArr.push(`${key} = '${params[key]}'`)
        }
    })
    return sqlArr.join(' , ')
}


module.exports = { paramsToSql };

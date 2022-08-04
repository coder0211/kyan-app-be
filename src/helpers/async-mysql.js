const asyncQuery = async (db, sqlQuery, value) => {
    if (value) {
        return new Promise((resolve, reject) => {
            db.query(sqlQuery, value, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            db.query(sqlQuery, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
};

module.exports = asyncQuery;

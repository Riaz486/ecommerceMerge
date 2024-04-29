class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }

    // this function use for search only for name field
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                // $regex and $option are mongoDB property
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } : {}

        this.query = this.query.find({ ...keyword });
        // here return ApiFeature whole class
        return this

    }

    // this function use for filter

    filter() {
        const queryCopy = { ...this.queryStr }

        // Removing some Field for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(key => delete queryCopy[key]);

        // Filter For Price and Rating
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)
        this.query = this.query.find(JSON.parse(queryStr))
        return this

    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }

}
module.exports = ApiFeatures;
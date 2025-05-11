export class ApiFeature {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  
  // Clone the query to prevent multiple executions
  clone() {
    return this.mongooseQuery.clone();
  }

  pagination(totalDocs) {
    let page = this.queryString.page * 1 || 1;
    if (page < 1) page = 1;
    let limit = this.queryString.limit * 1 || 5;
    let skip = (page - 1) * limit;

    const pagination = {};
    pagination.page = page;
    pagination.limit = limit;
    pagination.numOfPages = Math.ceil(totalDocs / limit);
    pagination.totalDocs = totalDocs;

    if (page < pagination.numOfPages) pagination.nextPage = page + 1;
    if (page > 1) pagination.prevPage = page - 1;

    this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }
  filter() {
    let exludeQuery = ["page", "sort", "search", "select", "limit"];
    let filterQuery = { ...this.queryString }; //deep copy
    exludeQuery.forEach((e) => delete filterQuery[e]);
    filterQuery = JSON.parse(
      JSON.stringify(filterQuery).replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      )
    );
    this.mongooseQuery.find(filterQuery);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      this.mongooseQuery.sort(this.queryString.sort.replaceAll(",", " "));
    } else {
      this.mongooseQuery.select("-createdAt");
    }
    return this;
  }
  select() {
    if (this.queryString.select) {
      this.mongooseQuery.select(this.queryString.select.replaceAll(",", " "));
    }
    return this;
  }
  search(modelName) {
    if (this.queryString.search) {
      const query = {};
      if (modelName === "product") {
        query.$or = [
          { title: { $regex: this.queryString.search, $options: "i" } },
          { description: { $regex: this.queryString.search, $options: "i" } },
        ];
      } else {
        query.$or = [
          { name: { $regex: this.queryString.search, $options: "i" } },
        ];
      }

      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }
}

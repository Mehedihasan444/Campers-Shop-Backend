"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
class QueryBuilder {
    constructor(modelQuery, query) {
        this.query = query;
        this.modelQuery = modelQuery;
    }
    search(searchableFields) {
        var _a;
        let searchTerm = "";
        if ((_a = this.query) === null || _a === void 0 ? void 0 : _a.searchTerm) {
            searchTerm = this.query.searchTerm;
        }
        this.modelQuery = this.modelQuery.find({
            $or: searchableFields.map((field) => ({
                [field]: new RegExp(searchTerm, "i"),
            })),
        });
        return this;
    }
    paginate() {
        var _a, _b, _c;
        let limit = Number(((_a = this.query) === null || _a === void 0 ? void 0 : _a.limit) || 10);
        let skip = 0;
        if ((_b = this.query) === null || _b === void 0 ? void 0 : _b.page) {
            const page = Number(((_c = this.query) === null || _c === void 0 ? void 0 : _c.page) || 1);
            skip = Number((page - 1) * limit);
        }
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    sort() {
        var _a;
        let sortBy = "-createdAt";
        if ((_a = this.query) === null || _a === void 0 ? void 0 : _a.sortBy) {
            sortBy = this.query.sortBy;
        }
        this.modelQuery = this.modelQuery.sort(sortBy);
        return this;
    }
    fields() {
        var _a, _b;
        let fields = "";
        if ((_a = this.query) === null || _a === void 0 ? void 0 : _a.fields) {
            fields = ((_b = this.query) === null || _b === void 0 ? void 0 : _b.fields).split(",").join(" ");
        }
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludeFields = ["searchTerm", "page", "limit", "sortBy", "fields"];
        excludeFields.forEach((e) => delete queryObj[e]);
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
}
exports.QueryBuilder = QueryBuilder;
// import { FilterQuery, Query } from "mongoose";
// class QueryBuilder<T> {
//   public modelQuery: Query<T[], T>;
//   public query: Record<string, unknown>;
//   constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
//     this.modelQuery = modelQuery;
//     this.query = query;
//   }
//   search(searchableFields: string[]) {
//     const searchTerm = this?.query?.searchTerm;
//     if (searchTerm) {
//       this.modelQuery = this.modelQuery.find({
//         $or: searchableFields.map(
//           (field) =>
//             ({
//               [field]: { $regex: searchTerm, $options: "i" },
//             } as FilterQuery<T>)
//         ),
//       });
//     }
//     return this;
//   }
//   paginate() {
//     const page = Number(this?.query?.page) || 1;
//     const limit = Number(this?.query?.limit) || 10;
//     const skip = (page - 1) * limit;
//     this.modelQuery = this.modelQuery.skip(skip).limit(limit);
//     return this;
//   }
//   sort() {
//     const sort = this?.query?.sort as string;
//     const sortDirection = (this?.query?.sort as "asc" | "desc") || "asc";
//     if (sort) {
//       this.modelQuery = this.modelQuery.sort({ price: sortDirection });
//     }
//     return this;
//   }
//   fields() {
//     let fields = "";
//     if (this.query?.fields) {
//       fields = (this.query?.fields as string).split(",").join(" ");
//     }
//     this.modelQuery = this.modelQuery.select(fields);
//     return this;
//   }
//   filter() {
//     const queryObj = { ...this.query };
//     // Filtering
//     const excludeFields = ["searchTerm", "sort", "limit", "page"];
//     excludeFields.forEach((el) => delete queryObj[el]);
//     if (queryObj.minPrice && queryObj.maxPrice) {
//       this.modelQuery = this.modelQuery.find({
//         price: { $gte: queryObj.minPrice, $lte: queryObj.maxPrice },
//       });
//     } else {
//       this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
//     }
//     return this;
//   }
// }
// export default QueryBuilder;

/* eslint-disable prefer-const */
import { FilterQuery, Query } from "mongoose";

export class QueryBuilder<T> {
  public query: Record<string, unknown>; //payload
  public modelQuery: Query<T[], T>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.query = query;
    this.modelQuery = modelQuery;
  }
  search(searchableFields: string[]) {
    let searchTerm = "";

    if (this.query?.searchTerm) {
      searchTerm = this.query.searchTerm as string;
    }
    this.modelQuery = this.modelQuery.find({
      $or: searchableFields.map(
        (field) =>
          ({
            [field]: new RegExp(searchTerm, "i"),
          } as FilterQuery<T>)
      ),
    });
    return this;
  }
  paginate() {
    let limit: number = Number(this.query?.limit || 10);

    let skip: number = 0;

    if (this.query?.page) {
      const page: number = Number(this.query?.page || 1);
      skip = Number((page - 1) * limit);
    }

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }
  sort() {
    let sortBy = "-createdAt";
    if (this.query?.sortBy) {
      sortBy = this.query.sortBy as string;
    }

    this.modelQuery = this.modelQuery.sort(sortBy);
    return this;
  }
  fields() {
    let fields = "";

    if (this.query?.fields) {
      fields = (this.query?.fields as string).split(",").join(" ");
    }

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ["searchTerm", "page", "limit", "sortBy", "fields"];

    excludeFields.forEach((e) => delete queryObj[e]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }
}
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

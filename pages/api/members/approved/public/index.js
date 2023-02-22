import connectDB from "../../../../../utils/connectDB";
import Users from "../../../../../models/userModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getMembers(req, res);
      break;
  }
};

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };
    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);
    if (queryObj.search !== "all")
      this.query.find({
        "$expr": {
          "$regexMatch": {
            "input": { "$concat": ["$firstName", " ", "$lastName"] },
            "regex": queryObj.search,
            "options": "i"
          }
        }
      });
    this.query.find();
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 12;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const getMembers = async (req, res) => {
  try {
    const features = new APIfeatures(
      Users.find({
        $and: [
          { $or: [{ status: "approved" }, { uploadedByAdmin: false }] },
          { root: false },
        ],
      }, {firstName: 1, lastName: 1, avatar: 1, ssc_batch: 1, membership: 1, _id: 1, uploadedByAdmin: 1 }),
      req.query
    ).filtering().paginating();

    // const totalDocumentQuery = new APIfeatures(
    //   Users.find({
    //     $and: [
    //       { $or: [{ status: "approved" }, { uploadedByAdmin: false }] },
    //       { root: false },
    //     ],
    //   }),
    //   req.query
    // ).filtering();
    
    const data = await features.query;
    // const totalDocument = await totalDocumentQuery.query;

    
    const pageCount = Math.ceil(data.length / 12);
    const currentPage = req.query.page;
    res.status(200).json({
      data,
      pageCount,
      currentPage
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

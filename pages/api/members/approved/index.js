import connectDB from "../../../../utils/connectDB";
import Users from "../../../../models/userModel";

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
    if (queryObj.query !== "all")
      this.query.find({ firstName: queryObj.query });
    if (queryObj.id !== "")
      this.query.find({ _id: queryObj.id});
    this.query.find();
    return this;
  }
}
 const getMembers = async (req, res) => {
    try {
      
      const features = new APIfeatures(Users.find(
        {$and: [
          {status: 'approved'},
          {uploadedByAdmin: false},
          {root: false},
        ]}

        ), req.query)

      const data = await features.query;
      const total = await Users.countDocuments();
      res.status(200).json({
        data,
        total
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

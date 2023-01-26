import connectDB from "../../../../utils/connectDB";
import Users from "../../../../models/userModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getPendings(req, res);
      break;
  }
};

 const getPendings = async (req, res) => {
    try {
      // sort should look like this: { "field": "userId", "sort": "desc"}
      const { page = 1, pageSize = 20, sort = null } = req.query;
      console.log('getdata', req.query)
      // formatted sort should look like { userId: -1 }
      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortFormatted = {
          [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
        };
  
        return sortFormatted;
      };
      const sortFormatted = Boolean(sort) ? generateSort() : {};
      
      const pendingMembers = await Users.find({status: 'pending'})
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);
      const total = await Users.countDocuments();
      res.status(200).json({
        pendingMembers,
        total
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

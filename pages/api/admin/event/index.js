import connectDB from "../../../../utils/connectDB";
import Content from "../../../../models/admin/event";
import Users from "../../../../models/userModel";
import auth from "../../../../middleware/auth";
import sendEmail from "../../../../utils/mail";

connectDB();
// const pastDate = new Date('2022-12-31');
// const result = await db.collection('myCollection').find({ createdAt: { $lt: pastDate } }).toArray();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await upload(req, res);
      break;
    case "GET":
      await getContent(req, res);
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
    const excludeFields = ["page", "sort", "limit", "past"];
    excludeFields.forEach((el) => delete queryObj[el]);
    if (queryObj.search !== "all")
      this.query.find({
        $expr: {
          $regexMatch: {
            input: { $concat: ["$title", " ", "$shortDescription"] },
            regex: queryObj.search,
            options: "i",
          },
        },
      });
    this.query.find();
    return this;
  }
  sorting() {
    this.query.sort({ createdAt: -1 });
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

const upload = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid" });
    const {
      title,
      shortDescription,
      time,
      place,
      redirectionLink,
      photo,
      detailedPage,
      notify,
      recipients,
    } = req.body;
    const newContent = new Content({
      title,
      shortDescription,
      time,
      place,
      redirectionLink,
      photo,
      detailedPage,
    });

    await newContent.save();

    if (notify) {
      await Users.find({
        $and: [
          { membership: recipients === "all" ? { $ne: "all" } : recipients },
          { email: { $regex: /.*@.*/ } },
        ],
      })
        .then((users) => {
          users.forEach(async (user) => {
            if (user.email) {
              await sendEmail({
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: `[BTRI School Alumni] ${title}`,
                html: `<p> ${shortDescription} </p> 
           <a href=${`${process.env.BASE_URL}/notice/${newContent._id}`}>Read details...</a>
           `,
              });
            }
          });
        })
        .catch((err) => console.error(err));
    }

    res.json({
      msg: "Uploaded successfully!",
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export const getContent = async (req, res) => {
  try {
    const currentTime = new Date();
    const past = req.query.past === 'true';
    let timeQuery;
    if (!past) {
      timeQuery = { time: { $gt: currentTime } };
    } else {
      timeQuery = { time: { $lt: currentTime } };
    }
    const features = new APIfeatures(Content.find(timeQuery), req.query)
      .filtering()
      .paginating()
      .sorting();

    const data = await features.query;
    const pageCount = Math.ceil(data.length / 12);
    const currentPage = req.query.page;
    res.status(200).json({
      data,
      pageCount,
      currentPage,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

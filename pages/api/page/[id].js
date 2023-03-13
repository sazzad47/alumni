import connectDB from "../../../utils/connectDB";
import Page from "../../../models/page";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getPage(req, res);
      break;
    case "PATCH":
      await updatePage(req, res);
      break;
  }
};

const getPage = async (req, res) => {
  try {
    const { id } = req.query;
    const page = await Page.findById(id);
    console.log("page", page);
    res.json({ page });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updatePage = async (req, res) => {
  try {
    const id = req.query.id;
    const { title, shortDescription, keywords, photo, detailedPage } = req.body;
    await Page.findOneAndUpdate(
      { _id: id },
      { title, shortDescription, keywords, photo, detailedPage }
    );
    res.json({
      page: {
        _id: id,
        title,
        shortDescription,
        keywords,
        photo,
        detailedPage,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

import connectDB from "../../../utils/connectDB";
import Page from "../../../models/page";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createPage(req, res);
      break;
    case "GET":
      await getPages(req, res);
      break;
  }
};

const createPage = async (req, res) => {
  try {
    const { title, shortDescription, keywords, photo, detailedPage } = req.body;
    const newPage = new Page({
      title,
      shortDescription,
      keywords,
      photo,
      detailedPage,
    });
    await newPage.save();
    res.json({msg: "Page created successfully"})
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getPages = async (req, res) => {
    try {
        const pages = await Page.find();
        console.log('pages', pages)
        res.json({pages})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}
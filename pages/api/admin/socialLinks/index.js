import connectDB from "../../../../utils/connectDB";
import SocialLinks from "../../../../models/admin/socialLinks";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getContent(req, res);
      break;
    case "POST":
      await addContent(req, res);
      break;
    case "PATCH":
      await updateContent(req, res);
      break;
  }
};

const addContent = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid" });
    const { socialLinks } = req.body;
    const newContent = new SocialLinks({
      links: socialLinks,
    });
    await newContent.save();
    res.json({ msg: "Content added successfully" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getContent = async (req, res) => {
  try {
    const content = await SocialLinks.findById('63dcd7072010c10cc20e365a');
    res.json({ content: content.links });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateContent = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid" });

    const { socialLinks } = req.body;
    await SocialLinks.findOneAndUpdate(
      { _id: '63dcd7072010c10cc20e365a' },
      {
        links: socialLinks,
      }
    );
   
    res.json({
      msg: "Updated Successfully!",
      content: {
        socialLinks,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

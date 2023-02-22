import React from "react";
import { Quill } from "react-quill";
import { imageUpload } from "../utils/imageUpload";
import { videoUpload } from "../utils/videoUpload";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "Inter",
  "lucida",
];
Quill.register(Font, true);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Image handler
function imageHandler() {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files ? input.files[0] : null;

    const quillObj = this.quill;
    const range = quillObj?.getSelection();
    if (file) {
      const loader = document.getElementById("quill_file_loading");
      try {
        loader.style.display = "flex";
        // upload the image file to the server using an async function
        const media = await imageUpload([file]);

        // log the server response for debugging purposes
        console.log("file", media);

        // insert the uploaded image into the editor at the current cursor position
        quillObj.editor.insertEmbed(range.index, "image", media[0]);
        loader.style.display = "none";
      } catch (error) {
        loader.style.display = "none";
        // handle errors with the file upload or insertion
        console.error("Error uploading image:", error);
        alert("There was an error uploading the image. Please try again.");
      }
    }
  };
}

// video handler
function videoHandler() {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "video/mp4, video/x-m4v, video/*");
  input.click();

  input.onchange = async () => {
    const file = input.files ? input.files[0] : null;

    const quillObj = this.quill;
    const range = quillObj?.getSelection();
    if (file) {
      const loader = document.getElementById("quill_file_loading");
      try {
        loader.style.display = "flex";
        // upload the video file to the server using an async function
        const media = await videoUpload(file);

        // log the server response for debugging purposes
        console.log("file", media);

        // insert the uploaded video into the editor at the current cursor position
        quillObj.editor.insertEmbed(range.index, "video", media);
        loader.style.display = "none";
      } catch (error) {
        loader.style.display = "none";
        // handle errors with the file upload or insertion
        console.error("Error uploading video:", error);
        alert("There was an error uploading the video. Please try again.");
      }
    }
  };
}

// Modules object for setting up the Quill editor
export const modules = (props) => {
  return {
    toolbar: {
      container: "#" + props,
      handlers: {
        undo: undoChange,
        redo: redoChange,
        image: imageHandler,
        video: videoHandler,
      },
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
  };
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "code-block",
];

// Quill Toolbar component
export const QuillToolbar = (props) => {
  return (
    <>
      {props.toolbarId !== undefined && (
        <div id={props.toolbarId}>
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
          </span>
          <span className="ql-formats">
            <select className="ql-font">
              <option value="arial"> Arial </option>
              <option value="comic-sans">Comic Sans</option>
              <option value="courier-new">Courier New</option>
              <option value="georgia">Georgia</option>
              <option value="helvetica">Helvetica</option>
              <option value="Inter" selected>
                Inter
              </option>
              <option value="lucida">Lucida</option>
            </select>
            <select className="ql-size">
              <option value="extra-small">Extra Small</option>
              <option value="small">Small</option>
              <option value="medium" selected>
                Medium
              </option>
              <option value="large">Large</option>
            </select>
            <select className="ql-header">
              <option value="1">Heading 1</option>
              <option value="2">Heading 2</option>
              <option value="3">Heading 3</option>
              <option value="4">Heading 4</option>
              <option value="5">Heading 5</option>
              <option value="6">Heading 6</option>
              <option value="" selected>
                Normal
              </option>
            </select>
          </span>
          <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <button className="ql-indent" value="-1" />
            <button className="ql-indent" value="+1" />
          </span>
          <span className="ql-formats">
            <button className="ql-script" value="super" />
            <button className="ql-script" value="sub" />
            <button className="ql-blockquote" />
            <button className="ql-direction" />
          </span>
          <span className="ql-formats">
            <select className="ql-align" />
            <select className="ql-color" />
            <select className="ql-background" />
          </span>
          <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
            <button className="ql-video" />
          </span>
          <span className="ql-formats">
            <button className="ql-formula" />
            <button className="ql-code-block" />
            <button className="ql-clean" />
          </span>
          <span className="ql-formats">
            <button className="ql-undo">
              <CustomUndo />
            </button>
            <button className="ql-redo">
              <CustomRedo />
            </button>
          </span>
        </div>
      )}
    </>
  );
};
export default QuillToolbar;

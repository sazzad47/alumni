import React, { useRef } from "react";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Blocks } from "react-loader-spinner";

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);

const TextEditor = ({ detailedPage, setData }) => {
  const quillRef = useRef(null);

  const editorStyles = {
    backgroundColor: "lightblue",
  };

  return (
    <div>
      <div
        id="quill_file_loading"
        style={{ display: "none" }}
        className="fixed top-0 right-0 bottom-0 left-0 items-center justify-center bg-[rgb(0,0,0,0.8)]"
      >
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      </div>
      <EditorToolbar toolbarId={"t1"} />
      <QuillNoSSRWrapper
        forwardedRef={quillRef}
        theme="snow"
        value={detailedPage}
        onChange={(value) =>
          setData((prevData) => ({ ...prevData, detailedPage: value }))
        }
        placeholder={"Write something awesome..."}
        modules={modules("t1")}
        formats={formats}
        style={editorStyles}
      />
    </div>
  );
};

export default TextEditor;

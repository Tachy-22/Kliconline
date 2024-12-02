"use client";
import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const JEditor = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (contentString: string) => void;
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState(value);

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
    }),
    []
  );

  return (
    <>
      {/* {content} */}
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        //   tabIndex={1} // tabIndex of textarea
        //  onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
       
        onChange={(newContent) => {
          setContent(newContent);
          onChange(newContent);
        }}
      />
    </>
  );
};

export default JEditor;

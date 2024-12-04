// JoditEditor.tsx
"use client";
import React, { useMemo, useRef } from "react";
import dynamic from "next/dynamic";

//import JoditEditor from "jodit-react";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

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

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );
  console.log({ placeholder, value, onChange, config, editor });
  if (typeof window === "undefined") {
    return <div>Loading...</div>;
  }

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onChange={onChange}
    />
  );
};

export default JEditor;

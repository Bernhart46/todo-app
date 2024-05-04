import { useRef } from "react";
import { useLoad } from "../../../utils/hooks";

export const ImportButton = () => {
  const load = useLoad();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImportClick = () => {
    if (!inputRef.current) return;
    let files = inputRef.current.files;
    if (!files) return;
    if (files.length == 0) return;

    const file = files[0];

    let reader = new FileReader();

    reader.onload = (e) => {
      const file = e.target?.result as string;

      if (!file) return;
      // This is a regular expression to identify carriage
      // Returns and line breaks
      const lines = file.split(/\r\n|\n/);
      load(lines[0]);
    };

    reader.onerror = (e) => console.log(e);

    reader.readAsText(file);
  };

  return (
    <>
      <label
        htmlFor="input_file"
        className="settings__button disable-selection"
      >
        Import
      </label>
      <input
        type="file"
        id="input_file"
        onChange={handleImportClick}
        ref={inputRef}
        accept=".txt"
        style={{ display: "none" }}
      />
    </>
  );
};

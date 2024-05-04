import { useRef } from "react";
import { useLoad } from "../../utils/hooks";
import { compressSave } from "../../scripts/compress";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

export const DataComponent = () => {
  const state = useSelector((state: RootState) => state).todo;
  if (!state) return null;

  const load = useLoad();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const exportData = JSON.stringify(compressSave(state, "compress"));
  const blob = new Blob([exportData], { type: "text/plain" });

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

  const handleExportClick = () => {
    const link = document.createElement("a");
    link.download = "todo-save-data.txt";

    link.href = URL.createObjectURL(blob);
    link.click();

    URL.revokeObjectURL(link.href);
  };

  const handleClearClick = () => {
    load("{}");
  };

  return (
    <div className="settings__data-container">
      <div className="settings__title">Data:</div>
      <input
        type="file"
        className="settings__button disable-selection"
        onChange={handleImportClick}
        ref={inputRef}
        accept=".txt"
      />
      <div
        role="button"
        className="settings__button disable-selection"
        onClick={handleExportClick}
      >
        Export
      </div>
      <div
        role="button"
        className="settings__button disable-selection"
        onClick={handleClearClick}
      >
        Clear Data
      </div>
    </div>
  );
};

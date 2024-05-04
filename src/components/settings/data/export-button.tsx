import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { compressSave } from "../../../scripts/compress";

export const ExportButton = () => {
  const state = useSelector((state: RootState) => state).todo;
  if (!state) return null;

  const exportData = JSON.stringify(compressSave(state, "compress"));
  const blob = new Blob([exportData], { type: "text/plain" });

  const handleExportClick = () => {
    const link = document.createElement("a");
    link.download = "todo-save-data.txt";

    link.href = URL.createObjectURL(blob);
    link.click();

    URL.revokeObjectURL(link.href);
  };

  return (
    <div
      role="button"
      className="settings__button disable-selection"
      onClick={handleExportClick}
    >
      Export
    </div>
  );
};

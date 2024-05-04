import { useLoad } from "../../utils/hooks";
import { ImportButton } from "./data/import-button";
import { ExportButton } from "./data/export-button";
import { ClearButton } from "./data/clear-button";
import { useState } from "react";
import { ConfirmChoiceComponent } from "../group-functions/confirm-choice";

export const DataComponent = () => {
  const [clearConfirm, setClearConfirm] = useState(false);
  const load = useLoad();

  const confirmedClearClick = () => {
    setClearConfirm(false);
    load("{}");
  };

  return (
    <>
      <div className="settings__data-container">
        <div className="settings__title">Data:</div>
        <ImportButton />
        <ExportButton />
        <ClearButton setClearConfirm={setClearConfirm} />
      </div>
      {clearConfirm && (
        <ConfirmChoiceComponent
          confirmFn={confirmedClearClick}
          setShowed={setClearConfirm}
          texts={{
            question: "Are you sure, you want to remove the todos?",
            cancel: "No, don't remove!",
            confirm: "Yes, remove!",
          }}
        />
      )}
    </>
  );
};

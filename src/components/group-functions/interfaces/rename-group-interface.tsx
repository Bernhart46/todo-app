import { useState } from "react";
import { InterfaceProps } from "./interface-types";
import "./interface.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { renameGroup } from "../../../store/todo/todo-slice";
import { useNavigate } from "react-router-dom";

export const RenameGroupInterface = (props: InterfaceProps) => {
  const { groupName, isToggled, setIsToggled } = props;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [newName, setNewName] = useState(groupName);

  //isError is just for visuals
  const [isError, setIsError] = useState(false);

  const handleRename = () => {
    if (newName.length === 0) return;
    dispatch(
      renameGroup({
        groupName,
        newName: newName.trim(),
      })
    );
    navigate(`/${newName}`);
    setIsToggled(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(e.target.value.length === 0 ? true : false);

    setNewName(e.target.value);
  };

  return (
    <div className="rename-group__container">
      <input
        type="text"
        placeholder="New Group Name"
        onChange={(e) => handleInput(e)}
        //tabIndex={isToggled ? 100402 : -1} <-- need a review
        className="rename-group__input"
        value={newName}
        style={{
          borderBottomColor: isError ? "red" : "white",
          outlineColor: isError ? "red" : "white",
        }}
      />
      <div
        role="button"
        onClick={handleRename}
        className="rename-group__button"
        //tabIndex={isToggled ? 100404 : -1} <-- need a review
        onKeyUp={(e) => {
          if (e.code === "Enter") {
            handleRename();
          }
        }}
      >
        Rename
      </div>
      <div
        role="button"
        onClick={() => setIsToggled(false)}
        className="rename-group__button"
        //tabIndex={isToggled ? 100404 : -1} <-- need a review
        onKeyUp={(e) => {
          if (e.code === "Enter") {
            setIsToggled(false);
          }
        }}
      >
        Cancel
      </div>
    </div>
  );
};

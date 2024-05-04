import { useDispatch, useSelector } from "react-redux";
import { useAutoFocusElement } from "../../../utils/hooks";
import { InterfaceProps } from "./interface-types";
import { Fragment, useRef, useState } from "react";
import { AppDispatch, RootState } from "../../../store";
import { setGroupSort, sorts, statuses } from "../../../store/todo/todo-slice";

type sortsType = {
  not_started: sorts;
  in_progress: sorts;
  done: sorts;
};

const defaultSorts: sortsType = {
  not_started: "random",
  in_progress: "random",
  done: "random",
};

export const SortTodosInterface = (props: InterfaceProps) => {
  const { groupName, setIsToggled } = props;

  const firstSelectRef = useRef<HTMLSelectElement | null>(null);
  const state = useSelector((state: RootState) => state).todo;
  const dispatch = useDispatch<AppDispatch>();

  const [sorts, setSorts] = useState(() => {
    return (
      state.find((group) => group.name === groupName)?.sort || defaultSorts
    );
  });

  const sortOptions = [
    {
      value: "random",
      title: "Random (Dynamic)",
    },
    {
      value: "a-z",
      title: "A-z (Static)",
    },
    {
      value: "z-a",
      title: "Z-a (Static)",
    },
  ];

  const categories: { title: string; type: statuses }[] = [
    {
      title: "Not Started",
      type: "not_started",
    },
    {
      title: "In Progress",
      type: "in_progress",
    },
    {
      title: "Finished",
      type: "done",
    },
  ];

  useAutoFocusElement(firstSelectRef);

  const handleSave = () => {
    dispatch(setGroupSort({ groupName, sorts }));
    setIsToggled(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, c: string) => {
    const value = e.target.value;
    setSorts((prev) => {
      return { ...prev, [c]: value };
    });
  };

  const handleCancel = () => {
    setIsToggled(false);
  };

  return (
    <div className="todo-sort__container">
      {categories.map((category, i) => {
        return (
          <Fragment key={i}>
            <label htmlFor={category.type} className={`sort-label-${i}`}>
              {category.title}:
            </label>
            <select
              defaultValue={sorts[category.type]}
              className={`sort-select`}
              tabIndex={200006 + i}
              onChange={(e) => handleChange(e, category.type)}
              id={category.type}
              ref={i === 0 ? firstSelectRef : undefined}
            >
              {sortOptions.map((option, j) => {
                return (
                  <option key={j} value={option.value}>
                    {option.title}
                  </option>
                );
              })}
            </select>
          </Fragment>
        );
      })}
      <div
        role="button"
        onClick={handleSave}
        className="todo-sort__save-button disable-selection"
        tabIndex={200009}
        onKeyUp={(e) => {
          if (e.code === "Enter") {
            handleSave();
          }
        }}
      >
        Sort
      </div>
      <div
        role="button"
        onClick={handleCancel}
        className="todo-sort__cancel-button disable-selection"
        tabIndex={200010}
        onKeyUp={(e) => {
          if (e.code === "Enter") {
            handleCancel();
          }
        }}
      >
        Cancel
      </div>
    </div>
  );
};

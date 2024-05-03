import { useState, useEffect, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  loadState,
  moveChildDown,
  moveChildUp,
  moveGroupDown,
  moveGroupUp,
  todoGroup,
} from "../store/todo/todo-slice";
import { setStateLoaded } from "../store/visual/visual-slice";
import { useParams } from "react-router-dom";
import { renewOldSaves } from "../scripts/renew-old-saves";

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }, []);

  return [size.width, size.height];
};

export const useGetGroupAmount = () => {
  const length = useSelector((state: RootState) => state.todo.length);

  return length;
};

export const useGetGroupName = () => {
  const { todo } = useParams();

  const state = useSelector((state: RootState) => state).todo;
  const group = state.find((el) => el.name === todo);
  const groupName = group?.name;
  return groupName ? groupName : null;
};

type useChangeIndexProp = {
  event: KeyboardEvent<HTMLDivElement | HTMLAnchorElement>;
  groupName: string;
  childId?: number | undefined;
};

export const useChangeIndex = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state).todo;

  const func = ({ event, groupName, childId }: useChangeIndexProp) => {
    const group = state.find((group) => group.name === groupName);
    if (!group) return;
    const child = group.children.find((child) => child.id === childId);
    if (child) {
      if (group.sort[child.status] !== "random") return;

      if (event.code === "ArrowUp") {
        dispatch(moveChildUp({ groupName: group.name, childId: child.id }));
      }
      if (event.code === "ArrowDown") {
        dispatch(moveChildDown({ groupName: group.name, childId: child.id }));
      }
    } else {
      if (event.code === "ArrowUp") {
        dispatch(moveGroupUp({ groupName }));
      }
      if (event.code === "ArrowDown") {
        dispatch(moveGroupDown({ groupName }));
      }
    }
  };

  return func;
};

export const useSave = () => {
  const todoState = useSelector((state: RootState) => state.todo);
  const func = () => {
    localStorage.setItem("state", JSON.stringify(todoState));
  };
  return func;
};

export const useLoad = () => {
  const defaultData: todoGroup[] = [
    {
      name: "Test Group 1",
      children: [
        {
          id: 2826651,
          name: "Test Item 1",
          description: "Just some description to the Test Item 1.",
          status: "not_started",
          index: 0,
        },
        {
          id: 5368738,
          name: "Test Item 2",
          description: "Just some description to the Test Item 2.",
          status: "in_progress",
          index: 0,
        },
      ],
      sort: {
        not_started: "random",
        in_progress: "random",
        done: "random",
      },
    },
  ];

  const dispatch = useDispatch();
  const func = () => {
    const stringData = localStorage.getItem("state");
    console.log("LocalStorage size: ", stringData?.length);
    const data = stringData
      ? (JSON.parse(stringData) as todoGroup[])
      : defaultData;
    const newData = renewOldSaves(data);
    dispatch(loadState({ data: newData }));
    dispatch(setStateLoaded());
  };

  return func;
};

export const useAutoFocusElement = (
  elementRef: React.MutableRefObject<any>
) => {
  useEffect(() => {
    elementRef.current?.focus();
  }, []);
};

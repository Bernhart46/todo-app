import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type statuses = "not_started" | "in_progress" | "done";
export type sorts = "random" | "a-z" | "z-a";

export type todoChild = {
  id: number;
  name: string;
  description: string;
  status: statuses;
  index: number;
};

export type todoGroup = {
  name: string;
  children: todoChild[];
  sort: {
    not_started: sorts;
    in_progress: sorts;
    done: sorts;
  };
};

const initialState: todoGroup[] = [];

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    loadState: (_, action: PayloadAction<{ data: todoGroup[] }>) => {
      return action.payload.data;
    },
    addNewTodoGroup: (state, action: PayloadAction<string>) => {
      if (!state.find((group) => group.name === action.payload)) {
        state.push({
          name: action.payload,
          children: [],
          sort: {
            not_started: "random",
            in_progress: "random",
            done: "random",
          },
        });
      }
    },
    moveChildUp: (
      state,
      action: PayloadAction<{ groupName: string; childId: number }>
    ) => {
      const { groupName, childId } = action.payload;
      const group = getGroup(state, groupName);
      if (!group) return;

      const child = getChild(group, childId);
      if (!child) return;

      const subgroup = group.children.filter((x) => x.status === child.status);
      if (child.index === 0) return;
      const prevChild = subgroup.find(
        (elem) => elem.index === child.index - 1 && elem.status === child.status
      );
      if (!prevChild) return;

      child.index--;
      prevChild.index++;
    },
    moveChildDown: (
      state,
      action: PayloadAction<{ groupName: string; childId: number }>
    ) => {
      const { groupName, childId } = action.payload;
      const group = getGroup(state, groupName);
      if (!group) return;

      const child = getChild(group, childId);
      if (!child) return;

      const subgroup = group.children.filter((x) => x.status === child.status);
      if (child.index === subgroup.length - 1) return;
      const nextChild = subgroup.find((elem) => elem.index === child.index + 1);
      if (!nextChild) return;
      child.index++;
      nextChild.index--;
    },
    moveGroupUp: (state, action: PayloadAction<{ groupName: string }>) => {
      const { groupName } = action.payload;
      const group = getGroup(state, groupName);
      if (!group) return;

      const groupIndex = state.findIndex((elem) => elem.name === groupName);

      if (groupIndex === 0) return;
      const previousGroupIndex = groupIndex - 1;
      [state[previousGroupIndex], state[groupIndex]] = [
        state[groupIndex],
        state[previousGroupIndex],
      ];
    },
    moveGroupDown: (state, action: PayloadAction<{ groupName: string }>) => {
      const { groupName } = action.payload;
      const group = getGroup(state, groupName);
      if (!group) return;

      const groupIndex = state.findIndex((elem) => elem.name === groupName);

      if (groupIndex === state.length - 1) return;
      const nextGroupIndex = groupIndex + 1;
      [state[groupIndex], state[nextGroupIndex]] = [
        state[nextGroupIndex],
        state[groupIndex],
      ];
    },

    removeChild: (
      state,
      action: PayloadAction<{ groupName: string; childId: number }>
    ) => {
      const { groupName, childId } = action.payload;
      const group = getGroup(state, groupName);
      if (!group) return;
      group.children = group.children.filter((elem) => elem.id !== childId);
    },
    addNewTask: (
      state,
      action: PayloadAction<{
        groupName: string;
        title: string;
        description: string;
      }>
    ) => {
      const { groupName, title, description } = action.payload;
      const group = getGroup(state, groupName);
      if (!group) return;

      const notStartedGroupLength = group.children.filter(
        (x) => x.status === "not_started"
      ).length;

      group.children.push({
        id: Date.now(),
        name: title,
        description: description,
        status: "not_started",
        index: notStartedGroupLength,
      });
    },
    setNewChildIndex: (
      state,
      action: PayloadAction<{
        groupName: string;
        childId: number;
        newIndex: number;
      }>
    ) => {
      const { groupName, childId, newIndex } = action.payload;
      const group = getGroup(state, groupName);
      if (!group) return;
      const child = getChild(group, childId);
      if (!child) return;
      child.index = newIndex;
    },
    changeStatus: (
      state,
      action: PayloadAction<{
        groupName: string;
        childId: number;
        direction: "next" | "prev";
      }>
    ) => {
      const { groupName, childId, direction } = action.payload;
      const group = getGroup(state, groupName);
      if (!group) return;

      const child = getChild(group, childId);
      if (!child) return;

      const notStartedGroupLength = group.children.filter(
        (x) => x.status === "not_started"
      ).length;
      const inProgressGroupLength = group.children.filter(
        (x) => x.status === "in_progress"
      ).length;
      const doneGroupLength = group.children.filter(
        (x) => x.status === "done"
      ).length;

      switch (child.status) {
        case "not_started":
          if (direction === "next") {
            child.status = "in_progress";
            child.index = inProgressGroupLength;
          } else {
            child.status = "done";
            child.index = doneGroupLength;
          }
          break;
        case "in_progress":
          if (direction === "next") {
            child.status = "done";
            child.index = doneGroupLength;
          } else {
            child.status = "not_started";
            child.index = notStartedGroupLength;
          }
          break;
        case "done":
          if (direction === "next") {
            child.status = "not_started";
            child.index = notStartedGroupLength;
          } else {
            child.status = "in_progress";
            child.index = inProgressGroupLength;
          }
          break;
      }
    },
    changeTaskInfo: (
      state,
      action: PayloadAction<{
        groupName: string;
        childId: number;
        newName: string;
        newDescription: string;
      }>
    ) => {
      const { groupName, childId, newName, newDescription } = action.payload;

      const group = getGroup(state, groupName);
      if (!group) return;

      const child = getChild(group, childId);
      if (!child) return;

      child.name = newName;
      child.description = newDescription;
    },
    removeGroup: (state, action: PayloadAction<{ groupName: string }>) => {
      const { groupName } = action.payload;

      return [...state].filter((elem) => elem.name !== groupName);
    },
    removeTodos: (state, action: PayloadAction<{ groupName: string }>) => {
      const { groupName } = action.payload;

      const group = getGroup(state, groupName);
      if (!group) return;

      group.children = [];
    },
    renameGroup: (
      state,
      action: PayloadAction<{ groupName: string; newName: string }>
    ) => {
      const { groupName, newName } = action.payload;

      const groupIndex = state.findIndex((x) => x.name === groupName);
      if (state[groupIndex].name === newName) return;
      state[groupIndex].name = newName;
    },
    resetGroup: (state, action: PayloadAction<{ groupName: string }>) => {
      const { groupName } = action.payload;
      const group = getGroup(state, groupName);
      if (!group) return;
      group.children.forEach((child) => {
        child.status = "not_started";
      });
    },
    setGroupSort: (
      state,
      action: PayloadAction<{
        groupName: string;
        sorts: {
          not_started: sorts;
          in_progress: sorts;
          done: sorts;
        };
      }>
    ) => {
      const { groupName, sorts } = action.payload;

      const group = getGroup(state, groupName);
      if (!group) return;

      group.sort = sorts;
    },
  },
});

const getGroup = (state: todoGroup[], groupName: string) => {
  return state.find((elem) => elem.name === groupName);
};

const getChild = (group: todoGroup, childId: number) => {
  return group.children.find((elem) => elem.id === childId);
};

export const {
  addNewTodoGroup,
  moveChildUp,
  moveChildDown,
  moveGroupUp,
  moveGroupDown,
  removeChild,
  addNewTask,
  changeStatus,
  changeTaskInfo,
  removeGroup,
  loadState,
  setNewChildIndex,
  resetGroup,
  renameGroup,
  removeTodos,
  setGroupSort,
} = todoSlice.actions;
export default todoSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type todoChild = {
  id: number;
  name: string;
  description: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "DONE";
  index: number;
};

export type todoGroup = {
  name: string;
  children: todoChild[];
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

      group.children.push({
        id: Date.now(),
        name: title,
        description: description,
        status: "NOT_STARTED",
        index: 0,
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

      switch (child.status) {
        case "NOT_STARTED":
          if (direction === "next") {
            child.status = "IN_PROGRESS";
          } else {
            child.status = "DONE";
          }
          break;
        case "IN_PROGRESS":
          if (direction === "next") {
            child.status = "DONE";
          } else {
            child.status = "NOT_STARTED";
          }
          break;
        case "DONE":
          if (direction === "next") {
            child.status = "NOT_STARTED";
          } else {
            child.status = "IN_PROGRESS";
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
} = todoSlice.actions;
export default todoSlice.reducer;

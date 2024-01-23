import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type todoChild = {
  id: number;
  name: string;
  description: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "DONE";
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
    loadState: (state, action: PayloadAction<{ data: todoGroup[] }>) => {
      return (state = action.payload.data);
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
      action: PayloadAction<{ groupName: string; childName: string }>
    ) => {
      const { groupName, childName } = action.payload;
      const group = getGroup(state, groupName);
      if (!group) return;

      const child = group.children.find((elem) => elem.name === childName);
      if (!child) return;

      const childIndex = group.children.findIndex(
        (elem) => elem.name === childName
      );

      if (childIndex === 0) return;
      const previousChildIndex = childIndex - 1;
      [group.children[previousChildIndex], group.children[childIndex]] = [
        group.children[childIndex],
        group.children[previousChildIndex],
      ];
    },
    moveChildDown: (
      state,
      action: PayloadAction<{ groupName: string; childName: string }>
    ) => {
      const { groupName, childName } = action.payload;
      const group = getGroup(state, groupName);
      if (!group) return;

      const child = getChild(group, childName);
      if (!child) return;

      const childIndex = group.children.findIndex(
        (elem) => elem.name === childName
      );

      if (childIndex === group.children.length - 1) return;
      const nextChildIndex = childIndex + 1;
      [group.children[childIndex], group.children[nextChildIndex]] = [
        group.children[nextChildIndex],
        group.children[childIndex],
      ];
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
      action: PayloadAction<{ groupName: string; childIndex: number }>
    ) => {
      const { groupName, childIndex } = action.payload;
      const group = getGroup(state, groupName);
      if (!group) return;
      group.children = group.children.filter(
        (elem) => group.children.indexOf(elem) !== childIndex
      );
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
      });
    },
    changeStatus: (
      state,
      action: PayloadAction<{
        groupName: string;
        childName: string;
        direction: "next" | "prev";
      }>
    ) => {
      const { groupName, childName, direction } = action.payload;
      const group = getGroup(state, groupName);
      if (!group) return;

      const child = getChild(group, childName);
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
        childName: string;
        newName: string;
        newDescription: string;
      }>
    ) => {
      const { groupName, childName, newName, newDescription } = action.payload;

      const group = getGroup(state, groupName);
      if (!group) return;

      const child = getChild(group, childName);
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

const getChild = (group: todoGroup, childName: string) => {
  return group.children.find((elem) => elem.name === childName);
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
} = todoSlice.actions;
export default todoSlice.reducer;

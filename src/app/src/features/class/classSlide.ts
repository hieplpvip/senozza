import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ClassState = {
  selectedClassId: string;
};

const initialState: ClassState = {
  selectedClassId: '',
};

const slice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    setSelectedClassId: (state, { payload }: PayloadAction<string>) => {
      state.selectedClassId = payload;
    },

    resetClassState: () => {
      return initialState;
    },
  },
});

export default slice.reducer;

export const { setSelectedClassId, resetClassState } = slice.actions;

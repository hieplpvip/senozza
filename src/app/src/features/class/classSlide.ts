import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ClassState = {
  selectedClassId: string | null;
};

const slice = createSlice({
  name: 'class',
  initialState: { selectedClassId: null } as ClassState,
  reducers: {
    setSelectedClassId: (state, { payload }: PayloadAction<string | null>) => {
      state.selectedClassId = payload;
    },
  },
});

export default slice.reducer;

export const { setSelectedClassId } = slice.actions;

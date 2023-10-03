import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'stores/store';

interface ModalsState {
  logInModal: boolean;
  signUpModal: boolean;
}

interface Payload {
  modal: keyof ModalsState;
}

const initialState: ModalsState = {
  logInModal: false,
  signUpModal: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<Payload>) => {
      state[action.payload.modal] = true;
      return state;
    },
    close: (state, action: PayloadAction<Payload>) => {
      state[action.payload.modal] = false;
      return state;
    },
    closeAll: () => initialState,
  },
});

export const { open, closeAll, close } = modalsSlice.actions;

export function selectModals(state: RootState) {
  return state.modals;
}

export default modalsSlice.reducer;

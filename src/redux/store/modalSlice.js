import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    authModal: { isOpen: false, modalNumber: 0 }, // 0 - login, 1 - signup, 2 - subcategory selection
    productFormModal: { isOpen: false },
    quotationModal: { isOpen: false, product: null },
    feedbackModal: { isOpen: false },
    orderSuccessModal: { isOpen: false },
    profileChangeModal: { isOpen: false, profile: 0 },
  },
  reducers: {
    closeAuthModal: (state) => {
      state.authModal.isOpen = false;
    },
    openAuthModal: (state) => {
      state.authModal.isOpen = true;
    },
    resetAuthModal: (state) => {
      state.authModal = { isOpen: false, modalNumber: 0 };
    },
    changeAuthModalNumber: (state, action) => {
      state.authModal.modalNumber = action.payload.modalNumber;
    },
    closeProductFormModal: (state) => {
      state.productFormModal.isOpen = false;
    },
    openProductFormModal: (state) => {
      state.productFormModal.isOpen = true;
    },
    closeQuotationModal: (state) => {
      state.quotationModal.isOpen = false;
    },
    openQuotationModal: (state, action) => {
      state.quotationModal.isOpen = true;
      state.quotationModal.product = action.payload;
    },
    openFeedbackModal: (state) => {
      state.feedbackModal.isOpen = true;
    },
    closeFeedbackModal: (state) => {
      state.feedbackModal.isOpen = false;
    },
    openOrderSuccessModal: (state) => {
      state.orderSuccessModal.isOpen = true;
    },
    closeOrderSuccessModal: (state) => {
      state.orderSuccessModal.isOpen = false;
    },
    openProfileChangeModal: (state, action) => {
      state.profileChangeModal.isOpen = true;
      state.profileChangeModal.profile = action.payload;
    },
    closeProfileChangeModal: (state) => {
      state.profileChangeModal.isOpen = false;
      state.profileChangeModal.profile = 0;
    },
  },
});

export const {
  closeAuthModal,
  openAuthModal,
  changeAuthModalNumber,
  resetAuthModal,
  closeProductFormModal,
  openProductFormModal,
  closeQuotationModal,
  openQuotationModal,
  openFeedbackModal,
  openOrderSuccessModal,
  closeProfileChangeModal,
  openProfileChangeModal,
  closeOrderSuccessModal,
  closeFeedbackModal,
} = modalSlice.actions;
export default modalSlice.reducer;

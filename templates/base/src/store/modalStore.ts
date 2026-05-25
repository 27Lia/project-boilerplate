import { create } from "zustand";

/**
 * @example
 * const { openModal, closeModal } = useModalStore();
 * openModal("deleteConfirm");   // 모달 열기
 * closeModal("deleteConfirm");  // 모달 닫기
 *
 * // 컴포넌트 외부(이벤트 핸들러 등)에서:
 * useModalStore.getState().openModal("deleteConfirm");
 */

type ModalState = {
  modals: Record<string, boolean>;
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
  setModal: (modalName: string, isOpen: boolean) => void;
  toggleModal: (modalName: string) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  modals: {},

  openModal: (modalName) =>
    set((state) => ({ modals: { ...state.modals, [modalName]: true } })),

  closeModal: (modalName) =>
    set((state) => ({ modals: { ...state.modals, [modalName]: false } })),

  setModal: (modalName, isOpen) =>
    set((state) => ({ modals: { ...state.modals, [modalName]: isOpen } })),

  toggleModal: (modalName) =>
    set((state) => {
      const current = state.modals[modalName] ?? false;
      return { modals: { ...state.modals, [modalName]: !current } };
    }),
}));

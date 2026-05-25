import { Modal as AntModal } from "antd";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { useModalStore } from "@/store/modalStore";

/**
 * @example
 * // 열기: useModalStore.getState().openModal("deleteConfirm")
 * // 닫기: useModalStore.getState().closeModal("deleteConfirm")
 *
 * // 또는 컴포넌트 내부에서:
 * const { openModal } = useModalStore();
 * openModal("deleteConfirm");
 *
 * <Modal
 *   modalName="deleteConfirm"
 *   title="정말 삭제하시겠어요?"
 *   activeButtonName="삭제"
 *   activeButtonEvent={handleDelete}
 *   danger
 * >
 *   <p className="text-sm text-neutral-500">삭제 후에는 복구할 수 없습니다.</p>
 * </Modal>
 */

interface ModalProps {
  modalName: string;
  title: string;
  children?: ReactNode;
  onCancel?: () => void;
  noButton?: boolean;
  showCancelButton?: boolean;
  showActiveButton?: boolean;
  cancelButtonName?: string;
  cancelButtonEvent?: () => void;
  activeButtonName?: string;
  activeButtonEvent?: () => void;
  danger?: boolean;
  width?: number;
}

const actionButtonStyle = cva(
  "flex flex-1 items-center justify-center rounded-2xl p-3 text-base font-semibold transition-all active:scale-[0.98]",
  {
    variants: {
      variant: {
        cancel: "bg-neutral-100 text-neutral-700",
        active: "bg-primary text-white",
        danger: "bg-error text-white",
      },
    },
    defaultVariants: { variant: "active" },
  }
);

export function Modal({
  modalName,
  title,
  children,
  onCancel,
  noButton = false,
  showCancelButton = true,
  showActiveButton = true,
  cancelButtonName = "취소",
  cancelButtonEvent,
  activeButtonName = "확인",
  activeButtonEvent,
  danger = false,
  width = 340,
}: ModalProps) {
  const { modals, setModal } = useModalStore();
  const open = modals[modalName] ?? false;

  const closeModal = () => {
    setModal(modalName, false);
    onCancel?.();
  };

  const handleCancelClick = () => {
    cancelButtonEvent?.();
    closeModal();
  };

  const handleActiveClick = () => {
    activeButtonEvent?.();
    setTimeout(closeModal, 0);
  };

  const shouldRenderButtons = !noButton && (showCancelButton || showActiveButton);

  return (
    <AntModal
      open={open}
      onCancel={closeModal}
      footer={null}
      centered
      closable={false}
      destroyOnHidden
      width={width}
      className="[&_.ant-modal-body]:p-0"
    >
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-5">
        <p className="w-full text-center text-base font-bold text-neutral-900">
          {title}
        </p>

        {children && (
          <div className="flex min-h-[80px] w-full items-center justify-center">
            {children}
          </div>
        )}

        {shouldRenderButtons && (
          <div className="flex w-full gap-2 pt-1">
            {showCancelButton && (
              <button
                onClick={handleCancelClick}
                className={actionButtonStyle({ variant: "cancel" })}
              >
                {cancelButtonName}
              </button>
            )}
            {showActiveButton && (
              <button
                onClick={handleActiveClick}
                className={actionButtonStyle({ variant: danger ? "danger" : "active" })}
              >
                {activeButtonName}
              </button>
            )}
          </div>
        )}
      </div>
    </AntModal>
  );
}

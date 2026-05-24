import { Modal as AntModal } from "antd";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export function Modal({
  open,
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  danger = false,
}: ModalProps) {
  return (
    <AntModal open={open} onCancel={onCancel} footer={null} centered>
      <div className="flex flex-col gap-4 py-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="full" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            variant={danger ? "danger" : "primary"}
            size="full"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </AntModal>
  );
}

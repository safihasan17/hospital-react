import type { ReactNode } from "react";

interface ConfirmModalProps {
  show: boolean;
  title?: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: string; // primary, danger, success...
  onConfirm: () => void;
  onClose: () => void;
}

function ConfirmModal({
  show,
  title = "Confirm",
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "primary",
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                {cancelText}
              </button>
              <button
                type="button"
                className={`btn btn-${confirmVariant}`}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default ConfirmModal;
import { useEffect } from "react";
import InvoiceForm from "./InvoiceForm";

export default function InvoiceDrawer(props) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") props.onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [props]);

  return (
    <div
      className="fixed inset-x-0 bottom-0 top-[72px] z-40 bg-black/50 md:top-20 lg:left-[103px] lg:top-0"
      onClick={props.onClose}
    >
      <div className="h-full" onClick={(e) => e.stopPropagation()}>
        <InvoiceForm {...props} />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useId, useRef, useState } from "react";

type EmailPopoverProps = { label: string; address: string; copy: string; copied: string };

export function EmailPopover({ label, address, copy, copied }: EmailPopoverProps) {
  const [open, setOpen] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLSpanElement>(null);
  const popoverId = useId();

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setHasCopied(true);
      window.setTimeout(() => setHasCopied(false), 1600);
    } catch {
      // Clipboard access can be refused; select the address so it can be copied by hand.
      const selection = window.getSelection();
      if (addressRef.current && selection) selection.selectAllChildren(addressRef.current);
    }
  };

  return (
    <div className="email-popover" ref={rootRef}>
      <button type="button" className="email-trigger" aria-expanded={open} aria-controls={popoverId} onClick={() => setOpen((value) => !value)}>{label}</button>
      {open && (
        <div id={popoverId} className="email-panel" role="dialog" aria-label={label}>
          <span className="email-address" ref={addressRef}>{address}</span>
          <button type="button" className="email-copy" onClick={copyAddress} aria-live="polite">{hasCopied ? copied : copy}</button>
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export interface Option<T> {
  label: string;
  value: T;
}

export interface DropdownProps<T> {
  options: Option<T>[];
  selected?: Option<T>;
  onSelectedChange: (option: Option<T>) => void;
}

export const Dropdown = <T extends string>({
  options,
  selected,
  onSelectedChange,
}: DropdownProps<T>) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selected || options[0]);

  // Close dropdown when clicking outside of it
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listenerEvent = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        e.target &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.body.addEventListener("click", listenerEvent, { capture: true });
    } else {
      document.body.removeEventListener("click", listenerEvent, {
        capture: true,
      });
    }
  }, [open]);

  const renderedOptions = options.map((option) => {
    if (option.value === selectedOption.value) {
      return null;
    }

    return (
      <div
        key={option.value}
        className="dropdown item"
        onClick={() => {
          onSelectedChange(option);
          setSelectedOption(option);
          setOpen(false);
        }}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div className="dropdown" ref={wrapperRef}>
      <div className="dropdown label" onClick={() => setOpen(!open)}>
        <div className="dropdown text">{selectedOption.label}</div>
        <ArrowDropDownIcon
          className="dropdown icon"
          style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
        />
      </div>
      <div
        className="dropdown container"
        style={{ display: open ? "block" : "none", position: "absolute" }}
      >
        {renderedOptions}
      </div>
    </div>
  );
};

import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { category } from "../api/gitlabApi";

export interface Option {
  label: string;
  value: category;
}

export interface DropdownProps {
  options: Option[];
  selected?: Option;
  onSelectedChange: (option: Option) => void;
}

export const Dropdown = ({
  options,
  selected,
  onSelectedChange,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selected || options[0]);

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
        }}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div className="dropdown" onClick={() => setOpen(!open)}>
      <div className="dropdown label">
        <div className="dropdown text">{selectedOption.label}</div>
        <ArrowDropDownIcon
          className="dropdown icon"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        />
      </div>
      <div
        className="dropdown container"
        style={{ display: open ? "block" : "none" }}
      >
        {renderedOptions}
      </div>
    </div>
  );
};

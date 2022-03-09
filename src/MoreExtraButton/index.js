import React, { useState } from "react";
import List from "../List";
import { RangeInner } from "../Range";
import { TextInner } from "../Text";
import { SelectorInner } from "../Selector";

export const withMoreExtraButton = (WrappedComponent) => ({ name, value, children, ...props }) => {
  const [isEdit, setIsEdit] = useState(false);
  return isEdit ? <WrappedComponent defaultActive={true} {...props} name={name} onBlur={() => {
    setIsEdit(false);
  }} /> : <List.Item onClick={(e) => {
    e.stopPropagation();
    setIsEdit(true);
  }} label={children || "其他"} />;
};

const RangeButton = withMoreExtraButton(RangeInner);
const TextButton = withMoreExtraButton(TextInner);
const SelectorButton = withMoreExtraButton(SelectorInner);

export const createExtraButton = ({ type, ...props }) => (innerProps) => {
  const mapping = {
    range: RangeButton, text: TextButton, selector: SelectorButton
  };

  const ExtraButtonComponent = mapping[type];
  if (!ExtraButtonComponent) {
    return null;
  }
  return <ExtraButtonComponent {...props} {...innerProps} />;
};


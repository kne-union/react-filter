import React from "react";
import { Checkbox } from "antd";
import { useConsumer } from "../context";

const Check = ({ name, label, ...props }) => {
  const { value: aValue, onChange } = useConsumer();
  const currentValue = aValue[name];
  return <Checkbox {...props} size="small" checked={currentValue} onChange={(e) => {
    onChange(name, e.target.checked ? { value: true, label } : null);
  }}>{label}</Checkbox>;
};

export default Check;
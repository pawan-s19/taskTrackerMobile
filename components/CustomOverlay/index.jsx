import React, { useState } from "react";
import { Button, Overlay, Icon } from "@rneui/themed";

export default function CustomOverlay({ visible, toggleOverlay, children }) {
  return (
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      {children}
    </Overlay>
  );
}

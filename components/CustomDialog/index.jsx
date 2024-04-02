import { Dialog } from "@rneui/themed";

export default function CustomDialog({ visible, toggleDialog, children }) {
  return (
    <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
      {children}
    </Dialog>
  );
}

import { Drawer as AntDrawer } from "antd";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  placement?: "bottom" | "top" | "left" | "right";
  height?: string | number;
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  placement = "bottom",
  height = "auto",
}: DrawerProps) {
  return (
    <AntDrawer
      open={open}
      onClose={onClose}
      title={title}
      placement={placement}
      height={height}
      styles={{
        body: { padding: "16px 20px 32px" },
        header: title ? undefined : { display: "none" },
      }}
    >
      {children}
    </AntDrawer>
  );
}

import { Drawer as AntDrawer } from "antd";

/**
 * Drawer — 하단(기본) 슬라이드 패널
 * antd Drawer 래핑. 지역선택, 옵션선택 등에 사용합니다.
 *
 * @example
 * // 기본 사용
 * const [open, setOpen] = useState(false);
 * <Button onClick={() => setOpen(true)}>열기</Button>
 * <Drawer open={open} onClose={() => setOpen(false)} title="지역 선택">
 *   <div>내용</div>
 * </Drawer>
 *
 * // 지역 선택 드로어 (RegionDrawer 컴포넌트 사용 권장)
 * import { RegionDrawer } from "@/components/common/RegionDrawer";
 * <RegionDrawer open={open} onClose={() => setOpen(false)} onSelect={(region) => setValue("region", region)} />
 */

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

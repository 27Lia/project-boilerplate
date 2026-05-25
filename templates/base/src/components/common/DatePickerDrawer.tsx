import { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * DatePickerDrawer — 날짜 선택 드로어
 * dayjs 패키지가 필요합니다: npm install dayjs
 *
 * @example
 * const [open, setOpen] = useState(false);
 * const { setValue } = useFormContext();
 *
 * <button type="button" onClick={() => setOpen(true)}>
 *   {selectedDate || "날짜 선택"}
 * </button>
 * <DatePickerDrawer
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   onSelect={(date) => {
 *     setValue("date", date.format("YYYY-MM-DD"));
 *     setOpen(false);
 *   }}
 * />
 */

interface DatePickerDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (date: Dayjs) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function DatePickerDrawer({
  open,
  onClose,
  onSelect,
  minDate,
  maxDate,
}: DatePickerDrawerProps) {
  const [current, setCurrent] = useState(dayjs());
  const [selected, setSelected] = useState<Dayjs | null>(null);

  const startOfMonth = current.startOf("month");
  const daysInMonth = current.daysInMonth();
  const startDay = startOfMonth.day(); // 0=일

  const cells = Array.from({ length: startDay + daysInMonth }, (_, i) =>
    i < startDay ? null : current.date(i - startDay + 1)
  );

  const isDisabled = (d: Dayjs) => {
    if (minDate && d.isBefore(minDate, "day")) return true;
    if (maxDate && d.isAfter(maxDate, "day")) return true;
    return false;
  };

  return (
    <Drawer open={open} onClose={onClose} title="날짜 선택" height={460}>
      <div className="flex flex-col gap-4">
        {/* 월 이동 */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrent((c) => c.subtract(1, "month"))}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-base font-semibold text-neutral-900">
            {current.format("YYYY년 M월")}
          </span>
          <button
            type="button"
            onClick={() => setCurrent((c) => c.add(1, "month"))}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 text-center">
          {DAYS.map((d, i) => (
            <span
              key={d}
              className={cn(
                "text-xs font-medium",
                i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-neutral-400"
              )}
            >
              {d}
            </span>
          ))}
        </div>

        {/* 날짜 */}
        <div className="grid grid-cols-7 gap-y-1 text-center">
          {cells.map((d, i) => {
            if (!d) return <span key={i} />;
            const disabled = isDisabled(d);
            const isSelected = selected?.isSame(d, "day");
            const isToday = d.isSame(dayjs(), "day");
            const col = i % 7;

            return (
              <button
                key={d.toString()}
                type="button"
                disabled={disabled}
                onClick={() => setSelected(d)}
                className={cn(
                  "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors",
                  isSelected && "bg-primary text-white font-semibold",
                  !isSelected && isToday && "border border-primary text-primary",
                  !isSelected && !disabled && "hover:bg-neutral-100",
                  disabled && "text-neutral-300",
                  !isSelected && col === 0 && !disabled && "text-red-400",
                  !isSelected && col === 6 && !disabled && "text-blue-400"
                )}
              >
                {d.date()}
              </button>
            );
          })}
        </div>

        <Button
          size="full"
          disabled={!selected}
          onClick={() => selected && onSelect(selected)}
        >
          선택 완료
        </Button>
      </div>
    </Drawer>
  );
}

import { cn } from "@/shared/utils/shadcn";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

export function Table({ children, className, wrapperClassName, ...props }: TableProps) {
  return (
    <div className={cn("my-6 w-full overflow-y-auto", wrapperClassName)}>
      <table className={cn("w-full", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function Thead({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn("", className)} {...props}>
      {children}
    </thead>
  );
}

export function Tbody({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn("", className)} {...props}>
      {children}
    </tbody>
  );
}

export function Tr({ children, className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn("m-0 border-t p-0 even:bg-muted", className)} {...props}>
      {children}
    </tr>
  );
}

export function Th({ children, className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function Td({ children, className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn("border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right", className)}
      {...props}
    >
      {children}
    </td>
  );
}

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  contained?: boolean;
}

export const Section = ({
  className,
  contained = true,
  children,
  ...props
}: SectionProps) => {
  return (
    <section
      className={cn("py-16 md:py-24", className)}
      {...props}
    >
      {contained ? (
        <div className="container mx-auto px-4">{children}</div>
      ) : (
        children
      )}
    </section>
  );
};
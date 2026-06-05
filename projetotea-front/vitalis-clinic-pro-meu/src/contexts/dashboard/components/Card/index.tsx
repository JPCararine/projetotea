import { ElementType } from "react";
import clsx from "clsx";

interface CardProps extends React.ComponentProps<"div"> {
    title: string;
    value: string | number;
    label?: string;
    percentage?: string;
    icon: ElementType;
}

export function Card ({title, value, label, percentage, icon: Icon, className, ...props}: CardProps) {
    return (
            <div
                id="stat-card-patients"
                {...props}
                className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center hover:shadow-md hover:border-slate-200 transition-all duration-200"
                >
                <div className={clsx("spaced-y-2", !label ? "mb-4" : null)}>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {title}
                    </span>

                    <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                    {value}
                    </h3>

                    <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                    {percentage && (
                        <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-[10px] font-bold">
                        {percentage}
                        </span>
                    )}

                    {label}
                    </span>
                </div>

                {Icon ? (
                    <div className="p-4 bg-teal-50 rounded-xl text-teal-600 mt-1">
                    <Icon className="w-6 h-6" />
                    </div>
                ) : (
                    <span />
                )}
                </div>
    )
}

export default Card;
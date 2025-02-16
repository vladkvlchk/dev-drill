import { FC } from "react";
import clsx from "clsx";

import { Badge } from "../ui";
import { TDifficulty } from "@/utils/types";

interface Props {
  variant: TDifficulty;
}

const fontColor: Record<TDifficulty, string> = {
  easy: "text-lime-500 border-lime-500 bg-transparent hover:bg-lime-200",
  normal: "text-amber-500 border-amber-500 bg-transparent hover:bg-amber-200",
  hard: "text-red-500 border-red-500 bg-transparent hover:bg-red-200",
};

export const DifficultyBadge: FC<Props> = ({ variant }) => {
  return <Badge className={clsx(fontColor[variant])}>{variant}</Badge>;
};

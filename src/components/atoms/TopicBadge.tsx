import { FC } from "react";
import clsx from "clsx";

import { TTopic } from "@/utils/types/Topic";
import { Badge } from "../ui";

interface Props {
  variant: TTopic;
}

const fontColor: Record<TTopic, string> = {
  html: "text-orange-500 bg-orange-200 hover:bg-orange-300",
  css: "text-blue-500 bg-blue-200 hover:bg-blue-300",
  javascript: "text-yellow-500 bg-yellow-200 hover:bg-yellow-300",
  typescript: "text-sky-500 bg-sky-200 hover:bg-sky-300",
  oop: "text-green-500 bg-green-200 hover:bg-green-300",
  react: "text-indigo-500 bg-indigo-200 hover:bg-indigo-300",
  next: "text-gray-500 bg-gray-200 hover:bg-gray-300",
};

export const TopicBadge: FC<Props> = ({ variant }) => {
  return <Badge className={clsx(fontColor[variant])}>{variant}</Badge>;
};

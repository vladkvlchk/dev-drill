import { FC, useState } from "react";
import { KeyRoundIcon, MenuIcon } from "lucide-react";
import Link from "next/link";

import { useFiltersStore } from "@/store/filtersStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Checkbox,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui";
import { AppRoutes } from "@/utils/appRoutes";
import { useCurrentCardIndex, useFilters } from "@/hooks";
import { capitalize } from "@/utils/helper/capitalize";

export const SideMenu: FC = () => {
  const { parsedFilters } = useFilters();
  const { tempFilters, setTempFilters, applyFilters, resetTempFilters } =
    useFiltersStore();
  const { setCurrentCardIndex } = useCurrentCardIndex();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (
    filterKey: keyof typeof tempFilters,
    id: string
  ) => {
    setTempFilters({
      [filterKey]: tempFilters[filterKey].includes(id)
        ? tempFilters[filterKey].filter((item) => item !== id)
        : [...tempFilters[filterKey], id],
    });
  };

  const onClickResetFilters = () => resetTempFilters();

  const handleClose = () => {
    if (!isOpen) return setIsOpen(true);

    applyFilters();
    setCurrentCardIndex(0);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetTrigger className="absolute right-4 top-4 z-10">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4">
          DEV DRILL
        </h2>
        <Link href={AppRoutes.Auth}>
          <Button variant="secondary" className="w-full justify-start">
            <KeyRoundIcon />
            Log In / Sign Up
          </Button>
        </Link>

        <div className="mt-8">
          <div className="flex justify-between items-center">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Filters:
            </h4>
            <Button variant="outline" onClick={onClickResetFilters}>
              reset filters
            </Button>
          </div>
          <Accordion type="single" collapsible>
            {parsedFilters.map((filter, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>
                  {capitalize(filter.filterName)}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  {filter.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={tempFilters[
                          filter.filterName as keyof typeof tempFilters
                        ].includes(item.id)}
                        onCheckedChange={() =>
                          handleCheckboxChange(
                            filter.filterName as keyof typeof tempFilters,
                            item.id
                          )
                        }
                      />
                      <label
                        htmlFor={item.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.name}
                      </label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};

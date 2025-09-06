import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import IconLocation from "@/icons/IconLocation";
import { selectFilters } from "@/redux/filter/filterSlice";
import { useSelector } from "react-redux";
import { CheckIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useField } from "formik";

type Location = { id: string; name: string; value: string };
type Filters = { location: Location[] };

const FilterLocation = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const [, , helpers] = useField("location");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const filters = useSelector(selectFilters) as Filters;
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <div {...props}>
      <span className="text-theme-gray mb-2 block">Location</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          ref={ref}
          className="w-full bg-theme-inputs rounded-[12px] px-5 py-[18px] flex items-center gap-2"
        >
          <IconLocation className="fill-current" />
          {value
            ? (filters.location.find((location) => location.name === value)
                ?.name ?? null)
            : "Select Location"}
        </PopoverTrigger>
        <PopoverContent
          style={{
            width: ref.current ? ref.current.offsetWidth : "auto",
          }}
          className="w-full p-0"
        >
          <Command>
            <CommandInput placeholder="Search Location..." />
            <CommandList>
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup>
                {filters.location.map((el) => (
                  <CommandItem
                    key={el.id}
                    value={el.name}
                    onSelect={(currentValue) => {
                      const val = currentValue === value ? "" : currentValue;
                      helpers.setValue(val);
                      setOpen(false);
                      setValue(val);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === el.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {el.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterLocation;

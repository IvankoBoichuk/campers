import Icon from "./Icon";
import { cn } from "@/lib/utils";

const Characteristics = ({
  className,
  AC,
  TV,
  kitchen,
  transmission,
  bathroom,
}) => {
  const mapping = {
    automatic: "Automatic",
    manual: "Manual",
  };
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {AC && (
        <li className="flex gap-2 py-3 px-[18px] font-medium rounded-full bg-[#EAECEF]">
          <Icon name="wind" />
          AC
        </li>
      )}
      {TV && (
        <li className="flex gap-2 py-3 px-[18px] font-medium rounded-full bg-[#EAECEF]">
          <Icon name="tv" />
          TV
        </li>
      )}
      {kitchen && (
        <li className="flex gap-2 py-3 px-[18px] font-medium rounded-full bg-[#EAECEF]">
          <Icon name="cup-hot" />
          Kitchen
        </li>
      )}
      {bathroom && (
        <li className="flex gap-2 py-3 px-[18px] font-medium rounded-full bg-[#EAECEF]">
          <Icon name="shower" />
          Bathroom
        </li>
      )}
      {transmission && (
        <li className="flex gap-2 py-3 px-[18px] font-medium rounded-full bg-[#EAECEF]">
          <Icon name="diagram" />
          {mapping[transmission] ?? transmission}
        </li>
      )}
    </ul>
  );
};

export default Characteristics;

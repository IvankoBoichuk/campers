import { useField } from "formik";
import Icon from "@/components/Icon";

type Option = { id: string | number; name: string; icon?: string };

type Props = {
  label: string;
  name: string;                // ключ у Formik
  options: Option[];
  className?: string;
  multiple?: boolean;          // <-- multi-select
};

const FilterItem = ({ label, name, options = [], className = "", multiple = false }: Props) => {
  // Для multiple очікуємо масив значень, для single — скаляр
  const [field, , helpers] = useField(name);
  const value = field.value ?? (multiple ? [] : "");
  
  const isChecked = (id: Option["id"]) => multiple ? (value as Array<Option["id"]>)?.includes(id) : value === id

  const toggle = (id: Option["id"]) => {
    if (!multiple) {
      helpers.setValue(id);
      return;
    }
    const arr = Array.isArray(value) ? value : [];
    helpers.setValue(arr.includes(id) ? arr.filter(v => v !== id) : [...arr, id]);
  };

  return (
    <div className={className}>
      <span className="text-xl leading-6 font-semibold pb-6 mb-6 border-b border-theme-gray-light block">
        {label}
      </span>

      {options.length > 0 && (
        <ul className="grid grid-cols-3 gap-y-2 gap-x-3">
          {options.map((el) => {
            const id = `${name}-${el.id}`;
            const active = isChecked(el.id);

            return (
              <li
                key={el.id}
                className={[
                  "aspect-[112/96] flex flex-col items-center justify-center gap-2 rounded-[12px] text-center font-medium leading-6 border",
                  active ? "border-theme-btn ring-1 ring-theme-btn" : "border-theme-gray-light",
                ].join(" ")}
              >
                <label htmlFor={id} className="cursor-pointer flex flex-col items-center px-2">
                  {el.icon && <Icon name={el.icon} size={32} />}
                  <input
                    id={id}
                    type={multiple ? "checkbox" : "radio"}
                    name={name}
                    value={String(el.id)}
                    checked={active}
                    onChange={() => toggle(el.id)}
                    onBlur={field.onBlur}
                    className="sr-only"
                  />
                  {el.name}
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FilterItem;

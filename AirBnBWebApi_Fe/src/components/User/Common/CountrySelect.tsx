import useCountries from "@/hooks/useCountries";
import { Select } from "antd";
import Flag from "react-world-flags";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

type Props = {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
};

const { Option } = Select;

function CountrySelect({ value, onChange }: Props) {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        value={value?.value} // Hiển thị giá trị hiện tại
        onChange={(val) => {
          const selectedCountry = getAll().find((country) => country.value === val);
          if (selectedCountry) {
            onChange(selectedCountry as CountrySelectValue);
          }
        }}
        style={{ width: '100%' }}
        showSearch
        optionFilterProp="label" // Dùng để tìm kiếm theo `label`
        filterOption={(input, option) =>
          (option?.label as string).toLowerCase().includes(input.toLowerCase())
        }
      >
        {getAll().map((country) => (
          <Option key={country.value} value={country.value} label={country.label}>
            <div className="flex items-center gap-3">
              <Flag code={country.value} alt={country.label} className="w-5" />
              <div>
                {country.label}, <span className="text-neutral-500">{country.region}</span>
              </div>
            </div>
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default CountrySelect;

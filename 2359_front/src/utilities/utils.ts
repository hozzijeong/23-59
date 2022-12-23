import { OptionEnums } from 'types/enums';
import { OptionCheckedProps } from 'types/interfaces';

const converUserOptionToContent = (options: OptionCheckedProps) => {
  const optionKeys = Object.keys(options).map((key) => ({ title: key as OptionEnums }));
  return optionKeys.map((data) => ({ ...data, isChecked: options[data.title] }));
};

const checkArrayAllFalse = (array: boolean[]) => array.every((data) => !data);

export { converUserOptionToContent, checkArrayAllFalse };

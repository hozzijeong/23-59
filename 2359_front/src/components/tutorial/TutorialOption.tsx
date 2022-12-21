import React, { useMemo, useCallback } from 'react';
import { UserOptions } from 'components/ContentOptions';
import { ContentOptionsProps } from 'types/interfaces';

function TutorialOption({ state, setState }: ContentOptionsProps) {
  // tutorialOption을 그냥 options 페이지로 통일 시키는 것에 대하여...
  // 해당 mixedData는 customHook을 통해 값 설정을 하거나 recoil selector를 통해서 값 설정을 하면 좋을 것 같은 느낌

  const optionHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id } = event.target;
      setState((currentOptions) =>
        currentOptions.map((options) => (options.id === id ? { ...options, isChecked: !options.isChecked } : options))
      );
    },
    [setState]
  );
  const contentCheckBox = useMemo(() => {
    return state.map((option) => <UserOptions state={option} handler={optionHandler} />);
  }, [state, optionHandler]);
  return <div>{contentCheckBox}</div>;
}

export { TutorialOption };

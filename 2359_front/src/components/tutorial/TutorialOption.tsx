import React, { useMemo, useCallback } from 'react';
import { UserOptions } from 'components/ContentOptions';
import { ContentOptionsProps } from 'types/interfaces';

function TutorialOption({ state, setState }: ContentOptionsProps) {
  const optionHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id } = event.target;
      setState((currentOptions) =>
        currentOptions.map((options) =>
          options.title === id ? { ...options, isChecked: !options.isChecked } : options
        )
      );
    },
    [setState]
  );
  const contentCheckBox = useMemo(() => {
    return state.map((option) => <UserOptions key={option.title} state={option} handler={optionHandler} />);
  }, [state, optionHandler]);
  return <div>{contentCheckBox}</div>;
}

export { TutorialOption };

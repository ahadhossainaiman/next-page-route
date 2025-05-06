import { IBaseFilter, IMetaResponse } from '@base/interfaces';
import { Toolbox } from '@lib/utils';
import { Select, type SelectProps, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface IProps extends SelectProps {
  initialOptions?: SelectProps['options'];
  filters?: IBaseFilter;
  meta: IMetaResponse;
  onObserver?: (values: IBaseFilter) => void;
  onStateChange: (values: IBaseFilter) => void;
}

const InfiniteScrollSelect: React.FC<IProps> = ({
  initialOptions = [],
  filters = { page: 1, limit: 10, searchTerm: null },
  meta,
  onObserver = null,
  onStateChange,
  options = [],
  value,
  ...rest
}) => {
  const [isFirstSkip, setFirstSkip] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const { ref, inView } = useInView();
  const [state, setState] = useState(filters);
  const [selectedOptions, setSelectedOptions] = useState<SelectProps['options']>([]);
  const [holdOptions, setHoldOptions] = useState<SelectProps['options']>([]);
  const combinedOptions = [
    ...initialOptions,
    ...selectedOptions.filter((option) => !initialOptions.some((x) => x.key === option.key)),
    ...holdOptions.filter(
      (option) =>
        !initialOptions.some((x) => x.key === option.key) && !selectedOptions.some((x) => x.key === option.key),
    ),
  ];

  const resetStateFn = () => {
    setHoldOptions([]);
    onStateChange?.({ page: 1, limit: state.limit, searchTerm: null });
    setState({ page: 1, limit: state.limit, searchTerm: null });
  };

  useEffect(() => {
    if (inView && meta?.total > combinedOptions.length) {
      const newPage = state.page + 1;
      onObserver?.({ ...state, page: newPage });
      setState((prev) => ({ ...prev, page: newPage }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    if (!isLoading && !rest.loading && !inView && !options.length && holdOptions.length) {
      setHoldOptions([]);
    } else if (options.length) {
      const purifiedOptions = options.reduce(
        (acc, option) => {
          const idx = acc.findIndex((x) => x.key === option.key);

          if (idx !== -1) acc[idx] = option;
          else acc.push(option);

          return acc;
        },
        [...holdOptions],
      );

      setHoldOptions(purifiedOptions);
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  useEffect(() => {
    if (Toolbox.isNotEmpty(value)) {
      setFirstSkip(false);
    }

    if (Toolbox.isEmpty(value) && !isFirstSkip) {
      setSelectedOptions([]);
      resetStateFn();
      setFirstSkip(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Select
      {...rest}
      value={value}
      filterOption={false}
      onBlur={resetStateFn}
      onClear={(...e) => rest.onClear?.(...e)}
      onSelect={(...e) => {
        rest.onSelect?.(...e);
        setSelectedOptions((prev) => (rest.mode ? [...prev, e[1]] : [e[1]]));
        rest.mode ? null : resetStateFn(); // temporary solution for feedback
      }}
      onSearch={Toolbox.debounce((value) => {
        resetStateFn();
        setLoading(true);
        onObserver?.({ page: 1, limit: state.limit, searchTerm: value });
        setState({ page: 1, limit: state.limit, searchTerm: value });
      }, 1000)}
      options={Toolbox.toCleanArray([
        ...combinedOptions,
        isLoading || (meta?.total > combinedOptions.length && !rest.loading)
          ? {
              key: 'loading',
              label: (
                <div className="text-center" ref={ref}>
                  <Spin />
                </div>
              ),
              value: 'loading',
              disabled: true,
            }
          : null,
      ])}
    />
  );
};

export default InfiniteScrollSelect;

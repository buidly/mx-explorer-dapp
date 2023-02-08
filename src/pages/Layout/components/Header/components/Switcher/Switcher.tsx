import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Select, { components, OnChangeValue } from 'react-select';

import { links as internalLinks, networks } from 'config';
import { networksSelector } from 'redux/selectors';
import { changeNetwork } from 'redux/slices';

import { OptionType, SwitcherPropsType } from './types';

const Control: typeof components.Control = (props) => (
  <components.Control
    {...props}
    className={classNames('control', {
      expanded: props.selectProps.menuIsOpen
    })}
  />
);

const ValueContainer: typeof components.ValueContainer = (props) => (
  <components.ValueContainer {...props} className='value' />
);

const SingleValue: typeof components.SingleValue = (props) => (
  <components.SingleValue {...props} className='single' />
);

const Menu: typeof components.Menu = (props) => (
  <components.Menu {...props} className='menu' />
);

const MenuList: typeof components.MenuList = (props) => (
  <components.MenuList {...props} className='list' />
);

const Option: typeof components.Option = (props) => (
  <components.Option
    {...props}
    className={classNames('option', {
      selected: props.isSelected,
      hover: props.isFocused
    })}
  />
);

const IndicatorsContainer: typeof components.IndicatorsContainer = (props) => (
  <components.IndicatorsContainer
    {...props}
    className={classNames('indicator', {
      expanded: props.selectProps.menuIsOpen
    })}
  />
);

export const Switcher = (props: SwitcherPropsType) => {
  const { activeNetwork, defaultNetwork } = useSelector(networksSelector);
  const { pathname } = useLocation();
  const { onSwitch } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isInternal = internalLinks.length === 0;

  const externalLinks = networks.map((network) => ({
    name: network.name || '',
    url: network.explorerAddress || '',
    id: network.id || ''
  }));

  const links = isInternal ? externalLinks : internalLinks;
  const options: OptionType[] = links.map((link) => ({
    label: link.name,
    value: link.id,
    url: link.url
  }));

  const onLoadSwitchNetwork = () => {
    const slashIndex = 1;
    const [networkId] = pathname.substring(slashIndex).split('/');

    const isNotDefault = defaultNetwork && defaultNetwork.id !== networkId;
    const foundNetwork = networkId
      ? networks.find((network) => network.id === networkId)
      : false;

    dispatch(
      changeNetwork(
        foundNetwork && isNotDefault ? foundNetwork : defaultNetwork
      )
    );
  };

  const switchNetwork = (networkId: string) => {
    document.body.click();

    if (activeNetwork.id !== networkId) {
      const foundNetwork = networkId
        ? networks.find((network) => network.id === networkId)
        : false;

      if (foundNetwork) {
        dispatch(changeNetwork(foundNetwork));
        navigate(networkId !== defaultNetwork.id ? `/${networkId}` : '/');
        onSwitch();
      }
    }
  };

  const onChange = (network: OnChangeValue<OptionType, false>) => {
    if (isDevelopment || isInternal) {
      return;
    }

    if (isInternal && network) {
      switchNetwork(network.value);
      return;
    }

    if (network) {
      window.open(network.url, '_blank');
      document.body.click();
      onSwitch();
    }
  };

  useEffect(onLoadSwitchNetwork, []);

  return (
    <div className='switcher'>
      <Select
        defaultValue={options[0]}
        value={options[0]}
        options={options}
        onChange={onChange}
        isMulti={false}
        isSearchable={false}
        menuPlacement='top'
        components={{
          Menu,
          MenuList,
          Control,
          Option,
          ValueContainer,
          SingleValue,
          IndicatorsContainer,
          IndicatorSeparator: null
        }}
      />
    </div>
  );
};

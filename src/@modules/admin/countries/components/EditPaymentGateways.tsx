import { TId } from '@base/interfaces';
import { IPaymentGateway } from '@modules/admin/payment-gateways/lib/interfaces';
import { Col, Row, Tooltip, message } from 'antd';
import { Checkbox } from 'antd/lib';
import React from 'react';
import { CountriesHooks } from '../lib/hooks';

interface IProps {
  pgId: TId;
  data: IPaymentGateway[];
}

const EditPaymentGateways: React.FC<IProps> = ({ pgId, data }) => {
  const addPaymentGateways = CountriesHooks.useAddPaymentGateways({
    config: {
      onSuccess(data) {
        if (!data?.success) return;
        message.success('Added Successfully');
      },
    },
  });

  const removePaymentGateways = CountriesHooks.useRemovePaymentGateways({
    config: {
      onSuccess(data) {
        if (!data?.success) return;
        message.warning('Removed Successfully');
      },
    },
  });

  return (
    <Row>
      {data?.map((item) => (
        <Col lg={8} key={item?.id}>
          <Tooltip title={!item?.isActive ? "This payment gateway isn't active now" : null} destroyTooltipOnHide>
            <Checkbox
              disabled={!item?.isActive}
              checked={item?.isAlreadyAdded}
              onChange={() => {
                if (item?.isAlreadyAdded) {
                  removePaymentGateways.mutate({
                    id: pgId as string,
                    paymentGatewayIds: [item?.id],
                  });

                  return;
                }

                addPaymentGateways.mutate({ id: pgId as string, paymentGatewayIds: [item?.id] });
              }}
            >
              <span className="text-[16px]">{item?.title}</span>
            </Checkbox>
          </Tooltip>
        </Col>
      ))}
    </Row>
  );
};

export default EditPaymentGateways;

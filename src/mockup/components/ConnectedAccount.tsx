import { Button } from "_/components/library";
import { vitalikAddress as address } from "_/mockup/fixtures/addresses";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

export const ConnectedAccount: FC = () => {
  return (
    <>
      <div>{address}</div>

      <Button>
        <FormattedMessage id="ConnectedAccount.disconnect" />
      </Button>
    </>
  );
};

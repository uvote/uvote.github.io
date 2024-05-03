import { Button, Buttons, InputField } from "_/components/library";
import { pollDetailsBasic } from "_/types/PollDetails";
import { stringBytesLength } from "_/types/strings";
import { FC, ReactNode, useState } from "react";
import { useIntl } from "react-intl";

const emptyHelp = <>&nbsp;</>;

const { titleMaxBytesLength } = pollDetailsBasic;

export const CreatePollForm: FC = () => {
  const { formatMessage } = useIntl();
  const stringTooLong = formatMessage({ id: "InputField.stringTooLong" });

  const [titleHelp, setTitleHelp] = useState<ReactNode>(emptyHelp);
  const [choiceAHelp, setChoiceAHelp] = useState<ReactNode>(emptyHelp);
  const [choiceBHelp, setChoiceBHelp] = useState<ReactNode>(emptyHelp);

  return (
    <form>
      <InputField
        required
        label={formatMessage({ id: "PollDetailsBasic.title" })}
        max={titleMaxBytesLength}
        onChange={(event) => {
          const value = event.target.value;
          if (stringBytesLength(value) > titleMaxBytesLength) {
            setTitleHelp(stringTooLong);
            return;
          }
          setTitleHelp(emptyHelp);
        }}
        help={titleHelp}
      />

      <InputField
        required
        label={formatMessage({ id: "PollDetailsBasic.choiceA" })}
        max={pollDetailsBasic.choiceMaxBytesLength}
        onChange={(event) => {
          const value = event.target.value;
          if (stringBytesLength(value) > titleMaxBytesLength) {
            setChoiceAHelp(stringTooLong);
            return;
          }
          setChoiceAHelp(emptyHelp);
        }}
        help={choiceAHelp}
      />

      <InputField
        required
        label={formatMessage({ id: "PollDetailsBasic.choiceB" })}
        min={pollDetailsBasic.choiceMaxBytesLength}
        onChange={(event) => {
          const value = event.target.value;
          if (stringBytesLength(value) > titleMaxBytesLength) {
            setChoiceBHelp(stringTooLong);
            return;
          }
          setChoiceBHelp(emptyHelp);
        }}
        help={choiceBHelp}
      />

      <Buttons>
        <Button>{formatMessage({ id: "CreatePollForm.ctaText" })}</Button>
      </Buttons>
    </form>
  );
};

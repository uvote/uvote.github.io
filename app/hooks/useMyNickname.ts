import { useMyAddress } from "_/hooks/useMyAddress";
import { useReadNicknameRegistryGetNickname } from "_/wagmi/generated";

export const useMyNickname = (): string => {
  const address = useMyAddress();
  const { data: nickname } = useReadNicknameRegistryGetNickname({
    args: [address],
  });
  return nickname ?? "";
};

import { AppColors } from "_/types/AppColors";
import { AppMetadata } from "_/types/AppMetadata";
import read from "read-file-utf8";

/** Read app info (e.g. metadata, colors). */
export const getAppInfo = async () => {
  const colors = await read<AppColors>("app/styles/colors.json");
  const metadata = await read<AppMetadata>("app/metadata.json");
  return { colors, metadata };
};

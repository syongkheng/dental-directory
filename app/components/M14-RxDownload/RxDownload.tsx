// M14 Downloads: the prescription form PDF. Hidden in production until public/files/pdca-rx-form.pdf exists.
import { flags } from "~/config/flags";
import { dentists } from "~/content/pages/dentists";
import { labels } from "~/content/pages/shared";
import { Download } from "~/components/icons";
import { TbcChip } from "~/components/Tbc/Tbc";
import { ButtonAnchor } from "~/components/ui/Button";

export const RX_FORM_PATH = "/files/pdca-rx-form.pdf";

export function rxFormAvailable(): boolean {
  return flags.rxForm;
}

export function RxDownloadButton({ loc, variant = "secondary" }: { loc: string; variant?: "primary" | "secondary" }) {
  if (!flags.rxForm) return null;
  return (
    <>
      <ButtonAnchor href={RX_FORM_PATH} download variant={variant} loc={loc} icon={<Download width={20} height={20} />}>
        {labels.downloadRx}
      </ButtonAnchor>
      {import.meta.env.DEV && !__RX_FORM_AVAILABLE__ ? <TbcChip label={dentists.rx.tbcLabel} /> : null}
    </>
  );
}

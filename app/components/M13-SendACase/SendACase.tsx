// M13 Send-a-case guide: pickup rules, digital file channel (TBC), English prescriptions.
import { dentists } from "~/content/pages/dentists";
import { CopyCards } from "~/components/ui/Card";

export function SendACase() {
  return <CopyCards cards={dentists.sendCase.cards} loc="send_case" />;
}

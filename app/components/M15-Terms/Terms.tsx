// M15 Terms: prices on request, remakes and warranty (TBC wording), payment.
import { dentists } from "~/content/pages/dentists";
import { CopyCards } from "~/components/ui/Card";

export function Terms() {
  return <CopyCards cards={dentists.terms.cards} loc="terms" />;
}
